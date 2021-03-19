import * as ActionCreators from './actionTypes'
import {message} from "antd";
import {fromJS} from 'immutable'
import {useHttpHook} from './../../../hooks'
import apiUrl from "../../../api/apiUrl";

export const  setVisible=(value)=>{
    return{
        type:ActionCreators.SETTAGVISIBLE,
        value
    }
};

export const addTagList= (options)=>{
    return async (dispath)=>{
        const body=await AddTag(options)();
        if(body){
            message.info('添加成功')
        }
        dispath(setVisible(false));
    }
};

export const getList=()=>{
    return async (dispatch)=>{
        const {data}=await GetTagList()();
        if(data){
            data.map(item=>{
                item.isOpen=false;
                return item;
            });
            dispatch(setList(data))
        }
    }
};

export const setList=(list)=>{
   return{
       type:ActionCreators.SETLIST,
       list:fromJS(list),
   }
};
export const setType=(value)=>{
    return{
        type:ActionCreators.SETTYPE,
        value
    }
};
export const clickItem=(item)=>{
    return{
        type:ActionCreators.CLICKITEM,
        item:fromJS(item)
    }
};


const AddTag=(options)=>useHttpHook({url: apiUrl.addTag, method: 'post',body:options});
const GetTagList=()=>useHttpHook({url: apiUrl.tagList, method: 'get'});
