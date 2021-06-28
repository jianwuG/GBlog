'use strict';

const Controller = require('egg').Controller;

class MenuListController extends Controller {
    async list(){
        const {ctx}=this;
        const result=await ctx.service.menuList.list();
        ctx.body=result;
    }

}

module.exports = MenuListController;
