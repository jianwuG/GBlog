import React,{useState,useEffect} from 'react';
import Router from 'next/router'
import {Card,Tag} from 'antd'
import Moment from 'moment'

import style from './index.module.scss'
import {useHttpHook} from "./../../hooks";
import BlogPath from "../../api/apiUrl";

const List = () => {
    const [list,setList]=useState([]);
    const [page,setPage]=useState(0);
    const [pageSize,setPageSize]=useState(10);
    useEffect(async ()=>{
        const options={
            page_start:page*pageSize,
            page_end:(page+1)*pageSize
        };

        const {data,count}=await GetList(options);
        setNewList(data);
        console.log('11111111111111111111111111111',data);
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
                            <div className={style.time}>
                                <span>{item.updateTime}</span>
                                <Tag className={style.tag}>{item.tab}</Tag>
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
        </div>
    )
};
export default List;
