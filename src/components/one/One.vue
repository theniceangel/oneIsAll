<template>
  <div class="box">
    <transition name="slide-left">
      <scroll
        v-if="list.length"
        :data="list"
        class="container"
        :listenScroll="listenScroll"
        ref="scroll"
      >
        <!-- 首页顶部-->
        <div class="wrapper">
          <div>
            <weather v-if="list.length"  :curDate="curDate" :weather="weather" :city="city"></weather>
            <one-list :list="list" :menu="menu" @showMenu="refreshBS" @refreshBS="refreshBS"></one-list>
            <!-- 切换到昨天 -->
            <div @click="routerToYesterday" class="prev-wrapper"  v-if="list.length">
              <img src="~common/images/prev.png" width="30%" alt="">
            </div>
          </div>
        </div>
      </scroll>
    </transition >
    <!-- 分享弹窗-->
    <transition :duration="{leave: 300}">
      <div class="share-popup" v-show="shareItem.length" @click="clearShareItem">
        <i class="icon-close" @click.stop="clearShareItem"></i>
        <transition-group
          @before-enter="popupBeforeEnter"
          @enter="popupEnter"
          @leave="popupLeave"
        >
          <span ref="shareIcon"  :class="getCls(item.type)" v-for="(item, index) in shareItemArr" :key="item.type"></span>
        </transition-group>
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Weather from 'base/weather/weather'
  import OneList from 'base/one-list/one-list'
  import Scroll from 'base/scroll/scroll'
  import {GetYesterdayDate} from 'common/js/util'
  import Animations from 'create-keyframe-animation'
  function getScreenInfo () {
    let info = window.screen
    return {
      h: info.height,
      w: info.width
    }
  }
  const CLASS_MAP = {
    qq: 'icon-qq',
    weibo: 'icon-weibo',
    wxTimeline: 'icon-pyq',
    wx: 'icon-wechat'
  }
  const SEQUENCE_MAP = {
    iconWechat: 1,
    iconPyq: 2,
    iconWeibo: 3,
    iconQq: 4
  }
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
        setCurrentDate: 'SET_CURRENT_DATE',
        clearShareItem: 'CLEAR_SHARE_ITEM'
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
          path: `/one/${yesterday}`
        })
      },
      refreshBS () {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 400)
      },
      camelizeString (string) {
        if (typeof string !== 'string') return
        let result = ''
        let arr = string.includes('_') ? string.split('_') : string.split('-')
        if (arr.length <= 1) {
          return string
        }
        arr.forEach((it, index) => {
          if (index >= 1) {
            result += it.charAt(0).toUpperCase() + it.substring(1)
          } else {
            result += it
          }
        })
        return result
      },
      getCls (key) {
        return CLASS_MAP[this.camelizeString(key)]
      },
      popupBeforeEnter (el) {
        let {w, h} = getScreenInfo()
        let index = SEQUENCE_MAP[this.camelizeString(el.className.split(' ')[0])]
        let animationInfo = {
          from: {
            translateY: h / 2 - 30 / 2,
            translateX: w / 2 - 30 / 2
          },
          to: {
            translateY: (2 * index - 1) * h / 8 - 30 / 2,
            translateX: w / 2 - 30 / 2
          }
        }
        Animations.registerAnimation({
          name: `moveFadeInGrow${index}`,
          // the actual array of animation changes
          animation: [
            {
              transform: `translateY(${animationInfo.from.translateY}px) translateX(${animationInfo.from.translateX}px)`
            }, {
              transform: `translateY(${animationInfo.to.translateY}px) translateX(${animationInfo.to.translateX}px)`
            }
          ],
          // optional presets for when actually running the animation
          presets: {
            duration: 200,
            easing: 'linear'
          }
        })
        Animations.registerAnimation({
          name: `seperate${index}`,
          // the actual array of animation changes
          animation: [
            {
              transform: `translateY(${animationInfo.to.translateY}px) translateX(${animationInfo.to.translateX}px)`
            }, {
              transform: `translateY(${animationInfo.from.translateY}px) translateX(${animationInfo.from.translateX}px)`
            }
          ],
          // optional presets for when actually running the animation
          presets: {
            duration: 200,
            easing: 'linear'
          }
        })
      },
      popupEnter (el, done) {
        let index = this.$refs.shareIcon.indexOf(el)
        Animations.runAnimation(el, `moveFadeInGrow${(index + 1)}`, () => {
          done && done()
        })
      },
      popupLeave (el, done) {
        let index = SEQUENCE_MAP[this.camelizeString(el.className.split(' ')[0])]
        Animations.runAnimation(el, `seperate${index}`, () => {
          done && done()
        })
      }
    },
    computed: {
      ...mapGetters([
        'currentDate',
        'playingState',
        'shareItem'
      ]),
      shareItemArr () {
        let ret = []
        if (!this.shareItem.length) return ret
        this.shareItem.forEach((item) => {
          Object.keys(item).forEach((it) => {
            item[it].type = it
            ret.push(item[it])
          })
        })
        return ret
      }
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
    transform scale(0)
  .share-popup
    position fixed
    top 0
    left 0
    background-color rgba(255, 255, 255, 0.95)
    width 100%
    z-index 100
    color #808080
    height 100%
    .icon-close
      position absolute
      top 10px
      right 10px
      font-size 30px
    span
      font-size 30px
      position absolute
      left 0
      top 0
</style>
