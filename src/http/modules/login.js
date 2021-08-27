import $http from '../http'
const login = (data) => {
    return $http({
        url:'/login',
        method:'post',
        data
    })
}
export {
    login
}