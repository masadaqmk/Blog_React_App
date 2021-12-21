import React,{useState, useEffect,useContext} from 'react';
import './write.css';
import axios from 'axios';
import { Context } from '../../context/Context';
import {URL2}  from '../../Request';

export default function Write() {

    const [title, setTitle] = useState("");
    const [desc, setDesc]   = useState("");
    const [file, setFile]   = useState(null);
    const {user} = useContext(Context);
    
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const newPost ={
            username:user.username,
            title,
            desc,
            file
        }
        if(file){
            const data = new FormData();
            const filename = Date.now()+file.name;
            data.append("name", filename);
            data.append("file", file)
            newPost.photo = filename;
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
    
              await axios.post(URL2+'post',newPost,config)
            .then(res => {
               window.location.replace("/post/"+res.data._id);
            }) 
        }catch(err){
            console.log(err);
        }

    }
    return (
        <div className="write">
        {file && (
            <img src={URL.createObjectURL(file)} 
        className="writeImage" alt=""></img>
        )}
        
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i className=" writeIcon fas fa-plus"></i>
                        </label>
                    <input type="file"  id="fileInput" style={{ display:"none"}} onChange={e=>setFile(e.target.files[0])}></input>
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e=>setTitle(e.target.value)}></input>
                </div>

                <div className="writeFormGroup">
                    <textarea 
                        placeholder="Tell Your Story..."
                        type="text"
                        className="writeInput witeText" onChange={e=>setDesc(e.target.value)}>
                    </textarea>
                </div>

                <button type="submit" className="writeSubmit" >Submit</button>
            </form>
        </div>
    )
}
