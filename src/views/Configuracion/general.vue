<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion' }">Configuración</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion/general' }">General</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-row :gutter="20">
      <el-col class="col-md-4 mb-3">
        <el-card v-if="getgetAppConfig && getgetAppConfig != 'Loading'">
          <div slot="header" class="clearfix">
            <i class="el-icon-setting"></i>
            <span> Configuración Actual</span>
          </div>
          <div class="text item">
            <p><i class="el-icon-tickets"></i> IVA: <b>{{getgetAppConfig.config_iva}} %</b></p>
            <p><i class="el-icon-d-arrow-left"></i> Inventario Mínimo: <b>{{getgetAppConfig.config_inventario_minimo}} Unidades</b></p>
            <p><i class="el-icon-d-arrow-right"></i> Inventario Máximo: <b>{{getgetAppConfig.config_inventario_maximo}} Unidades</b></p>
          </div>
          <el-button class="btn-primario" @click="getSQL">Crear Respaldo de Base de Datos</el-button>
        </el-card>
      </el-col>
      <el-col class="col-md-8 mb-3">
        <el-card>
          <div slot="header" class="clearfix">
            <i class="el-icon-plus"></i>
            <span> Agregar Configuración</span>
          </div>
          <div class="contenido">
            <form @submit.prevent="add">
              <div class="row m-0 p-0 justify-content-center">
                <div class="col-md-6 mb-3">
                  <label>Inventario Mínimo</label>
                  <el-input type="number" min="0" placeholder="Número mínimo" prefix-icon="el-icon-d-arrow-left" v-model="newconfig.config_inventario_minimo" clearable></el-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Inventario Máximo</label>
                  <el-input type="number" min="0" placeholder="Número máximo" prefix-icon="el-icon-d-arrow-right" v-model="newconfig.config_inventario_maximo" clearable></el-input>
                </div>
              </div>
              <div class="row m-0 p-0 justify-content-center">
                <div class="col-md-5 mb-3">
                  <label>IVA (Porcentaje)</label>
                  <el-input type="number" min="0" max="100" placeholder="IVA%" prefix-icon="el-icon-tickets" v-model="newconfig.config_iva" clearable></el-input>
                </div>
                <div class="col-md-5 mb-3 pt-4">
                  <el-button class="btn-primario mt-2" round @click="add" v-loading.fullscreen.lock="uploading">Aplicar esta configuración</el-button>
                </div>
              </div>
            </form>
          </div>
          <div class="clearfix text-center">
            <p class="m-0 p-0"><small>Todos los campos son obligatorios</small></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-if="getAllConfig && getAllConfig == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card v-else-if="getAllConfig && getAllConfig.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-refresh-left"></i>
        <span> Configuraciones Anteriores</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllConfig" :default-sort="{prop: 'config_id', order: 'descending'}">
          <el-table-column fixed width="50" prop="config_id" label="#"></el-table-column>
          <el-table-column prop="config_inventario_minimo" label="Inventario Mínimo"></el-table-column>
          <el-table-column prop="config_inventario_maximo" label="Inventario Máximo"></el-table-column>
          <el-table-column prop="config_iva" label="IVA %"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay configuraciones registradas</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import fileDownload from 'js-file-download'
  export default {
    metaInfo: {
      titleTemplate: '%s | Configuración General'
    },
    data () {
      return {
        uploading: false,
        newconfig: {
          config_id: 0,
          config_inventario_minimo: null,
          config_inventario_maximo: null,
          config_iva: null
        }
      }
    },
    methods: {
      add () {
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/configuracion`,
          data: this.newconfig
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `La configuración se agregó correctamente!`,
            type: 'success',
            duration: 0
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.uploading = false
          this.newconfig = {
            config_id: 0,
            config_inventario_minimo: null,
            config_inventario_maximo: null,
            config_iva: null
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
      getSQL () {
        this.axios({
          method: `GET`,
          url: `/respaldo/get`,
          data: this.newconfig
        })
        .then((response) => {
          fileDownload(response.data, 'ivelk.sql');
        })
      }
    },
    computed: {
      getAllConfig () {
        return this.$store.getters.getAllConfig
      },
      getgetAppConfig () {
        return this.$store.getters.getgetAppConfig
      }
    }
  }
</script>
