<template>
  <transition name="slide-up">
    <div class="box" ref="box">
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
          <ul class="clearfix" ref="carouselWrapper"
              @touchstart.prevent="recTouchStart"
              @touchmove.prevent="recTouchMove"
              @touchend="recTouchEnd">
            <li v-for="topic in recommendTopics" ref="carouselItems">
              <img  :src="topic.cover" alt="">
              <p class="recommend-topic-title">{{topic.title}}</p>
              <i><span>专题</span></i>
            </li>
          </ul>
        </div>
      </div>
      <!-- 专题-->
      <div class="topics">
        <div class="topic-item"  v-for="topic in topicsList">
          <div class="topic-item-img-wrapper">
            <img :src="topic.cover" alt="">
            <i><span>专题</span></i>
          </div>
          <p class="topic-item-title">{{topic.title}}</p>
        </div>
      </div>
      <!-- loading 动画-->
      <loading v-if="isBottom"></loading>
      <!-- 没有更多数据了-->
      <p class="no-more" v-if="noMore">{{noMoreText}}</p>
    </div>
  </div>
  </transition>
</template>
<script>
  import slider from 'base/slider/slider'
  import loading from 'base/loading/loading'
  import {findIndexInArray, getNoneDuplicateFromArr, getPrefixStyle} from 'common/js/util'
  import {mapMutations, mapGetters} from 'vuex'
  const TRANSFORM = getPrefixStyle('transform')
  const TRANSITION = getPrefixStyle('transition')
  const THRESHOLD = 30 // 所有人对所有人板块滑动的阈值
  export default {
    data () {
      return {
        sliderImgs: [], // 轮播图
        authorList: [], // 热门作者所有数据
        pickedAuthorList: [],  // 每次随机出来的三个作者
        recommendTopics: [], // 所有人问所有人推荐的四个专题
        topicsList: [], // 所有的专题
        isBottom: false, // 是否下滑到底部了
        lastId: 0,
        noMore: false, // 是否没有更多的数据
        noMoreText: '没有更对数据了...' // 没有更多数据了
      }
    },
    created () {
      // 运用于所有人问所有人的touch事件
      this.touch = {}
      this.getSliderImgs()
      this.getAuthorList()
      this.getRecommendTopics()
      this.getTopic()
    },
    mounted () {
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
            // 确保图片已经渲染
            this.initCarousel()
          }
        })
      },
      // 初始化所有人问所有人的跑马灯效果
      initCarousel () {
        this._setWidth()
      },
      _setWidth () {
        this.$nextTick(() => {
          let children = this.$refs.carouselWrapper.children
          let len = children.length
          this.$refs.carouselWrapper.style.width = (this.$refs.carouselItems[0].clientWidth + parseInt(getComputedStyle(this.$refs.carouselItems[0]).marginRight)) * len + 'px'
        })
      },
      recTouchStart (e) {
        let wrapperDom = this.$refs.carouselWrapper
        let remainTransform = getComputedStyle(wrapperDom)[TRANSFORM] === 'none' ? 0 : getComputedStyle(wrapperDom)[TRANSFORM].split(',')[4].replace(' ', '')
        this.touch.init = true
        this.touch.startX = e.touches[0].pageX
        this.touch.remainTransform = parseInt(remainTransform)
      },
      recTouchMove (e) {
        // 如果touch事件未初始化
        let wrapperDom = this.$refs.carouselWrapper
        if (!this.touch.init) return
        let deltaX = e.touches[0].pageX - this.touch.startX + this.touch.remainTransform
        let minDeltaX = -THRESHOLD - parseInt(wrapperDom.style.width) + document.documentElement.clientWidth - 15
        let maxDeltaX = THRESHOLD
        let resolveDeltaX = Math.min(Math.max(deltaX, minDeltaX), maxDeltaX)
        this.touch.endDeltaX = resolveDeltaX
        wrapperDom.style[TRANSFORM] = `translateX(${resolveDeltaX}px)`
        wrapperDom.style[TRANSITION] = 'all 0.3s cubic-bezier(.5,.43,.49,1.01)'
      },
      recTouchEnd (e) {
        let wrapperDom = this.$refs.carouselWrapper
        let endDeltaX = this.touch.endDeltaX
        let maxDeltaX = THRESHOLD
        let minDeltaX = -THRESHOLD - parseInt(wrapperDom.style.width) + document.documentElement.clientWidth - 15
        if (endDeltaX <= maxDeltaX && endDeltaX >= 0) {
          wrapperDom.style[TRANSFORM] = `translateX(0)`
          wrapperDom.style[TRANSITION] = 'all 0.1s cubic-bezier(0.215, 0.610, 0.355, 1.000)'
          wrapperDom.addEventListener('transition', () => {
            this.touch.init = false
          })
        } else if (endDeltaX >= minDeltaX && endDeltaX <= (minDeltaX + THRESHOLD)) {
          console.log(minDeltaX)
          wrapperDom.style[TRANSFORM] = `translateX(${minDeltaX + THRESHOLD}px)`
          wrapperDom.style[TRANSITION] = 'all 0.1s cubic-bezier(0.215, 0.610, 0.355, 1.000)'
          wrapperDom.addEventListener('transition', () => {
            this.touch.init = false
          })
        }
      },
      // 获取专题列表
      getTopic () {
        let url = `/api/topics/${this.lastId}`
        this.$axios.get(url).then((res) => {
          let data = res.data
          if (data.res === 0) {
            this.topicsList = data.data
            this.lastId = this.topicsList[(this.topicsList.length - 1)].id
            // 如果data为空数组，说明没有更多数据了
            this.topicsList.length ? this.isBottom = true : this.isBottom = false
            console.log('getTopic' + this.isBottom)
            // 监听滚动事件
            window.addEventListener('scroll', () => {
              let scrollHeight = this.$refs.box.scrollHeight
              let clientHeight = document.documentElement.clientHeight
              let scrollTop = document.documentElement.scrollTop
              if (clientHeight + scrollTop === scrollHeight) {
                // 滚动到了底部
                if (this.noMore) return
                this.getMoreTopic()
              }
            })
          }
        })
      },
      // 获取更多专题列表
      getMoreTopic () {
        let url = `/api/topics/${this.lastId}`
        this.$axios.get(url).then((res) => {
          let data = res.data
          if (data.res === 0) {
            this.topicsList = this.topicsList.concat(data.data)
            this.lastId = this.topicsList[(this.topicsList.length - 1)].id
            // 如果data为空数组，说明没有更多数据了
            if (!data.data.length) {
              this.isBottom = false
              this.noMore = true
            }
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'watchAuthorList'
      ])
    },
    components: {
      slider,
      loading
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
              float left
              display  table
              img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
              .recommend-topic-title
                padding 0 5px
                position absolute
                text-align center
                top 50%
                left 50%
                transform translate(-50%)
                width 100%
                box-sizing border-box
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                color white
              i
                position absolute
                left 0
                top 0
                width 0
                height 0
                border 30px solid rgba(0, 0, 0, 0.4)
                border-bottom 30px solid transparent
                border-right 30px solid transparent
                font-style normal
                span
                  color white
                  position absolute
                  left -25px
                  top -15px
                  font-size 6px
                  transform-origin center
                  transform rotate(315deg)
      .topics
        .topic-item
          margin-top 15px
          padding 15px 12px 30px
          background-color white
        .topic-item-img-wrapper
          position relative
          width 100%
          padding-top 60%
          background-color aquamarine
          img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
          i
            position absolute
            left 0
            top 0
            width 0
            height 0
            border 30px solid rgba(0, 0, 0, 0.4)
            border-bottom 30px solid transparent
            border-right 30px solid transparent
            font-style normal
            span
              color white
              position absolute
              left -25px
              top -15px
              font-size 6px
              transform-origin center
              transform rotate(315deg)
        .topic-item-title
          margin-top 20px
          text-align left
          color $color-content
          line-height 1.2
      .no-more
        text-align center
        line-height: 2;
        padding: 10px 0;
  .slide-up-enter-active /*, .slide-up-leave-active */ {
    transition: opacity .5s
  }
  .slide-up-enter /*, .slide-up-leave-to .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
