<template>
  <div id="app">
    <o-header></o-header>
    <keep-alive>
      <router-view :key="$route.path"></router-view>
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
    methods: {
      ready () {
        // 播放器准备开始播放
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
