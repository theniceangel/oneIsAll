<template>
  <ul>
    <li @click="selectItem(index)" v-for="(item, index) in liList" ><i :class="[item.className, currentIndex === index ? 'active' : '']"></i></li>
  </ul>
</template>
<script>
  export default {
    data () {
      return {
        currentIndex: 0,
        liList: [{
          className: 'icon-circle'
        }, {
          className: 'icon-book'
        }, {
          className: 'icon-music'
        }, {
          className: 'icon-video'
        }]
      }
    },
    methods: {
      selectItem (index) {
        this.currentIndex = index
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
    position fixed
    bottom 0
    left 0
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
        &.active
          font-size 28px
          color $color-content
</style>
