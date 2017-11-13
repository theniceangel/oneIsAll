<template>
  <transition name="fade">
    <div @click.stop="hide" class="wrapper" v-show="showInterface">
      <transition name="slider  -down">
        <div class="sliderdown"  v-show="showInterface" @click.stop>
          <div class="song-name">{{currentSong.name}}</div>
          <!-- 进度条-->
          <div class="progress-bar-wrapper">
            <!-- 音乐总音轨长-->
            <div @click.stop="forward" class="track-wrapper">
              <div ref="totalTrack"  class="grey-line"></div>
              <!-- 音乐当前播放的音轨长-->
              <div ref="currentTrack" class="black-line"></div>
              <div ref="circle" class="circle" @touchstart.prevent="progressStart" @touchmove.prevent="progressMove" @touchend.prevent="progressEnd"></div>
            </div>
          </div>
          <p class="time">
            <span class="current-time">{{curTime}}</span>
            <span class="space"></span>
            <span class="remaining-time">-{{remainingTime}}</span>
          </p>
          <p class="singer">{{currentSong.singers}}</p>
          <div class="btn-grounp">
            <span class="prev" v-if="showPrevAndNext"><i class="icon-playback-fast-forward"></i></span>
            <span class="play" @click.stop="togglePlay"><i :class="cls"></i></span>
            <span class="next" v-if="showPrevAndNext"><i class="icon-playback-rewind"></i></span>
          </div>
          <div class="bottom">
            <span class="mode" @click.stop="setPlayingMode"><i :class="modeCls"></i></span>
            <span class="origin"><img  width="14" src="~common/images/xiami-logo.png" alt="">来自虾米音乐</span>
            <span class="add-and-turn">
              <i class="icon-add_box" :class="storeCls" @click.stop="store"></i>
              <i class="icon-wrap_text"></i>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {findIndexInArray} from 'common/js/util'
  export default {
    props: {
      showInterface: {
        type: Boolean,
        default: false
      },
      currentTime: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    created () {
      this.touch = {}
    },
    computed: {
      ...mapGetters([
        'currentSong',
        'playingState',
        'playingMode',
        'playList',
        'storeList'
      ]),
      cls () {
        let cls = this.playingState ? 'icon-playback-pause' : 'icon-playback-play'
        return cls
      },
      modeCls () {
        let cls = this.playingMode === 0 ? 'icon-dehaze' : 'icon-repeat_one'
        return cls
      },
      curTime () {
        let curTime = Math.floor(this.currentTime)
        return this._padTime(curTime)
      },
      remainingTime () {
        let totalTime = this.currentSong.duration
        let remaining = totalTime - Math.floor(this.currentTime)
        return this._padTime(remaining)
      },
      showPrevAndNext () {
        let flag = false
        if (this.playList.length > 1) {
          flag = true
        }
        return flag
      },
      storeCls () {
        let index = findIndexInArray(this.storeList, this.currentSong.id)
        if (index > -1) {
          return 'active'
        }
        return ''
      }
    },
    methods: {
      ...mapMutations({
        setPlayingMode: 'SET_PLAYING_MODE',
        setPlayingState: 'SET_PLAYING_STATE',
        setStoreList: 'SET_STORE_LIST'
      }),
      hide () {
        this.$emit('hideInterface')
      },
      togglePlay () {
        this.setPlayingState(!this.playingState)
      },
      _padTime (time) {
        let min = (time / 60 | 0).toString()
        let sec = (time % 60).toString().padStart(2, 0)
        return `${min}:${sec}`
      },
      updateProgressTrack (percent) {
        let totalTrack = this.$refs.totalTrack
        let currentTrack = this.$refs.currentTrack
        let circle = this.$refs.circle
        let delta = totalTrack.clientWidth * percent
        this._offsetWidth(currentTrack, circle, delta)
      },
      forward (e) {
        let totalTrack = this.$refs.totalTrack
        let currentTrack = this.$refs.currentTrack
        let pageX = e.pageX
        let delta = pageX - totalTrack.getBoundingClientRect().left
        let circle = this.$refs.circle
        let percent = delta / totalTrack.clientWidth
        this._offsetWidth(currentTrack, circle, delta)
        this.$emit('percentChange', percent)
      },
      _offsetWidth (currentTrack, circle, offsetWidth) {
        currentTrack.style.width = `${offsetWidth}px`
        circle.style.left = `${offsetWidth - 4}px`
      },
      progressStart (e) {
        let currentTrack = this.$refs.currentTrack
        this.touch.init = true
        let touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.offsetWidth = currentTrack.offsetWidth
      },
      progressMove (e) {
        if (!this.touch.init) return
        let totalTrack = this.$refs.totalTrack
        let touch = e.touches[0]
        let deltaX = touch.pageX - this.touch.startX
        this.touch.percent = Math.max(0, Math.min((this.touch.offsetWidth + deltaX), totalTrack.offsetWidth)) / totalTrack.offsetWidth
        this.$emit('percentChange', this.touch.percent)
      },
      progressEnd (e) {
        this.touch.init = false
        this.$emit('percentChange', this.touch.percent)
      },
      store () {
        this.setStoreList(this.currentSong.id)
        if (this.storeCls.includes('active')) {
          this.$toast({
            content: '已收藏<br/>可在个人中心中查找',
            time: 1500
          })
        } else {
          this.$toast({
            content: '已取消收藏',
            time: 1500
          })
        }
      }
    },
    watch: {
      currentTime (newTime, oldTime) {
        let percent = newTime / this.currentSong.duration
        this.updateProgressTrack(percent)
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .wrapper
    position fixed
    top 0
    left 0
    background-color white
    height 100%
    width 100%
    z-index 2018
    background-color rgba(0,0,0,.1)
    .sliderdown
      position absolute
      top 0
      left 0
      padding 0 24px 16px
      box-sizing border-box
      background-color white
      width 100%
      .song-name
        margin 12px 0
        color $color-content
        font-size $font-size-medium-s
      .progress-bar-wrapper
        height 2px
        width 100%
        position relative
        .track-wrapper
          height 100%
          width 100%
          position absolute
          display flex
          align-items center
          left 0
          top 0
          padding 5px 0
          .grey-line
            position absolute
            top 0
            left 0
            width 100%
            height 2px
            background-color #eaeaea
            border-radius 2px
          .black-line
            position absolute
            top 0
            left 0
            height 2px
            background-color black
            border-radius 2px
          .circle
            position absolute
            top -3px
            left -4px
            width 8px
            height 8px
            background-color black
            border-radius 100%
      .time
        margin-top 5px
        display flex
        .space
          flex 1
      .singer
        font-size $font-size-small
        margin-bottom 20px
      .btn-grounp
        span
          margin 0 10px
          text-align center
          i
            font-size 24px
            color black
      .bottom
        margin-top 5px
        display flex
        .mode
          width 28px
          float left
        .origin
          flex 1
          display flex
          align-items center
          justify-content center
          img
            margin 1px 4px 0 0
        .icon-add_box
          margin-right 15px
          &.active
            color #f47474
        i
          font-size 24px
  .slider-down-enter-active, .slider-down-leave-active {
    transition all .3s cubic-bezier(.04,.6,.58,.84)
  }
  .slider-down-enter, .slider-down-leave-to {
    transition all .3s cubic-bezier(.04,.6,.58,.84)
    transform translate3d(0,-100%,0)
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
