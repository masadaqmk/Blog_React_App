import React from 'react';
import './header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>

            <img className="headerImg"
                src="https://wonderfulengineering.com/wp-content/uploads/2016/01/love-wallpaper-34.jpg"
            ></img>
        </div>
    )
}
