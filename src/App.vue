<template>
  <div id="app">
    <menu-ivlk></menu-ivlk>
    <div class="container mt-5 pt-3">
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
