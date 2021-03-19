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
        console.log('11111111111111111',_list);
        return {
            data:{
                data:_list,
                msg:'获取分类list成功'
            },
            status:200
        }
    }
}

module.exports = TagService
