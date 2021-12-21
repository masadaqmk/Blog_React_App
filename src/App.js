import {useContext} from "react";
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Setting from './pages/setting/Setting';
import Write from './pages/write/Write';
import Single from './single/Single';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import TopBar from './topbar/TopBar';
import Post from './post/Post';
import SinglePost from './singlePost/SinglePost';
import { Context } from './context/Context';
import React from 'react';

function App() {
  const {user} = useContext(Context);
  return (
    
      <>
        <Router>
          <TopBar/>
            <Switch>
                <Route exact path='/'><Home/></Route>
                <Route exact path='/login'>
                  { user ? <Home/>:<Login/> }
                </Route>
                <Route exact path='/register'>
                  { user ? <Home/>:<Register/> }
                </Route>
                <Route exact path='/write'>
                     { user ? <Write/>:<Register/> }
                </Route>
                <Route exact path='/settings'>
                  { user ? <Setting/>:<Register/> }
                </Route>
                <Route exact path='/post/:postId'><Single/></Route>
            </Switch>
        </Router>
      </>
   

  );
}

export default App;
