import {Modal, Upload,message} from "antd";
import React, {useEffect, useState} from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import oss from 'ali-oss';
import dayjs from 'dayjs';

const ImageUploader = (props) => {

    const [fileList, setFileList] = useState([]);
    const [OSSData, setOssData] = useState({});
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const  init = async () => {
        try {
            const OSSData = await mockGetOSSData();

            this.setState({
                OSSData,
            });
        } catch (error) {
            message.error(error);
        }
    };
    const mockGetOSSData = () => {
        let policyText = {
            expiration: "2020-12-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            conditions: [
                ["content-length-range", 0, 1048576000], // 设置上传文件的大小限制
            ],
        };
        let accesskey = "你自己的"; //不要泄露
        let policyBase64 = Base64.encode(JSON.stringify(policyText));
        let message = policyBase64;
        let bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true });
        let signature = Crypto.util.bytesToBase64(bytes);

        return {
            dir: "user-dir/", //bucket中的路径
            expire: "0", //有效时间戳'1577811661',
            host: "http://om-test-oss.oss-cn-beijing.aliyuncs.com",
            accessId: "你自己的",
            policy: policyBase64, //you
            signature: signature,
        };
    };
    const handleCancel=()=>{

    }
    const handlePreview=()=>{}
    const handleChange=()=>{}
    const beforeUpload=async ()=>{
        const { OSSData } = this.state;
        const expire = OSSData.expire * 1000;

        if (expire < Date.now()) {
            await this.init();
        }
        return true;
    }
    const  getExtraData = file => {
        return {
            key: file.url,
            OSSAccessKeyId: OSSData.accessId,
            policy: OSSData.policy,
            Signature: OSSData.signature,
        };
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                name="file"
                action={OSSData.host}
                listType="picture-card"
                fileList={fileList}
                onPreview={(file)=>{handlePreview(file)}}
                onChange={(info)=>{handleChange(info)}}
                beforeUpload={(info)=>{beforeUpload(info)}}
                data={(file)=>{getExtraData(file)}}
            >
                {(fileList?.length < props?.maxLength) && uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={()=>{handleCancel()}}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}


export default ImageUploader

