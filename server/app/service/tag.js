'use strict';

const Service = require('egg').Service;

class TagService extends Service {
    async add(params) {
        let hasItem=await this.app.mysql.get("tag",{name:params.name});
        if(hasItem){
            return {
                msg:'当前分类已存在',
                status:10001
            }
        }else{
            let result = await this.app.mysql.insert("tag", params);
            let _code = result ? 200 : 10000;
            let _msg = result ? '添加类型成功' : '添加失败';
            let _data = result ? [] : '添加失败';
            return {
                data: {
                    data:_data,
                    msg: _msg
                },
                status: _code,
            }
        }
    }

    async list(){
        let _list = await this.app.mysql.select('tag',{
            limit:1000
        });
        let _newList=[];
        for(let item of _list){
            if(Number(item.p_id)===0){
                _newList.push(item)
            }
        }

        for(let item of _newList){
            item.sunClass=[];
            _list.map(sonItem=>{
                if(Number(item.id)===Number(sonItem.p_id)){
                    item.sunClass.push(sonItem);
                }
                return sonItem;
            });
        }
        return {
            data:{
                data:_newList,
                msg:'获取分类list成功'
            },
            status:200
        }
    }
    async delete(id){
        let result= await this.app.mysql.delete('tag',{ id:id });
        console.log('11111111111111',result);
        return{
            data:{
                msg:'删除成功',
            },
            status:200
        }

    }

    async edit(params){
        let hasItem=await this.app.mysql.get("tag",{name:params.name});
         if(hasItem){
             return {
                 msg:'当前分类已存在',
                 status:10001
             }
         }
         else{
             let result= await this.app.mysql.update('tag',params);
             console.log('11111111111111',result);
             return{
                 data:{
                     msg:'修改成功',
                 },
                 status:200
             }
         }

    }

    async first(){
        let _list = await this.app.mysql.select('tag',{
           where:{
               p_id:0
           }
        });
        if(_list){
            return{
                data:{
                    data:_list,
                    msg:'获取一级tag成功',
                },
                status:200
            }
        }

    }

    async last(){
        const _sql='SELECT * FROM tag where p_id <> 0';
        let _list = await this.app.mysql.query(_sql);

        if(_list){
            return{
                data:{
                    data:_list,
                    msg:'获取一级tag成功',
                },
                status:200
            }
        }
    }
}

module.exports = TagService;
