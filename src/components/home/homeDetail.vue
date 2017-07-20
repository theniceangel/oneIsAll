<template>
  <scroll :data="list" class="container">
    <!-- 首页顶部->日期与天气模块-->
    <div class="wrapper">
      <div>
        <weather v-if="list.length"  :curDate="curDate" :weather="weather" :city="city"></weather>
        <one-list :list="list"></one-list>
      </div>
    </div>
  </scroll>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Weather from 'base/weather/weather'
  import OneList from 'base/one-list/one-list'
  import Scroll from 'base/scroll/scroll'
  export default {
    data () {
      return {
        curDate: '',
        weather: '',
        city: '',
        list: []
      }
    },
    created () {
      this.getIdList()
    },
    methods: {
      ...mapActions([
        'initHome'
      ]),
      getIdList () {
        let url = '/api/onelist/idlist'
        this.$axios.get(url).then((res) => {
          let idList = res.data.data
          // 获取最近10天的id数组
          this.initHome({idList})
        }).then(() => {
          // 获取当天的数据
          let url = `/api/onelist/${this.currentId}/上海市`
          this.$axios.get(url).then((res) => {
            let data = res.data.data
            this.curDate = data.weather.date
            this.weather = data.weather.climate
            this.city = data.weather.city_name
            this.list = data.content_list
            console.log(this.list)
          })
        })
      }
    },
    computed: {
      ...mapGetters([
        'currentId'
      ])
    },
    components: {
      Weather,
      OneList,
      Scroll
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .container
    position fixed
    top 0
    width 100%
    z-index 2
    background-color $background
    bottom 50px
    overflow hidden
</style>
