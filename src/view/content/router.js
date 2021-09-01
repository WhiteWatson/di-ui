export default [{
    name:'系统主页',
    path:'/home',
    component:()=>import (/* webpackChunkName: "home" */'./mainContent'),
},{
    name:'系统主页',
    path:'/sys/user',
    component:()=>import (/* webpackChunkName: "home" */'./sys'),
},{
    name:'系统主页',
    path:'/sys/role',
    component:()=>import (/* webpackChunkName: "home" */'./mainContent'),
}]