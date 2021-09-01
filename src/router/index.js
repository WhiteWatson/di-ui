import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '@/view/user/route'
//import home from '@/view/content/router'
import Cookies from 'js-cookie'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: '首页',
      path: '/',
      component: () => import(/* webpackChunkName: "content" */'@/view/content'),
    },
    ...user,
  ]
})
// 递归添加路由
const addRoutes = (menuList = [], routes = []) => {
  for (let i in menuList) {
    if (menuList[i].children && menuList[i].children.length > 0) {
      addRoutes(menuList[i].children, routes)
    } else {
      routes.push({
        name: menuList[i].name,
        path: menuList[i].url,
        component: () => import(`@/view/content${menuList[i].url}`),
      })
    }

  }
  return routes
}
router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('token')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({ path: '/home' })
      return
    }
    next()
    return
  }
  // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
  if (!token) {
    next({ path: '/login' })
    return
  }
  // 加载动态菜单和路由
  if(store.state.navMenu.navTree.length<=0){
  const menuList = await store.dispatch('navMenu/addMenuList')
  let routes =await addRoutes(menuList)
  for (let childRoutes of routes) {
    //为名为‘首页’的路由添加子路由
    router.addRoute('首页',childRoutes)
  }
  //如果首次或者刷新界面，这里会循环遍历路由，如果to找不到对应的路由那么他会再执行一次beforeEach((to, from, next))直到找到对应的路由
  next({...to, replace: true})
}
  next()


})
export default router;