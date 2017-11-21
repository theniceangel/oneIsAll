<template>
  <div>
    <p>{{formatDate}}</p>
    <p>{{formatCityAndWeather}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      curDate: {
        type: String,
        default: '2017-07-17'
      },
      weather: {
        type: String,
        default: '晴'
      },
      city: {
        type: String,
        default: '上海'
      },
      temparature: {
        type: String,
        default: ''
      }
    },
    computed: {
      formatDate () {
        let ret = this.curDate.split('-')
        return `${ret[0]} / ${ret[1]} / ${ret[2]}`
      },
      formatCityAndWeather () {
        return `${this.city}   ${this.weather}   ${this.temparature}°C`
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  p
    height 30px
    line-height 30px
    font-size $font-size-small-s
    text-align center
    background-color white
    &:first-child
      font-size 18px
</style>
