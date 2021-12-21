import React,{useEffect,useState,useContext} from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SinglePost.css';
import axios from 'axios';
import {URL} from '../Request';
import { Context } from '../context/Context';

export default function SinglePost() {
    const {user} = useContext(Context);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const PF = "http://localhost:5001/images/";
    const [post, setPost]= useState([]);

    const[title, setTitle] = useState("");
    const[desc, setDesc]   = useState("");
    const[updateMode, setUpdateMode] = useState(false);


    useEffect(()=>{
        const getPost = async ()=>{
            var config = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                 withCredentials: true
              }

              await axios.get(URL+'post/'+path,config)
            .then(res => {
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
            })
            .catch(err =>{
                console.log(err);
            })
            // console.log(res);
        }
        getPost();
    },[]);


    const handleDelete= async()=>{
        try{
            var config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                    withCredentials: true
                }

                await axios.delete(URL+'post/'+path,{
                    data:{username:user.username}
                },config)
            .then(res => {
                window.location.replace("/");
            })
            .catch(err =>{
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }
    }

    const handleUpdate= async()=>{
        try{
            var config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                    withCredentials: false
                }

                await axios.put(URL+'post/'+path,{username:user.username,title:title,desc:desc},config)
            .then(res => {
                window.location.reload();
            })
            .catch(err =>{
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="singlepost">
            <div className="singlePostWrapper">
            {post.photo && (
                <img src={PF + post.photo} alt="" className="singlePostImg"></img>
            )}{
                updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={e=>setTitle(e.target.value)}></input> :(
                   <h1 className="singlePostTitle">{post.title}
                        {
                            post.username === user?.username && (
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i> 
                                </div>
                            )
                        }
                    
                    </h1> 
                )
            }
                
                

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: 
                        <Link to={`/?username=${post.username}`} className="link">
                        <b>{post.username}</b>
                        </Link>
                    </span>

                    <span className="singlePostDate">
                    { new Date(post.createdAt).toDateString() }
                    </span>

                </div>
                { updateMode ? (
                    <textarea className="singlePostDescInput" onChange={e=>setDesc(e.target.value)}>{desc}</textarea>
                ):(
                    <p className="singlePostDesc">{post.desc}</p>
                )}
                
                { updateMode && (
                    <button className="singlepostButton" onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    )
}
