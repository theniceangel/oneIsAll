<template>
    <scroll
      :data="list"
      class="container"
      :listenScroll="listenScroll"
      @scroll="scroll">
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
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
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
      this.getIdList()
    },
    methods: {
      ...mapActions([
        'initHome'
      ]),
      ...mapMutations({
        'setCurrentDay': 'SET_CURRENT_DAY'
      }),
      getIdList () {
        let url = '/api/onelist/idlist'
        this.$axios.get(url).then((res) => {
          let idList = res.data.data
          // 获取最近10天的id数组
          this.initHome({idList})
        }).then(() => {
          // 获取当天的数据
          let url = `/api/onelist/${this.currentId}/上海市`
          this.$axios.get(url).then((res) => {
            let data = res.data.data
            this.curDate = data.weather.date
            this.weather = data.weather.climate
            this.city = data.weather.city_name
            this.list = data.content_list
          })
        })
      },
      routerToYesterday () {
        let index = Math.min((this.currentDay + 1), this.idList.length)
        this.setCurrentDay(index)
        this.$router.push({
          path: `/homedetail/${this.currentId}`
        })
      },
      scroll (pos) {
        this.$emit('scroll', pos)
      }
    },
    computed: {
      ...mapGetters([
        'currentId',
        'currentDay',
        'idList',
        'playingState'
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
</style>
