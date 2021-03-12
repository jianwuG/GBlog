import React, {useState} from 'react';
import {Row, Col, Input,Upload,Button,Space} from "antd";
import './index.scss'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import {UserOutlined, PictureOutlined} from "@ant-design/icons";


const AddArticle = () => {
    const [title, setTitle] = useState('');//标题
    const [statusTitle, setStatusTitle] = useState('文章将自动保存草稿状态');//状态提示文字
    const [firstPic,setFirstPic]=useState('');//图片选择
    const [articleHtml ,setArticleHtml]=useState('预览内容');//html展示
    const [articleMark ,setArticleMark]=useState('');//mark内容
    const [typeName ,setTypeName] = useState(0);// 文章类别
    const { TextArea } = Input;

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        },
        gfm: true, // 允许 Git Hub标准的markdown.
        pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
        sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
        breaks: false, // 允许回车换行（该选项要求 gfm 为true）
        smartLists: true, // 使用比原生markdown更时髦的列表
        smartypants: false, // 使用更为时髦的标点
    });

    const changeContent = (e)=>{
        setArticleMark(e.target.value)
        let html = marked(e.target.value).replace(/<pre>/g, "<pre category='hljs'>")
        setArticleHtml(html)
    };


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
                    <Col span={12} className="addArticle-html-read" >
                        <div className='show-html' dangerouslySetInnerHTML={{ __html: articleHtml }} ></div>
                    </Col>
                    <Col span={12} >
                       <TextArea
                           className="addArticle-html-write"
                           rows={30}
                           value={articleMark}
                           onChange={changeContent}
                           onPressEnter={changeContent}
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
