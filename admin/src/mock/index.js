import Mock from 'mockjs'


Mock.mock('/api/getList','get',{
     status:200,
     message:'获取成功',
    'data|20':{
        id:'@increment(1)',
        name:'@cword(2,8)'
    }
})