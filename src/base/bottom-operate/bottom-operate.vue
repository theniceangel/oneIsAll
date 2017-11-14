<template>
  <div>
    <div class="container">
      <div class="left">
        <i :class="getIconByCategory"></i>
        {{displayTime}}
      </div>
      <div class="right">
        <i class="icon-corner-up-right" @click.stop="showSharePopup"></i>
        <i class="icon-bookmark"  v-if="category == 0"></i>
        <i class="icon-heart"  :class="likeCls" @click.stop="changeFavoriteItemList(id)"><span ref="iconHeart">{{favoriteCounts}}</span></i>
      </div>
    </div>
  </div>
</template>
<script>
  import {findIndexInArray} from 'common/js/util'
  import {mapMutations, mapGetters} from 'vuex'
  import {countTime} from 'common/js/util.js'
//  import Animations from 'create-keyframe-animation'
  export default {
    props: {
      favoriteCounts: {
        type: Number,
        default: 0
      },
      postDate: {
        type: String,
        default: ''
      },
      category: {
        type: String
      },
      volume: {
        type: String
      },
      shareList: {
        type: Object,
        dafault: {}
      },
      id: {
        type: String
      }
    },
    computed: {
      ...mapGetters([
        'favoriteItemList'
      ]),
      displayTime () {
        if (this.category === '0') { // 说明是首页海报
          let str = '小记'
          return str
        }
        if (this.category === '8') {
          return this.volume
        }
        // 否则返回发布时间与当前时间的差值
        return countTime(this.postDate)
      },
      getIconByCategory () {
        if (this.category === '0') { // 说明是首页海报,就是一个pencil的图标
          return 'icon-edit-2'
        } else {
          return ''
        }
      },
      likeCls () {
        let cls = ''
        let index = findIndexInArray(this.favoriteItemList, this.id)
        index > -1 ? cls = 'active' : cls = ''
        return cls
      }
    },
    methods: {
      ...mapMutations({
        setShareItem: 'SET_SHARE_ITEM',
        setFavoriteItemList: 'SET_FAVORITE_ITEM_LIST'
      }),
      showSharePopup () {
        // 弹出分享弹窗
        this.setShareItem(this.shareList)
      },
      changeFavoriteItemList (id) {
        this.setFavoriteItemList(id)
        let count = this.favoriteCounts
        this.likeCls.includes('active') ? count++ : count--
        this.$emit('update:favoriteCounts', count)
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  .container
    display: flex
    color $color-desc
    font-size $font-size-small
    align-content center
    .left
      width 100px
      text-align left
      display flex
      align-items  center
      i
        line-height 22px
        font-size $font-size-medium-s
        font-style normal
        &:before
          font-size $font-size-large
    .right
      text-align right
      flex 1
      font-size $font-size-medium
      display flex
      align-items  center
      flex-direction row-reverse
      i
        font-size $font-size-large-s
        line-height 22px
        &.icon-heart
          margin 0 30px 0 4px
          position relative
          span
            font-size 12px
            position absolute
            top -8px
            right 0
            transform translateX(100%)
        &.active
          color #e57b78
        &.icon-corner-up-right
          margin-left 5px
        &.icon-bookmark
          margin-left 5px

</style>
