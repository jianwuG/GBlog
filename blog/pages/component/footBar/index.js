import React, {useEffect, useState} from 'react';
import {useInterval} from './../../hooks'
import style from './index.module.scss'


const FootBar = () => {
   const [runTime,setRunTime]=useState('00天00时00分00秒');
   const startTime=new Date('2021-03-20 00:00:00').getTime();
    useInterval(() => {
        setRunTime(getDay(new Date().getTime()-startTime));
    }, 1000);

   const getDay=(time)=>{
       const d= getZero(Math.floor(time/1000/60/60/24));
       const h= getZero(Math.floor(time / 1000 / 60 /60%24));
       const min=getZero(Math.floor(time / 1000/60%60));
       const s=getZero(parseInt(time/1000%60));
       return `${d}天${h}时${min}分${s}秒`;
   };
   const getZero=(num)=>{
       return num>9?num:`0${num}`
   };

    return (
        <div className={style.footBarWrapper}>
            <span>网站已运行 {runTime}</span>
        </div>
    )
};

export default FootBar
