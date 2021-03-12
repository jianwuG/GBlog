import React,{useState,useEffect} from 'react'
import {Card,Space} from 'antd'
import style from './index.module.scss'

const Category = () => {
    const [list,setList]=useState([]);
    useEffect(()=>{
        const _list=[{name:'前端',id:1},{name:'后端',id:2},{name:'前端',id:1},{name:'后端',id:2},{name:'前端',id:1},{name:'后端',id:2}];
       setList(_list)
    },[]);

    return (
        <>
            <Space size={[6,12]} className={style.cateGoryWrapper} wrap>
                {
                    list&&list.map(item=>(
                        <Card key={item.id} className={style.cateGoryItem}>
                            {item.name}
                        </Card>
                    ))
                }
            </Space>

        </>
    )
};
export default Category;
