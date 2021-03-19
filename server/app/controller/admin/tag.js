'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
    async add() {
        const { ctx } = this;
        const result=await ctx.service.tag.add(ctx.request.body);
        ctx.body =result;
    }
    async list(){
        const {ctx}=this;
        const result=await ctx.service.tag.list();
        ctx.body=result;
    }
}

module.exports = TagController;
