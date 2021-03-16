'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.post('/blog/article/list', controller.blog.article.list);
    router.get('/blog/article/detail/:id', controller.blog.article.detail);
};
