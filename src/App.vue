<template>
  <div id="app">
    <o-header></o-header>
    <router-view></router-view>
    <o-footer></o-footer>
  </div>
</template>

<script>
  import oHeader from 'components/OHeader/OHeader'
  import oFooter from 'components/OFooter/OFooter'
  export default {
    name: 'app',
    created () {
      this.test()
    },
    methods: {
      test () {
        this.$axios.get('/api/onelist/idlist')
          .then((res) => {
            console.log(res.data)
          })
      }
    },
    data () {
      return {
      }
    },
    components: {
      oHeader,
      oFooter
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
