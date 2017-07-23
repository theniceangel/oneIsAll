<template>
  <transition name="slide-left">
    <scroll :data="list" class="container" :listenScroll="listenScroll">
      <!-- 首页顶部->日期与天气模块-->
      <div class="wrapper">
        <div>
          <weather v-if="list.length"  :curDate="curDate" :weather="weather" :city="city"></weather>
          <one-list :list="list"></one-list>
          <!-- 切换到昨天 -->
          <div @click="routerToYesterday" class="prev-wrapper"  v-if="list.length">
            <img src="~common/images/prev.png" width="30%" alt="">
          </div>
        </div>
      </div>
    </scroll>
  </transition>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Weather from 'base/weather/weather'
  import OneList from 'base/one-list/one-list'
  import Scroll from 'base/scroll/scroll'
  export default {
    data () {
      return {
        curDate: '',
        weather: '',
        city: '',
        list: [],
        listenScroll: true
      }
    },
    created () {
      if (!this.currentId) {
        this.$router.push({
          path: '/home'
        })
      }
      console.log('enter the detail')
      this.getList()
    },
    methods: {
      ...mapMutations({
        'setCurrentDay': 'SET_CURRENT_DAY'
      }),
      getList () {
        console.log(this.currentId)
        // 获取当天的数据
        let url = `/api/onelist/${this.currentId}/上海市`
        this.$axios.get(url).then((res) => {
          let data = res.data.data
          this.curDate = data.weather.date
          this.weather = data.weather.climate
          this.city = data.weather.city_name
          this.list = data.content_list
        })
      },
      routerToYesterday () {
        let index = Math.min((this.currentDay + 1), this.idList.length - 1)
        this.setCurrentDay(index)
        this.$router.push({
          path: `/homedetail/${this.currentId}`
        })
      }
    },
    watch: {
      '$route' (to, from) {
        // 因为首页点击上一个的时候，只需要更改id，查询对应的数据
        // 对于组件来说，并不会被销毁,所以组件的生命周期钩子函数不会被调用
        // 这里需要观察route的变化，来加载对应的数据
      }
    },
    computed: {
      ...mapGetters([
        'currentId',
        'currentDay',
        'idList'
      ])
    },
    components: {
      Weather,
      OneList,
      Scroll
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .container
    position fixed
    top 40px
    width 100%
    z-index 2
    background-color $background
    bottom 50px
    overflow hidden
    .prev-wrapper
      padding 40px 0
      width 100%
      text-align center
      background-color $background
  .slide-left-enter-active
    transition: all .5s
  .slide-left-enter
    transform translate3d(-100%, 0, 0)
</style>
