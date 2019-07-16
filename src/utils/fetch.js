import axios from 'axios'
import { Message } from 'element-ui'

const isTest = location.host.match(/localhost|192|36|47|:8080/) !== null

const fetch = axios.create({
  baseURL: !isTest
    ? 'https://www.easy-mock.com/mock/5d1b0bc4285efd61e1bb44b9/token/'
    : 'http://47.94.160.39:8882/hx/',
  timeout: 9000
})

fetch
  .interceptors
  .request
  .use(config => {
    config.headers['Authorization'] = 'token'
    return config
  }, error => {
    Message.error("数据请求出错！")
    return Promise.reject(error);
  })

fetch
  .interceptors
  .response
  .use(res => {
    const data = res.data.dataBody || {}
    if (res.data.resHeader.status.code === '000000') {
      return data
    } else {
      Message.error(res.data.resHeader.status.message);
      return data;
    }
  }, error => {
    return Promise.reject(error)
  })

export default fetch
