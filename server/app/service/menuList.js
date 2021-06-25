'use strict';

const Service = require('egg').Service;

class MenuListService extends Service {

    async list(){
        let _list = await this.app.mysql.select('menu_list',{
            limit:1000
        });
        return {
            data:{
                list:_list,
                msg:'获取分类list成功'
            },
            status:200
        }
    }
}

module.exports = MenuListService;
