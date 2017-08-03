<template>
  <div>
    <loading v-show="pulldown" title="正在刷新..."></loading>
    <scroll :data="list"  class="container"
            :pullup="pullup"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scrollToEnd="scrollToEnd"
    >
      <div>
        <one-list :list="list"  ></one-list>
        <loading v-show="hasMore" title="正在挣扎..."></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
  import OneList from 'base/one-list/one-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    data () {
      return {
        list: [],
        hasMore: true,
        pullup: true,
        pulldown: false,
        listenScroll: true,
        probeType: 3
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        // 获取组件的列表数据
        let url = `/api/channel/music/more/0`
        this.$axios.get(url).then((res) => {
          let code = res.data.res
          let data = res.data.data
          if (code === 0) {
            this.list = this._normalizeList(data)
          }
        })
      },
      scrollToEnd () {
        this.hasMore && this.searchMore()
      },
      searchMore () { // 下拉加载更多
        // 获取最后一天数据的id
        let lastId = this.list.slice().pop().id
        let url = `/api/channel/music/more/${lastId}`
        this.$axios.get(url).then((res) => {
          let code = res.data.res
          let data = res.data.data
          if (code === 0) {
            this.list = this.list.concat(this._normalizeList(data))
            if (!data[data.length - 1].id) { // 如果查出来的最后一条数据不存在id, 说明数据已经全部查询出来
              this.hasMore = false
            }
          }
        })
      },
      _normalizeList (data) { // 去除非来自虾米音乐的音乐
        data.forEach((item, index) => {
          if (item.category === '4' && item.audio_url.includes('http')) {
            data.splice(index, 1)
          }
        })
        return data
      }
    },
    components: {
      OneList,
      Scroll,
      Loading
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .container
    position fixed
    top 40px
    width 100%
    z-index 2
    background-color $background
    bottom 50px
    overflow hidden
</style>
