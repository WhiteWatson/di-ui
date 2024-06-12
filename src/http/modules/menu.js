import $http from '../http'

//获取菜单列表
const menuList = (data) => {
    return $http({
        url: '/api/api/menus/menulist',
        method: 'get',
        data
    })
}
//删除菜单
const delMenuList = (data) => {
    return $http({
        url: '/api/api/menus/delMenuList',
        method: 'post',
        data
    })
}
//新增编辑菜单
const addMenuList = (data) => {
    return $http({
        url: '/api/api/menus/addmenulist',
        method: 'post',
        data
    })
}
export default {
    menuList,
    delMenuList,
    addMenuList
}