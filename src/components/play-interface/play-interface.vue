<template>
  <transition name="fade">
    <div @click="hide" class="wrapper" v-show="showInterface">
      <transition name="slider-down">
        <div class="sliderdown"  v-show="showInterface" @click.stop>
          <div class="song-name">{{currentSong.name}}</div>
          <!-- 进度条-->
          <div class="progress-bar-wrapper">
            <div class="grey-line"></div>
            <div class="black-line"></div>
            <div class="circle"></div>
          </div>
          <p class="time">
            <span class="current-time">{{curTime}}</span>
            <span class="space"></span>
            <span class="remaining-time">-{{remainingTime}}</span>
          </p>
          <p class="singer">{{currentSong.singers}}</p>
          <div class="btn-grounp">
            <span class="prev"><i class="icon-backwardfill"></i></span>
            <span class="play" @click.stop="togglePlay"><i :class="cls"></i></span>
            <span class="next"><i class="icon-play_forward_fill"></i></span>
          </div>
          <div class="bottom">
            <span class="mode" @click.stop="setPlayingMode"><i :class="modeCls"></i></span>
            <span class="origin"><img  width="14" src="~common/images/xiami-logo.png" alt="">来自虾米音乐</span>
            <span class="add-and-turn">
              <i class="icon-plus-square"></i>
              <i class="icon-share"></i>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
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
    computed: {
      ...mapGetters([
        'currentSong',
        'playingState',
        'playingMode'
      ]),
      cls () {
        let cls = this.playingState ? 'icon-playfill' : 'icon-stop'
        return cls
      },
      modeCls () {
        let cls = this.playingMode === 0 ? 'icon-sequence' : 'icon-loop'
        return cls
      },
      curTime () {
        let curTime = Math.ceil(this.currentTime)
        return this._padTime(curTime)
      },
      remainingTime () {
        let totalTime = this.currentSong.duration
        let remaining = totalTime - Math.ceil(this.currentTime)
        return this._padTime(remaining)
      }
    },
    methods: {
      ...mapMutations({
        setPlayingMode: 'SET_PLAYING_MODE',
        setPlayingState: 'SET_PLAYING_STATE'
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
        background-color wheat
        width 100%
        position relative
        .grey-line
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color #eaeaea
          border-radius 2px
        .black-line
          position absolute
          top 0
          left 0
          width 50%
          height 100%
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
        .origin
          flex 1
          display flex
          align-items center
          justify-content center
          img
            margin 1px 4px 0 0
        .icon-plus-square
          margin-right 15px
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