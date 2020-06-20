<template>
  <div id="app">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
  import config from './config'
  export default {
    metaInfo: {
      title: config.frontend.titulo,
      titleTemplate: '%s'
    },
    created () {
      this.$store.dispatch('startupEscencial')
    }
  }
</script>
