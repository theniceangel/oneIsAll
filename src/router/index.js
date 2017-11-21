import Vue from 'vue'
import {getCurrentDate} from 'common/js/util'
import Router from 'vue-router'
const One = () => import('components/one/One')
const All = () => import('components/all/All')
const Me = () => import('components/me/Me')
const MyWatch = () => import('components/mine/my-watch')
const MySongsheet = () => import('components/mine/my-songsheet')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: `/one/${getCurrentDate()}`
    },
    {
      path: '/one',
      redirect: `/one/${getCurrentDate()}`
    },
    {
      path: '/one/:date',
      name: 'One',
      component: One
    },
    {
      path: '/all',
      name: 'All',
      component: All
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      children: [{
        path: 'watch',
        component: MyWatch
      }, {
        path: 'songsheet',
        component: MySongsheet
      }]
    }
  ]
})
