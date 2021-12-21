import React,{useRef,useContext} from 'react';
import { Context } from '../../context/Context';
import './Login.css';
import axios from 'axios';
import {URL} from '../../Request';

export default function Login() {
    const userRef  = useRef();
    const passwordRef = useRef();

    const {user,dispatch, isFetching} =useContext(Context);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});

        try{
            var config = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                 withCredentials: false
              }
    
              await axios.post(URL+'auth/login',{
                  username:userRef.current.value,
                  password:passwordRef.current.value,
                },config)
            .then(res => {
                dispatch({type:"LOGIN_SUCCESS",payload:res.data});
               //res.data && window.location.replace("/login");
            })
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"});
        }
    }

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="loginInput" ref={userRef} placeholder="Enter your username..."></input>
                <label>Password</label>
                <input type="password" className="loginInput" ref={passwordRef} placeholder="Enter your password..."></input>
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">Register</button>
        </div>
    )
}
