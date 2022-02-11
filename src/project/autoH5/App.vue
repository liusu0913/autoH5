<template>
  <div id="app">
    <HelloWorld :msg="search"/>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld.vue'
import mixins from '../../libs/mixins/common'

export default {
  name: 'App',
  mixins: [mixins],
  mounted() {
    this.setPageTitle('公众号授权登录')
  },
  data() {
    return {
      search: location.search
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
