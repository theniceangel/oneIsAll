import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/Home'
import HomeDetail from 'components/home/home-detail'
import Read from 'components/read/read'
import Music from 'components/music/music'
import Movie from 'components/movie/movie'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/homedetail/:id',
      name: 'Homedetail',
      component: HomeDetail
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
