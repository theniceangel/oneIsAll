import ToastVue from './toast.vue'
import Vue from 'vue'
let instance
const ToastVueConstructor = Vue.extend(ToastVue)
export const initToastInstance = (options) => {
  let defaults = {
    time: 300,
    content: '请求出错'
  }
  options = Object.assign(defaults, options)
  instance = new ToastVueConstructor({
    el: document.createElement('div'),
    data () {
      return options
    }
  })
  document.body.appendChild(instance.$el)
}

