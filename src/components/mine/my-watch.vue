<template>
  <transition name="slide-up">
    <div class="container">
      <div class="title">
        <i class="icon-chevron-left" @click="back"></i>
        <span>我的关注</span>
      </div>
      <div class="hot-author-item" v-for="(author, index) in authorList">
        <img class="avatar" :src="author.avatar" alt="">
        <div class="hot-author-intro">
          <p class="hot-author-name">{{author.username}}</p>
          <p class="hot-author-brief">{{author.desc}}</p>
        </div>
        <i class="icon-chevron-right"></i>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {getWatchAuthorList} from 'common/js/cache'
  export default {
    data () {
      return {
        authorList: getWatchAuthorList()
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/style/var"
  @import "~common/style/mixin"
  .container
    position absolute
    top 0
    left 0
    bottom: 0
    right 0
    width 100%
    height 100%
    z-index 2
    background-color #f0eff4
    .icon-chevron-left
      font-size 30px
      color: $color-desc
    .title
      height 40px
      background-color  white
      line-height 40px
      font-size 16px
      display flex
      align-items center
      color black
      span
        flex 1
        text-align center
    .hot-author-item
      display flex
      height 60px
      align-items center
      background-color white
      padding-left 12px
      border-1px-top($border)
      .avatar
        width 40px
        border-radius 100%
        margin-right 10px
      .hot-author-intro
        height 60%
        flex 1
        display flex
        flex-direction column
        justify-content space-between
        width 0
        text-align left
        .hot-author-name
          color black
        .hot-author-brief
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
      .icon-chevron-right
        font-size 20px
</style>
