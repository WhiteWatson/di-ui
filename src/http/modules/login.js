import $http from '../http'
const login = (data) => {
    return $http({
        url: '/api/api/user/login',
        method: 'post',
        data
    })
}
export default {
    login
}