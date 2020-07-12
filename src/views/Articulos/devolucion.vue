<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos/devoluciones' }">Lista de Devoluciones</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllDevoluciones && getAllDevoluciones == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <div v-else-if="getAllDevoluciones && getAllDevoluciones.length">
      <el-card>
        <div slot="header" class="clearfix">
          <div slot="header" class="clearfix">
            <i class="el-icon-finished"></i>
            <span> Lista de Devoluciones</span>
          </div>
        </div>
        <div class="contenido">
          <el-table v-loading="uploading" :data="getAllDevoluciones" class="w-100" :default-sort = "{prop: 'articulos_id', order: 'descending'}">
            <el-table-column sortable fixed prop="devolucion_id" label="ID" width="80"></el-table-column>
            <el-table-column width="180" sortable prop="NombreItem" label="Nombre del Artículo"></el-table-column>
            <el-table-column width="300" sortable prop="devolucion_razon" label="Razón"></el-table-column>
            <el-table-column width="200" sortable prop="devolucion_date" label="Fecha de Devolución">
              <template slot-scope="props">
                <div>
                  {{parseFecha(props.row.devolucion_date)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="100" sortable label="ID Orden">
              <template slot-scope="props">
                <div>
                  {{props.row.ventas_id || props.row.compras_id}}
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
            <p class="m-0 p-0"><small>Mostrando {{getAllDevoluciones.length}} Registros</small></p>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay Devoluciones registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Lista de Devoluciones'
    },
    data () {
      return {
        search: {
          articulos_id: null,
          articulos_nombres: null,
          articulo_tipo_nombre: null,
          articulo_marcas_nombre: null,
          articulo_medidas_nombre: null,
          articulo_tamano_nombre: null
        },
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
      },
      searchapi () {
        this.$store.dispatch('getAllDevoluciones', this.search)
      },
      eliminar (articulo) {
        this.$confirm('Deseas eliminar este artículo?', 'Estás Seguro de esto?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `DELETE`,
            url: `/articulos`,
            data: {
              articulos_id: articulo.articulos_id,
              stock_id: articulo.stock_id,
              articulo_tipo_id: 1,
              articulo_marcas_id: 1,
              articulo_medida_id: 1,
              articulo_tamano_id: 1,
              articulos_nombres: 'aaaa',
              articulos_descripcion: 'aaa',
              articulos_imagen_principal: 'aaa',
              stock_cantidad: 0,
              stock_precio: 0
            }
          })
          .then(() => {
            this.$notify({
              title: 'Eliinación Exitosa!',
              message: `El articulo ${articulo.articulos_nombres} se eliminó correctamente!`,
              type: 'success'
            })
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
                message: 'Agunos datos son requeridos o son inválidos',
                type: 'error'
              })
            }
            this.uploading = false
            // console.clear()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Uff... cancelado'
          })
        })
      }
    },
    computed: {
      getAllDevoluciones () {
        return this.$store.getters.getAllDevoluciones
      }
    }
  }
</script>
