import {Modal, Input, Form} from "antd";
import React, {useState} from "react";
import ImageUploader from "../../../../component/imageUploader";
import {useHistory} from "react-router-dom";

const CreateArticle = (props) => {
    const {visible, changeVisible} = props
    const [maxLength]=useState(3)
    const history = useHistory();
    const handleClick=()=>{
        history.push('/article/addArticle')
    }
    return (
        <>
            <Modal
                title="新建文章"
                centered
                visible={visible}
                ok-text="确认"
                cancel-text="取消"
                onOk={() => handleClick()}
                onCancel={() => changeVisible(false)}
                width={400}>
                <Form
                    name="basic"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    initialValues={{remember: true}}
                >
                    <Form.Item
                        label="文章标题"
                        name="articleName"
                        rules={[{required: true, message: '文章名称必填!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="首图"
                        name="articleName"
                    >
                        <ImageUploader maxLength={3}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}


export default CreateArticle
