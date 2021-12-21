import React,{useContext,useState} from 'react';
import Sidebar from '../../sidebar/Sidebar';
import './Setting.css';
import { Context } from '../../context/Context';
import axios from 'axios';
import {URL2} from '../../Request';


export default function Setting() {
    const {user, dispatch} = useContext(Context);
    const [file, setFile]=useState(null);

    const [username, setUsername] = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");

    const PF = "http://localhost:5001/images/";

    const handleSubmit= async(e)=>{
        e.preventDefault();

        dispatch({type:"UPDATE_START"});
        const updatedUser ={
            userId:user._id,
            username,password,email
        }
        if(file){
            const data = new FormData();
            const filename = Date.now()+file.name;
            data.append("name", filename);
            data.append("file", file)
            updatedUser.profilePic = filename;
            try{
                var config = {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                     withCredentials: false
                  }
        
                  await axios.post(URL2+'upload',data,config)
                .then(res => {
                   console.log(res);
                }) 
            }catch(err){
                console.log(err);
            }
        }

        try{
            var config = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                 withCredentials: false
              }
    
              await axios.put(URL2+'users/'+user._id,updatedUser,config)
            .then(res => {
                dispatch({type:"UPDATE_SUCCESS",payload:res.data});
               window.location.reload();
            }) 
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"});
            console.log(err);
        }

    }

    return (
        <div className="setting">
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>

                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt=""></img>

                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display:'none'}} onChange={(e)=>setFile(e.target.files[0])}></input>
                    </div>

                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}></input>

                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}></input>

                    <label>Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>

                    <button className="settingsSubmit" type="submit">Update</button>
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}
