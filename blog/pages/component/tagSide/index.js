import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Tag} from 'antd'
import style from './index.module.scss'
import {useHttpHook} from "../../hooks";
import BlogPath from "../../api/apiUrl";
import * as ActionCreators from './../../store/actionCreators'

const TagSide = () => {
    const [list,setList]=useState([])
    const tagColorList=['#f50','#2db7f5','#87d068','#108ee9'];
    const dispatch=useDispatch();
    useEffect(async ()=>{
        const {data}=await GetList();
        data.map((item,index)=>{
            let _color='';
            switch (index%4) {
                case 0:
                    _color=tagColorList[0];break;
                case 1:
                    _color=tagColorList[1];break;
                case 2:
                    _color=tagColorList[2];break;
                case 3:
                    _color=tagColorList[3];break;
                default:
                    return;
            }
            item.tagColor=_color;
        });
        setList(data)
    },[]);
    const clickTag=(id)=>{
        dispatch(ActionCreators.setLastId(id))
    };
    const GetList=()=>useHttpHook({url: BlogPath.getLastTag, method: 'get'})();
    return (
        <div className={style.tagSideWrapper}>
            {
                list&&list.map(item=>(
                    <Tag color={item.tagColor}
                         key={item.id}
                         className={style.tagItem}
                         onClick={()=>clickTag(item.id)}
                    >{item.name}</Tag>
                ))
            }
        </div>
    )
};
export default TagSide;
