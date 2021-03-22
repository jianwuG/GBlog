import React,{useState,useEffect} from 'react';
import Router from 'next/router'
import {Card, Col, Tag} from 'antd'
import Moment from 'moment'
import marked from 'marked'

import style from './index.module.scss'
import {useHttpHook} from "./../../hooks";
import BlogPath from "../../api/apiUrl";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const List = () => {
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
    const [list,setList]=useState([]);
    const [page,setPage]=useState(0);
    const [pageSize,setPageSize]=useState(10);
    const [hasMore,setHasMore]=useState(false);
    useEffect(async ()=>{
        const options={
            page_start:page*pageSize,
            page_end:(page+1)*pageSize
        };

        const {data,count}=await GetList(options);
        data.map(item=>{
            item.articleHtml=marked(item.mark.substring(0,100)).replace(/<pre>/g, "<pre category='hljs'>")
        });
        if(count>options.page_end){
            setHasMore(true);
        }else{
            setHasMore(false);
        }
        setNewList(list.concat(data));
    },[page]);

    const setNewList=(data)=>{
        data.map(item=>{
            item.updateTime=Moment(Number(item.update_time)).format('ll');
            return
        })
        setList(data);
    };

    const GetList=(options)=>useHttpHook({url: BlogPath.articleList, method: 'post',body:options})();

    const goDetail=(id)=>{
        Router.push({
            pathname:'/detail',
            query:{
               id
            }
        });
    };
    const getMore=()=>{
        setPage(page+1);
    };

    return (
        <div className={style.listWrapper}>
            {
                list&&list.map(item=>(
                    <Card className={style.listItem} hoverable={true}
                          key={item.id}
                          onClick={()=>goDetail(item.id)}
                          bodyStyle={{padding:'10px',width:"100%",display:'flex',flexBasis:'row'}}>
                        <div className={style.listItemLeft}>
                            <span className={style.title}>{item.title}</span>
                            <span className={style.marked}>{item.marked}</span>
                            <div className={style.articleHtml} dangerouslySetInnerHTML={{__html: item.articleHtml}}></div>
                            <div className={style.time}>
                                <span>{item.updateTime}</span>
                                <Tag className={style.tag}>{item.typeName}</Tag>
                            </div>
                        </div>
                        <div className={style.listItemRight}>
                            {
                                item.firstImg&&<img src={item.firstImg} className={style.listItemImg}/>
                            }
                        </div>

                    </Card>
                ))
            }
            {
                hasMore&&<div className={style.loadMore} onClick={getMore}>加载更多</div>
            }
        </div>
    )
};
export default List;
