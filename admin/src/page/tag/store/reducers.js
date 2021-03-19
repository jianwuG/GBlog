import {fromJS} from 'immutable';
import * as ActionCreators from "./actionTypes";
// import * as actionTypes from './actionTypes'

const defaultState=fromJS({
    visible:false,
    tagList:[],
    type:1, //1 一级分类添加 2 二级分类添加
    clickItem:{},
});
export default (state = defaultState,action)=>{
    switch (action.type) {
        case ActionCreators.SETTAGVISIBLE:
            return state.set('visible',action.value);
        case ActionCreators.SETLIST:
            return state.set('tagList',action.list);
        case ActionCreators.SETTYPE:
            return state.set('type',action.value);
        case ActionCreators.CLICKITEM:
            return state.set('clickItem',action.item);
        default:
            return state;
    }
}
