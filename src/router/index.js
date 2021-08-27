import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '@/view/user/route'
import home from '@/view/content/router'
import Cookies from 'js-cookie'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
    ...user,
    ...home  
    ]
})

router.beforeEach((to, from, next) => {
    const token = Cookies.get('token')
    if (to.path === '/login') {
      // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
      if(token) {
        next({ path: '/home' })
      } else {
        next()
      }
    } else {
        // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      if (!token) {
        next({ path: '/login' })
      } else {
        // 加载动态菜单和路由
        //  addDynamicMenuAndRoutes(userName, to, from)
        next()
      }
    }
  })
export default router;