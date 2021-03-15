'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async add() {
        const { ctx } = this;
        const result=await ctx.service.article.add(ctx.request.body);
        console.log('zzzzzzzzzzzzzzz',result,ctx.request.body);
        ctx.body =result;
    }
    async list(){
        const { ctx } = this;
        console.log('sssssssssssss',ctx.request.body);
        const _list=await ctx.service.article.list(ctx.request.body);
        ctx.body =_list;
    }
}

module.exports = UserController;
