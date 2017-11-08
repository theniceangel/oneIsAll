<template>
  <div class="box">
    <transition name="slide-left">
      <scroll
        :data="list"
        class="container"
        :listenScroll="listenScroll"
        ref="scroll"
      >
        <!-- 首页顶部-->
        <div class="wrapper">
          <div>
            <weather v-if="list.length"  :curDate="curDate" :weather="weather" :city="city"></weather>
            <one-list :list="list" :menu="menu" @showMenu="refreshBS"></one-list>
            <!-- 切换到昨天 -->
            <div @click="routerToYesterday" class="prev-wrapper"  v-if="list.length">
              <img src="~common/images/prev.png" width="30%" alt="">
            </div>
          </div>
        </div>
      </scroll>
    </transition>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Weather from 'base/weather/weather'
  import OneList from 'base/one-list/one-list'
  import Scroll from 'base/scroll/scroll'
  import {GetYesterdayDate} from 'common/js/util'
  export default {
    data () {
      return {
        curDate: '',
        weather: '',
        city: '',
        list: [],
        listenScroll: true,
        menu: {} // 清单列表
      }
    },
    created () {
      // 如果直接在地址栏输入不合法的日期，直接重定向回当天的时间
      if (!this._regDate(this.$route.params.date)) {
        this.$router.push({
          path: '/'
        })
      }
      let currentDate = this.$route.params.date || this.currentDate
      this.setCurrentDate(currentDate)
      this.initCurrentDayList()
    },
    methods: {
      ...mapMutations({
        'setCurrentDate': 'SET_CURRENT_DATE'
      }),
      initCurrentDayList () {
          // 获取当天的数据
        let url = `/api/onelist/${this.currentDate}/上海市`
        this.$axios.get(url).then((res) => {
          let data = res.data.data
          this.curDate = data.weather.date
          this.weather = data.weather.climate
          this.city = data.weather.city_name
          this.menu = data.menu
          this.list = this._normalizeList(data.content_list)
        })
      },
      _normalizeList (list) {
        list.forEach((item, index) => {
          if (item.category === '4' && item.audio_url.includes('http')) {
            // 去除非虾米音乐的音乐
            list.splice(index, 1)
          }
          if (item.category === '6') {
            // 去除广告
            list.splice(index, 1)
          }
        })
        return list
      },
      _regDate (string) {
        // 判断是不是yyyy-mm-dd或者yyyy-m-dd,yyyy-mm-d,yyyy-m-d等格式的日期
        let reg = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/g
        return reg.test(string)
      },
      routerToYesterday () {
        let currentDate = this.$route.params.date
        let yesterday = GetYesterdayDate(currentDate, 1)
        this.setCurrentDate(yesterday)
        this.$router.push({
          path: `/home/${yesterday}`
        })
      },
      refreshBS () {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 400)
      }
    },
    computed: {
      ...mapGetters([
        'currentDate',
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
  .slide-left-enter-active
    transition: all .5s
  .slide-left-enter
    transform translate3d(-100%, 0, 0)
</style>
