'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
    async index() {
        const result=await this.app.mysql.get('blog_article',{});
        console.log('3333333333333',result);
        const { ctx } = this;
        ctx.body ='ppppppppppppp';
    }
    async cc(){
        const { ctx } = this;
        ctx.body ='22222222222';
    }
    async login(){
        const {userName,password}=this.ctx.request.body;
        console.log('1111111111111111111111111',this.ctx.request.body);

        const sql=`
        SELECT user_name FROM blog_user WHERE user_name=${userName}
        AND password=${password}
        `;
        const result=await this.mysql.query(sql);

        if(result.length){
            const openId=new Date().getTime();
            this.ctx.session.openId={openId};
            this.ctx.body={
                data:'登录成功',
                statue:200,
                openId,
            }
        }
        else{
            this.ctx.body={
                data:'登录失败',
                statue:10000,
            }
        }
    }

}

module.exports = AdminController;
