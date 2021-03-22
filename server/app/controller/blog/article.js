'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async list(){
        const { ctx } = this;
        console.log('sssssssssssss',ctx.request.body);
        const _list=await ctx.service.article.list(ctx.request.body);
        ctx.body =_list;
    }
    async detail(){
        const { ctx } = this;
        const _list=await ctx.service.article.detail(parseInt(this.ctx.params.id));
        console.log('sssssssssssss',_list);

        ctx.body =_list;
    }

}

module.exports = ArticleController;
