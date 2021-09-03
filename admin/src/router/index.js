import React from 'react';
import {Provider} from 'react-redux'

import {HashRouter as Router, Route, Redirect} from "react-router-dom";
import store from './../store'
import LayoutPage from './../layout'
import Login from './../page/login'
import AddArticle from './../page/article/addArticle'
import NotFound from './../page/notFound'


function Main() {
    return (
        <>
            <Provider store={store}>
                    <Router>
                        <Route path={`/login/`} exact component={Login}/>
                        <Route path={`/`} exact component={LayoutPage}/>
                        <Route path={`/index/`} component={LayoutPage}/>
                        <Route path={`/article/addArticle`} component={AddArticle}/>
                        {/*<Route path={`/notFound`} component={NotFound}/>*/}
                        {/*<Redirect from={`*`} to='/notFound'/>*/}
                    </Router>
            </Provider>

        </>

    )
}

export default Main
