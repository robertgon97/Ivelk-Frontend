<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/ventas/lista' }">Lista de Ventas</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllVentas && getAllVentas == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <div v-else-if="getAllVentas && getAllVentas.length">
      <el-row :gutter="20">
        <el-col class="col-md-3 mb-3">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-s-operation"></i>
              <span> Filtros</span>
            </div>
            <form @submit.prevent="searchapi" class="text items">
              <div class="col-12 p-0 mb-3">
                <label>Fecha</label>
                <el-input placeholder="Fecha" type="date" clearable v-model="search.venta_date"></el-input>
              </div>
              <div class="col-12 p-0 mb-3">
                <label>Estatus</label>
                <el-select class="w-100" placeholder="Estatus" size="large" v-model="search.status_id">
                  <el-option v-for="status of getAllStatus" :key="status.status_id" :label="status.status_nombre" :value="status.status_id" />
                </el-select>
              </div>
              <div class="col-12 p-0 mb-3">
                <label>Nombre Cliente</label>
                <el-input placeholder="Nombre del cliente" type="text" v-model="search.personas_name" clearable></el-input>
              </div>
              <div class="col-12 p-0 mb-3">
                <label>N° Factura</label>
                <el-input placeholder="123456789" type="number" min="1" v-model="search.ventas_id" clearable></el-input>
              </div>
              <div class="col-12 p-0 mb-3 text-center">
                <button type="submit" class="btn btn-primario">Buscar</button>
              </div>
            </form>
          </el-card>
        </el-col>
        <el-col class="col-md-9 mb-3">
          <el-card shadow="hover" id="print">
            <div slot="header" class="clearfix">
              <i class="el-icon-finished"></i>
              <span> Lista</span>
              <el-divider direction="vertical"></el-divider>
              <el-button class="btn-primario" icon="el-icon-sort-down" @click="print">Imprimir reporte</el-button>
            </div>
            <el-table class="h-100 w-100" :data="getAllVentas" >
              <el-table-column fixed prop="ventas_id" label="N° Factura" width="100"></el-table-column>
              <el-table-column prop="venta_date" label="Fecha" width="220">
                <template slot-scope="props">
                  <div class="">
                    {{parseFecha(props.row.venta_date)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="venta_tipo_nombre" label="Tipo de Venta" width="110"></el-table-column>
              <el-table-column prop="status_nombre" label="Estatus" width="110"></el-table-column>
              <el-table-column prop="personas_name" label="Cliente"></el-table-column>
              <el-table-column prop="venta_total" label="Total" width="200">
                <template slot-scope="props">
                  <div class="text-primary">
                    {{parseMoneda(props.row.venta_total)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="Opciones" width="100">
                <template slot-scope="props">
                  <el-button type="text" class="text-primary" @click="$router.push(`/tienda/ventas/${props.row.ventas_id}`)">Detalles</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Error al cargar su información</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import fileDownload from 'js-file-download'
  export default {
    metaInfo: {
      titleTemplate: '%s | Lista de Ventas del Sistema'
    },
    data () {
      return {
        uploading: false,
        search: {
          venta_date: null,
          status_id: null,
          personas_name: null,
          ventas_id: null
        }
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
      },
      searchapi () {
        this.$store.dispatch('getAllVentas', this.search)
      },
      print () {
        this.axios({
          method: `GET`,
          url: `/orden?pdf=true`,
          responseType: 'blob',
          params: {
            venta_date: this.search.venta_date ? this.search.venta_date : null,
            status_id: this.search.status_id ? this.search.status_id : null,
            personas_name: this.search.personas_name ? this.search.personas_name : null,
            ventas_id: this.search.ventas_id ? this.search.ventas_id : null
          }
        })
        .then((response) => {
          fileDownload(response.data, 'Ventas.pdf');
        })
      }
    },
    computed: {
      getAllVentas () {
        return this.$store.getters.getAllVentas
      },
      getAllStatus () {
        return this.$store.getters.getAllStatus
      }
    }
  }
</script>
