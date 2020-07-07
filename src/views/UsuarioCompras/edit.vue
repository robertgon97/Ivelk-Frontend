<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/compras' }">Historial de Compras</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/compras/${$route.params.ID}` }">Ver Orden</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getVentaID && getVentaID == 'Loading'">
      <el-card class="d-flex my-5 justify-content-center">
        <h1 class="display-3 text-center">...Cargando</h1>
      </el-card>
    </div>
    <div v-else-if="getVentaID && getVentaID.venta.ventas_id">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <i class="el-icon-shopping-cart-full"></i>
          <span> Orden de Compra</span>
          <el-divider direction="vertical"></el-divider>
          <span class="text-primary">N° {{getVentaID.venta.ventas_id}}</span>
          <el-divider direction="vertical"></el-divider>
          <span class="text-info">Estatus: {{getVentaID.venta.status_nombre}}</span>
        </div>
        <el-table :data="getVentaID.items" class="w-100" v-loading="uploading">
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
          <el-table-column prop="ventas_detalle_cantidad" label="Cantidad" width="150" />
          <el-table-column prop="ventas_detalle_precio_base" label="Precio por Unidad" width="150">
            <template slot-scope="props">
              <div class="text-primary">
                {{parseMoneda(props.row.ventas_detalle_precio_base)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ventas_detalle_total" label="Total" width="200">
            <template slot-scope="props">
              <div class="text-primary">
                {{parseMoneda(props.row.ventas_detalle_total)}}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix mt-3 d-flex flex-wrap justify-content-between">
          <div class="col-md-6 mb-3">
            <span class="text-primary">BANCO A PAGAR</span>
            <el-divider>Datos del Banco</el-divider>
            <p class="m-0 p-0"><small>{{getVentaID.venta.bancos_nombre || 'Sin Nombre de banco'}}</small></p>
            <p class="m-0 p-0"><small>{{getVentaID.venta.bancos_dni || 'Sin Identificación'}}</small></p>
            <p class="m-0 p-0"><small>{{getVentaID.venta.bancos_cuenta || 'Sin Número de Cuenta'}}</small></p>
            <p class="m-0 p-0"><small>{{getVentaID.venta.bancos_tipo_cuenta || 'Sin tipo de cuenta'}}</small></p>
            <p class="m-0 p-0"><small>{{getVentaID.venta.bancos_telefono || 'Sin teléfono'}}</small></p>
          </div>
          <div class="col-md-5 mb-3">
            <span class="text-primary">Montos Totales</span>
            <el-divider>Resumen</el-divider>
            <div class="d-flex flex-wrap">
              <p class="col-6 m-0 p-0"> IVA: </p>
              <p class="col-6 m0 p-0 text-right"><span class="text-primary"> <span class="text-primary"> {{getVentaID.venta.venta_iva}} % </span> </span></p>
            </div>
            <div class="d-flex flex-wrap">
              <p class="col-6 m-0 p-0"> SubTotal: </p>
              <p class="col-6 m0 p-0 text-right"><span class="text-primary"> {{parseMoneda(getVentaID.venta.venta_subtotal)}} </span></p>
            </div>
            <div class="d-flex flex-wrap">
              <p class="col-6 m-0 p-0"> Total: </p>
              <p class="col-6 m0 p-0 text-right"><span class="text-primary"> {{parseMoneda(getVentaID.venta.venta_total)}} </span></p>
            </div>
          </div>
        </div>
        <el-divider></el-divider>

      </el-card>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <el-card class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-shopping-cart-1"></i></h1>
        <div class="text-center">
          <h3>Esta orden no existe o no te pertenece!</h3>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Visualizar órden'
    },
    created() {
      this.getTitle(this.$route.params.ID)
    },
    watch: {
      $route() {
        this.getTitle(this.$route.params.ID)
      }
    },
    data () {
      return {
        uploading: false
      }
    },
    methods: {
      getTitle(route) {
        if (typeof route != 'string') route = this.$route.params.ID
        this.$store.dispatch('getVentaID', { value: route })
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
      }
    },
    computed: {
      getVentaID () {
        return this.$store.getters.getVentaID
      }
    }
  }
</script>
