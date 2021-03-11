import React, {useState,useEffect} from 'react';
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
import TagList from './../page/tag/list';
import './index.scss'

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const Home = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [breadText,setBreadText]=useState('添加文章');
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    useEffect((
    )=>{
        setBreadText(getText(props.location.pathname));
    },[props]);

    const clickMenu=({key})=>{
        props.history.push(key);
    };

    const getText=(key)=>{
        let _text='';
        switch (key) {
            case '/':
                _text='添加文章';break;
            case '/article/list/':
                _text='文章列表';break;
            case '/tag/':
                _text='标签列表';break;
            case '/project/':
                _text = '项目展示管理';
                break;
            default:
                _text='';
        }
        return _text;
    };

    return (
        <>
            <Layout style={{minHeight: '100vh',background:'#fff'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
                    <div className="logo" style={{paddingTop:'64px'}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" inlineCollapsed='false'>
                        <Menu.Item key="/"  onClick={clickMenu}>添加文章</Menu.Item>
                        <Menu.Item key="/article/list/"  onClick={clickMenu}>文章列表</Menu.Item>
                            <Menu.Item key="/tag/"  onClick={clickMenu}>标签列表</Menu.Item>
                        <Menu.Item key="/project/" icon={<TableOutlined />}  onClick={clickMenu}>
                            项目展示管理
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{background:'#fff'}}>
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>{breadText}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background"  >
                               <Route path="/" exact   component={AddArticle} />
                               <Route path="/article/list/" exact  component={ArticleList} />
                               <Route path="/tag/"  exact   component={TagList} />
                               <Route path="/project/" exact  component={Project} />
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center',background:'#fff'}}>jianwuG博客后台管理系统</Footer>
                </Layout>
            </Layout>
        </>
    )
};
export default Home;
