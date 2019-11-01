// 封装一个插件 注册所有的全局组件
// - - 使用一个js模块
//   - 导出必须是一个对象
//   - 对象中必须有一个属性：install
//   - install的值必须是函数
//     - 默认传参：Vue 对象
//     - 基于 Vue 对象 实现想要的功能
// - 使用插件：Vue.use(插件)
import Mybreak from '@/components/my-break'
import Channel from '@/components/channel'
export default {
  install (Vue) {
    Vue.component('my-break', Mybreak)
    Vue.component('my-channel', Channel)
  }
}
