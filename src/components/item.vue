<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover">
    <router-link :to="to || '#'" class="text-decoration-none">
      <el-image style="height: 100px" fit="scale-down" :src="src[0] || false" :preview-src-list="src">
        <div slot="placeholder" class="image-slot">
          Cargando<span class="dot">...</span>
        </div>
        <div slot="error" class="image-slot">
          <div class="p-5 text-center">
            <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
          </div>
        </div>
      </el-image>
      <div style="padding: 14px;">
        <span>{{title}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ description | limitador }}</time>
          <el-button type="text" class="button">{{parseMoneda(costo)}}</el-button>
        </div>
      </div>
    </router-link>
    <div v-if="!admin" class="py-1 mx-2 d-flex flex-wrap justify-content-between align-items-center">
      <el-input-number v-model="cantidad" :min="1" :max="complete.stock_cantidad" size="mini"></el-input-number>
      <el-button :disabled="(complete.stock_cantidad < 1) ? true : false" type="primary" icon="el-icon-goods" size="mini" round @click="agregarCarrito(complete)" :loading="uploading">Agregar</el-button>
      <p class="text-center w-100 d-block m-0 p-0"><small>Cantidades Disponibles: {{complete.stock_cantidad}}</small></p>
    </div>
  </el-card>
</template>
<script>
  import axios from 'axios'
  import config from './../config'
  export default {
    props: {
      title: {
        type: String,
        default: "Sin Título"
      },
      description: {
        type: String,
        default: "Sin Descripción"
      },
      costo: {
        type: Number,
        default: () => {
          return 0
        }
      },
      src: {
        type: Array,
        default: () => {
          return []
        }
      },
      to: {
        type: String,
        default: '#'
      },
      admin: {
        type: Boolean,
        default: false
      },
      complete: {
        type: Object
      }
    },
    data () {
      return {
        cantidad: 1,
        uploading: false
      }
    },
    methods: {
      parseMoneda (value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
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
    filters: {
      limitador: (value) => {
        if (!value) return 'Sin Descripción'
        else {
          return value.substr(0, 30) + '...'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .el-image {
    max-height: 300px;
    min-height: 300px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
