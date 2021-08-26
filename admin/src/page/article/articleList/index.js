import React, {useState,useEffect} from 'react';
import moment from 'moment'
import {Table } from 'antd'
import './index.scss'
import {useHttpHook,useList} from "../../../hooks";
import apiUrl from "../../../api/apiUrl";
import style from "../../tag/list/index.module.scss";


const ArticleList = () => {
    const [articleList, setList] = useState([]);
    const {pagination,changePage,setPagination}= useList()
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
            render: (record,text)=> (
                <div size="middle" className={style.iconStyle}>
                    <a onClick={()=>{console.log('1111111',text)}}>
                        <span>修改</span>
                    </a>
                    <a onClick={()=>{}}>
                        <span>删除</span>
                    </a>
                    <a onClick={()=>{}}>
                        <span>置顶</span>
                    </a>
                </div>
            ),
        },
    ];

    useEffect(async ()=>{
        const {pageSize,current} = pagination
        const options={
            page_start:pageSize*(current-1),
            page_end:current*pageSize,
        };
        setLoading(true);
        const {data,count}=await GetList(options);
        const _pagination={...pagination};
        _pagination.total = count
        setPagination(_pagination);
        setList(data);
        setLoading(false);
    },[pagination.current,pagination.pageSize]);

    const GetList=(options)=>useHttpHook({url: apiUrl.articleList, method: 'post',body:options})();
    return (
        <>
            <Table
                className={style.tableItem}
                columns={nestedTagQuery}
                loading={loading}
                rowKey="id"
                pagination={pagination}
                dataSource={articleList}
                expandRowByClick={true}
                onChange={changePage}
            />
        </>
    )
};


export default ArticleList;
