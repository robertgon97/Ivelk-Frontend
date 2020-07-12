<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion' }">Configuración</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion/nacionalidades' }">Tipos de Documentos</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllTypeDocumento && getAllTypeDocumento == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllTypeDocumento && getAllTypeDocumento.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Tipos de Documentos</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllTypeDocumento">
          <el-table-column fixed width="80" prop="tipo_documento_id" label="ID"></el-table-column>
          <el-table-column prop="tipo_documento_letra" label="Letra"></el-table-column>
          <el-table-column prop="tipo_documento_nombre" label="Nombre"></el-table-column>
          <el-table-column width="110" prop="activo" label="Habilitado">
            <template slot-scope="props">
              <div class="text-center">
                <span v-if="props.row.activo" class="text-primary">SI</span>
                <span v-else class="text-danger">NO</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllTypeDocumento.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay Tipo de Documento registradas</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Niveles de Usuario'
    },
    data () {
      return {
        uploading: false
      }
    },
    computed: {
      getAllTypeDocumento () {
        return this.$store.getters.getAllTypeDocumento
      },
    }
  }
</script>
