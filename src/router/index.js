import Vue from 'vue'
import {getCurrentDate} from 'common/js/util'
import Router from 'vue-router'
import Home from 'components/home/Home'
import Read from 'components/read/read'
import Music from 'components/music/music'
import Movie from 'components/movie/movie'
Vue.use(Router)

export default new Router({
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
