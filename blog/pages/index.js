import React, {useRef} from 'react';
import Head from 'next/head'
import {Row, Col} from 'antd'
import {UpCircleFilled} from '@ant-design/icons'
import dynamic from 'next/dynamic'
import {Provider} from 'react-redux'
// import  List from './../components/list'
// import  Side from './../components/Side'
// import  Header from './../components/header'
// import  FootBar from './../components/footBar'
const List = dynamic(import('./../components/list'));
const Side = dynamic(import('./../components/Side'));
const Header = dynamic(import('./../components/header'));
const FootBar = dynamic(import('./../components/footBar'));
const Loading = dynamic(import('../components/other/loading'));
import {useScroll} from '../hooks'
import store from './../store'
import style from './style/home.module.scss'

export default function Home() {
    const homeRef = useRef(null);
    const [scrollInfo, goTop] = useScroll(homeRef);
    const top = scrollInfo[1];

    return (

        <Provider store={store}>
            <>
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
                        Number(top) > 350 && <UpCircleFilled onClick={goTop} className={style.homeGoTop}/>
                    }
                    <style global jsx>{
                        `
                          body {
                            overflow: hidden;
                          }
                        `
                    }
                    </style>
                </div>
                <FootBar/>

            </>
        </Provider>
    )
};
