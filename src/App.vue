<template>
  <div id="app">
    <menu-ivlk class="mb-2"></menu-ivlk>
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
    metaInfo: {
      title: 'Ivelk',
      titleTemplate: '%s'
    },
    components: {
      // menuApp: nav
    }
  }
</script>
