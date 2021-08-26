import {fromJS} from "immutable";
import * as actionCreators from './actionTypes'
import {message} from 'antd'
import {useHttpHook} from "../../../hooks";
import apiUrl from "../../../api/apiUrl";

export const addArticle=(options)=>{
  return async ()=>{
      let result=await AddArticleStatus(options);
      if(result){
          message.info('发布成功');
      }

  }
};


const AddArticleStatus=(options)=> useHttpHook({url: apiUrl.addArticle, method: 'post', body: {...options}})();
