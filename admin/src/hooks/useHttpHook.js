// import {useState, useEffect, useCallback} from 'react'
// import './../mock'
import {message} from "antd";

export const  useHttpHook= ({url, method = 'post', body = {},watch = []},headers) => {

    // const [result, setResult] = useState(null);
    // const [loading, setLoading] = useState(true);

    const Http=async ()=>{
        // setLoading(true);
        const defaultHeader={
            'Content-Type':'application/JSON'
        };
        let params;
        if(method.toUpperCase()==='GET'){
            params=undefined
        }
        else{
            params={
                headers:{
                    ...defaultHeader,
                    ...headers
                },
                method,
                body:JSON.stringify(body)
            }
        }
        return new Promise((resolve,reject)=>{
            fetch(url,params).then(res=>res.json()).then(res=>{
                if(res.status===200)
                {
                    resolve(res.data);
                    // setResult(res.data);
                }
                else{
                    message.error(res.msg)
                    reject(res.msg)
                }
            }).catch(err=>{
                message.error(err);
                reject(err);
            }).finally(()=>{
                // setLoading(false)
            })
        })
    }
    //
    // useEffect(  () => {
    //     Http();
    // }, watch);

    return Http
};


