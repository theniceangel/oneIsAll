<template>
  <div class="box">
    <transition name="slide-left">
      <header>
        <div class="person-title">
          baby智
          <i class="icon-mail"></i>
        </div>
        <div class="person-avatar"></div>
      </header>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
    },
    components: {
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/style/var.styl'
  header
    padding 0 12px
    .person-title
      line-height 30px
      text-align center
      position relative
      font-size 16px
      .icon-mail
        position absolute
        right 0
        top 0
        line-height 30px
        height 100%
        color white
        font-size 20px
</style>
