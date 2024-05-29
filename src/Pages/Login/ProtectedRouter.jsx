import React from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ProtectedRouter = (props) => {
    const {Component} = props;
    const token = Cookies.get("jwttoken");
    const navigate = useNavigate();
    useEffect(() => {
      if(token==undefined)
      navigate("/login")
    }, [])
    

    return(
        <Component></Component>
    )
}

export default ProtectedRouter