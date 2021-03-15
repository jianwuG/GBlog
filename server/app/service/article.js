'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
    async add(params) {
        let result = await this.app.mysql.insert("article", params);
        let _code = result ? 200 : 10000;
        let _msg = result ? '添加成功' : '添加失败';
        let _data = result ? [] : '添加失败';
        return {
            data: _data,
            status: _code,
            msg: _msg
        }
    }

    async list(params) {
        // 取n到m条记录的语句
        const {page_start,page_end}=params;
        console.log('zzzzzzzzzzzzzzzzz',params);
        const sql = `select * from article limit ${page_start},${page_end}`
        let _list = await this.app.mysql.query(sql);
        if (_list) {
            return {
                data: _list,
                status: 200,
                msg: '获取列表成功'
            }
        } else {
            return {
                status: 10000,
                msg: '获取列表失败'
            }

        }
    }
}

module.exports = ArticleService
