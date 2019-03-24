import axios from 'axios'
import qs from 'qs'
import store from '@/store/store'

window.isRefreshing = false

// 创建axios实例
const service = axios.create({
  baseURL: 'http://api.anntly.com/api', // api的base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true // 请求携带cookie
})

// POST传参序列化(添加请求拦截器)
service.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  // 如果cookie中的token存在，就在请求头中加入JWT_TOKEN
  // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  if (localStorage.JWT_TOKEN) { // 如果有jwt_token就加在请求头中
    config.headers.Authorization = `Bearer ${localStorage.JWT_TOKEN}`
  }
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use((res) => {
  // 对响应数据做些事
  return res.data
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})

export default service
