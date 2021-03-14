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
            host: 'localhost',
            port: '3306',
            user: 'jianwu',
            password: '12345678',
            database: 'jianwu_blog'
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
    config.security = {
        scrf: {
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
