import axios from "axios"
import store from '@/store'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

function getBaseURL() {
  let tukuType = store.state.app.tukuType
  if (tukuType === '2') {
    return process.env.VUE_APP_ZYH_BASE_API
  } else {
    return process.env.VUE_APP_BXJ_BASE_API
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_ZYH_BASE_API,
  timeout: 30000
})

// request拦截器
service.interceptors.request.use(config => {
  config.baseURL = getBaseURL()
  return config
})
// response拦截器
service.interceptors.response.use(res => {
  return res
},
error => {
  console.log('Server Err:', error)
})

export default service