import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './../page/login'
import Home from './../page/home'

function Main() {
    return (
        <Router>
            <Route path="/" exact component={Login}/>
            <Route path="/home" exact component={Home}/>
        </Router>
    )
}

export default Main
