const defaultUrl='http://127.0.0.1:80';

const AdminPath={
    login:defaultUrl+'/user/login', //登录
    addArticle:defaultUrl+'/article/add', //添加文章
    articleList:defaultUrl+'/article/list', //文章列表
    addTag:defaultUrl+'/tag/add',
    tagList:defaultUrl+'/tag/list',//标签列表
    deleteTag:defaultUrl+'/tag/delete',//删除标签
    editTag:defaultUrl+'/tag/edit',//修改标签
};

export default AdminPath;
