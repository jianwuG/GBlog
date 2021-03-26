import {message} from "antd";

const useHttpHook = ({url, method = 'post', body = {},watch = []},headers) => {
    const Http=async ()=>{
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
                }
                else{
                    message.error(res.msg)
                    reject(res.msg)
                }
            }).catch(err=>{
                reject(err);
            }).finally(()=>{
            })
        })
    }

    return Http
};


export default useHttpHook;
