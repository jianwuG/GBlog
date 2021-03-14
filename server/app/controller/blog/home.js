'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
      const result=await this.app.mysql.get('blog_article',{});
      console.log('1111111111111111111',result);
      const { ctx } = this;
      ctx.body =result;
  }

}

module.exports = HomeController;
