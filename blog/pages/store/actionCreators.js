import {useHttpHook} from "../hooks";
import BlogPath from "../api/apiUrl";
import {fromJS} from 'immutable';
import * as ActionTypes from './actionTypes'
import marked from 'marked'
import 'highlight.js/styles/monokai-sublime.css';
import Moment from 'moment'

export const setList = (options,list = []) => {
    return async (dispatch) => {
        let {data, count} = await GetList(options);
        data.map(item => {
            item.articleHtml = marked(item.mark.substring(0, 100)).replace(/<pre>/g, "<pre category='hljs'>")
            item.updateTime = Moment(Number(item.update_time)).format('ll');

        });
        dispatch(setListInfo(list.concat(data)));
        dispatch(setMore(count>options.page_end));
        console.log('zzzzzzzzz', data, count,list);
    }
};

export const setListInfo = (data) => {
    return {
        type: ActionTypes.SETLIST,
        list: fromJS(data)
    }
};
export const setMore = (hasMore) => {
    return {
        type: ActionTypes.SETHASMORE,
        hasMore
    }
};
export const setPage=(page)=>{
    return{
        type:ActionTypes.SETPAGE,
        page
    }
};
export const setLastId=(id)=>{
    return{
        type:ActionTypes.SETLASTID,
        id
    }
};
export const setFirstId=(id)=>{
    return{
        type:ActionTypes.SETFIRSTID,
        id
    }
};
export const setLeftShow=(isShow)=>{
    return{
        type:ActionTypes.SETLEFTSHOW,
        isShow
    }
}

export const initData=(option)=>{
    return (dispatch)=>{
        dispatch(setFirstId(null));
        dispatch(setLastId(null));
        dispatch(setPage(0));
        dispatch(setList(option,[]));
    }
};
const GetList = (options) => useHttpHook({url: BlogPath.articleList, method: 'post', body: options})();
