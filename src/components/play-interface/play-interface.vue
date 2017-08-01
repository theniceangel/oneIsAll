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
            <span class="current-time">0:00</span>
            <span class="space"></span>
            <span class="remaining-time">-3.56</span>
          </p>
          <p class="singer">{{currentSong.singers}}</p>
          <div class="btn-grounp">
            <div class="prev"><i class="icon-backwardfill"></i></div>
            <div class="play"><i :class="cls"></i></div>
            <div class="next"><i class="icon-play_forward_fill"></i></div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    props: {
      showInterface: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'currentSong',
        'playingState'
      ]),
      cls () {
        let cls = this.playingState ? 'icon-pause' : 'icon-play'
        return cls
      }
    },
    methods: {
      hide () {
        this.$emit('hideInterface')
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
      padding 0 24px 24px
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
