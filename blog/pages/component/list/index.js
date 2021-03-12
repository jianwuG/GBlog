import React,{useState,useEffect} from 'react';
import {Card,Tag} from 'antd'
import style from './index.module.scss'

const List = () => {
    const [list,setList]=useState([])
    useEffect(()=>{
        const _list=[{title:'文章标题111111',marked:'11111111111111',firstImg:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11b2c4bdec95438fa023a49f5aa96bb9~tplv-k3u1fbpfcp-watermark.image',tab:'学习1',update_time:'2020/01/21 ',read_count:0},
            {title:'文章标题111111',marked:'a文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111d',tab:'学习',update_time:'2020/01/21',read_count:0},
            {title:'文章标题111111',marked:'a文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111d',tab:'学习',update_time:'2020/01/21',read_count:0},
            {title:'文章标题111111',marked:'a文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111d',tab:'学习',update_time:'2020/01/21',read_count:0},
            {title:'文章标题111111',marked:'a文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111d',tab:'学习',update_time:'2020/01/21',read_count:0},
            {title:'文章标题111111',marked:'a文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111d',tab:'学习',update_time:'2020/01/21',read_count:0},
            {title:'文章标题111111',marked:'a文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111文章标题111111d',tab:'学习',update_time:'2020/01/21',read_count:0},
         ];
        setList(_list)
    },[]);
    return (
        <div className={style.listWrapper}>
            {
                list&&list.map(item=>(
                    <Card className={style.listItem} hoverable={true}
                          bodyStyle={{padding:'10px',width:"100%",display:'flex',flexBasis:'row'}}>
                        <div className={style.listItemLeft}>
                            <span className={style.title}>{item.title}</span>
                            <span className={style.marked}>{item.marked}</span>
                            <div className={style.time}>
                                <span>{item.update_time}</span>
                                <Tag className={style.tag}>{item.tab}</Tag>
                            </div>
                        </div>
                        <div className={style.listItemRight}>
                            {
                                item.firstImg&&<img src={item.firstImg} className={style.listItemImg}/>
                            }
                        </div>

                    </Card>
                ))
            }
        </div>
    )
};
export default List;
