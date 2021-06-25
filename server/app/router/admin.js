'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller,swagger } = app;
    router.get('/admin/index', controller.admin.admin.index);
    router.get('/admin/cc', controller.admin.admin.cc);
    router.post('/user/login', controller.admin.user.login);
    router.post('/article/add', controller.admin.article.add);
    router.post('/article/list', controller.admin.article.list);
    router.post('/tag/add', controller.admin.tag.add);
    router.get('/tag/list', controller.admin.tag.list);
    router.post('/tag/delete', controller.admin.tag.delete);
    router.post('/tag/edit', controller.admin.tag.edit);
    router.get('/menuList/list', controller.admin.menuList.list);
};
