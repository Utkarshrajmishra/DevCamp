import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import DBService from "../../appwriteServices/dbService/db";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Postform = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? DBService.uploadFile(data.iamage[0]) : null;
    }
    if (file) {
      DBService.deleteFile(post.featuredImage);
    }

    const dbPost = await DBService.updatePost(post.$id, {
      ...data,
      featuredImage: file ? file.$id : undefined,
    });

    if (dbPost) {
      navigate(`/post/${dbPost.$id}`);
    } else {
      const file = data.image[0]
        ? await DBService.uploadFile(data.image[0])
        : "";

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await DBService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "sting") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
  }, []);

  React.useEffect(() => {
    const subscriptopn = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscriptopn.unsubscribe();
    };
  }, [watch, slugTransform, set]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Postform;
