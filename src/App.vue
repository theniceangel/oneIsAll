<template>
  <div id="app">
    <o-header></o-header>
    <keep-alive>
      <router-view :key="$route.path"></router-view>
    </keep-alive>
    <o-footer></o-footer>
    <!-- 播放器-->
    <audio ref="audio" :src="currentSong.url" @play="ready" @timeupdate="updateTime"></audio>
    <!-- 贴在右上角的圆形播放器缩略图-->
    <circle-play @clickedCircle="changeShowInterface"></circle-play>
    <!-- 播放界面-->
    <play-interface :showInterface="showInterface" @hideInterface="hideInterface" :currentTime="currentTime"></play-interface>
  </div>
</template>

<script>
  import OHeader from 'components/o-header/o-header'
  import OFooter from 'components/o-footer/o-footer'
  import CirclePlay from 'components/circle-play/circle-play'
  import PlayInterface from 'components/play-interface/play-interface'
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    methods: {
      ready () {
        // 播放器准备开始播放
      },
      changeShowInterface () {
        this.showInterface = true
      },
      hideInterface () {
        this.showInterface = false
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      }
    },
    computed: {
      ...mapGetters([
        'currentPage',
        'currentSong',
        'playingState'
      ])
    },
    data () {
      return {
        showInterface: false,
        currentTime: 0 // 设置当前音乐播放到哪个时间点了
      }
    },
    watch: {
      playingState (newPlayingState) {
        this.$nextTick(() => {
          console.log('playingState')
          console.log(this.$refs.audio)
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
      OFooter,
      CirclePlay,
      PlayInterface
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
