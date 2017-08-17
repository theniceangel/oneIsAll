import Vue from 'vue'
import {getCurrentDate} from 'common/js/util'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const Read = () => import('components/read/read')
const Music = () => import('components/music/music')
const Movie = () => import('components/movie/movie')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: `/home/${getCurrentDate()}`
    },
    {
      path: '/home',
      redirect: `/home/${getCurrentDate()}`
    },
    {
      path: '/home/:date',
      name: 'Home',
      component: Home
    },
    {
      path: '/read',
      name: 'Read',
      component: Read
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie
    }
  ]
})
