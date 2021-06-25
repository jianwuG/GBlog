import * as ActionCreators from './actionTypes'
import {message} from "antd";
import {fromJS} from 'immutable'
import {useHttpHook} from './../../../hooks'
import apiUrl from "../../../api/apiUrl";
import dayjs from 'dayjs'

//设置是否显示编辑弹窗
export const setVisible = (value) => {
    return {
        type: ActionCreators.SETTAGVISIBLE,
        value
    }
};
//新增分类
export const addTagList = (options) => {
    return async (dispatch) => {
        const body = await AddTag(options)();
        if (body) {
            message.info('添加成功')

            dispatch(getList());
        }
        dispatch(setVisible(false));
    }
};
//获取分类列表
export const getList = () => {
    return async (dispatch) => {
        const {data} = await GetTagList()();
        if (data) {
            data&&data.map(item => {
                item.isOpen = false;
                item.createTimeText=dayjs(item.create_time).format('YYYY/MM/DD')
                item.updateTimeText=dayjs(item.update_time).format('YYYY/MM/DD HH:mm:ss')
                item.sunClass&&item.sunClass.map(sunItem=>{
                    sunItem.createTimeText=dayjs(sunItem.create_time).format('YYYY/MM/DD')
                    sunItem.updateTimeText=dayjs(sunItem.update_time).format('YYYY/MM/DD HH:mm:ss')
                })
                return item;
            });
            dispatch(setList(data))
        }
    }
};
//设置分类列表
export const setList = (list) => {
    return {
        type: ActionCreators.SETLIST,
        list: fromJS(list),
    }
};
//设置当前操作类型
export const setType = (value) => {
    return {
        type: ActionCreators.SETTYPE,
        value
    }
};
//当前编辑分类
export const clickItem = (item) => {
    return {
        type: ActionCreators.CLICKITEM,
        item: fromJS(item)
    }
};

//删除分类
export const deleteItem = (id) => {
    return async (dispatch) => {
        const data = await DeleteTag({id: id})();
        if (data) {
            message.info('删除成功');
            dispatch(getList());
        }
    }
};
export const editItem=(item)=>{
    return async (dispatch)=>{
        const data = await EditTag(item)();
        if (data) {
            message.info(data.msg);
            dispatch(getList());
        }
        dispatch(setVisible(false));

    }
};


const AddTag = (options) => useHttpHook({url: apiUrl.addTag, method: 'post', body: options});
const DeleteTag = (options) => useHttpHook({url: apiUrl.deleteTag, method: 'post', body: options});
const EditTag = (options) => useHttpHook({url: apiUrl.editTag, method: 'post', body: options});
const GetTagList = () => useHttpHook({url: apiUrl.tagList, method: 'get'});
