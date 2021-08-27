import React, {useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {Route} from 'react-router-dom';
import {
    FileWordOutlined,
    PieChartOutlined,
    TagsOutlined,
    TableOutlined,
} from '@ant-design/icons';
import ArticleList from './../page/article/articleList';
import AddArticle from './../page/article/addArticle';
import Project from './../page/project';
import Homepage from './../page/Home';
import TagList from './../page/tag/list';
import './index.scss'
import {useHttpHook} from "../hooks";
import apiUrl from "../api/apiUrl";

const {Header, Content, Footer, Sider} = Layout;

const LayoutPage = (props) => {
    const [collapsed, setCollapsed] = useState(false); //收起状态
    const [menuList, setMenuList] = useState([]);//menuList
    const [breadText, setBreadText] = useState('添加文章'); //面包text


    const clickMenu = ({key}) => {
        props.history.push(key);
        const _breadText = menuList.find(item => item.keyName === key) && menuList.find(item => item.keyName === key).routeName
        setBreadText(_breadText)
        sessionStorage.setItem('pathKey', key)
    };
    useEffect(async () => {
        initPage()
        let {list} = await GetMenuList();
        setMenuList(list)
    }, []);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    const initPage = () => {
        const pathName = props.history.location.pathname
        if (pathName === '/') {
            setBreadText('')
            sessionStorage.setItem('pathKey', '')
        }
    }
    const GetMenuList = () => useHttpHook({url: apiUrl.menuList, method: 'get'})();

    const getComponent = (key) => {
        return {
            '/index': Homepage,
            '/index/article/list': ArticleList,
            '/index/tag': TagList,
            '/index/project': Project
        }[key]
    }
    const getIcon = (key) => {
        return {
            '/index': <FileWordOutlined/>,
            '/index/article/list': <PieChartOutlined/>,
            '/index/tag': <TagsOutlined/>,
            '/index/project': <TableOutlined/>
        }[key]
    }

    return (
        <>
            <Layout hasSider style={{height: '100%'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" style={{paddingTop: '64px'}}/>
                    <Menu theme="dark" defaultSelectedKeys={sessionStorage.getItem('pathKey') || '/index'}
                          mode="inline">
                        {
                            menuList && menuList.map(item =>
                                (
                                    <Menu.Item key={item.keyName} onClick={clickMenu}
                                               icon={getIcon(item.keyName)}>{item.routeName}</Menu.Item>
                                ))
                        }
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{background: '#fff'}}>
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        {
                            breadText && <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>{breadText}</Breadcrumb.Item>
                            </Breadcrumb>
                        }
                        <div className="site-layout-background">
                            {
                                menuList && menuList.map(item => (
                                    <Route path={item.keyName} exact component={getComponent(item.keyName)}/>
                                ))
                            }
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center', background: '#fff', fontSize: '20px'}}>JIANWUG博客后台管理系统</Footer>
                </Layout>
            </Layout>
        </>
    )
};
export default LayoutPage;
