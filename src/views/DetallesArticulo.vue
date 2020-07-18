<template>
  <div class="container overflow-auto">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/tienda/articulos/${$route.params.ID}` }">Artículo #{{$route.params.ID}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getIDArticulo && getIDArticulo == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <div v-else-if="getIDArticulo && getIDArticulo.articulo.articulos_id">
      <el-row class="m-0 p-0" :gutter="20">
        <el-col class="col-md-7 mb-3">
          <el-carousel class="bg-light">
            <el-carousel-item>
              <el-image fit="scale-down" class="h-100" :src="getIDArticulo.articulo.articulos_imagen_principal || null">
                <div slot="placeholder" class="image-slot">
                  Cargando<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <div class="p-5 text-center">
                    <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
                  </div>
                </div>
              </el-image>
            </el-carousel-item>
            <el-carousel-item v-for="img of getIDArticulo.imagenes" :key="img.imagen_id">
              <el-image fit="scale-down" class="h-100" :src="img.imagen_url || null" :preview-src-list="[img.imagen_url || null]">
                <div slot="placeholder" class="image-slot">
                  Cargando<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <div class="p-5 text-center">
                    <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
                  </div>
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col class="col-md-5 mb-3">
          <el-card class="p-3">
            <h3>{{getIDArticulo.articulo.articulos_nombres}}</h3>
            <h2 class="text-primary">{{parseMoneda(getIDArticulo.articulo.stock_precio)}}</h2>
            <br />
            <p class="m-0 p-0 text-primary"><small>Cantidades disponibles: <b>{{getIDArticulo.articulo.stock_cantidad}} Unidades.</b></small></p>
            <el-input-number class="w-100 my-2" v-model="cantidad" :min="1" :max="getIDArticulo.articulo.stock_cantidad"></el-input-number>
            <el-button :disabled="(getIDArticulo.articulo.stock_cantidad < 1) ? true : false" class="btn btn-primario btn-block" @click="agregarCarrito(getIDArticulo.articulo)" :loading="uploading">Agregar al carrito</el-button>
          </el-card>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="px-5">
        <h3>Detalles del Artículo</h3>
        <p class="text-primary">{{getIDArticulo.articulo.articulos_descripcion}}</p>
        <div class="d-flex flex-wrap justify-content-center">
          <div class="m-2 px-4">
            <small>Categoría</small>
            <p>{{getIDArticulo.articulo.articulo_tipo_nombre}}</p>
          </div>
          <div class="m-2 px-4">
            <small>Marca</small>
            <p>{{getIDArticulo.articulo.articulo_marcas_nombre}}</p>
          </div>
          <div class="m-2 px-4">
            <small>Medida</small>
            <p>{{getIDArticulo.articulo.articulo_medidas_nombre}}</p>
          </div>
          <div class="m-2 px-4">
            <small>Tamaño</small>
            <p>{{getIDArticulo.articulo.articulo_tamano_nombre}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Este artículo no existe</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import axios from 'axios'
  import config from './../config'
  export default {
    metaInfo: {
      titleTemplate: '%s | Detalles del Artículo'
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
        cantidad: 1,
        uploading: false
      }
    },
    methods: {
      find(route) {
        this.$store.dispatch('getIDArticulo', { value: route || this.$route.params.ID })
      },
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
      },
      parseFecha(value) {
        if (value) {
          moment.locale('es-VE')
          return moment(value).format('LL hh:mm A')
        } else return 'Fecha Inválida'
      },
      getIMGS(array) {
        if (!array.length) return [""]
        else {
          var resultados = []
          array.forEach(element => {
            resultados.push(element.imagen_url)
          })
          return resultados
        }
      },
      agregarCarrito(value) {
        this.uploading = true
        axios({
          method: `POST`,
          baseURL: config.backend.url,
          url: `/carrito`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
          },
          data: {
            carrito_detalle_id: 0,
            stock_id: value.stock_id,
            carrito_id: 0,
            carrito_detalle_cantidad: parseInt(this.cantidad) || 1,
            carrito_detalle_precio_base: value.stock_precio,
            carrito_detalle_total: value.stock_precio * parseInt(this.cantidad) || 1
          }
        })
          .then(response => {
            this.uploading = false
            this.$notify({
              title: 'Hecho!',
              message: `Se agregaron ${this.cantidad} unidades de ${value.articulos_nombres} exitosamente a tu carrito!`,
              type: 'success'
            })
            this.cantidad = 1
            console.log('Agregado el articulo ', response.data.appData.config_id)
          })
          .catch(err => {
            if (err.response) {
              switch (err.response.status) {
                case 400:
                  this.$notify({
                    title: 'Error',
                    message: err.response.data.message,
                    type: 'info'
                  })
                  break
                default:
                  this.$notify({
                    title: 'Error',
                    message: `Primero debes iniciar sesión` || err.response.data.message,
                    type: 'info'
                  })
                  break
              }
            } else {
              this.$notify({
                title: 'Error',
                message: 'No tienes conexión a internet. Verifica e inténtalo de nuevo',
                type: 'error'
              })
            }
            this.uploading = false
            // console.clear()
          })
          .finally(() => {
            this.$store.dispatch('getCarritoAll')
          })
      }
    },
    computed: {
      getIDArticulo () {
        return this.$store.getters.getIDArticulo
      }
    }
  }
</script>
