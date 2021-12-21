import React,{useState} from 'react';
import './Register.css';
import axios from 'axios';
import {URL} from '../../Request';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e)=>{
        setError(false);
        e.preventDefault();
        try{
            var config = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                 withCredentials: false
              }
    
              await axios.post(URL+'auth/register',{username,email,password},config)
            .then(res => {
               res.data && window.location.replace("/login");
            })
        }catch(err){
            setError(true);
        }
        
    }
    return (
        <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
            <input type="text" className="registerInput" placeholder="Enter your username..." onChange={e=>setUsername(e.target.value)}></input>

            <label>Email</label>
            <input type="text" className="registerInput" placeholder="Enter your email..." onChange={e=>setEmail(e.target.value)}></input>
            <label>Password</label>
            <input type="password" className="registerInput" placeholder="Enter your email..." onChange={e=>setPassword(e.target.value)}></input>
            <button className="registerButton">Register</button>
            {
                error &&(
                    <span>
                        Something is wrong
                    </span>
                )
            }
            
        </form>
        <button className="registerLoginButton">Login</button>
    </div>
    )
}
