<template>
  <div id="app">
    <div class="container">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
  // import nav from '@/components/header.vue'
  export default {
    components: {
      // menuApp: nav
    }
  }
</script>
