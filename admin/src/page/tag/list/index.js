import React, {useEffect,useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Button, Modal} from 'antd';
import {actionCreators} from './../store'
import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    ExclamationCircleOutlined, UpOutlined, DownOutlined
} from '@ant-design/icons'
import ModalDiv from './../component/modalDiv'
import style from './index.module.scss'

const TagList = () => {
    const dispatch = useDispatch();
    const [list,setList]=useState([]);

    const {visible, tagList} = useSelector(state => ({
        visible: state.getIn(['tag', 'visible']),
        tagList: state.getIn(['tag', 'tagList']),
    }));
    useEffect(() => {
        dispatch(actionCreators.getList())
    }, []);
    useEffect(()=>{
        setList(tagList.toJS())
    },[tagList]);

    const openItem=(id)=>{
        let _list=[...list];
        _list.map(item=>{
            if(item.id===id){
                item.isOpen=!item.isOpen;
            }
        });
        setList(_list);
    };
    const addTag = (type) => {
        dispatch(actionCreators.setVisible(true));
        dispatch(actionCreators.setType(type))
    };
    const addTagByItem = (type, item) => {
        dispatch(actionCreators.setVisible(true));
        dispatch(actionCreators.setType(type));
        dispatch(actionCreators.clickItem(item))

        console.log('00000000000000', item);
    };
    const changeTagByItem = (item) => {
        dispatch(actionCreators.clickItem(item))
        console.log('111111111111111', item);
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
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return (
        <>
            <Button type='primary' size='large' onClick={() => addTag(1)}>新建一级</Button>

            {
                list &&
                <div className={style.tagWrapper}>
                    {
                        list.map(item => (
                           <div className={style.tagItem}>
                               <div key={item.id} className={style.tagItemTitle} onClick={()=>openItem(item.id)}>
                                   <div>
                                       {
                                           item.isOpen ? <UpOutlined style={{marginRight: "20px"}}/>
                                               : <DownOutlined style={{marginRight: "20px"}}/>

                                       }
                                       {item.name}
                                   </div>
                                   <div>
                                       <PlusOutlined className={style.iconItem}
                                                     onClick={() => addTagByItem(2, item)}/>
                                       <EditOutlined className={style.iconItem}
                                                     onClick={() => changeTagByItem(item)}
                                       />
                                       <DeleteOutlined className={style.iconItem}
                                                       onClick={() => deleteTagItem(item.id)}
                                       />
                                   </div>

                               </div>
                               {
                                   item.isOpen &&
                                   <div>

                                   </div>
                               }
                           </div>
                        ))
                    }
                </div>

            }

            {
                visible && <ModalDiv/>
            }
        </>
    )
};


export default TagList;
