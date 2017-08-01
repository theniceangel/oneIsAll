<!-- 该组件将四个导航页的列表进行抽象,封装在这个组件里面-->
<template>
    <ul v-if="list.length">
      <li class="list-item" :class="{'radio': item.category === '8', 'poster': item.category === '0'}" v-for="(item, index) in list">
        <!-- 如果是首页海报-->
        <template v-if="item.category === '0'">
          <div class="wrapper">
            <div class="cover-title">{{item.volume}}</div>
            <img v-lazy="item.img_url" alt="">
          </div>
          <div class="content">
            <p class="title">{{item.title}} | {{item.pic_info}}</p>
            <div class="forward">{{item.forward}}</div>
            <p class="words_info">{{item.words_info}}</p>
          </div>
          <div class="padding">
            <bottom-operate :category="item.category" :postDate="item.post_date" :favoriteCounts="item.like_count"></bottom-operate>
          </div>
        </template>
        <!-- 如果是首页的一个故事，连载，问答-->
        <template v-if="item.category === '1' || item.category === '2' || item.category === '3'">
          <div class="article-header">
            <span class="divide-line"></span>
            <span class="tag-list" v-if="item.tag_list.length > 0" v-for="it in item.tag_list">{{it.title}}</span>
            <span class="tag-list" v-if="!item.tag_list.length">{{getTitle(item.category)}}</span>
            <span class="divide-line"></span>
          </div>
          <div class="article-content">
            <p class="article-content-title">{{item.title}}</p>
            <p class="article-content-author">{{getAuthor(item.category, item.author, item.answerer)}}</p>
            <div class="image-wrapper">
              <img v-lazy="dealLazyReadImage(item.img_url)" alt="">
            </div>
            <p class="article-forward">{{item.forward}}</p>
          </div>
          <bottom-operate :category="item.category" :postDate="item.post_date" :favoriteCounts="item.like_count"></bottom-operate>
        </template>
        <!-- 如果是首页的一个音乐 -->
        <template v-if="item.category === '4'">
          <div class="article-header">
            <span class="divide-line"></span>
              <span class="tag-list" v-if="item.tag_list.length > 0" v-for="it in item.tag_list">{{it.title}}</span>
              <span class="tag-list" v-if="!item.tag_list.length">{{getTitle(item.category)}}</span>
            <span class="divide-line"></span>
          </div>
          <div class="article-content">
            <p class="article-content-title">{{item.title}}</p>
            <p class="article-content-author">{{getAuthor(item.category, item.author)}}</p>
            <div class="music-wrapper">
              <span class="play-wrapper" ><i ref="playBtn" :class="getIconPlayingCls(item.audio_url)" ></i></span>
              <img width="20" :src="getMusicOrigin(item.share_info.url)" alt="" class="music-origin">
              <div class="top-line"></div>
              <div class="bottom-line"></div>
              <div class="music-player" ref="musicImgWrapper">
                <img ref="musicImg"  :class="playingCls(item.audio_url, index)" @click="playingMusic(item.audio_url)"  v-lazy="dealLazyMusicImage(item.img_url)" alt="">
              </div>
              <div class="rotate-text">STORIES OF MUSIC</div>
            </div>
            <p class="music-info">{{item.music_name}}·{{item.audio_author}}|{{item.audio_album}}</p>
            <p class="article-forward">{{item.forward}}</p>
          </div>
          <bottom-operate :category="item.category" :postDate="item.post_date" :favoriteCounts="item.like_count"></bottom-operate>
        </template>
        <!-- 如果是首页的一个影视 -->
        <template v-if="item.category === '5'">
          <div class="article-header">
            <span class="divide-line"></span>
            <span class="tag-list" v-if="!item.tag_list.length">{{getTitle(item.category)}}</span>
            <span class="divide-line"></span>
          </div>
          <div class="article-content">
            <p class="article-content-title">{{item.title}}</p>
            <p class="article-content-author">{{getAuthor(item.category, item.author)}}</p>
            <div class="image-wrapper">
              <div class="dashline-svg-top">
                <!-- 这种虚线框只能通过svg去实现,只有通过svg才能控制虚线的间距-->
                <dashline-svg></dashline-svg>
              </div>
              <img class="video-image" v-lazy="dealLazyVideoImage(item.img_url)" alt="">
              <div class="dashline-svg-bottom">
                <dashline-svg></dashline-svg>
              </div>
            </div>
            <p class="article-forward">{{item.forward}}</p>
            <p class="subtitle">——《{{item.subtitle}}》</p>
          </div>
          <bottom-operate :category="item.category" :postDate="item.post_date" :favoriteCounts="item.like_count"></bottom-operate>
        </template>
        <!-- 如果是首页的深夜电台 -->
        <template v-if="item.category === '8'">
          <div class="radio-wrapper">
            <div class="title">深夜电台</div>
            <div class="mask"></div>
            <img v-lazy="dealLazyVideoImage(item.img_url)" alt="">
            <div class="bottom-info" >
              <div class="left" >
                <div class="border-wrapper" v-if="item.author.user_name">
                  <i class="icon-play"></i>
                </div>
              </div>
              <div class="right">
                <h3>{{item.title}}</h3>
                <p>{{getAnchor(item.author.user_name)}}</p>
              </div>
            </div>
          </div>
          <div class="space10">
            <bottom-operate :volume='item.volume' :category="item.category" :postDate="item.post_date" :favoriteCounts="item.like_count"></bottom-operate>
          </div>
        </template>
      </li>
    </ul>
</template>
<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import BottomOperate from 'base/bottom-operate/bottom-operate'
  import DashlineSvg from 'base/dashline-svg/dashline-svg'
  import Loading from 'base/loading/loading'
  import {createSong} from 'common/js/class/song'
  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'playingState',
        'currentSong'
      ])
    },
    methods: {
      ...mapMutations({
        'setPlayingState': 'SET_PLAYING_STATE',
        'setPlayList': 'SET_PLAY_LIST'
      }),
      ...mapActions([
        'playingMusicAction'
      ]),
      getTitle (category) {
        // 根据category,制定的类型映射表
        let titleMap = {
          '1': '阅读',
          '2': '连载',
          '3': '问答',
          '4': '音乐',
          '5': '影视',
          '8': '深夜电台'
        }
        return titleMap[category]
      },
      getAuthor (category, author, answerer) {
        if (category === '3') {
          return `${answerer.user_name}答`
        }
        return `文 / ${author.user_name}`
      },
      getAnchor (name) {
        if (name) return `主播 / ${name}`
      },
      getMusicOrigin (musicUrl) {
        if (musicUrl.includes('xiami')) {
          return require('../../common/images/xiami-logo.png')
        }
        return require('../../common/images/one-logo.png')
      },
      dealLazyReadImage (imgUrl) {
        return {
          src: imgUrl,
          loading: require('../../common/images/one-read-onload.jpg')
        }
      },
      dealLazyVideoImage (imgUrl) {
        return {
          src: imgUrl,
          loading: require('../../common/images/one-video-onload.jpg')
        }
      },
      dealLazyMusicImage (imgUrl) {
        return {
          src: imgUrl,
          loading: require('../../common/images/one-music-onload.jpg')
        }
      },
      playingMusic (id) {
        // 如果正在播放当前歌手,playingState切回false,表示暂停
        if (this.currentSong.id === id && this.playingState) {
          this.setPlayingState(false)
          return
        }
        let song = createSong(id)
        song.initXiamiMusicInfo(id).then(() => {
          this.playingMusicAction(song)
        })
      },
      playingCls (id, index) {
        if (this.currentSong.id === id && this.playingState) {
          return 'playing-mode'
        }
        this.$nextTick(() => {
          this.syncTransformWrapper('musicImgWrapper', 'musicImg', index)
        })
      },
      getIconPlayingCls (id) {
        if (this.currentSong.id === id && this.playingState) {
          return 'icon-pause'
        }
        return 'icon-play'
      },
      syncTransformWrapper (wrapperRef, imgRef, index) {
        if (!this.$refs[wrapperRef]) return
        let musicImgWrapper
        let img
        // 添加一个分支判断，用来判断home组件以及music组件下的音乐播放
        if (this.$refs.musicImgWrapper.length === 1) {
          musicImgWrapper = this.$refs.musicImgWrapper[0]
          img = this.$refs.musicImg[0]
        } else {
          musicImgWrapper = this.$refs[wrapperRef][index]
          img = this.$refs[imgRef][index]
        }
        let iTransform = getComputedStyle(img).transform
        let wTransform = getComputedStyle(musicImgWrapper).transform
        musicImgWrapper.style.transform = wTransform === 'none' ? iTransform : iTransform.concat(' ', wTransform)
      }
    },
    components: {
      BottomOperate,
      DashlineSvg,
      Loading
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
  .list-item
    margin-top 10px
    background-color white
    padding 0 24px 15px
    &:first-child
      margin-top 0
    &.radio
      padding 0 0 15px
    &.poster
      padding 0 0 15px
    .wrapper
      position relative
      width 100%
      padding-bottom 66.67%
      .cover-title
        position absolute
        top 10px
        left 10px
        color white
        font-size $font-size-medium-s
        z-index 1
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
    .content
      .title
        color $color-desc
        margin-top 15px
        font-size $font-size-small
      .forward
        padding 0 10%
        margin 25px 0
        color $color-content
        line-height 1.5
      .words_info
        color $color-desc
        font-size $font-size-small
        margin-bottom 40px
    .padding
      padding 0 12px
    .article-header
      padding-top 20px
      display flex
      align-items center
      justify-content center
      .divide-line
        width 5px
        height 1px
        background-color $color-desc
      .tag-list
        padding 0 3px
    .article-content
      margin 30px 0 40px
      .article-content-title
        font-size $font-size-large-s
        color $color-content
        margin-bottom 15px
        text-align left
        line-height 1.5
      .article-content-author
        color $color-desc
        text-align left
      .music-info
        margin-bottom 20px
        text-align left
        color $color-desc
      .image-wrapper
        margin 20px 0
        width 100%
        position relative
        padding-bottom  59.7%
        .dashline-svg-top
          position absolute
          top -15px
          left 0
          width 100%
        .dashline-svg-bottom
          position absolute
          bottom -15px
          left 0
          width 100%
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
      .music-wrapper
        margin 20px 0
        position relative
        width 100%
        .music-origin
          left 0
          position absolute
          bottom 15px
        .music-player
          position relative
          margin 0 auto
          width 60%
          padding-bottom 60%
          overflow hidden
          img
            position absolute
            width 100%
            height 100%
            border-radius 100%
            left 0
            z-index 1
            top 0
            &.playing-mode
              animation: rotate 40s linear infinite
            &.playing-pause
              animation-play-state: paused
        .top-line
          width 50%
          height 1px
          background-color #f2f2f2
          position absolute
          top 0
          left 0
        .bottom-line
          width 50%
          height 1px
          background-color #f2f2f2
          position absolute
          bottom 0
          left 0
        .rotate-text
          position absolute
          bottom 0
          right 0
          transform-origin right bottom
          transform rotate(90deg) translateY(80%)
          font-size 24px
          color #f2f2f2
        .play-wrapper
          position  absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          width 30px
          height 30px
          border-radius 100%
          background-color rgba(0, 0, 0, 0.6)
          z-index 3
          display flex
          justify-content  center
          align-items center
          i
            color white
      .article-forward
        line-height 1.5
        color $color-desc
        text-align left
        font-size $font-size-medium-s
      .subtitle
        text-align right
        margin-top 15px
    .radio-wrapper
      width 100%
      padding-bottom 53.3%
      position relative
      .mask
        position absolute
        top 0
        left 0
        height 100%
        width 100%
        background-color rgba(0, 0, 0, 0.3)
        z-index 4
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .title
        width 40px
        line-height 1.2
        position absolute
        top 20px
        left 20px
        color white
        z-index 3
      .bottom-info
        display flex
        align-items center
        position absolute
        z-index 5
        text-align center
        bottom 0
        left 0
        height 60px
        width 100%
        color white
        margin-bottom 10px
        .left
          width 70px
          .border-wrapper
            width 30px
            height 30px
            border 1px solid white
            margin 0 auto
            border-radius 100%
            line-height  30px
            i
              font-size $font-size-large
              line-height: 32px
        .right
          display flex
          height 40px
          text-align left
          flex-direction column
          justify-content space-between
          h3
            font-size $font-size-medium
          p
            color #f2f2f2
    .space10
      margin-top  10px
      padding 0 12px
</style>
