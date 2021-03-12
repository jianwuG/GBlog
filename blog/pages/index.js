import React from 'react';
import Head from 'next/head'
import {Row,Col} from 'antd'
import Header from './component/header'
import List from './component/List'
import Side from './component/Side'

import style from './style/home.module.scss'

const Home=()=>{
    return(
        <div className={style.homeWrapper}>
        <Head><title>主页 | JianWuG</title></Head>
          <Header/>
          <Row justify='center'>
              <Col span={10}  className={style.List} xs={20} sm={20} md={20} lg={10}>
                  <List/>
              </Col>
              <Col span={4} className={style.showInfo} xs={0} sm={0} md={0} lg={4}>
                  <Side/>
              </Col>
          </Row>
        </div>
    )
};
export default Home;
