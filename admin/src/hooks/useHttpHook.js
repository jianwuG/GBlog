import {useState, useEffect, useCallback} from 'react'
// import './../mock'
import axios from 'axios'
import {message} from "antd";

const useHttpHook = ({
                         url,
                         method = 'post',
                         headers,
                         body = {},
                         watch = []
                     }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    async function Http () {
        setLoading(true);
        const defaultHeader = {
            'Content-type': 'application/json'
        };
        let options = method.toUpperCase() === "GET" ? undefined : {
            headers: {
                ...defaultHeader,
                headers
            },
            method,
            body: JSON.stringify(body)
        };

        return new Promise((resolve, reject) => {
            axios(url, options).then(res => {
                if(res.status===200)
                {
                    resolve(res.data.data);
                    setResult(res.data.data);
                }
                else{
                    message.error(res.errMsg);
                    reject(res.errMsg);
                }
                setLoading(false);
            }).catch(err => {
                console.log('2222222222', err);
                message.error(err);
                reject(err);
                setLoading(false);
            })
        })
    }

    useEffect(() => {
        Http();
    }, watch);
    return [loading,result]
};


export default useHttpHook;
