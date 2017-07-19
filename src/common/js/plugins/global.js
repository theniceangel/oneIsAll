// 该js封装成Vue的插件,对外提供
/**
 * https://github.com/ustbhuangyi/storage
 */
import storage from 'good-storage'
import {initToastInstance} from './toast'
import axios from 'axios'
const ERROR_LIST = '__ERROR_LIST__'
const errorHandler = (message, source, lineno, colno, error) => {
  let errorList = storage.get(ERROR_LIST, []) // 如果不存在对应的key，则会初始化一个空数组
  let errorMessage = `
   错误信息为： ${message},\n
   错误发生的地址：${source},\n
   发生在第${lineno}行,第${colno}列
  `
  errorList.push(errorMessage)
  storage.set(ERROR_LIST, errorList)
}
if (window.addEventListener) {
  window.onerror = errorHandler
}

const install = (Vue, options) => {
  // 注册axios
  Vue.prototype.$axios = axios
  // 注册toast
  Vue.prototype.$toast = initToastInstance
  // 如果是通过script引入，直接手动安装插件
  if (typeof window !== undefined && window.Vue) {
    Vue.use(install)
  }
}

export default {
  install,
  axios
}
