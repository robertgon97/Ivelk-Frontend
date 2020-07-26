<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/proveedores' }">Proveedores</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/proveedores/crear' }">Agregar Proveedor</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card>
      <form @submit.prevent="register">
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Razon Social del Proveedor <small>(REQUERIDO)</small></label>
            <el-input type="text" placeholder="Razón social" v-model="proveedores.proveedor_razon_social" prefix-icon="el-icon-goods" clearable show-word-limit maxlength="100"></el-input>
          </div>
          <div class="col-md-2 mb-3">
            <label class="w-100">Tip. Doc.</label>
            <el-select placeholder="Selecciona tu Tipo de Documento" v-model="proveedores.tipo_documento_id">
              <el-option v-for="item in getAllTypeDocumento" :key="item.tipo_documento_id" :label="`${item.tipo_documento_nombre} (${item.tipo_documento_letra})`" :value="item.tipo_documento_id" />
            </el-select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="w-100">Numero de Identificación <small>(REQUERIDO)</small></label>
            <el-input placeholder="123456789-0" type="text" autocomplete="dni" clearable show-word-limit maxlength="9" v-model="proveedores.proveedor_rif"></el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-12 mb-3">
            <label class="w-100">Dirección <small>(REQUERIDO)</small></label>
            <el-input placeholder="Dirección del proveedor" type="text" clearable show-word-limit maxlength="100" v-model="proveedores.proveedor_direccion">
              <i slot="prefix" class="el-input__icon el-icon-position"></i>
            </el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Ciudad <small>(REQUERIDO)</small></label>
            <el-input placeholder="Ciudad" type="text" autocomplete="city" clearable show-word-limit maxlength="20" v-model="proveedores.proveedor_ciudad">
              <i slot="prefix" class="el-input__icon el-icon-position"></i>
            </el-input>
          </div>
          <div class="col-md-6 mb-3">
            <label>Estado <small>(REQUERIDO)</small></label>
            <el-select class="w-100" placeholder="Estado" size="large" v-model="proveedores.proveedor_estado">
              <el-option label="Amazonas" value="Amazonas" />
              <el-option label="Anzoátegui" value="Anzoátegui" />
              <el-option label="Apure" value="Apure" />
              <el-option label="Aragua" value="Aragua" />
              <el-option label="Barinas" value="Barinas" />
              <el-option label="Bolívar" value="Bolívar" />
              <el-option label="Carabobo" value="Carabobo" />
              <el-option label="Caracas" value="Caracas" />
              <el-option label="Cojedes" value="Cojedes" />
              <el-option label="Delta Amacuro" value="Delta Amacuro" />
              <el-option label="Falcón" value="Falcón" />
              <el-option label="Guárico" value="Guárico" />
              <el-option label="Lara" value="Lara" />
              <el-option label="Mérida" value="Mérida" />
              <el-option label="Miranda" value="Miranda" />
              <el-option label="Monagas" value="Monagas" />
              <el-option label="Nueva Esparta" value="Nueva Esparta" />
              <el-option label="Portuguesa" value="Portuguesa" />
              <el-option label="Sucre" value="Sucre" />
              <el-option label="Táchira" value="Táchira" />
              <el-option label="Trujillo" value="Trujillo" />
              <el-option label="Vargas" value="Vargas" />
              <el-option label="Yaracuy" value="Yaracuy" />
              <el-option label="Zulia" value="Zulia" />
            </el-select>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>País <small>(REQUERIDO)</small></label>
            <el-select class="w-100" placeholder="País" size="large" v-model="proveedores.proveedor_pais">
              <el-option label="Venezuela" value="VENEZUELA" />
            </el-select>
          </div>
          <div class="col-md-6 mb-3">
            <label>Correo Electrónico <small>(REQUERIDO)</small></label>
            <el-input placeholder="Correo" type="email" autocomplete="email" clearable v-model="proveedores.proveedor_correo">
              <i slot="suffix" class="el-input__icon el-icon-message"></i>
            </el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Teléfono <small>(REQUERIDO)</small></label>
            <el-input placeholder="Teléfono" type="text" autocomplete="phone" clearable show-word-limit maxlength="11" v-model="proveedores.proveedor_telefono">
              <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
            </el-input>
          </div>
          <div class="col-md-6 mb-3">
            <label>Artículos que Vende</label>
            <el-select class="w-100" placeholder="Seleccionar Varios.." multiple v-model="proveedores.articulos" :loading="(getAllArticulos == 'Loading') ? true : false">
              <el-option v-for="articulo of getAllArticulos" :key="articulo.articulos_id" :label="articulo.articulos_nombres" :value="articulo.articulos_id" />
            </el-select>
          </div>
        </div>
        <hr />
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-3 mb-3 text-center">
            <el-button class="btn-primario" round @click="register" v-loading.fullscreen.lock="uploading">Registrar</el-button>
          </div>
        </div>
      </form>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Registro de Proveedor'
    },
    data () {
      return {
        proveedores: {
          proveedor_id: 0,
          tipo_documento_id: null,
          proveedor_razon_social: null,
          proveedor_rif: null,
          proveedor_direccion: null,
          proveedor_ciudad: null,
          proveedor_estado: null,
          proveedor_pais: 'Venezuela',
          proveedor_correo: null,
          proveedor_telefono: null,
          articulos: []
        },
        uploading: false
      }
    },
    methods: {
      register() {
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/proveedores`,
          data: this.proveedores
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `El proveedor ${this.proveedores.proveedor_razon_social} se registró correctamente!`,
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
      getAllTypeDocumento () {
        return this.$store.getters.getAllTypeDocumento
      },
      getAllArticulos () {
        return this.$store.getters.getAllArticulos
      }
    }
  }
</script>
