<template>
  <transition name="slide-up">
    <div class="container">
      <div class="title">
        <i class="icon-chevron-left" @click="back"></i>
        <span>我的歌单</span>
        <i class="icon-play-circle"></i>
      </div>
      <div class="hot-author-item" v-for="(song, index) in storedSongsheetList">
        <img class="avatar" :src="song.coverUrl" alt="">
        <div class="hot-author-intro">
          <p class="hot-author-name">{{song.name}}</p>
          <p class="hot-author-brief">{{song.singers}}|{{song.albumName}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {getStoreMusicList} from 'common/js/cache'
  export default {
    data () {
      return {
        songSheetList: getStoreMusicList()
      }
    },
    computed: {
      storedSongsheetList () {
        let ret = this.songSheetList
        return ret
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
    background url('~common/images/colored_bg_image.png') no-repeat center center
    background-size cover
    z-index 2
    color: white
    background-color #f0eff4
    .icon-chevron-left
      font-size 30px
    .icon-play-circle
      margin-right 12px
      font-size 20px
    .title
      height 40px
      line-height 40px
      font-size 16px
      display flex
      align-items center
      span
        flex 1
        text-align center
    .hot-author-item
      display flex
      height 60px
      align-items center
      padding-left 12px
      .avatar
        width 40px
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
        .hot-author-brief
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
      .icon-chevron-right
        font-size 20px
</style>
