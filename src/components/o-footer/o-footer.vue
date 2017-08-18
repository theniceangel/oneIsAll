<template>
  <ul class="border-1px">
    <router-link tag="li"  v-for="(item, index) in liList" :to="item.routerPath" :key="item.index" >
      <i :class="[item.className]"></i>
    </router-link>
  </ul>
</template>
<script>
  export default {
    data () {
      return {
        liList: [{
          className: 'icon-circle',
          routerPath: '/home'
        }, {
          className: 'icon-book',
          routerPath: '/read'
        }, {
          className: 'icon-music',
          routerPath: '/music'
        }, {
          className: 'icon-video',
          routerPath: '/movie'
        }]
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/style/var.styl"
  @import "~common/style/mixin.styl"
  ul
    width 100%
    display flex
    height 50px
    bottom 0
    left 0
    position fixed!important
    border-1px-top($color-desc)
    background-color white
    align-items: center
    justify-content: center
    li
      flex 1
      i
        font-size 26px
        align-content  center
        color $color-desc
        display inline-block
      &.router-link-active
        i
          font-size 28px
          color $color-content
</style>
