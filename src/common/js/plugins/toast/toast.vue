<template>
  <transition name="enlarge">
    <div class="container" v-show="isShow">
    {{content}}
  </div>
  </transition>
</template>
<script>
  export default {
    mounted () {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, this.time)
    },
    data () {
      return {
        isShow: false,
        content: '',
        time: 300
      }
    }
  }
</script>
<style scoped>
  .container {
    padding: 5px 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .7);
    color:#fff;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%);
    font-size: 12px;
    z-index: 999;
  }
  .enlarge-enter-active, .enlarge-leave-active {
    transition: opacity .5s ease-in;
  }
  .enlarge-enter, .enlarge-leave-to {
     opacity: 0;
   }

</style>
