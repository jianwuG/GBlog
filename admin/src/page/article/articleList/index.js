import React, {useState} from 'react';
import {Row, Col, List} from 'antd'
import ArticleItem from './../articleItem'

import './index.scss'


const ArticleList = () => {
    const [list, setList] = useState([{title:'文章标题111111',tab:'学习',update_time:'2020-01-21 10:20:30',read_count:0}])
    return (
        <>
            <List header={
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
                        <b>操作</b>
                    </Col>
                </Row>
            }
                  bordered
                  dataSource={list}
                  renderItem={item => (
                      <List.Item className="list-item">
                          <ArticleItem/>
                      </List.Item>
                  )}

            >
            </List>

        </>
    )
};


export default ArticleList;
