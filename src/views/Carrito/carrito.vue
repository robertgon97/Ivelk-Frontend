<template>
  <div>
    <el-page-header @back="$router.push(`/`)" content="Carrito" title="Atrás" />
    <br />
    <div v-if="getCarritoAll && getCarritoAll == 'Loading'">
      <el-card class="col-10 my-5">
        <h1 class="display-3 text-center">...Cargando</h1>
      </el-card>
    </div>
    <div v-else-if="getCarritoAll.carrito.length">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <i class="el-icon-shopping-cart-full"></i>
          <span> Tu Carrito</span>
          <el-divider direction="vertical"></el-divider>
          <span>Aquí puedes visualizar la lista de artículos a comprar</span>
        </div>
        <el-table :data="getCarritoAll.carrito" class="w-100" v-loading="uploading">
          <el-table-column fixed label="Imagen" width="150">
            <template slot-scope="props">
              <div class="demo-basic--circle">
                <div class="block text-center">
                  <el-avatar shape="square" size="medium" :src="props.row.articulos_imagen_principal || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articulos_nombres" label="Nombre del Artículo" />
          <el-table-column prop="carrito_detalle_cantidad" label="Cantidad" width="150" />
          <el-table-column prop="carrito_detalle_precio_base" label="Precio por Unidad" width="150">
            <template slot-scope="props">
              <div class="text-primary">
                {{parseMoneda(props.row.carrito_detalle_precio_base)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="carrito_detalle_total" label="Total" width="200">
            <template slot-scope="props">
              <div class="text-primary">
                {{parseMoneda(props.row.carrito_detalle_total)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Opciones" width="100">
            <template slot-scope="props">
              <el-button type="text" class="text-danger" @click="eliminar(props.row)">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix text-right mt-3">
          <p class="m-0 p-0"> SubTotal <span class="text-primary"> {{parseMoneda(getCarritoAll.subtotal)}} </span> </p>
          <p class="m-0 p-0"> IVA ({{getgetAppConfig.config_iva}}%) <span class="text-primary"> {{parseMoneda(getCarritoAll.subtotal * (getgetAppConfig.config_iva * 0.01))}} </span> </p>
          <p class="m-0 p-0"> Total <span class="text-primary"> {{parseMoneda((getCarritoAll.subtotal * (getgetAppConfig.config_iva * 0.01)) + getCarritoAll.subtotal)}} </span> </p>
        </div>
      </el-card>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <el-card class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-shopping-cart-1"></i></h1>
        <div class="text-center">
          <h3>Carrito Vacío</h3>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Tu carrito'
    },
    data () {
      return {
        uploading: false
      }
    },
    methods: {
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
      },
      eliminar(item) {
        this.uploading = true
        this.axios({
          method: `DELETE`,
          url: `/carrito`,
          data: {
            carrito_detalle_id: item.carrito_detalle_id,
            stock_id: item.stock_id,
            carrito_id: item.carrito_id,
            carrito_detalle_cantidad: item.carrito_detalle_cantidad,
            carrito_detalle_precio_base: item.carrito_detalle_precio_base,
            carrito_detalle_total: item.carrito_detalle_total
          }
        })
        .then(response => {
          this.uploading = false
          this.$notify({
            title: 'Hecho!',
            message: `El artículo fué eliminado exitosamente de tu carrito!`,
            type: 'success',
            duration: 5000
          })
          console.log('Eliminado el articulo ', response.data.appData.config_id)
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: err.response.data.message,
              type: 'info'
            })
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
      getCarritoAll () {
        return this.$store.getters.getCarritoAll
      },
      getgetAppConfig () {
        return this.$store.getters.getgetAppConfig
      }
    }
  }
</script>
