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
    async delete(){
        const {ctx}=this;
        const result=await ctx.service.tag.delete(parseInt(ctx.request.body.id));
        ctx.body=result;
    }

    async edit(){
        const {ctx}=this;
        const result=await ctx.service.tag.edit(ctx.request.body);
        ctx.body=result;
    }
}

module.exports = TagController;
