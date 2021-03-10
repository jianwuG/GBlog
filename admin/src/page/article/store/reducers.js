import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes'

const defaultState=fromJS({
    initLoading:false,
    loading:false,
    list:[{title:'文章标题111111',firstImg:'',tab:'学习',update_time:'2020-01-21 10:20:30',read_count:0},{title:'文章标题111111',tab:'学习',update_time:'2020-01-21 10:20:30',read_count:0}],
});
export default (state = defaultState,action)=>{
    switch (action.type) {
        default:
            return state;
    }
}
