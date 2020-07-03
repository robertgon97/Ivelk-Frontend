<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/usuarios/lista' }">Lista de Usuario</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllUsers && getAllUsers == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card v-else-if="getAllUsers && getAllUsers.length">
      <div slot="header" class="clearfix">
        <form class="d-flex flex-wrap justify-content-between">
          <div class="col-md-3 my-1">
            <el-button class="btn-primario" @click="$store.dispatch('getAllUsers')">Actualizar Lista</el-button>
          </div>
        </form>
      </div>
      <div class="contenido">
        <el-table :data="getAllUsers" class="w-100" :default-sort = "{prop: 'usuario_id', order: 'descending'}">
          <el-table-column sortable fixed prop="usuario_id" label="ID" width="80"></el-table-column>
          <el-table-column sortable prop="usuario_username" label="Usuario"></el-table-column>
          <el-table-column sortable prop="usuarios_tipo_nombre" label="Nivel"></el-table-column>
          <el-table-column sortable prop="personas_name" label="Nombres"></el-table-column>
          <el-table-column sortable prop="personas_apellido" label="Apellidos"></el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit" @click="$router.push(`/tienda/usuarios/${props.row.usuario_id}`)">Ver</el-button>
              <el-button class="text-danger" type="text" size="small" icon="el-icon-delete">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="d-flex justify-content-center">
          <p class="m-0 p-0"><small>Mostrando {{getAllUsers.length}} Registros</small></p>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay usuarios registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Lista de Usuarios'
    },
    data () {
      return {
        search: null
      }
    },
    computed: {
      getAllUsers () {
        return this.$store.getters.getAllUsers
      }
    }
  }
</script>
