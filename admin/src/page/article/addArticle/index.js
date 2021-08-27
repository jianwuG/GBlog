import React, {useState,useEffect,useRef} from 'react';
import {Row, Col, Input,Upload,Button,Space,Cascader} from "antd";
import {useSelector,useDispatch} from "react-redux";
import './index.scss'
import 'highlight.js/styles/monokai-sublime.css';
import {actionCreators} from "../../article/store";
import {actionCreators as actionCreatorsTag} from "../../tag/store";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const AddArticle = () => {
    const [title, setTitle] = useState('');//标题
    const [statusTitle, setStatusTitle] = useState('文章将自动保存草稿状态');//状态提示文字
    const [firstPic,setFirstPic]=useState('');//图片选择
    const [articleHtml ,setArticleHtml]=useState('预览内容');//html展示
    const [articleMark ,setArticleMark]=useState('');//mark内容
    const [typeName ,setTypeName] = useState(0);// 文章类别

    const [option,setOption]=useState(null);
    const { TextArea } = Input;
    const dispatch=useDispatch();
    const optionRef=useRef();
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const  handleEditorChange=({ html, text }) =>{
        console.log('handleEditorChange', html, text);
    }
    const getOptionValue=(value)=>{
        const _firstValue=value[0];
        const _selectValue=value[1];
        let _selectItem;
        const _selectFirstItem=newTagList.find(item=>item.name===_firstValue);

        if(_selectFirstItem){
            _selectItem= _selectFirstItem.sunClass&&_selectFirstItem.sunClass.find(item=>item.value=_selectValue)
        }

        return _selectItem.id
    };

    const addArticle=async ()=>{
       const option={
           title,
           firstPic:'',
           mark:articleMark,
           type:getOptionValue(optionRef.current.state.value),
           status:0,
           create_time:new Date().getTime(),
           update_time:new Date().getTime(),
       };
        dispatch(actionCreators.addArticle(option))
    };

    const {tagList}=useSelector(state=>({
        tagList: state.getIn(['tag', 'tagList']),
    }));
    const [newTagList,setNewTagList]=useState([]);

    useEffect(() => {
        dispatch(actionCreatorsTag.getList())
    }, []);

    useEffect(()=>{
        let _list=tagList.toJS();
        let _newList=[..._list];
        _newList.map((item,index)=>{
            item.value=item.name;
            item.label=item.name;
            if(item.sunClass){
                item.children=[...item.sunClass];
            }
            item.children&&item.children.map(sonItem=>{
                sonItem.value=sonItem.name;
                sonItem.label=sonItem.name;
            })
        });
        setNewTagList(_newList);

    },[tagList]);

    return (
        <>
            <div className='addArticle-wrapper'>
                <Row className='addArticle-header'>
                    <Col span={2} style={{textAlign:'center',cursor: "pointer"}} onClick={setFirstPic}>
                        <Cascader
                            options={newTagList}
                            ref={optionRef}
                        />
                    </Col>
                    <Col span={17}>
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
                           <Button type="primary" className='addArticle-btn-release' onClick={addArticle}>发布</Button>
                       </Space>
                    </Col>
                </Row>
                <Row className="addArticle-html" gutter={10}>
                    <MdEditor style={{ height: '100%',width:'100%' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                </Row>
            </div>
        </>
    )
};

export default AddArticle;
