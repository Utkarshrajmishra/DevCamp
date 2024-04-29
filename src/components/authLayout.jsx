import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
    const navigate=useNavigate();
    const[loader,setLoadeer]=useState(true)
    const authStatus=useSelector(state=>state.auth.status);

    useEffect(()=>{
        if(authentication && authStatus !==authentication)
        {
            navigate('/login');
        }
        else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoadeer(false)
    },[authStatus, navigate, authentication]
    )

  return (
    <>
    { loading? <h1>Loading...</h1>: {children}}
    </>
  )
};

export default AuthLayout;
