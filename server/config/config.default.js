/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};
    exports.cluster = {
        listen: {
            // //线上环境
            // port: 7003,
            // hostname: '0.0.0.0',

            //开发
             port: 80,
             hostname: '127.0.0.1',
        },
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1615273038300_2752';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    //数据库配置
    config.mysql = {
        app: true,//是否挂载
        agent: false,
        client: {

            host: '127.0.0.1',
            port: '3306',
            user: 'jianwu',
            password: '12345678',
            database: 'jianwu_blog',
        },
    };

    // config.sequelize = {
    //     dialect: 'mysql',
    //     host: '127.0.0.1',
    //     port: '3306',
    //     username: 'jianwu',
    //     password: '12345678',
    //     database: 'jianwu_blog',
    //     define: {
    //         // timestamps:true,//添加create，update，delete时间戳
    //         paranoid: true,//软删除
    //         freezeTableName: true,//防止修改表名为复数
    //         underscored: false,//防止驼峰式字段被默认转为下划线
    //     },
    //     timezone: '+8:00',
    //     dialectOptions: { //读取date类型数据时返回字符串不是utc时间
    //         dateStrings: true,
    //         typeCast(field, next) {
    //             if (field.type === 'DATETIME') {
    //                 return field.string();
    //             }
    //             return next();
    //
    //         }
    //     }
    //
    //
    // }
    config.swagger2 = {
        enable: true, // 禁用swagger , 默认为true
        base: {
            schemes: [
                'http',
            ],
            host: '127.0.0.1:7001',
            basePath: '/',
            consumes: [
                'application/json',
            ],
            produces: [
                'application/json',
            ],
            info: {
                description: '文档介绍',
                version: '1.0.0',
                title: '文档名称',
                contact: {
                    email: 'caandoll@aliyun.com',
                },
                license: {
                    name: 'Apache 2.0',
                    url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
                },
            },
            tags: [{
                name: 'admin',
                description: 'Admin desc',
            },
                {
                    name: 'role',
                    description: 'Role desc',
                },
            ],
            definitions: {
                // model definitions
            },
            securityDefinitions: {
                // security definitions
            }
        },
    };

    config.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: ['*']
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,POST,PUT,UPDATE,DELETE,OPTIONS,PATCH,HEAD'
    };

    return {
        ...config,
        ...userConfig,
    }
};
