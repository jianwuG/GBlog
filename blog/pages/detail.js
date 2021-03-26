import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import {withRouter} from 'next/router'
import dynamic from 'next/dynamic'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import marked from 'marked'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import style from './style/detail.module.scss'
import {Row, Col ,Affix} from 'antd'
import {useHttpHook} from "../hooks";
import BlogPath from "./api/apiUrl";
import store from "./../store";
import {Provider} from "react-redux";
const Header=dynamic(import('../components/header'));

const Detail = ({router}) => {
    const [detail, setDetail] = useState({});
    const [articleHtml, setArticleHtml] = useState(null);

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        },
        gfm: true, // 允许 Git Hub标准的markdown.
        pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
        sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
        breaks: false, // 允许回车换行（该选项要求 gfm 为true）
        smartLists: true, // 使用比原生markdown更时髦的列表
        smartypants: false, // 使用更为时髦的标点
    });

    useEffect(async () => {
        console.log('111', router.query.id)
        const body = await useHttpHook({url: BlogPath.getArticleDetail + router.query.id, method: 'get'})()
        setDetail(body);
        let html = marked(body.mark).replace(/<pre>/g, "<pre category='hljs'>")
        console.log();
        setArticleHtml(html)
    }, [router]);


    return (
        <Provider store={store}>
            <div className={style.detailWrapper}>
                <Head><title>详情111</title></Head>
                <Header/>
                <Row>
                    <Col>
                        <div className={style.articleTitle}>{detail.title}</div>
                        <div className={style.articleHtml} dangerouslySetInnerHTML={{__html: articleHtml}}></div>
                    </Col>
                    <Col>
                        <Affix offsetTop={5}>
                            <div className={style.navMenu}>
                                <div className="nav-title">文章目录</div>
                                <MarkNav
                                    className="article-menu"
                                    source={detail.mark}
                                    ordered={false}
                                />
                            </div>
                        </Affix>
                    </Col>
                </Row>

            </div>
        </Provider>

    )
};
export default withRouter(Detail);
