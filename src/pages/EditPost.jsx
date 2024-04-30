import React, {useEffect, useState} from 'react';
import Container from '../components/container/Container';
import Postform from '../components/PostForm/Postform';
import DBService from '../appwriteServices/dbService/db';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditPost=()=>{
    const[posts,setPosts]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate();

    useEffect(()=>{
            useEffect(() => {
              if (slug) {
                appwriteService.getPost(slug).then((post) => {
                  if (post) {
                    setPosts(post);
                  }
                });
              } else {
                navigate("/");
              }
            }, [slug, navigate]);
    },[slug,navigate])

     return post ? (
       <div className="py-8">
         <Container>
           <PostForm post={post} />
         </Container>
       </div>
     ) : null;
}

export default EditPost