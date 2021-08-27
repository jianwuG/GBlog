import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Button, Modal, Table} from 'antd';
import {actionCreators} from './../store'
import {
    ExclamationCircleOutlined
} from '@ant-design/icons'
import style from './index.module.scss'
import {useList} from "../../../hooks";
import ModalDiv from '../component/modalDiv/modalDiv'
const TagList = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [flagLoading, setFlagLoading] = useState(false);
    const {pagination,changePage}= useList()

    const nestedTagQuery = [
        {title: 'ID', dataIndex: 'id', key: 'id'},
        {title: '名称', dataIndex: 'name', key: 'name'},
        {title: '更新时间', dataIndex: 'updateTimeText', key: 'updateTimeText'},
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (record,text)=> (
                <div size="middle" className={style.iconStyle}>
                    <a onClick={() => changeTagByItem(4,text)}>
                        <span>修改</span>
                    </a>
                    <a onClick={(record) => deleteTagItem(text.id)}>
                        <span>删除</span>
                    </a>
                </div>
            ),
        },
    ];
    const  tagQuery=[
        { title: 'ID', dataIndex: 'id', key: 'id',className:'color-red'},
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '创建时间', dataIndex: 'createTimeText', key: 'createTimeText' },
        { title: '更新时间', dataIndex: 'updateTimeText', key: 'updateTimeText' },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (record,text)=> (
                <div size="middle" className={style.iconStyle}>
                    <a onClick={(e) => addTagByItem(2,text,e)}>
                        <span>增加</span>
                    </a>
                </div>
            ),
        },
    ];
    const addTagByItem = (type,item,e) => {
        if(item){
            e.stopPropagation()
            dispatch(actionCreators.clickItem(item))
        }
        dispatch(actionCreators.setVisible(true));
        dispatch(actionCreators.setType(type));
    };
    const changeTagByItem = (type,item) => {
        dispatch(actionCreators.setVisible(true));
        dispatch(actionCreators.clickItem(item))
        dispatch(actionCreators.setType(type));

    };
    const deleteTagItem = (id) => {
        Modal.confirm({
            title: '是否删除改分类',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                dispatch(actionCreators.deleteItem(id))
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    };
    const {visible, tagList} = useSelector(state => ({
        visible: state.getIn(['tag', 'visible']),
        tagList: state.getIn(['tag', 'tagList']),
    }));
    useEffect(() => {
        setFlagLoading(true)
        dispatch(actionCreators.getList())
        setFlagLoading(false)
    }, [pagination.current,pagination.pageSize]);
    useEffect(() => {
        setList(tagList.toJS())
    }, [tagList]);
    return (
        <>
            <Button type="primary" onClick={()=>addTagByItem(1)}>增加一级分类</Button>
            <Table
                className={style.tableItem}
                columns={tagQuery}
                loading={flagLoading}
                pagination={pagination}
                expandable={{
                    expandedRowRender: record => <Table columns={nestedTagQuery}
                                                        rowKey="id"
                                                        dataSource={record.sunClass}
                                                        pagination={false}/>,
                    rowExpandable: record => record.sunClass.length > 0,
                }}
                rowKey="id"
                dataSource={list}
                expandRowByClick={true}
                onChange={changePage}
            />
            {
                visible && <ModalDiv/>
            }
        </>
    )
}

export default TagList
