import React from 'react';
import './index.scss'
import {Col, Row,Button,Space} from "antd";

const ArticleItem = () => {
    return (
        <>
            <Row className="list-div">
                <Col span={8}>
                    <b>标题</b>
                </Col>
                <Col span={4}>
                    <b>分类</b>
                </Col>
                <Col span={4}>
                    <b>更新时间</b>
                </Col>
                <Col span={4}>
                    <b>浏览量</b>
                </Col>

                <Col span={4}>
                    <Space direction='vertical'>
                        <Button type="primary" >修改</Button>
                        <Button >删除 </Button>
                        <Button >置顶 </Button>
                    </Space>
                </Col>
            </Row>
        </>
    )
};

export default ArticleItem;
