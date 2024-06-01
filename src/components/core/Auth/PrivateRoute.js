import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const {token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
 

    {
        if(token)return children;
        else {
            navigate("/login");
        }
    }
   
  
}
