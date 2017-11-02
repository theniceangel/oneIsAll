import Vue from 'vue'
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
      redirect: `/home/0`
    },
    {
      path: '/home',
      redirect: `/home/0`
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
