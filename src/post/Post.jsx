import React from 'react';
import './post.css';
import {Link} from 'react-router-dom';

export default function Post({posts}) {
    const PF = "http://localhost:5001/images/";
    return (
        <div className="post">
           {posts.photo && (
                <img className="postImg" src={PF+posts.photo} alt="" ></img>
               )
           }

            <div className="postInfo">
                <div className="postCats">
                {
                    posts.categories.map((p,index)=>{
                        return <span key={index} className="postCat">{p.name}</span>
                    })
                }
                    
                </div>
                <Link to={'/post/'+posts._id} className="link">
                    <span className="postTitle">
                        {posts.title}
                    </span>
                </Link>
                <hr></hr>
                <span className="postDate">{ new Date(posts.createdAt).toDateString() }</span>
                <p className="postDescription">{posts.desc}</p>
            </div>
        </div>
    )
}
