import {fromJS} from 'immutable';
import * as ActionTypes from './actionTypes'


const defaultState = fromJS({
        list: [],
        page: 0,
        pageSize: 10,
        hasMore: false,
        lastId: null,
        firstId: null,
        leftShow: false,
    }
);
export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SETLIST:
            return state.set('list', action.list);
        case ActionTypes.SETHASMORE:
            return state.set('hasMore', action.hasMore);
        case ActionTypes.SETPAGE:
            return state.set('page', action.page);
        case ActionTypes.SETLASTID:
            return state.set('lastId', action.id);
        case ActionTypes.SETFIRSTID:
            return state.set('firstId', action.id);
        case ActionTypes.SETLEFTSHOW:
            return state.set('leftShow',action.isShow)
        default:
            return state;
    }
}
