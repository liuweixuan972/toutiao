// 引入下载好的axios
import axios from 'axios'
import local from '../utils/local'
import JSONBIG from 'json-bigint'
// 对axios进行配置
// baseURL  作用：设置基准地址（前面一段相同的地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  try {
    let a = JSONBIG.parse(data)
    return a
    // return data
  } catch (e) {
    return data
  }
}]
export default axios

// 请求拦截器
axios.interceptors.request.use(config => {
  // 1. 获取token
  const user = local.getUser() || {}
  // 2. 头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})
