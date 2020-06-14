<template>
  <div class="row m-0 p-p justify-content-between">
    <div class="col-md-2 p-0">
      <menu-ivelk-admin />
    </div>
    <div class="col-md-10 p-0">
      <div class="bg-light p-3"><h5 class="text-center m-0 p-0">{{$route.name || 'Sin Título'}}</h5></div>
      <div class="p-3">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
  import config from './../../config'
  import menu from './MenuSystem.vue'
  export default {
    metaInfo: {
      titleTemplate: '%s | Menú'
    },
    components: {
      'menu-ivelk-admin': menu
    },
    data () {
      return {
        uploading: false,
        titleApp: config.frontend.titulo
      }
    }
  }
</script>
