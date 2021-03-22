'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.post('/blog/article/list', controller.blog.article.list);
    router.get('/blog/article/detail/:id', controller.blog.article.detail);
    router.get('/blog/tag/first', controller.blog.tag.first);
    router.get('/blog/tag/last', controller.blog.tag.last);
};
