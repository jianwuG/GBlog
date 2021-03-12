import React, {useState, useEffect} from 'react'
import {Card, Avatar, Space, Divider} from "antd";
import {WechatFilled, WeiboCircleFilled, GithubFilled, AliwangwangFilled} from '@ant-design/icons'
import Category from './../Category'
import TagSide from './../tagSide'
import style from './index.module.scss'

const Side = () => {
    const userInfo = {
        avatarUrl: "/static/avatar002.jpg",
        name: 'JianWu'
    };
    const [totalInfo, setTotalInfo] = useState({});
    useEffect(() => {
        let _totalInfo = {
            articleNum: 30,
            tagNum: 10,
            readCount: 100
        };
        setTotalInfo(_totalInfo)
    }, []);
    return (
        <>
            <Card
                hoverable>
                <Space size={[8, 12]} className={style.userInfo}>
                    <Avatar src={userInfo.avatarUrl} className={style.avatar}/>
                    <div className={style.name}>
                        <span>{userInfo.name}</span>
                    </div>
                    <Space split={<Divider type="vertical"/>}>
                        <div className={style.sideMenu}>
                            <span>文章</span>
                            <span className={style.sideMenuNum}>{totalInfo.articleNum}</span>
                        </div>
                        <div className={style.sideMenu}>
                            <span>标签</span>
                            <span className={style.sideMenuNum}>{totalInfo.tagNum}</span>
                        </div>
                        <div className={style.sideMenu}>
                            <span>阅读</span>
                            <span className={style.sideMenuNum}>{totalInfo.readCount}</span>
                        </div>
                    </Space>
                </Space>

                <div className={style.sideNet}>
                    <WechatFilled className={style.netItem}/>
                    <WeiboCircleFilled className={style.netItem}/>
                    <GithubFilled className={style.netItem}/>
                    <AliwangwangFilled className={style.netItem}/>
                </div>
                <Divider plain>分类</Divider>
                <Category/>
                <Divider plain>标签</Divider>
                <TagSide/>
            </Card>
        </>
    )
};
export default Side;
