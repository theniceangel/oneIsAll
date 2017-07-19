<template>
  <div class="container">
    <!-- 首页顶部->日期与天气模块-->
    <Weather v-if="list.length" :curDate="curDate" :weather="weather" :city="city"></Weather>
    <one-list :list="list"></one-list>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Weather from 'base/weather/weather'
  import OneList from 'base/one-list/one-list'
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
      OneList
    }
  }
</script>
<style scoped lang="stylus">
  .container
    position fixed
    top 0
    width 100%
    bottom 50px
    overflow-y auto
    z-index 2
    background-color $background
</style>
