import React, {useState} from 'react';
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
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    const clickMenu=({key})=>{
        console.log('11111',key);
        props.history.push(key)
    };

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" style={{paddingTop:'64px'}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="/" icon={<PieChartOutlined/>}  onClick={clickMenu}>
                           添加文章
                        </Menu.Item>
                        <SubMenu key="article" icon={<FileWordOutlined />} title="文章管理">
                            <Menu.Item key="/article/list/"  onClick={clickMenu}>文章列表</Menu.Item>
                            <Menu.Item key="/article/"  onClick={clickMenu}>编写文章</Menu.Item>
                        </SubMenu>
                        <SubMenu key="tag" icon={<TagsOutlined />} title="标签管理">
                            <Menu.Item key="/tag/"  onClick={clickMenu}>标签列表</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="/project/" icon={<TableOutlined />}  onClick={clickMenu}>
                            项目展示管理
                        </Menu.Item>
                        {/*<Menu.Item key="message" icon={<FileOutlined/>}>*/}
                        {/*    留言管理*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>添加文章</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" >
                               <Route path="/" exact   component={AddArticle} />
                               <Route path="/article/list/" exact  component={ArticleList} />
                               <Route path="/tag/"  exact   component={TagList} />
                               <Route path="/project/" exact  component={Project} />
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>jianwuG博客后台管理系统</Footer>
                </Layout>
            </Layout>
        </>
    )
};
export default Home;
