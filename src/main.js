import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import vuex from '@/store'
import '@/mock'
import $http from '@/http'
Vue.use($http);
new Vue({
  router,
  vuex,
  render: h => h(App),
}).$mount('#app')
