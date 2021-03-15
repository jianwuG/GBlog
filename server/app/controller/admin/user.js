'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const {username,password}=ctx.request.body;
        const user=await ctx.service.user.find(username,password);
        ctx.body =user;
    }
}

module.exports = UserController;
