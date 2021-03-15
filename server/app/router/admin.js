'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/admin/index', controller.admin.admin.index);
    router.get('/admin/cc', controller.admin.admin.cc);
    router.post('/user/login', controller.admin.user.login);
    router.post('/article/add', controller.admin.article.add);
    router.post('/article/list', controller.admin.article.list);
};
