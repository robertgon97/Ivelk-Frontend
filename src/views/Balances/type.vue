<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/balances' }">Balances</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/balances/tipo' }">Tipos</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllBalancesTipos && getAllBalancesTipos == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllBalancesTipos && getAllBalancesTipos.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllBalancesTipos">
          <el-table-column fixed width="50" prop="balances_tipo_id" label="#"></el-table-column>
          <el-table-column prop="balances_tipo_nombre" label="Nombre"></el-table-column>
          <el-table-column prop="balances_tipo_descripcion" label="Descripcion"></el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllBalancesTipos.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay tipos registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Tipos de Balances'
    },
    data () {
      return {
        uploading: false
      }
    },
    methods: {
      //
    },
    computed: {
      getAllBalancesTipos () {
        return this.$store.getters.getAllBalancesTipos
      }
    }
  }
</script>
