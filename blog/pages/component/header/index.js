import React,{useEffect,useState} from 'react';
import {Row,Col,Avatar,Image,Space,Button} from 'antd'
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons'
import Router from 'next/router'
import style from './index.module.scss'
import * as ActionCreators from "../../store/actionCreators";
import {useDispatch, useSelector} from "react-redux";

const Header=()=>{
    const [headerMenu,setHeaderMenu]=useState([]);
    const [menuIndex,useMenuIndex]=useState(0);
    const userInfo={
        avatarUrl:"/static/avatar002.jpg",
        name:'JianWu'
    };
    const {page,pageSize}=useSelector(state=>(
        {
            page:state.get('page'),
            pageSize:state.get('pageSize'),
        }
    ),);
    let dispatch=useDispatch();
    useEffect(()=>{
        setHeaderMenu([{name:'Home',path:'/',id:0},{name:'Tag',path:'/tag',id:1},{name:'TimeLine',path:'/timeLine',id:2}]);
    },[]);
    const goPath=(path)=>{
        console.log('111111111111');
        Router.push(path);
        const options={
            page_start:page*pageSize,
            page_end:(page+1)*pageSize
        };
        dispatch(ActionCreators.initData(options))
    };
    return(
        <Row className={style.headerWrapper}>
            <Col span={0} xs={2} sm={0}>
                <MenuUnfoldOutlined size="30"/>
                {/*<MenuFoldOutlined />*/}
            </Col>
            <Col span={6} className={style.avatar} onClick={()=>goPath('/')} >
                <Avatar src={<Image src={userInfo.avatarUrl} />} />
                <span style={{marginLeft:"10px"}}>{userInfo.name}</span>
            </Col>
            <Col span={10} xs={0} sm={0} md={0} lg={0} xl={10}>

            </Col>
            <Col span={8} xs={0} md={8} >
                {
                    headerMenu&&headerMenu.map(item=>(
                        <Space key={item.id}>
                            <Button type='link' style={{color:'#000'}}  onClick={()=>goPath(item.path)}>
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
