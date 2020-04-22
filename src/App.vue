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
