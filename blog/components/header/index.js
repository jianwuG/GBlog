import React, {useEffect, useState} from 'react';
import {Row, Col, Avatar, Image, Space, Button, Drawer} from 'antd'
import {MenuUnfoldOutlined} from '@ant-design/icons'
import Router from 'next/router'
import * as ActionCreators from "../../store/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import Side from '../Side'
import style from './index.module.scss'

const Header = () => {
    const [headerMenu, setHeaderMenu] = useState([]);
    const [menuIndex, useMenuIndex] = useState(0);
    const userInfo = {
        avatarUrl: "/static/avatar002.jpg",
        name: 'JianWu'
    };
    const {page, pageSize,leftShow} = useSelector(state => (
        {
            page: state.get('page'),
            pageSize: state.get('pageSize'),
            leftShow:state.get('leftShow')
        }
    ),);

    let dispatch = useDispatch();
    const onClose = () => {
        dispatch(ActionCreators.setLeftShow(false))
    };
    useEffect(() => {
        setHeaderMenu([{name: 'Home', path: '/', id: 0}, {name: 'Tag', path: '/tag', id: 1}, {
            name: 'TimeLine',
            path: '/timeLine',
            id: 2
        }]);
    }, []);
    const openMenu = () => {
        dispatch(ActionCreators.setLeftShow(true))
        console.log('zzzzzzzzzzzzzzzzzzzzzz');

    };

    const goPath = (path) => {
        Router.push(path);
        if (path === '/') {
            const options = {
                page_start: page * pageSize,
                page_end: (page + 1) * pageSize
            };
            dispatch(ActionCreators.initData(options))
        }

    };
    return (
        <>
            <Row className={style.headerWrapper}>
                <Col span={0} xs={2} sm={0}>
                    <MenuUnfoldOutlined size="30" onClick={openMenu}/>
                    {/*<MenuFoldOutlined />*/}
                </Col>
                <Col span={6} className={style.avatar} onClick={() => goPath('/')}>
                    <Avatar src={<Image src={userInfo.avatarUrl}/>}/>
                    <span style={{marginLeft: "10px"}}>{userInfo.name}</span>
                </Col>
                <Col span={10} xs={0} sm={0} md={0} lg={0} xl={10}>

                </Col>
                <Col span={8} xs={0} md={8}>
                    {
                        headerMenu && headerMenu.map(item => (
                            <Space key={item.id}>
                                <Button type='link' style={{color: '#000'}} onClick={() => goPath(item.path)}>
                                    {item.name}
                                </Button>
                            </Space>
                        ))
                    }
                </Col>

            </Row>
            <Drawer
                drawerStyle={{width:'200px'}}
                width={200}
                placement="left"
                closable={false}
                onClose={onClose}
                visible={leftShow}
            >
                <Side style={{padding:'0px'}}/>
            </Drawer>
        </>
    )
}

export default Header
