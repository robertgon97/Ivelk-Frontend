<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/compras' }">Compras</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/compras/editar' }">Crear Orden de Compra</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card>
      <div class="contenido">
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-6 mb-3">
            <label>Proveedor <small>(REQUERIDO)</small></label>
            <el-select class="w-100" placeholder="Proveedor" v-model="item.proveedor_id" :loading="(getAllProveedores == 'Loading') ? true : false">
              <el-option v-for="proveedor of getAllProveedores" :key="proveedor.proveedor_id" :label="proveedor.proveedor_razon_social" :value="proveedor.proveedor_id" />
            </el-select>
          </div>
          <div class="col-md-6 mb-3">
            <label>Artículo <small>(REQUERIDO)</small></label>
            <el-select class="w-100" placeholder="Nombre del Artículo" v-model="item.stock_id" :loading="(getArticulosProveedores == 'Loading') ? true : false">
              <el-option v-for="articulo of getArticulosProveedores" :key="articulo.stock_id" :label="articulo.articulos_nombres" :value="articulo.stock_id" />
            </el-select>
            <!-- {{getArticulosProveedores}} -->
          </div>
        </div>
        <div v-if="item.stock_id && returnItemCantidadDisponible(returnItem(getArticulosProveedores, item.stock_id), getgetAppConfig.config_inventario_maximo) > 0">
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Cantidad <small>(REQUERIDO)</small></label>
              <el-input type="number" placeholder="Cantidad de artículo" min="1" :max="returnItemCantidadDisponible(returnItem(getArticulosProveedores, item.stock_id), getgetAppConfig.config_inventario_maximo)" prefix-icon="el-icon-sell" v-model="item.compras_detalle_cantidad"></el-input>
            </div>
            <div class="col-md-6 mb-3">
              <label>Precio Unidad <small>(REQUERIDO)</small></label>
              <el-input type="number" placeholder="Precio del artículo" min="0" step="0.01" v-model="item.compras_detalles_preciobase" prefix-icon="el-icon-money"></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Precio a la venta <small>(REQUERIDO)</small></label>
              <el-input type="number" placeholder="Precio de venta" min="0" step="0.01" v-model="item.montoDestino" prefix-icon="el-icon-money"></el-input>
            </div>
            <div class="col-md-3 pt-4 mb-3">
              <el-button class="btn-primario mt-2" round @click="AddToCart(item, getgetAppConfig)" v-loading.fullscreen.lock="uploading">Agregar Item a la Lista</el-button>
            </div>
          </div>
        </div>
        <div v-else-if="item.stock_id">
          <p class="text-center"><small>No puedes ingresar más unidades de este artículo.</small></p>
        </div>
      </div>
    </el-card>
    <br />
    <el-card v-if="detalleCompra.length">
      <div slot="header" class="clearfix">
        <span>Lista de Items a comprar</span>
      </div>
      <el-table :data="detalleCompra" class="w-100">
        <el-table-column prop="articulos_nombres" label="Nombre del Artículo" width="200" />
        <el-table-column prop="compras_detalle_cantidad" label="Cantidad" width="200">
          <template slot-scope="props">
            <div class="">
              <el-button-group size="mini">
                <!-- <el-button @click="ResItem(props.row)" type="danger" size="mini" icon="el-icon-minus" round plain></el-button> -->
                <el-button size="mini" icon="el-icon-sell" round plain disabled>{{props.row.compras_detalle_cantidad}}</el-button>
                <!-- <el-button @click="SumItem(props.row)" type="primary" size="mini" icon="el-icon-plus" round plain></el-button> -->
              </el-button-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="compras_detalles_preciobase" label="Precio" width="200">
          <template slot-scope="props">
            <div class="text-primary">
              {{parseMoneda(props.row.compras_detalles_preciobase)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="compras_detalles_total" label="Total" width="200">
          <template slot-scope="props">
            <div class="text-primary">
              {{parseMoneda(props.row.compras_detalles_total)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="montoDestino" label="Monto de Venta" width="200">
          <template slot-scope="props">
            <div class="text-primary">
              {{parseMoneda(props.row.montoDestino)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operaciones" width="120">
          <template slot-scope="props">
            <el-button @click.native.prevent="DelToCart(props.$index)" type="text" size="small">
              Eliminar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <div class="d-flex flex-wrap justify-content-end p-1">
        <div class="align-self-center mx-2">
          <h4><small class="text-muted">SubTotal: {{parseMoneda(getTotal)}}</small></h4>
          <h4><small class="text-muted">IVA ({{getgetAppConfig.config_iva}}%): {{parseMoneda(getTotal * (getgetAppConfig.config_iva * 0.01))}}</small></h4>
          <h4><small class="text-muted">Total: {{parseMoneda((getTotal * (getgetAppConfig.config_iva * 0.01)) + getTotal)}}</small></h4>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="d-flex justify-content-center">
        <el-button @click="enviarCarrito(((getTotal * (getgetAppConfig.config_iva * 0.01)) + getTotal), getTotal, getgetAppConfig.config_iva)" class="btn-primario">Procesar Orden de Venta</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Nueva Orden de Compra'
    },
    data () {
      return {
        compra: {
          compras_id: 0,
          personas_id: null,
          status_id: null,
          compras_created: null,
          compras_iva: null,
          compras_subtotal: null,
          compras_total: null
        },
        detalleCompra: [],
        item: {
          compras_detalles_id: 0,
          compras_id: null,
          proveedor_id: null,
          stock_id: null,
          compras_detalle_cantidad: 1,
          compras_detalles_preciobase: 0,
          compras_detalles_total: 0,
          montoDestino: 0,
          articulos_nombres: null
        },
        uploading: false
      }
    },
    watch: {
      'item.proveedor_id'() {
        this.$store.dispatch('getArticulosProveedores', { value: this.item.proveedor_id })
        this.item.stock_id = null
      }
    },
    methods: {
      AddToCart (item, config) {
        this.getArticulosProveedores.forEach(element => {
          if (element.stock_id == item.stock_id) {
            var elemento = {
              compras_detalles_id: 0,
              compras_id: 0,
              proveedor_id: item.proveedor_id,
              stock_id: element.stock_id,
              compras_detalle_cantidad: item.compras_detalle_cantidad,
              compras_detalles_preciobase: parseFloat(item.compras_detalles_preciobase),
              compras_detalles_total: parseFloat(item.compras_detalles_preciobase) * item.compras_detalle_cantidad,
              montoDestino: item.montoDestino,
              articulos_nombres: element.articulos_nombres
            }
            if (parseInt(item.compras_detalle_cantidad) + parseInt(element.stock_cantidad) <= config.config_inventario_maximo) {
              this.detalleCompra.push(Object.assign({}, elemento))
              this.item = {
                compras_detalles_id: 0,
                compras_id: null,
                proveedor_id: null,
                stock_id: null,
                compras_detalle_cantidad: 1,
                compras_detalles_preciobase: 0,
                compras_detalles_total: 0,
                montoDestino: 0
              }
            } else {
              this.$notify({
                title: 'Error',
                message: 'Esta cantidad sobrepasa la cantidad de stock máximo establecida en el sistema',
                type: 'error'
              })
            }
          }
        })
      },
      DelToCart (item) {
        this.detalleCompra.splice(item, 1)
      },
      SumItem (item) {
        item.compras_detalle_cantidad = item.compras_detalle_cantidad + 1
        item.compras_detalles_total = item.compras_detalle_cantidad * item.compras_detalles_preciobase
      },
      ResItem (item) {
        if (item.compras_detalle_cantidad > 1) {
          item.compras_detalle_cantidad = item.compras_detalle_cantidad - 1
        }
        item.compras_detalles_total = item.compras_detalle_cantidad * item.compras_detalles_preciobase
      },
      enviarCarrito (total, subtotal, iva) {
        this.uploading = true
        this.compra.compras_iva = iva
        this.compra.compras_subtotal = subtotal
        this.compra.compras_total = total
        this.axios({
          method: `POST`,
          url: `/compra`,
          data: {...this.compra, items: this.detalleCompra}
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `La orden de compra se realizo correctamente!`,
            type: 'success'
          })
          this.compra = {
            compras_id: 0,
            personas_id: null,
            status_id: null,
            compras_created: null,
            compras_iva: null,
            compras_subtotal: null,
            compras_total: null
          }
          this.detalleCompra = []
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
              message: 'No tienes internet',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      },
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
      },
      returnItem(itemarray, id) {
        var itemselected = null
        itemarray.forEach(banca => {
          if(banca.stock_id == id) itemselected = banca
        })
        return itemselected
      },
      returnItemCantidadDisponible (item, configmax) {
        return configmax - item.stock_cantidad
      }
    },
    computed: {
      getArticulosProveedores () {
        return this.$store.getters.getArticulosProveedores
      },
      getAllProveedores () {
        return this.$store.getters.getAllProveedores
      },
      getgetAppConfig () {
        return this.$store.getters.getgetAppConfig
      },
      getTotal () {
        var total = 0
        if (this.detalleCompra.length) {
          this.detalleCompra.forEach(item => {
            total = total + item.compras_detalles_total
          })
        }
        return total
      }
    }
  }
</script>
