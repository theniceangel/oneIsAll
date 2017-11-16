<template>
  <div class="box">
    <!-- 轮播图-->
    <div class="slide-wrapper" v-if="sliderImgs.length">
      <div class="slide-content">
        <slider>
          <div v-for="item in sliderImgs">
              <img :src="item.cover">
          </div>
        </slider>
      </div>
    </div>
    <div class="content">
      <!-- 分类导航-->
      <div class="category-nav">
        <div class="category-nav-title">分类导航</div>
        <div class="category-nav-content">
          <div class="category-nav-row clearfix">
            <div class="category-item"><img src="~common/images/anwser.jpeg" alt=""><span>图文</span></div>
            <div class="category-item"><img src="~common/images/question.jpeg" alt=""><span>问答</span></div>
            <div class="category-item2"><img src="~common/images/read.jpeg" alt=""><span>阅读</span></div>
          </div>
          <div class="category-nav-row clearfix">
            <div class="category-item"><img src="~common/images/lianzai.jpeg" alt=""><span>连载</span></div>
            <div class="category-item"><img src="~common/images/movie.jpeg" alt=""><span>影视</span></div>
            <div class="category-item"><img src="~common/images/music.jpeg" alt=""><span>音乐</span></div>
            <div class="category-item last"><img src="~common/images/radio.jpeg" alt=""><span>电台</span></div>
          </div>
        </div>
      </div>
      <!-- 近期热门作者-->
      <div class="hot-author">
        <div class="hot-author-title">近期热门作者</div>
        <div class="hot-author-item" v-for="(author, index) in pickedAuthorList">
          <img class="avatar" :src="author.web_url" alt="">
          <div class="hot-author-intro">
            <p class="hot-author-name">{{author.user_name}}</p>
            <p class="hot-author-brief">{{author.desc}}</p>
          </div>
          <span class="watch" :class="setWatchCls(author.user_id)" @click="setWatchAuthorList(author.user_id)">关注</span>
        </div>
        <div class="hot-author-refresh">
          <span @click.stop="refreshWatchAuthorList">换一换</span>
        </div>
      </div>
      <!-- 所有人问所有人-->
      <div class="recommend-topic">
        <div class="recommend-topic-title">所有人问所有人</div>
        <div class="recommend-topic-wrapper">
          <ul class="clearfix" ref="carouselWrapper">
            <li v-for="topic in recommendTopics" ref="carouselItems">
              <img  :src="topic.cover" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import slider from 'base/slider/slider.vue'
  import {findIndexInArray, getNoneDuplicateFromArr} from 'common/js/util'
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        sliderImgs: [], // 轮播图
        authorList: [], // 热门作者所有数据
        pickedAuthorList: [],  // 每次随机出来的三个作者
        recommendTopics: [] // 所有人问所有人推荐的四个专题
      }
    },
    created () {
      this.getSliderImgs()
      this.getAuthorList()
      this.getRecommendTopics()
    },
    mounted () {
      setTimeout(() => {
        this.initCarousel()
      }, 1000)
    },
    methods: {
      ...mapMutations({
        setWatchAuthorList: 'SET_WATCH_AUTHOR_LIST'
      }),
      // 获取轮播图
      getSliderImgs () {
        let url = '/api/bannerList'
        this.$axios.get(url).then((res) => {
          let data = res.data
          if (data.res === 0) {
            this.sliderImgs = data.data
          }
        })
      },
      // 获取推荐作者列表
      getAuthorList () {
        let url = '/api/authorList'
        this.$axios.get(url).then((res) => {
          let data = res.data
          if (data.res === 0) {
            this.authorList = data.data
            this.pickedAuthorList = this.authorList.slice(0, 3)
          }
        })
      },
      // 处理是否关注作者的样式
      setWatchCls (id) {
        let index = findIndexInArray(this.watchAuthorList, id)
        if (index > -1) {
          return 'active'
        }
        return ''
      },
      // 刷新推荐的作者
      refreshWatchAuthorList () {
        this.pickedAuthorList = getNoneDuplicateFromArr(this.authorList, 3)
      },
      // 获取所有人问所有人推荐的四个专题
      getRecommendTopics () {
        let url = '/api/recommendTopics'
        this.$axios.get(url).then((res) => {
          let data = res.data
          if (data.res === 0) {
            this.recommendTopics = data.data
          }
        })
      },
      // 初始化所有人问所有人的跑马灯效果
      initCarousel () {
        this._setWidth()
      },
      _setWidth () {
        let children = this.$refs.carouselWrapper.children
        let len = children.length
        this.$refs.carouselWrapper.style.width = (this.$refs.carouselItems[0].clientWidth + parseInt(getComputedStyle(this.$refs.carouselItems[0]).marginRight)) * len + 'px'
      }
    },
    computed: {
      ...mapGetters([
        'watchAuthorList'
      ])
    },
    components: {
      slider
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .clearfix
    &:after
      content ''
      clear both
      display block
  .slide-wrapper
    position: relative
    width: 100%
    height: 0
    padding-top: 60%
    overflow: hidden
    .slide-content
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
  .box
    padding 40px 0 50px
    .content
      .category-nav
        padding 0 12px
        margin-top 15px
        background-color white
        color black
        .category-nav-row
          &:last-child
            margin-top 8px
        .category-nav-title
          text-align left
          padding 15px 0
        .category-nav-content
          padding-bottom 30px
          .category-item
            width 23.5%
            margin-right 2%
            position relative
            float left
            padding-top 23.5%
            text-align center
            color white
            span
              position absolute
              bottom 10px
              font-size 14px
              font-weight 600
              left 50%
              transform translateX(-50%)
            &.last
              margin-right 0
            img
              width 100%
              height 100%
              position absolute
              top 0
              left 0
          .category-item2
            width 49%
            padding-top 23.5%
            position relative
            float left
            text-align center
            color white
            span
              position absolute
              bottom 10px
              left 50%
              transform translateX(-50%)
              font-size 14px
              font-weight 600
            img
              width 100%
              height 100%
              position absolute
              top 0
              left 0
      .hot-author
        padding: 0 12px;
        margin-top: 15px;
        background-color: #fff;
        overflow hidden
        .hot-author-title
          text-align: left;
          padding: 15px 0;
          color black
        .hot-author-item
          margin-top 20px
          display flex
          height 60px
          align-items center
          .avatar
            width 60px
            border-radius 100%
            height 100%
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
          .watch
            padding 10px 15px
            border 1px solid #9c9c9c
            border-radius 3px
            &.active
              background-color #9c9c9c
              color #212121
        .hot-author-refresh
          margin 40px 0 30px
          display flex
          justify-content center
          span
            display inline-block
            padding 10px 30px
            border 1px solid black
            border-radius 3px
            color black
      .recommend-topic
        padding: 0 12px;
        margin-top: 15px;
        background-color: #fff;
        overflow hidden
        .recommend-topic-title
          text-align: left;
          padding: 15px 0;
          color black
        .recommend-topic-wrapper
          overflow hidden
          ul
            white-space nowrap
            margin-bottom 30px
            li
              width 160px
              padding-top 104px
              margin-right 15px
              position relative
              display  inline-block
              img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
</style>
