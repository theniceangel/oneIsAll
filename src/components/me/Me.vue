<template>
    <div class="box" ref="box1">
      <scroll class="container"
      @scroll="scroll"
      :listenScroll="listenScroll">
      <div>
        <header>
          <div class="person-wrapper">
            <div class="person-title">
              <i class="icon-mail"></i>
            </div>
            <div class="person-avatar">
              <img src="../../common/images/person-avatar.png" width="100px" alt="">
              <p>无名氏</p>
            </div>
          </div>
        </header>
        <!-- 我的收藏-->
        <div class="my-collection-container">
          <div class="my-collection-title">我的收藏</div>
          <ul>
            <li v-for="collect in collectionInfo">
              <img :src="collect.iconUrl" alt="">
              <p>{{collect.name}}</p>
            </li>
          </ul>
        </div>
        <!-- 我的关注-->
        <div class="my-watch-container" @click.stop="gotoWatch()">
          <i class="icon-users"></i>
          <span>我的关注</span>
          <div>
            <i class="icon-chevron-right"></i>
            <span v-if="watchCount">{{watchCount}}</span>
          </div>
        </div>
        <!-- 我的歌单-->
        <div class="my-songsheet-container" @click.stop="gotoSongsheet()">
          <i class="icon-play-circle"></i>
          <span>我的歌单</span>
          <div>
            <i class="icon-chevron-right"></i>
            <span v-if="songsheetCount">{{songsheetCount}}</span>
          </div>
        </div>
      </div>
    </scroll>
      <router-view></router-view>
    </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {getWatchAuthorList, getStoreMusicList} from 'common/js/cache'
  import Scroll from 'base/scroll/scroll'
  export default {
    data () {
      return {
        collectionInfo: [
          {
            name: '图文',
            iconUrl: require('common/images/tuwen.png')
          },
          {
            name: '文章',
            iconUrl: require('common/images/wenzhang.png')
          },
          {
            name: '音乐',
            iconUrl: require('common/images/yinyue.png')
          },
          {
            name: '影视',
            iconUrl: require('common/images/yingshi.png')
          },
          {
            name: '电台',
            iconUrl: require('common/images/diantai.png')
          }
        ], // 我的收藏图标和标题
        scrollY: 0,
        listenScroll: true
      }
    },
    computed: {
      watchCount () {
        return getWatchAuthorList().length
      },
      songsheetCount () {
        return getStoreMusicList().length
      }
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
        setShowFooter: 'SET_SHOW_FOOTER'
      }),
      scroll (pos) {
        this.scrollY = pos.y
      },
      gotoWatch () {
        this.$router.push({
          path: '/me/watch'
        })
      },
      gotoSongsheet () {
        this.$router.push({
          path: '/me/songsheet'
        })
      }
    },
    watch: {
      $route (newVal) {
        if (newVal.path.includes('watch') || newVal.path.includes('songsheet')) {
          this.$nextTick(() => {
            this.$refs.box1.style.bottom = 0
          })
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .box
    position fixed
    top 0
    bottom 50px
    width 100%
    overflow-y hidden
  .container
    position absolute
    top 0
    left 0
    width 100%
    height 100%
  header
    box-sizing border-box
    width 100%
    padding-bottom 100%
    position relative
    background url("../../common/images/personalBackgroundImage.png") no-repeat center center
    .person-wrapper
      padding 0 12px
      box-sizing border-box
      width 100%
      height 100%
      position absolute
      top 0
      left 0
    .person-title
      height 30px
      text-align center
      font-size 16px
      color black
      position relative
      .icon-mail
        position absolute
        right 0
        top 0
        line-height 30px
        height 100%
        color white
        font-size 20px
    .person-avatar
      margin-top 10px
      img
        border-radius 100%
        border 2px solid white
      p
        margin 20px 0 40px
        color white
        font-size 16px
  .my-collection-container
    padding 15px 0 20px
    margin-top 10px
    background-color white
    .my-collection-title
      padding 0 12px
      text-align left
      color $color-content
    ul
      display flex
      margin-top 15px
      li
        flex 1
        justify-content center
        img
          display block
          margin 0 auto
          width 30px
        p
          margin-top 5px
          font-size 12px
  .my-watch-container
    height 50px
    display flex
    align-content center
    background-color white
    margin 10px 0
    line-height 50px
    padding-right 12px
    i
      line-height 50px
      &.icon-users
        margin 0 15px 0 12px
    span
      flex 1
      text-align left
    div
      width 30px
      display: flex;
      align-items: center;
      flex-direction row-reverse;
  .my-songsheet-container
    height 50px
    display flex
    align-content center
    background-color white
    margin 10px 0
    line-height 50px
    padding-right 12px
    i
      line-height 50px
      &.icon-play-circle
        margin 0 15px 0 12px
    span
      flex 1
      text-align left
    div
      width 30px
      display: flex;
      align-items: center;
      flex-direction row-reverse;
</style>
