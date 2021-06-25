import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Button, Modal, Table} from 'antd';
import {actionCreators} from './../store'
import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    ExclamationCircleOutlined, UpOutlined, DownOutlined
} from '@ant-design/icons'
import ModalDiv from '../component/modalDiv/modalDiv'
import {tagQuery} from './../../../config/tableColumns'
import style from './index.module.scss'

const TagList = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [flagLoading, setFlagLoading] = useState(false);
    const nestedTagQuery = [
        {title: 'ID', dataIndex: 'id', key: 'id'},
        {title: '名称', dataIndex: 'name', key: 'name'},
        {title: '更新时间', dataIndex: 'updateTimeText', key: 'updateTimeText'},
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: record=> (
                <div size="middle" className={style.iconStyle}>
                    <a onClick={() => cc(record)}>
                        <EditOutlined/>
                        <span>修改</span>
                    </a>
                    <a onClick={(record) => cc(record)}>
                        <DeleteOutlined/>
                        <span>删除</span>
                    </a>
                </div>
            ),
        },
    ];
    const addTag = (type) => {
        dispatch(actionCreators.setVisible(true));
        dispatch(actionCreators.setType(type))
    };
    const cc=(record)=>{
        console.log('zzzzzzzzzzz11111111',record)
    }
    const addTagByItem = (type, item) => {
        dispatch(actionCreators.setVisible(true));
        dispatch(actionCreators.setType(type));
        dispatch(actionCreators.clickItem(item))

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
    }, []);
    useEffect(() => {
        setList(tagList.toJS())
    }, [tagList]);
    return (
        <>
            <Table
                className={style.tableItem}
                columns={tagQuery}
                loading={flagLoading}
                expandable={{
                    expandedRowRender: record => <Table columns={nestedTagQuery} dataSource={record.sunClass}
                                                        pagination={false}/>,
                    rowExpandable: record => record.sunClass.length > 0,
                }}
                rowKey="id"
                dataSource={list}
                expandRowByClick={true}
            />
        </>
    )
}

export default TagList
