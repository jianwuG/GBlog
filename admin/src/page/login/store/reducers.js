import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes'

const defaultState=fromJS({
    useName:'',
    passWord:'',
    isLoading:false,

});
export default (state = defaultState,action)=>{
    switch (action.type) {
        default:
            return state;
    }
}
