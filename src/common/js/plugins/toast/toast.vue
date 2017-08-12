<template>
  <transition name="enlarge">
    <div class="container" v-show="show" v-html="content">
    </div>
  </transition>
</template>
<style scoped>
  .container {
    padding: 10px 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .7);
    color:#fff;
    position: absolute;
    top:50%;
    text-align: center;
    left:50%;
    transform: translate(-50%);
    font-size: 14px;
    z-index: 99999;
  }
  .enlarge-enter-active, .enlarge-leave-active {
    transition: opacity .5s ease-in;
  }
  .enlarge-enter, .enlarge-leave-to {
     opacity: 0;
   }

</style>
