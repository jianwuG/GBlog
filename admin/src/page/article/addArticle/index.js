import React, {useState} from 'react';
import {Row, Col, Input,Upload,Button,Space} from "antd";
import './index.scss'
import {UserOutlined, PictureOutlined} from "@ant-design/icons";


const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [statusTitle, setStatusTitle] = useState('文章将自动保存草稿状态');
    const [firstPic,setFirstPic]=useState('');
    const { TextArea } = Input



    return (
        <>
            <div className='addArticle-wrapper'>
                <Row className='addArticle-header'>
                    <Col span={1} style={{textAlign:'center',cursor: "pointer"}} onClick={setFirstPic}>
                        <Upload >
                            <Button className='addArticle-upload' icon={<PictureOutlined />}></Button>
                        </Upload>
                    </Col>
                    <Col span={18}>
                        <Input className='addArticle-input'
                               placeholder="输入文章标题。。。"
                               maxLength='40'
                               onChange={(e) => {
                                   setTitle(e.target.value)
                               }}/>
                        <span className='addArticle-statusTitle'>{statusTitle}</span>
                    </Col>
                    <Col span={5} className='addArticle-btn'>
                       <Space size={[16,20]}>
                           <Button type="primary" className='addArticle-btn-draft'>草稿箱</Button>
                           <Button type="primary" className='addArticle-btn-release'>发布</Button>
                       </Space>
                    </Col>
                </Row>
                <Row className="addArticle-html" gutter={10}>
                    <Col span={12} className="addArticle-html-read">

                    </Col>
                    <Col span={12} >
                       <TextArea
                           className="addArticle-html-write"
                           rows={35}
                           placeholder="文章内容"
                       >

                       </TextArea>
                    </Col>
                </Row>
            </div>
        </>
    )
};


export default AddArticle;
