'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async find(username, password) {
        const user1 = await this.app.mysql.get('user', {username});
        const user2 = await this.app.mysql.get('user', {username, password});
        let _msg = '';
        let _data = '';
        let _code = 0;
        if (user1) {
            if (user2) {
                _msg = '登录成功';
                _code = 200;
                _data='登录成功'
            } else {
                _msg = '密码错误';
                _code = 10001;

            }
        } else {
            _msg = '用户不存在';
            _code = 10002;

        }
        return {
            data: _data,
            status: _code,
            msg: _msg
        }
    }
}

module.exports = UserService
