import ToastVue from './toast.vue'
import Vue from 'vue'
let instance
let show = true
const ToastVueConstructor = Vue.extend(ToastVue)
export const initToastInstance = (options = {}) => {
  let defaults = {
    time: 3000,
    content: '请求出错',
    show: show
  }
  options = Object.assign(defaults, options)
  // 如果实例存在而且并未消失 直接退出
  if (instance && instance.show) {
    return
  }
  // 如果实例已存在
  instance && (instance.content = options.content) && (instance.show = true)
  if (!instance) {
    instance = new ToastVueConstructor({
      el: document.createElement('div'),
      data () {
        return options
      }
    })
    document.body.appendChild(instance.$el)
  }
  setTimeout(() => {
    instance.show = false
  }, options.time)
}

