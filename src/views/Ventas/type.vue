<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/ventas' }">Ventas</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/ventas/lista' }">Tipos de Ventas</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllTypeVentas && getAllTypeVentas == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllTypeVentas && getAllTypeVentas.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Tipos de Ventas</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllTypeVentas">
          <el-table-column fixed width="80" prop="venta_tipo_id" label="ID"></el-table-column>
          <el-table-column width="250" prop="venta_tipo_nombre" label="Nombre"></el-table-column>
          <el-table-column width="800" prop="venta_tipo_descripcion" label="Descripción"></el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllTypeVentas.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay tipos de ventas registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Tipos de Ventas'
    },
    data () {
      return {
        uploading: false
      }
    },
    computed: {
      getAllTypeVentas () {
        return this.$store.getters.getAllTypeVentas
      },
    }
  }
</script>
