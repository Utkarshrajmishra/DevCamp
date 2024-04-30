import React from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import DBService from "../appwriteServices/dbService/db";
import { useState } from "react";
import { useEffect } from "react";

const AllPosts=()=>{
const [post, setPost]=usesState([])
useEffect(()=>{},[])

DBService.getPosts([]).then((posts)=>{
    if(posts)
    {
        setPost(posts.documents)
    }
})
return (
  <div className="w-full py-8">
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  </div>
);
}