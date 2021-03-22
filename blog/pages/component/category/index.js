import React,{useState,useEffect} from 'react'
import {Card,Space} from 'antd'
import style from './index.module.scss'
import {useHttpHook} from "../../hooks";
import BlogPath from "../../api/apiUrl";

const Category = () => {
    const [list,setList]=useState([]);
    useEffect(async ()=>{
        const {data}=await GetList();
       setList(data)
    },[]);
    const GetList=()=>useHttpHook({url: BlogPath.getFirstTag, method: 'get'})();
    return (
        <>
            <Space size={[6,12]} className={style.cateGoryWrapper} wrap>
                {
                    list&&list.map(item=>(
                        <Card key={item.id} className={style.cateGoryItem}>
                            {item.name}
                        </Card>
                    ))
                }
            </Space>

        </>
    )
};
export default Category;
