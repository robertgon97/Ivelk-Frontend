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
      if (localStorage.token_ivelk && localStorage.token_ivelk != null && typeof localStorage.token_ivelk == 'string') {
        let user = JSON.parse(localStorage.getItem('ud_ivelk'))
        if (user && user.usuarios_tipo_id == 6) {
          this.$store.dispatch('startupClient')
        } else {
          this.$store.dispatch('startupAdmin')
        }
      }
    }
  }
</script>
