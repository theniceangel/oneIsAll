<template>
  <div class="box">
    <div class="slide-wrapper" v-if="sliderImgs.length">
      <div class="slide-content">
        <slider>
          <div v-for="item in sliderImgs">
              <img :src="item.cover">
          </div>
        </slider>
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
</style>
