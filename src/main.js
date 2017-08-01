// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/style/index.styl'
// import fastclick from 'fastclick'
import store from './store'
import global from 'common/js/plugins/global'
import VueLazyload from 'vue-lazyload'
/* eslint-disable no-unused-vars */
// import console from 'vconsole'
/* eslint-disable no-unused-vars */
import 'babel-polyfill'
// fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(global)
Vue.use(VueLazyload, {
  loading: require('common/images/default.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
