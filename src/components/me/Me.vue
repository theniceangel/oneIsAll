<template>
  <div class="box">
    <transition name="slide-left">
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
    },
    components: {
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
