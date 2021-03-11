import React from 'react';
import Head from 'next/head'
import Header from './view/header'
import {Button} from 'antd'

const Home=()=>{
    return(
        <>
        <Head><title>主页</title></Head>
            <Header/>
            <div><Button>我是按钮</Button></div>
            <div className='cc'></div>
        </>
    )
};
export default Home;