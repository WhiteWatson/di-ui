import $http from '../http'
const menuList = (params) => {
    return $http({
        url:'/menu',
        method:'get',
        
        params
    })
}
export {
    menuList
}