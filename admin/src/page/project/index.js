import React,{useState,useEffect} from 'react';

import './index.scss'
import { Card, Col, Row,Button} from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'


const ProjectList=()=>{
    const [projectList,setProJectList]=useState([]);

    useEffect(()=>{
        const _list=[{title:'xx项目',introduce:'用于111111111111',url:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'},
            {title:'xx项目',introduce:'用于111111111111',url:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'},
            {title:'xx项目',introduce:'用于111111111111',url:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'},
            {title:'xx项目',introduce:'用于111111111111用于111111111111用于111111111111用于111111111111用于111111111111',url:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}];
        setProJectList(_list);
    },[]);
    return (
        <>
            <div className="project-wrapper">
                <Button type='primary' size="large">新建</Button>
                <Row gutter={16}  >
                    {
                        projectList&&projectList.map((item,index)=>(
                            <Col span={6} className="project-wrapper" key={item.title+index}>
                                <Card title={item.title} bordered={true} className='project-wrapper-item' hoverable={true} cover={  <img
                                    alt="example"
                                    src={item.url}
                                />}
                                      actions={
                                          [
                                              <EditOutlined key="edit" />,
                                              <DeleteOutlined key="delete" />,
                                          ]
                                      }
                                >
                                    <Card.Meta
                                        title={item.title}
                                        description={item.introduce}
                                        className='project-wrapper-item-meta'
                                    />

                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </>
    )
};


export default ProjectList;
