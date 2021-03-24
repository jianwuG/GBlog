import React from 'react'
import Head from "next/dist/next-server/lib/head";
import Header from "./component/header";
import store from "./store";
import {Provider} from "react-redux";

const TimeLine = () => {
    return (
        <Provider store={store}>
            <Head><title>时间轴 | JianWuG</title></Head>
            <Header/>
            <span>222333</span>
        </Provider>
    )
};
export default TimeLine;
