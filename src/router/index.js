import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            name: "home",
            path: '/hello',
            meta: {
                title: "首页"
            },
            component: () => import(/* webpackChunkName: "home" */ '@/view/Kankan'),
        }]
})
export default router;