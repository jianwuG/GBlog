import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Card, Input, Button, Spin, Space,message} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons'
import './index.scss'

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const checkLogin = () => {
        setLoading(true);
        if(!userName){
            message.error('用户名不能为空')
            setLoading(false);
            return false;
        }
        else if(!password){
            message.error('密码不能为空');
            setLoading(false);
            return false;

        }
        else{
            setLoading(false);
            history.push('/home')
        }
    };

    return (
        <div className='login-wrapper'>
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Renun_Blog" bordered={true} className='wrapper-card'>
                    <Space direction="vertical" size={20} style={{width:"100%"}}>
                        <Input
                            id="userName"
                            size="large"
                            placeholder="请输入账号"
                            prefix={<UserOutlined/>}
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                        />
                        <Input.Password
                            id="password"
                            size="large"
                            placeholder="请输入密码"
                            prefix={<UnlockOutlined/>}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
                    </Space>
                </Card>
            </Spin>
        </div>
    )
};

export default Login;
