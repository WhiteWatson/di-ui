import $http from '../http'
//查询用户列表
const userList = (data) => {
    return $http({
        url:'/api/user/userlist',
        method:'get',
        data
    })
}
//删除用户
const dellist = (data) => {
    return $http({
        url:'/api/user/dellist',
        method:'post',
        data
    })
}
export default{
    userList,
    dellist
}