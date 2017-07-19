<template>
  <div id="app">
    <o-header v-show=""></o-header>
    <keep-alive>
      <router-view @scroll="getScrollPosition"></router-view>
    </keep-alive>
    <o-footer></o-footer>
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
      getScrollPosition (scrollY) {
        console.log(scrollY)
      }
    },
    computed: {
      ...mapGetters([
        'currentPage'
      ]),
      isShow () {
        let flag = true
        if (this.currentPage === 0) {
          flag = false
        }
        return flag
      }
    },
    data () {
      return {
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
