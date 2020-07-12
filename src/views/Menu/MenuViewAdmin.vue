<template>
  <div class="row m-0 p-p justify-content-between">
    <div class="col-md-2 col-sm-3 p-0 overflow-auto">
      <menu-ivelk-admin />
    </div>
    <div class="col-md-10 col-sm-9 p-0 overflow-auto">
      <div id="menucito" class="bg-light p-3"><h5 class="text-center m-0 p-0">{{$route.name || 'Sin Título'}}</h5></div>
      <div class="p-3">
        <router-view />
      </div>
    </div>
  </div>
  <!-- <el-container>
    <el-aside width="20%">
      <menu-ivelk-admin />
    </el-aside>
    <el-container>
      <el-header class="d-flex flex-wrap justify-content-center">
        <h5 class="text-center m-0 p-0">{{$route.name || 'Sin Título'}}</h5>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container> -->
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
    created () {
      //
    },
    data () {
      return {
        uploading: false,
        titleApp: config.frontend.titulo
      }
    }
  }
</script>
<style lang="scss" scoped>
  #menucito {
    background-color: #196587 !important;
    color: white !important;
    h5 {
      color: white !important;
    }
  }
  .el-header {
    background-color: #196587 !important;
    color: white !important;
    h5 {
      color: white !important;
    }
  }
</style>
