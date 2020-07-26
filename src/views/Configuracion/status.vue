<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion' }">Configuración</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion/status' }">Lista de Estatus</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card class="mb-3">
      <div slot="header" class="clearfix">
        <i class="el-icon-plus"></i>
        <span> Agregar Estatus</span>
      </div>
      <div class="contenido">
        <form @submit.prevent="addStatus">
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Nombre</label>
              <el-input type="text" placeholder="Nombre" v-model="newstatus.status_nombre" clearable show-word-limit maxlength="20"></el-input>
            </div>
            <div class="col-md-6 mb-3">
              <label>Descripción</label>
              <el-input type="text" placeholder="Descripción" v-model="newstatus.status_descripcion" clearable show-word-limit maxlength="100"></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-5 mb-3 pt-4 text-center">
              <el-button class="btn-primario mt-2" round @click="addStatus" v-loading.fullscreen.lock="uploading">Agregar Estatus</el-button>
            </div>
          </div>
        </form>
      </div>
      <div class="clearfix text-center">
        <p class="m-0 p-0"><small>Todos los campos son obligatorios</small></p>
      </div>
    </el-card>
    <div v-if="getAllStatus && getAllStatus == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllStatus && getAllStatus.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Estatus</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllStatus">
          <el-table-column fixed width="50" prop="status_id" label="#"></el-table-column>
          <el-table-column prop="status_nombre" label="Nombre"></el-table-column>
          <el-table-column prop="status_descripcion" label="Descripcion"></el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="100">
            <template slot-scope="">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit">Editar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllStatus.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay estatus registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Configuración de Status'
    },
    data () {
      return {
        uploading: false,
        newstatus: {
          status_id: 0,
          status_nombre: null,
          status_descripcion: null
        }
      }
    },
    methods: {
      addStatus () {
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/status`,
          data: this.newstatus
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `El Estatus se agregó correctamente!`,
            type: 'success',
            duration: 0
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.uploading = false
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      }
    },
    computed: {
      getAllStatus () {
        return this.$store.getters.getAllStatus
      }
    }
  }
</script>
