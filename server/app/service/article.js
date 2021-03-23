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
        const {page_start,page_end,where}=params;
        let sql,countSql,tagSql='select name,id from tag';
        if(where){
            sql = `select * from article where type=${where.type} limit ${page_start},${page_end}`;
             countSql=`select  count(id) from article where type=${where.type}`;
        }
        else{
             sql = `select * from article limit ${page_start},${page_end}`
             countSql=`select  count(id) from article`;

        }
        let _list = await this.app.mysql.query(sql);
        const _count=await this.app.mysql.query(countSql);
        const _tagList=await this.app.mysql.query(tagSql);
        _list.map( item=>{
            _tagList.map(tagItem=>{
                if(Number(item.type)===Number(tagItem.id)){
                    item.typeName=tagItem.name
                }
            })
        });

        if (_list) {
            return {
                data: {
                    data:_list,
                    count:_count[0]['count(id)'],
                },
                status: 200,
                msg: '获取列表成功'
            }
        } else {
            return {
                status: 10000,
                msg: '获取列表失败'
            }

        }
    };

    async detail(id){
        let _item = await this.app.mysql.select('article',{

            where:{
                id
            }
        });
        if(_item.length){
            return{
                status: 200,
                msg: '获取详情成功',
                data:_item[0]
            }
        }
        else{
            return{
                status: 1000,
                msg: '获取列表失败'
            }
        }

    }
}

module.exports = ArticleService
