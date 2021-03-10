import {combineReducers} from 'redux-immutable';
import {reducers as ArticleReducers} from './../page/article/store'
import {reducers as LoginReducers} from './../page/login/store'
import {reducers as ProjectReducers} from './../page/project/store'
import {reducers as tagReducer} from './../page/tag/store'


export default combineReducers({
    article:ArticleReducers,
    login:LoginReducers,
    project:ProjectReducers,
    tag:tagReducer
})
