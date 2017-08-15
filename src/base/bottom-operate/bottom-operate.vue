<template>
  <div class="container">
    <div class="left">
      <i :class="getIconByCategory">{{displayTime}}</i>
    </div>
    <div class="right">
      {{favoriteCounts}}
      <i class="icon-favorites"></i>
      <i class="icon-share"></i>
    </div>
  </div>
</template>
<script>
 // import {countTime} from 'common/js/util.js'
  export default {
    props: {
      favoriteCounts: {
        type: Number,
        default: 0
      },
      postDate: {
        type: String,
        default: ''
      },
      category: {
        type: String
      },
      volume: {
        type: String
      }
    },
    computed: {
      displayTime () {
        if (this.category === '0') { // 说明是首页海报
          let str = '小记'
          return str
        }
        if (this.category === '8') {
          return this.volume
        }
        // 否则返回发布时间与当前时间的差值
        return this.postDate
      },
      getIconByCategory () {
        if (this.category === '0') { // 说明是首页海报,就是一个pencil的图标
          return 'icon-pencil'
        } else {
          return ''
        }
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .container
    display: flex
    color $color-desc
    font-size $font-size-small
    .left
      width 100px
      text-align left
      i
        line-height 22px
        font-size $font-size-medium-s
        font-style normal
        &:before
          font-size $font-size-large
    .right
      text-align right
      flex 1
      align-self center
      font-size $font-size-medium
      line-height 16px
      i
        font-size $font-size-large-s
        line-height 22px
        &.icon-favorites
          margin 0 20px 0 4px
</style>
