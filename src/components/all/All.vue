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
            <div class="category-item"><span>问答</span></div>
            <div class="category-item2"><span>阅读</span></div>
          </div>
          <div class="category-nav-row clearfix">
            <div class="category-item"><span>连载</span></div>
            <div class="category-item"><span>影视</span></div>
            <div class="category-item"><span>音乐</span></div>
            <div class="category-item last"><span>电台</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import slider from 'base/slider/slider.vue'
  export default {
    data () {
      return {
        sliderImgs: []
      }
    },
    created () {
      this.getSliderImgs()
    },
    methods: {
      // 获取轮播图
      getSliderImgs () {
        let url = '/api/bannerList'
        this.$axios.get(url).then((res) => {
          let data = res.data
          if (data.res === 0) {
            this.sliderImgs = data.data
          }
        })
      }
    },
    computed: {
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
  .content
    padding 0 12px
    margin-top 15px
    background-color white
    .category-nav-title
      text-align left
      padding 15px 0
    .category-item
      width 23.5%
      margin-right 2%
      position relative
      float left
      padding-top 23.5%
      span
        position absolute
        bottom 10px
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
      span
        position absolute
        bottom 10px
      img
        width 100%
        height 100%
        position absolute
        top 0
        left 0
</style>
