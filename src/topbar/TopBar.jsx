import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import './tobar.css';

const TopBar=()=>{
    const {user, dispatch} = useContext(Context);

    const handlelogout =()=>{
        dispatch({type:"LOGOUT"});
    }
    const PF = "http://localhost:5001/images/";
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter">

                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to='/'>Home</Link>
                    </li>
                    <li className="topListItem">
                    <Link className="link" to='/'>About</Link>
                    </li>
                    <li className="topListItem">
                    <Link className="link" to='/'>Contact</Link>
                    </li>
                    <li className="topListItem">
                    <Link className="link" to='/write'>Write</Link>
                    </li>
                    <li className="topListItem" onClick={handlelogout}>
                        { user && "Logout"}
                    </li>
                </ul>   

            </div>
            <div className="topRight">
            {
                user ? (
                    <Link to="/settings/">
                        <img className="topImage" src={PF + user.profilePic} alt=""></img>
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to='/login'>Login</Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to='/register'>Register</Link>
                        </li>
                    </ul>
                )
            }
                
                <i className="topSearchIcon fab fa-twitter-square"></i>
            </div>
        </div>
    )
}

export default TopBar;