import React,{useEffect,useState} from 'react';
import {Row,Col,Avatar,Image,Space,Button} from 'antd'
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons'
import Router from 'next/router'
import style from './index.module.scss'

const Header=()=>{
    const [headerMenu,setHeaderMenu]=useState([]);
    const [menuIndex,useMenuIndex]=useState(0);
    const userInfo={
        avatarUrl:"/static/avatar002.jpg",
        name:'JianWu'
    };
    useEffect(()=>{
        setHeaderMenu([{name:'Home',path:'/',id:0},{name:'Tag',path:'/tag',id:1},{name:'TimeLine',path:'/timeLine',id:2}]);
    },[]);
    const goPath=(path)=>{
        console.log('111111111111');
        Router.push(path);
    };
    return(
        <Row className={style.headerWrapper}>
            <Col span={0} xs={2} sm={0}>
                <MenuUnfoldOutlined size="30"/>
                {/*<MenuFoldOutlined />*/}
            </Col>
            <Col span={6} className={style.avatar}>
                <Avatar src={<Image src={userInfo.avatarUrl} />} />
                <span style={{marginLeft:"10px"}}>{userInfo.name}</span>
            </Col>
            <Col span={10} xs={0} sm={0} md={0} lg={0} xl={10}>

            </Col>
            <Col span={8} xs={0} md={8} >
                {
                    headerMenu&&headerMenu.map(item=>(
                        <Space>
                            <Button type='link' style={{color:'#000'}} key={item.path} onClick={()=>goPath(item.path)}>
                                {item.name}
                            </Button>
                        </Space>
                    ))
                }
            </Col>
        </Row>
    )
}

export default Header
