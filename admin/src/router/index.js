import React from 'react';
import {Provider} from 'react-redux'

import {HashRouter as Router, Route} from "react-router-dom";
import store from './../store'
import Home from './../layout'
import Login from './../page/login'


function Main() {
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Route path="/login/" exact component={Login}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/index/"  component={Home}/>
                </Router>
            </Provider>
        </>

    )
}

export default Main
