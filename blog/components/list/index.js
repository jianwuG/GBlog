import React, { useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Router from 'next/router'
import {Card, Tag} from 'antd'
import style from './index.module.scss'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import * as ActionCreators from '../../store/actionCreators'

const List = () => {
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        },
        gfm: true, // 允许 Git Hub标准的markdown.
        pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
        sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
        breaks: false, // 允许回车换行（该选项要求 gfm 为true）
        smartLists: true, // 使用比原生markdown更时髦的列表
        smartypants: false, // 使用更为时髦的标点
    });

    const {page, pageSize, hasMore, list, lastId, firstId} = useSelector(state => (
        {
            page: state.get('page'),
            pageSize: state.get('pageSize'),
            hasMore: state.get('hasMore'),
            list: state.get('list').toJS(),
            lastId: state.get('lastId'),
            firstId: state.get('firstId'),
        }
    ),);
    let dispatch = useDispatch();

    useEffect(async () => {
        const options = {
            page_start: page * pageSize,
            page_end: (page + 1) * pageSize
        };
        if (lastId) {
            options.where = {type: lastId};
        } else {
            delete options.where
        }
        const _list = page===0?[]:list;
        dispatch(ActionCreators.setList(options, _list));
    }, [page]);


    useEffect(async () => {
        if (lastId) {
            dispatch(ActionCreators.setPage(0))
            const options = {
                page_start: 0,
                page_end: pageSize,
                where: {
                    type: lastId
                }
            };
            dispatch(ActionCreators.setList(options, []));
        }
    }, [lastId]);


    const goDetail = (id) => {
        Router.push({
            pathname: '/detail',
            query: {
                id
            }
        });
    };
    const getMore = () => {
        dispatch(ActionCreators.setPage(page + 1));
    };

    return (
        <div className={style.listWrapper}>
            {
                list && list.map(item => (
                    <Card className={style.listItem} hoverable={true}
                          key={item.id + item.title}
                          onClick={() => goDetail(item.id)}
                          bodyStyle={{ width: "100%", display: 'flex', flexBasis: 'row'}}>
                        <div className={style.listItemLeft}>
                            <span className={style.title}>{item.title}</span>
                            <span className={style.marked}>{item.marked}</span>
                            <div className={style.articleHtml}
                                 dangerouslySetInnerHTML={{__html: item.articleHtml}}></div>
                            <div className={style.time}>
                                <span>{item.updateTime}</span>
                                <Tag className={style.tag}>{item.typeName}</Tag>
                            </div>
                        </div>
                        <div className={style.listItemRight}>
                            {
                                item.firstImg && <img src={item.firstImg} className={style.listItemImg}/>
                            }
                        </div>

                    </Card>
                ))
            }
            {
                hasMore && <div className={style.loadMore} onClick={getMore}>加载更多</div>
            }
        </div>
    )
};
export default List;
