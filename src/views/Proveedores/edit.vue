<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/proveedores' }">Proveedores</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/tienda/proveedores/${$route.params.ID}` }">Proveedor #{{$route.params.ID}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getIDProveedores && getIDProveedores == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <div v-else-if="getIDProveedores && getIDProveedores.proveedor_id">
      <el-card>
        <div slot="header" class="clearfix">
          <i class="el-icon-finished"></i>
          <span> Detalles del Proveedor</span>
        </div>
        <div>
          <form @submit.prevent="register(getIDProveedores)">
            <div class="row m-0 p-0 justify-content-between">
              <div class="col-md-6 mb-3">
                <label>Razon Social del Proveedor</label>
                <el-input type="text" placeholder="Razón social" v-model="getIDProveedores.proveedor_razon_social" prefix-icon="el-icon-goods" clearable show-word-limit maxlength="100"></el-input>
              </div>
              <div class="col-md-2 mb-3">
                <label class="w-100">Tip. Doc.</label>
                <el-select placeholder="Selecciona tu Tipo de Documento" v-model="getIDProveedores.tipo_documento_id">
                  <el-option v-for="item in getAllTypeDocumento" :key="item.tipo_documento_id" :label="`${item.tipo_documento_nombre} (${item.tipo_documento_letra})`" :value="item.tipo_documento_id" />
                </el-select>
              </div>
              <div class="col-md-4 mb-3">
                <label class="w-100">Numero de Identificación</label>
                <el-input placeholder="123456789-0" type="text" autocomplete="dni" clearable show-word-limit maxlength="9" v-model="getIDProveedores.proveedor_rif"></el-input>
              </div>
            </div>
            <div class="row m-0 p-0 justify-content-between">
              <div class="col-md-12 mb-3">
                <label class="w-100">Dirección</label>
                <el-input placeholder="Dirección del proveedor" type="text" clearable show-word-limit maxlength="100" v-model="getIDProveedores.proveedor_direccion">
                  <i slot="prefix" class="el-input__icon el-icon-position"></i>
                </el-input>
              </div>
            </div>
            <div class="row m-0 p-0 justify-content-between">
              <div class="col-md-6 mb-3">
                <label>Ciudad</label>
                <el-input placeholder="Ciudad" type="text" autocomplete="city" clearable show-word-limit maxlength="20" v-model="getIDProveedores.proveedor_ciudad">
                  <i slot="prefix" class="el-input__icon el-icon-position"></i>
                </el-input>
              </div>
              <div class="col-md-6 mb-3">
                <label>Estado</label>
                <el-select class="w-100" placeholder="Estado" size="large" v-model="getIDProveedores.proveedor_estado">
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
                <label>País</label>
                <el-select class="w-100" placeholder="País" size="large" v-model="getIDProveedores.proveedor_pais">
                  <el-option label="Venezuela" value="VENEZUELA" />
                </el-select>
              </div>
              <div class="col-md-6 mb-3">
                <label>Correo Electrónico</label>
                <el-input placeholder="Correo" type="email" autocomplete="email" clearable v-model="getIDProveedores.proveedor_correo">
                  <i slot="suffix" class="el-input__icon el-icon-message"></i>
                </el-input>
              </div>
            </div>
            <div class="row m-0 p-0 justify-content-between">
              <div class="col-md-6 mb-3">
                <label>Teléfono</label>
                <el-input placeholder="Teléfono" type="text" autocomplete="phone" clearable show-word-limit maxlength="11" v-model="getIDProveedores.proveedor_telefono">
                  <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
                </el-input>
              </div>
              <!-- <div class="col-md-6 mb-3">
                <label>Artículos que Vende</label>
                <el-select class="w-100" placeholder="Seleccionar Varios.." multiple v-model="proveedores.articulos" :loading="(getAllArticulos == 'Loading') ? true : false">
                  <el-option v-for="articulo of getAllArticulos" :key="articulo.articulos_id" :label="articulo.articulos_nombres" :value="articulo.articulos_id" />
                </el-select>
              </div> -->
            </div>
            <hr />
            <div class="row m-0 p-0 justify-content-center">
              <div class="col-md-3 mb-3 text-center">
                <el-button class="btn-primario" round @click="register(getIDProveedores)" v-loading.fullscreen.lock="uploading">Guardar</el-button>
              </div>
            </div>
          </form>
        </div>
      </el-card>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Este proveedor no existe</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Editar de Proveedor'
    },
    created() {
      this.find(this.$route.params.ID)
    },
    watch: {
      $route() {
        this.find(this.$route.params.ID)
      }
    },
    data () {
      return {
        uploading: false
      }
    },
    methods: {
      find(route) {
        this.$store.dispatch('getIDProveedores', { value: route || this.$route.params.ID })
      },
      register(proveedor) {
        this.uploading = true
        this.axios({
          method: `PUT`,
          url: `/proveedores`,
          data: proveedor
        })
        .then(() => {
          this.$notify({
            title: 'Modificación Exitosa!',
            message: `El proveedor ${proveedor.proveedor_razon_social} se registró correctamente!`,
            type: 'success',
            duration: 3
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find(this.$route.params.ID)
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
      getIDProveedores () {
        return this.$store.getters.getIDProveedores
      },
      getAllTypeDocumento () {
        return this.$store.getters.getAllTypeDocumento
      },
      getAllArticulos () {
        return this.$store.getters.getAllArticulos
      }
    }
  }
</script>
