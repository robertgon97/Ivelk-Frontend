<template>
  <div id="app">
    <menuApp id="nav" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
  import nav from '@/components/header.vue'
  export default {
    components: {
      menuApp: nav
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
  }
</style>
