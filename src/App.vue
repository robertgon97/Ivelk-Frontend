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
  import config from './config'
  export default {
    metaInfo: {
      title: config.frontend.titulo,
      titleTemplate: '%s'
    }
  }
</script>
