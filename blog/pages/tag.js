import React from 'react'
import Head from 'next/head'

import Header from './component/header'
import './style/tag.module.scss'
import store from "./store";
import {Provider} from "react-redux";

const Tag = () => {
    return (
        <Provider store={store}>
            <Head><title>标签 | JianWuG</title></Head>
            <Header/>
            2222
        </Provider>
    )
};
export default Tag;
