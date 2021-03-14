'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/admin/index', controller.admin.admin.index);
    router.get('/admin/cc', controller.admin.admin.index);
    router.get('/', controller.admin.user.index);
    router.post('/admin/login/', controller.admin.admin.login);

};
