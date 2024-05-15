<template>
  <div id="app">
    <MultiUpload />
    <!-- <TabNav /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MultiUpload from '@/components/multi-upload/index.vue'
import TabNav from '@/components/TabNav/index.vue'

export default {
  name: 'App',
  components: {
    MultiUpload,
    TabNav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  margin-left: 30px;
}
</style>
