<template>
  <div id="app">
    <o-header v-show="isShow"></o-header>
    <keep-alive>
      <router-view @scroll="scroll" :key="$route.path"></router-view>
    </keep-alive>
    <o-footer></o-footer>
    <!-- 播放器-->
    <audio ref="audio" :src="currentSong.url" @play="ready" ></audio>
  </div>
</template>

<script>
  import OHeader from 'components/o-header/o-header'
  import OFooter from 'components/o-footer/o-footer'
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    created () {
    },
    methods: {
      scroll (pos) {
        if (pos.y <= -40 && this.currentPage === 0) {
          this.isShow = false
        }
      },
      ready () {
        // 播放器准备开始播放
      }
    },
    computed: {
      ...mapGetters([
        'currentPage',
        'currentSong',
        'playingState'
      ]),
      isShow () {
        return true
      }
    },
    data () {
      return {
      }
    },
    watch: {
      playingState (newPlayingState) {
        this.$nextTick(() => {
          console.log('playingState')
          newPlayingState ? this.$refs.audio.play() : this.$refs.audio.pause()
        })
      },
      currentSong (newSong, oldSong) {
        if (newSong.id !== oldSong.id) {
          this.$nextTick(() => {
            console.log('currentSong')
            this.$refs.audio.play()
          })
        }
      }
    },
    components: {
      OHeader,
      OFooter
    }
  }
</script>

<style lang="stylus">
  @import '~common/style/var.styl'
  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    font-size $font-size-medium-s
</style>
