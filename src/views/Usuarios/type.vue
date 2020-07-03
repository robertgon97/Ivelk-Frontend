<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/nivelesusuario/lista' }">Lista de Niveles de Usuario</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllTypeUsers && getAllTypeUsers == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllTypeUsers && getAllTypeUsers.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Niveles de Usuario</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllTypeUsers">
          <el-table-column fixed width="80" prop="usuarios_tipo_id" label="ID"></el-table-column>
          <el-table-column prop="usuarios_tipo_nombre" label="Nombre"></el-table-column>
          <el-table-column width="110" prop="usuarios_tipo_super_admin" label="Programador">
            <template slot-scope="props">
              <div class="text-center">
                <span v-if="props.row.usuarios_tipo_super_admin" class="text-primary">SI</span>
                <span v-else class="text-danger">NO</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="110" prop="usuarios_tipo_admin" label="Administrador">
            <template slot-scope="props">
              <div class="text-center">
                <span v-if="props.row.usuarios_tipo_admin" class="text-primary">SI</span>
                <span v-else class="text-danger">NO</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="110" prop="usuarios_tipo_trabajador" label="Empleado">
            <template slot-scope="props">
              <div class="text-center">
                <span v-if="props.row.usuarios_tipo_trabajador" class="text-primary">SI</span>
                <span v-else class="text-danger">NO</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllTypeUsers.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay niveles registrados</h3>
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
      getAllTypeUsers () {
        return this.$store.getters.getAllTypeUsers
      },
    }
  }
</script>
