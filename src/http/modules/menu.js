import $http from '../http'
const menuList = (data) => {
    return $http({
        url:'/api/menu/menulist',
        method:'get',   
        data
    })
}
export {
    menuList
}