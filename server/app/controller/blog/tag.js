'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
    async first(){
        const { ctx } = this;
        const _list=await ctx.service.tag.first();

        ctx.body =_list;
    }

    async last(){
        const { ctx } = this;
        const _list=await ctx.service.tag.last();

        ctx.body =_list;
    }

}

module.exports = TagController;
