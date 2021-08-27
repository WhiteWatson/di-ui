export default [{
    name:'home',
    path:'/home',
    component:()=>import (/* webpackChunkName: "login" */'./index.vue')
}]