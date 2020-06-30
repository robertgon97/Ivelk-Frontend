<template>
  <div>
    <el-page-header @back="$router.push(`/`)" content="Historial de Compras" title="Atrás" />
    <br />
    <div v-if="getAllVentaUser && getAllVentaUser == 'Loading'">
      <el-card class="col-10 my-5">
        <h1 class="display-3 text-center">...Cargando</h1>
      </el-card>
    </div>
    <div class="container" v-else-if="getAllVentaUser && getAllVentaUser.length">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <i class="el-icon-shopping-cart-full"></i>
          <span> Tus Órdenes de Compra</span>
          <el-divider direction="vertical"></el-divider>
          <span>Aquí puedes visualizar la lista de ordenes creadas</span>
        </div>
        <el-table class="w-100" :data="getAllVentaUser" :default-sort="{prop: 'ventas_id', order: 'descending'}" v-loading="uploading || getAllVentaUser == 'Loading'">
          <el-table-column label="Orden N°" prop="ventas_id" width="150" sortable></el-table-column>
          <el-table-column label="Estatus" prop="status_nombre" sortable></el-table-column>
          <el-table-column label="Fecha" prop="venta_date" sortable>
            <template slot-scope="props">
              <div class="">
                {{parseFecha(props.row.venta_date)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Total a Pagar" prop="venta_total" sortable>
            <template slot-scope="props">
              <div class="text-primary">
                {{parseMoneda(props.row.venta_total)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Opción" width="100" fixed="right">
            <template slot-scope="props">
              <el-button type="text" class="text-primary" @click="$router.push(`/compras/${props.row.ventas_id}`)">Ver Detalles</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix text-right pt-2">
          <p class="m-0 p-0"><small>Actualmente, tienes {{getAllVentaUser.length}} registro(s)</small></p>
        </div>
      </el-card>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <el-card class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-shopping-cart-1"></i></h1>
        <div class="text-center">
          <h3>Aún no haz realizado tu primera compra!</h3>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Tu historial de órdenes'
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
      parseFecha(value) {
        if (value) {
          moment.locale('es-VE')
          return moment(value).format('LL hh:mm A')
        } else return 'Fecha Inválida'
      }
    },
    computed: {
      getAllVentaUser () {
        return this.$store.getters.getAllVentaUser
      }
    }
  }
</script>
