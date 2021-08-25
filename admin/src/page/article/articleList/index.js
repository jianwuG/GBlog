import React, {useState,useEffect} from 'react';
import {useSelector} from "react-redux";
import moment from 'moment'
import {Row, Col, List, Skeleton, Space, Button,Image,Tag ,Table } from 'antd'
import {EditOutlined,DeleteOutlined,ToTopOutlined} from '@ant-design/icons'
import './index.scss'
import {useHttpHook} from "../../../hooks";
import apiUrl from "../../../api/apiUrl";
import style from "../../tag/list/index.module.scss";


const ArticleList = () => {
    const [articleList, setList] = useState([]);
    const [page,setPage]=useState(0);
    const [pageNum,setPageNum]=useState(10);
    const [initLoading,setInitLoading]=useState(false);
    const [loading,setLoading]=useState(false);
    const nestedTagQuery = [
        {title: '标题', dataIndex: 'title', key: 'title'},
        {title: '封面大图', dataIndex: 'firstImg', key: 'firstImg'},
        {title: '分类', dataIndex: 'typeName', key: 'typeName'},
        {title: '更新时间', dataIndex: 'create_time', key: 'create_time',render:record => (<span>{moment(record).format('YYYY/MM/DD HH:mm:ss')}</span>)},
        {title: '浏览量', dataIndex: 'read_count', key: 'read_count'},
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: record=> (
                <div size="middle" className={style.iconStyle}>
                    <a onClick={()=>{}}>
                        <EditOutlined/>
                        <span>修改</span>
                    </a>
                    <a onClick={()=>{}}>
                        <DeleteOutlined/>
                        <span>删除</span>
                    </a>
                    <a onClick={()=>{}}>
                        <ToTopOutlined/>
                        <span>置顶</span>
                    </a>
                </div>
            ),
        },
    ];

    useEffect(async ()=>{
        const options={
            page_start:page*pageNum,
            page_end:(page+1)*pageNum,
        };

        let {data,count}=await GetList(options);
        console.log('zzz',data);
        if(!(count>options.page_end)){
            setLoading(true);
        }
        setList(data);
    },[page]);

    const GetList=(options)=>useHttpHook({url: apiUrl.articleList, method: 'post',body:options})();
    return (
        <>
            <Table
                className={style.tableItem}
                columns={nestedTagQuery}
                loading={initLoading}
                rowKey="id"
                dataSource={articleList}
                expandRowByClick={true}
            />
        </>
    )
};


export default ArticleList;
