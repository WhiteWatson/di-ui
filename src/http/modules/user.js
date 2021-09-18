import $http from '../http'
const userList = (data) => {
    return $http({
        url:'/api/user/userlist',
        method:'get',
        data
    })
}
export default{
    userList
}