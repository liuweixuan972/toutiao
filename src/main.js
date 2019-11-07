import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
import '@/style/index.less'
// 全局组件
import plugin from '@/components'
Vue.prototype.$http = axios // 挂载axios
Vue.use(ElementUI)
Vue.use(plugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
