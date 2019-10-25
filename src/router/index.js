import Vue from 'vue' // 引入vue
import VueRouter from 'vue-router' // 引入router
import login from '../views/login'
Vue.use(VueRouter) // 使用

// 实例化
export default new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }]
})
