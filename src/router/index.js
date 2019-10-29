import Vue from 'vue' // 引入vue
import VueRouter from 'vue-router' // 引入router
import local from '@/utils/local'
import login from '../views/login'
import home from '../views/home/index.vue'
import welcome from '../views/welcome/index.vue'
import notfound from '../views/404/index.vue'

Vue.use(VueRouter) // 使用

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/',
    component: home,
    children: [{
      path: '/',
      component: welcome
    }]
  }, {
    path: '*',
    component: notfound
  }]
})

// 路由导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  // to 跳转目标路由对象
  // from 从哪里跳过来的路由对象
  // next() 放行  next('/login') 拦截到登录
  // next()
  // 如果你访问的不是登录页面，且又没有登录，跳转到登录页面。
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
// 实例化
export default router
