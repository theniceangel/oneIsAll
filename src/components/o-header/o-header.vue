<template>
    <div class="container border-1px">
      <div class="title">一个</div>
      <i class="icon-search"></i>
    </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/style/var.styl"
  @import "~common/style/mixin.styl"
  .container
    height 40px
    line-height 40px
    background-color: white
    padding 0 12px
    z-index 10
    width 100%
    box-sizing border-box
    color $color-desc
    border-1px-bottom($color-desc)
    font-size $font-size-medium
    display flex
    position fixed
    top 0
    left 0
    i
      font-size $font-size-medium
      display inline-block
      width 20px
      line-height 40px;
    div
      flex 1
      color $color-content
</style>
