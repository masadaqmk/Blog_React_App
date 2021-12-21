import React,{useState,useEffect} from 'react';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Posts from '../../posts/Posts';
import './home.css';
import axios from 'axios';
import {URL} from '../../Request';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const [post, setPost] = useState([]);
    
    const {search} = useLocation();
    
    
    useEffect(()=>{
        const fetchPosts = async ()=>{
            var config = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                 withCredentials: true
              }

              await axios.get(URL+'post/'+search,config)
            .then(res => {
                setPost(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
            // console.log(res);
        }
        fetchPosts();
    },[]);

    return (
        <div>
            <Header/>
            <div className="home">
                <Posts posts={post}/>
                <Sidebar/>
            </div>
        </div>
    )
}
