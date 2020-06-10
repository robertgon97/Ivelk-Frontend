<template>
  <div class="container py-5">
    <div class="mt-5 text-center">
      <h1 class="display-2">Error 404</h1>
      <h3 class="display-4"><small class="text-muted">Página no encontrada :(</small></h3>
      <router-link to="/" @click="uploading = true">
        <el-button class="btn-primario" round v-loading.fullscreen.lock="uploading">Regresar al Inicio</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Página no encontrada'
    },
    data () {
      return {
        uploading: false
      }
    }
  }
</script>
