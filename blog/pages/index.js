import React, {useRef, useEffect, useCallback} from 'react';
import Head from 'next/head'
import {Row, Col} from 'antd'
import {UpCircleFilled} from '@ant-design/icons'
import {useScroll} from './hooks'
import dynamic from 'next/dynamic'
const List=dynamic(import('./component/List'));
const Side=dynamic(import('./component/Side'));
const Header=dynamic(import('./component/header'));



import style from './style/home.module.scss'

const Home = () => {
    const homeRef = useRef(null);
    // const [left, top] = useScroll(homeRef);
    const [scrollInfo,goTop]=useScroll(homeRef);
    const top=scrollInfo[1];

    return (
        <div className={style.homeWrapper} ref={homeRef}>
            <Head><title>主页 | JianWuG</title></Head>
            <Header/>
            <Row justify='center' className={style.homeContext}>
                <Col span={10} className={style.List} xs={20} sm={20} md={20} lg={10}>
                    <List/>
                </Col>
                <Col span={5} className={style.showInfo} xs={0} sm={0} md={0} lg={5}>
                    <Side/>
                </Col>

            </Row>
            {
                Number(top) > 350 &&<UpCircleFilled  onClick={goTop} className={style.homeGoTop}/>
            }
            <style global jsx>{
                ` 
                 body{
                  overflow:hidden;
                 }
                `
              }
            </style>
        </div>

    )
};
export default Home;
