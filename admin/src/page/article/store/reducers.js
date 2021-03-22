import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes'

const defaultState=fromJS({
    initLoading:false,
    loading:false,
    list:[],
});
export default (state = defaultState,action)=>{
    switch (action.type) {
        default:
            return state;
    }
}
