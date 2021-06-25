import React, {useState,useEffect} from 'react';
import {useSelector} from "react-redux";
import Monent from 'moment'
import {Row, Col, List, Skeleton, Space, Button,Image,Tag ,Table } from 'antd'
import {EditOutlined,DeleteOutlined,ToTopOutlined} from '@ant-design/icons'
import './index.scss'
import {useHttpHook} from "../../../hooks";
import apiUrl from "../../../api/apiUrl";


const ArticleList = () => {
    const [articleList, setList] = useState([]);
    const [page,setPage]=useState(0);
    const [pageNum,setPageNum]=useState(10);
    const [initLoading,setInitLoading]=useState(false);
    const [loading,setLoading]=useState(false);

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


    const onLoadMore=()=>{
        setPage(page+1);
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    return (
        <>
            <List
                loading={initLoading}
                loadMore={loadMore}
                header={
                <Row className="list-div" wrap="true" justify="center " style={{borderBottom:"1px solid #ddd"}}>
                    <Col span={7}>
                        <b>标题</b>
                    </Col>
                    <Col span={4}>
                        <b>封面大图</b>
                    </Col>
                    <Col span={3}>
                        <b>分类</b>
                    </Col>
                    <Col span={3}>
                        <b>更新时间</b>
                    </Col>
                    <Col span={3}>
                        <b>浏览量</b>
                    </Col>

                    <Col span={4}>
                        <b>操作</b>
                    </Col>
                </Row>
            }
                  bordered
                  dataSource={articleList}
                  renderItem={item => (
                      <List.Item className="list-item" style={{borderBottom:"1px solid #ddd"}} key={item.title}>
                          <Skeleton avatar title={false} loading={item.loading} active>
                              <Row className="list-div" wrap="true" justify="center" align="middle" >
                                  <Col span={7}>
                                     {item.title}
                                  </Col>
                                  <Col span={4}>
                                      {
                                          item.firstImg?<Image src={item.firstImg} />:null
                                      }
                                  </Col>
                                  <Col span={3} className='list-item-tag'>
                                      <Tag>{item.tab}</Tag>
                                  </Col>
                                  <Col span={3}>
                                     {item.update_time_text}
                                  </Col>
                                  <Col span={3}>
                                     {item.read_count||0}
                                  </Col>

                                  <Col span={4}>
                                      <Space direction='vertical' size={[2,4]}>
                                          <Button type="link" size='small' shape="round" icon={<EditOutlined/>}>修改</Button>
                                          <Button type="link"  danger size='small' shape="round" icon={<DeleteOutlined />}>删除 </Button>
                                          <Button type="link" size='small' shape="round" icon={<ToTopOutlined />}>置顶 </Button>
                                      </Space>
                                  </Col>
                              </Row>
                          </Skeleton>
                      </List.Item>
                  )}

            >
            </List>

        </>
    )
};


export default ArticleList;
