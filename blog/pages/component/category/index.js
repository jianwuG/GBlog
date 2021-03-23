import React,{useState,useEffect} from 'react'
import {Card,Space} from 'antd'
import style from './index.module.scss'
import {useHttpHook} from "../../hooks";
import BlogPath from "../../api/apiUrl";
import * as ActionCreators from "../../store/actionCreators";
import {useDispatch} from "react-redux";

const Category = () => {
    const [list,setList]=useState([]);
    let dispatch=useDispatch();

    useEffect(async ()=>{
        const {data}=await GetList();
       setList(data)
    },[]);
    const clickTag=(id)=>{
        dispatch(ActionCreators.setFirstId(id))

    };
    const GetList=()=>useHttpHook({url: BlogPath.getFirstTag, method: 'get'})();
    return (
        <>
            <Space size={[6,12]} className={style.cateGoryWrapper} wrap>
                {
                    list&&list.map(item=>(
                        <Card key={item.id} className={style.cateGoryItem} onClick={()=>clickTag(item.id)}>
                            {item.name}
                        </Card>
                    ))
                }
            </Space>

        </>
    )
};
export default Category;
