<template>
  <transition name="slider-right">
    <div class="container" v-show="playingState">
      <div class="white-wrapper" @click="showInterface">
        <span class="black-circle">
          <span class="white-circle"></span>
        </span>
      </div>
      <div class="stage" ref="stage"></div>
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Stage from 'common/js/class/stage'
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    methods: {
      showInterface () {
        this.$emit('clickedCircle')
      }
    },
    computed: {
      ...mapGetters([
        'playingState'
      ])
    },
    watch: {
      playingState (newVal, oldVal) {
        this.stage = new Stage(this.$refs.stage)
        if (newVal) {
          this.stage.addSprite(100).paintSprite()
        } else {
          this.stage.removeAllSprite()
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  .container
    position fixed
    right 0
    top 80px
    width 40px
    z-index 2017
    height 30px
    background-color rgba(0, 0, 0, 0.2)
    .white-wrapper
      position absolute
      width 30px
      height 30px
      background-color #fff
      border-radius 100%
      box-shadow  0 0 3px rgba(0,0,0,.5)
      left -15px
      top 0
      z-index 1
      .black-circle
        width 50%
        height 50%
        margin 25%
        display block
        background-color black
        border-radius 100%
        overflow hidden
        .white-circle
          width 30%
          height 30%
          margin 35%
          display block
          background-color white
          border-radius 100%
    .stage
      width 100%
      height 30px
      position relative
  .slider-right-enter-active, .slider-right-leave-active {
    transition all .3s linear
  }
  .slider-right-enter, .slider-right-leave-to {
    transform translate3d(100%,0,0)
  }
</style>
