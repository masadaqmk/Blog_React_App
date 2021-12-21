import React,{useEffect, useState} from 'react';
import './sidebar.css';
import axios from 'axios';
import {URL} from '../Request';
import {Link} from 'react-router-dom';


export default function Sidebar() {

    const [cat, setCats] = useState([]);

    useEffect(()=>{
        const getCategories = async ()=>{
            var config = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                 withCredentials: true
              }

              await axios.get(URL+'category',config)
            .then(res => {
                setCats(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
            // console.log(res);
        }
        getCategories();
    },[]);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About Me</span>
                <img className="sidebarimg" src="https://th.bing.com/th/id/OIP.Y6sK99siEDcIceakyBzKagHaG4?pid=ImgDet&rs=1"
                alt=""
                ></img>
                <p>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                    <ul className="sidebarList">
                    {
                        cat.map((ca,index)=>{
                            return <Link className="link" to={`/?cat=${ca.name}`}><li key={index} className="sidebarListItem">{ca.name}</li></Link>
                        })
                    }
                        
                    </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">Follow Us</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}
