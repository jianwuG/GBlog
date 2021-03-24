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
    const [hitokoto,setHitokoto]=useState('');
    useEffect(async () => {
        let _totalInfo = {
            articleNum: 30,
            tagNum: 10,
            readCount: 100
        };
        setTotalInfo(_totalInfo);
        let body=await fetch('https://v1.hitokoto.cn').then(res=>{
            return res.json()
        });
        setHitokoto(body.hitokoto||'')
    },[]);
    const goLink=(link)=>{
        window.location.href=link;
    };
    return (
        <>
            <Card
                hoverable>
                <Space size={[8, 12]} className={style.userInfo}>
                    <Avatar src={userInfo.avatarUrl} className={style.avatar}/>
                    <div className={style.name}>
                        <span className={style.nameText}>{userInfo.name}</span>
                        <span className={style.hitokoto}>{hitokoto}</span>
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
                    <WeiboCircleFilled className={style.netItem} onClick={()=>goLink('https://weibo.com/3877926081/profile?rightmod=1&wvr=6&mod=personinfo')}/>
                    <GithubFilled className={style.netItem} onClick={()=>goLink('https://github.com/jianwuG')}/>
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
