import {useState} from "react";

export  const useList =()=>{
    const [pagination,setPagination]=useState( {
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        showTotal: total => `总共${total}条数据`,
        current: 1,
        pageSize: 5,
        total: 0
    })

    const changePage=(info)=>{
        const {current,pageSize}=info
        const _pagination={...pagination};
        _pagination.current=current;
        _pagination.pageSize=pageSize;
        setPagination(_pagination)
    }
    return{
        pagination,
        changePage,
        setPagination
    }
}

