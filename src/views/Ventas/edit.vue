<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/tienda/ventas` }">Ventas</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/tienda/ventas/${$route.params.ID}` }">Venta N° {{$route.params.ID}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getVentaID && getVentaID == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <div v-else-if="getVentaID && getVentaID.venta.ventas_id">
      <el-row :gutter="20">
        <el-col class="col-md-3 mb-3">
          <el-card shadow="hover">
            <div slot="header" class="clearfix text-primary">
              <i class="el-icon-info text-dark"></i>
              <span class="text-dark"> Resumen</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{getVentaID.venta.status_nombre}}</span>
            </div>
            <div class="resumen">
              <h5 class="text-center">{{getVentaID.venta.venta_tipo_nombre}} N° {{getVentaID.venta.ventas_id}}</h5>
              <p class="text-center"><small>{{parseFecha(getVentaID.venta.venta_date)}}</small></p>
              <el-divider>Cliente</el-divider>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Nombres: </div>
                <div><span class="text-primary">{{getVentaID.venta.personas_name}}</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Apellidos: </div>
                <div><span class="text-primary">{{getVentaID.venta.personas_apellido}}</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Cédula: </div>
                <div><span class="text-primary">{{getVentaID.venta.tipo_documento_letra}}-{{getVentaID.venta.personas_documento_identidad}}</span></div>
              </div>
              <el-divider>Montos</el-divider>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Subtotal: </div>
                <div><span class="text-primary">{{parseMoneda(getVentaID.venta.venta_subtotal)}}</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Total IVA: </div>
                <div><span class="text-primary">{{parseMoneda(getVentaID.venta.venta_iva)}}</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Total: </div>
                <div><span class="text-primary">{{parseMoneda(getVentaID.venta.venta_total)}}</span></div>
              </div>
            </div>
            <div class="clearfix mt-3 text-center text-primary">
              <el-button class="btn-primario" icon="el-icon-printer" :loading="uploading">
                Imprimir
              </el-button>
            </div>
          </el-card>
        </el-col>
        <el-col class="col-md-9 mb-3">
          <el-card shadow="hover">
            <div slot="header" class="clearfix text-success">
              <i class="el-icon-shopping-bag-1"></i>
              <span> Contenido de la Venta</span>
            </div>
            <div class="contenido">
              <el-table :data="getVentaID.items" class="h-100 w-100" v-loading="uploading">
                <el-table-column fixed label="Imagen" width="80">
                  <template slot-scope="props">
                    <div class="demo-basic--circle">
                      <div class="block text-center">
                        <el-avatar shape="square" size="medium" :src="props.row.articulos_imagen_principal || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="articulos_nombres" label="Nombre del Artículo" width="250" />
                <el-table-column prop="ventas_detalle_cantidad" label="Cantidad" width="100" />
                <el-table-column prop="ventas_detalle_precio_base" label="Precio por Unidad" width="150">
                  <template slot-scope="props">
                    <div class="text-primary">
                      {{parseMoneda(props.row.ventas_detalle_precio_base)}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="ventas_detalle_total" label="Total" width="180">
                  <template slot-scope="props">
                    <div class="text-primary">
                      {{parseMoneda(props.row.ventas_detalle_total)}}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Esta orden no existe</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Ver Orden de Compra'
    },
    created() {
      this.find(this.$route.params.ID)
    },
    watch: {
      $route() {
        this.find(this.$route.params.ID)
      }
    },
    methods: {
      find(route) {
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
      },
    },
    computed: {
      getVentaID () {
        return this.$store.getters.getVentaID
      }
    }
  }
</script>
