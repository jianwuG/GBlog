'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx } = this;
        const user=await ctx.service.user.find();
        console.log('1111111111111',user);
        ctx.body =user;
    }
}

module.exports = UserController;
