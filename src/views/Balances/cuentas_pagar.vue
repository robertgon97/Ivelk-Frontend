<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/balances' }">Balances</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/balances/cuentas/pagar' }">Cuentas por pagar</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllCuentasPagar && getAllCuentasPagar == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllCuentasPagar && getAllCuentasPagar.length">
      <div slot="header" class="clearfix">
        <span>Cuentas Pendientes por pagar</span>
        <el-divider direction="vertical"></el-divider>
      </div>
      <div class="contenido">
        <el-table :data="getAllCuentasPagar" class="w-100">
          <el-table-column fixed prop="balances_id" label="#" width="50"></el-table-column>
          <el-table-column prop="Fecha" label="Fecha" width="210">
            <template slot-scope="props">
              <div class="">
                {{parseFecha(props.row.Fecha)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orden" label="Orden N°">
            <template slot-scope="props">
              {{props.row.compras_id || props.row.ventas_id}}
            </template>
          </el-table-column>
          <el-table-column prop="status_nombre" label="Estatus del proceso"></el-table-column>
          <el-table-column prop="Monto" label="Monto">
            <template slot-scope="props">
              <div>
                <span :class="`text-${(props.row.balances_tipo_id == 1) ? 'danger' : 'primary'}`"> {{parseMoneda(props.row.Monto)}} </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="props">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit" @click="$router.push(`/tienda/${props.row.ventas_id ? `ventas/${props.row.ventas_id}` : `compras/${props.row.compras_id}`}`)">Ver</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="d-flex justify-content-center">
          <p class="m-0 p-0"><small>Mostrando {{getAllCuentasPagar.length}} Registros</small></p>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay cuentas por pagar pendientes</h3>
          <small>Para tener cuentas por pagar debes tener compras con pagos pendientes</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Cuentas por Pagar'
    },
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      getBalance (array) {
        var total = 0
        array.forEach(element => {
          total = total + (element.Monto)
        })
        return total
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
      getAllCuentasPagar () {
        return this.$store.getters.getAllCuentasPagar
      }
    }
  }
</script>
