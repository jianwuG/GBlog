import React, {useState,useRef,useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {actionCreators} from './../store'

import {Modal, Form, Input} from "antd";
import style from './index.module.scss'


const ModalDiv = () => {
    const {visible, type,clickItem} = useSelector(state => ({
        visible: state.getIn(['tag', 'visible']),
        type: state.getIn(['tag', 'type']),
        clickItem: state.getIn(['tag', 'clickItem']),
    }));
    const [title,setTitle]=useState('');
    const [labelValue,setLabelValue]=useState('');

    useEffect(()=>{
        let _title='',_labelValue='';
        switch (type) {
            case 1:
                _title='新建一级分类';
                _labelValue='一级分类';
                break;
            case 2:
                _title='新建二级分类';
                _labelValue='二级分类';

                break;
            default:
                return ;
        }
        setTitle(_title);
        setLabelValue(_labelValue);
    },[type]);

    const firstRef=useRef();

    const dispatch = useDispatch();

    const handleOk = async () => {
        const options={
            name:firstRef.current.state.value,
            p_id:0,
            create_time:new Date().getTime(),
            update_time:new Date().getTime(),
        };
       await dispatch(actionCreators.addTagList(options))
    };
    const handleCancel = () => {
        dispatch(actionCreators.setVisible(false))
    };
    return (
        <>
            <Modal
                title={title}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <>
                    <Form name="basic" >
                        {
                            <Form.Item
                                label={labelValue}
                                name='firstClass'
                                rules={[{required: true, message: 'Please input your firstClass!'}]}
                            >
                                <Input type='text'  ref={firstRef}  />
                            </Form.Item>
                        }
                    </Form>
                </>

            </Modal>
        </>
    )
}

export default ModalDiv;
