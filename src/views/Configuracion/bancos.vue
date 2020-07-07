<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion' }">Configuración</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion/bancos' }">Lista de Bancos</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card class="mb-3">
      <div slot="header" class="clearfix">
        <i class="el-icon-plus"></i>
        <span> Agregar Banco</span>
      </div>
      <div class="contenido">
        <form @submit.prevent="add">
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Nombre</label>
              <el-input type="text" placeholder="Nombre" v-model="newbank.bancos_nombre" clearable></el-input>
            </div>
            <div class="col-md-6 mb-3">
              <label>N° Cuenta</label>
              <el-input type="number" placeholder="123456789" min="0" v-model="newbank.bancos_cuenta" clearable></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Tipo de Cuenta</label>
              <el-select class="w-100" placeholder="Tipo de cuenta" size="large" v-model="newbank.bancos_tipo_cuenta">
                <el-option value="Ahorro" label="Ahorro" selected></el-option>
                <el-option value="Corriente" label="Corriente"></el-option>
              </el-select>
            </div>
            <div class="col-md-6 mb-3">
              <label>Teléfono</label>
              <el-input type="text" placeholder="0243-1234567" v-model="newbank.bancos_telefono" clearable></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Identificación</label>
              <el-input type="text" placeholder="V12123456" v-model="newbank.bancos_dni" clearable></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-5 mb-3 pt-4 text-center">
              <el-button class="btn-primario mt-2" round @click="add" v-loading.fullscreen.lock="uploading">Agregar Estatus</el-button>
            </div>
          </div>
        </form>
      </div>
      <div class="clearfix text-center">
        <p class="m-0 p-0"><small>Todos los campos son obligatorios</small></p>
      </div>
    </el-card>
    <div v-if="getAllBancos && getAllBancos == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllBancos && getAllBancos.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Bancos</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllBancos">
          <el-table-column fixed width="50" prop="banco_id" label="#"></el-table-column>
          <el-table-column prop="bancos_nombre" label="Nombre"></el-table-column>
          <el-table-column prop="bancos_cuenta" label="Numero de Cuenta"></el-table-column>
          <el-table-column prop="bancos_tipo_cuenta" label="Tipo"></el-table-column>
          <el-table-column prop="bancos_telefono" label="Teléfono"></el-table-column>
          <el-table-column prop="bancos_dni" label="Identificación"></el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="props">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit">Editar</el-button>
              <el-button class="text-danger" type="text" size="small" icon="el-icon-delete" @click="eliminar(props.row)">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllBancos.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay bancos registrados</h3>
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
        newbank: {
          banco_id: 0,
          bancos_nombre: null,
          bancos_cuenta: null,
          bancos_tipo_cuenta: 'Ahorro',
          bancos_telefono: null,
          bancos_dni: null
        }
      }
    },
    methods: {
      add () {
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/bancos`,
          data: this.newbank
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `El banco se agregó correctamente!`,
            type: 'success',
            duration: 0
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.uploading = false
          this.newbank = {
            banco_id: 0,
            bancos_nombre: null,
            bancos_cuenta: null,
            bancos_tipo_cuenta: 'Ahorro',
            bancos_telefono: null,
            bancos_dni: null
          }
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
        .finally(() => {
          //
        })
      },
      eliminar (banco) {
        this.$confirm('Deseas eliminar este Banco?', 'Estás Seguro de esto?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `DELETE`,
            url: `/bancos`,
            data: {
              banco_id: banco.banco_id,
              bancos_nombre: banco.bancos_nombre,
              bancos_cuenta: banco.bancos_cuenta,
              bancos_tipo_cuenta: banco.bancos_tipo_cuenta,
              bancos_telefono: banco.bancos_telefono,
              bancos_dni: banco.bancos_dni
            }
          })
          .then(() => {
            this.$notify({
              title: 'Eliinación Exitosa!',
              message: `El Banco ${banco.bancos_nombre} se eliminó correctamente!`,
              type: 'success'
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Uff... cancelado'
          })
        })
      }
    },
    computed: {
      getAllBancos () {
        return this.$store.getters.getAllBancos
      }
    }
  }
</script>
