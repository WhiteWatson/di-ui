import vuex from 'vuex'
import Vue from 'vue'
import navMenu from '@/components/navMenu/store'
import tabs from '@/components/mainContent/component/tabs/store'
Vue.use(vuex)
export default new vuex.Store(
    {
        modules: {
            navMenu,
            tabs
        }
    }
)