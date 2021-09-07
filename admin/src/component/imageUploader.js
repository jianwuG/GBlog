import {Modal, Upload, message} from "antd";
import React, {useEffect, useState} from "react";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import oss from 'ali-oss';
import dayjs from 'dayjs';

const Crypto = require('crypto');
const defaultOSs={
    dir :'blog/',
    secret:'',
    accessid:'',
    host:'',
    time:new Date(new Date().getTime() + 30000)
}

const ImageUploader = (props) => {

    const [fileList] = useState([]);
    const [OSSData, setOssData] = useState({});
    const [previewImage] = useState('');
    const [previewTitle] = useState('');
    const [previewVisible] = useState(false);
    const [loading] = useState(false);

    useEffect(() => {
        setOssData(mockGetOSSData())
    }, [])
    const mockGetOSSData = () => {
        const {dir,time,secret,accessid,host}=defaultOSs
        let policyObj = {
            "expiration": time,
            "conditions": [
                // 文件大小
                ["content-length-range", 0, 1048576000],
                ["starts-with", "$key", dir]
            ]
        }
        let policy = base64Encode(JSON.stringify(policyObj))
        let signature = Crypto.createHash('md5').update(secret).digest('hex')
        return {
            dir,
            accessid,
            host,
            policy,
            expire: time,
            signature
        }
    }
    const base64Encode = (input) => {
        let rv;
        rv = encodeURIComponent(input);
        rv = unescape(rv);
        rv = window.btoa(rv);
        return rv;
    }

    const handlePreview = () => {

    }
    const handleChange = (file) => {
        console.log('zzzzzzzz', file)

    }
    const beforeUpload = async (file) => {
        const expire = OSSData.expire * 1000;

        if (expire < Date.now()) {
            // await this.init();
        }

        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const filename = Date.now() + suffix;
        file.url = OSSData.dir + filename;

        return file;

    }
    const onRemove = async file => {
        const {value, onChange} = this.props;

        const files = value.filter(v => v.url !== file.url);

        if (onChange) {
            onChange(files);
        }
    }
    const getExtraData = (file) => {

        return {
            key: file.url,
            OSSAccessKeyId: OSSData.accessId,
            policy: OSSData.policy,
            Signature: OSSData.signature,
        };

    }
    const handleCancel = () => {

    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                name="file"
                action={OSSData.host}
                listType="picture-card"
                fileList={fileList}
                onPreview={(file) => {
                    handlePreview(file)
                }}
                onChange={(info) => {
                    handleChange(info)
                }}
                onRemove={(info) => {
                    onRemove(info)
                }}
                beforeUpload={(info) => {
                    beforeUpload(info)
                }}
                data={(file) => {
                    getExtraData(file)
                }}
            >
                {(fileList?.length < props?.maxLength) && uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => {
                    handleCancel()
                }}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    )
}


export default ImageUploader

