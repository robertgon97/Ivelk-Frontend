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
      <el-dialog center class="overflow-auto" :visible.sync="verFormulario" title="Crear Devolución del Artículo" :before-close="handleClose" width="70%">
        <form @submit.prevent="enviar(devolucion)">
          <div class="container">
            <div class="d-flex flex-wrap">
              <div class="col-12 mb-3">
                <label>Describa la razón del porqué la devolución de este artículo</label>
                <el-input type="textarea" placeholder="Resumen de la razón de la devolución" v-model="devolucion.devolucion_razon" prefix-icon="el-icon-s-flag" maxlength="500" show-word-limit></el-input>
              </div>
            </div>
          </div>
        </form>
        <span slot="footer" class="dialog-footer text-center">
          <el-button class="btn-primario" @click="handleClose" :loading="uploading">Cancelar</el-button>
          <el-button class="btn-primario" @click="enviar(devolucion)" :loading="uploading">{{ uploading ? 'Creando ...' : 'Crear' }}</el-button>
        </span>
      </el-dialog>
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
    created () {
      if (this.$route.query) {
        if (this.$route.query.ventas_id) this.devolucion.ventas_id = this.$route.query.ventas_id, this.verFormulario = true
        if (this.$route.query.ventas_detalle_id) this.devolucion.ventas_detalle_id = this.$route.query.ventas_detalle_id
        if (this.$route.query.compras_id) this.devolucion.compras_id = this.$route.query.compras_id, this.verFormulario = true
        if (this.$route.query.compras_detalles_id) this.devolucion.compras_detalles_id = this.$route.query.compras_detalles_id
      }
    },
    watch: {
      $route () {
        if (this.$route.query) {
          if (this.$route.query.ventas_id) this.devolucion.ventas_id = this.$route.query.ventas_id, this.verFormulario = true
          if (this.$route.query.ventas_detalle_id) this.devolucion.ventas_detalle_id = this.$route.query.ventas_detalle_id
          if (this.$route.query.compras_id) this.devolucion.compras_id = this.$route.query.compras_id, this.verFormulario = true
          if (this.$route.query.compras_detalles_id) this.devolucion.compras_detalles_id = this.$route.query.compras_detalles_id
        }
      }
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
        devolucion: {
          devolucion_id: 0,
          ventas_detalle_id: 0,
          compras_detalles_id: 0,
          devolucion_razon: null,
          devolucion_date: Date.now(),
          ventas_id: 0,
          compras_id: 0
        },
        verFormulario: false,
        uploading: false
      }
    },
    methods: {
      parseFecha(value) {
        if (value) {
          moment.locale('es-VE')
          return moment(value).format('LL hh:mm A')
        } else return 'Fecha Inválida'
      },
      searchapi () {
        this.$store.dispatch('getAllDevoluciones', this.search)
      },
      enviar (devolucion) {
        this.$confirm('Estás seguro de hacer esta devolución?. Esta acción no se puede deshacer.', 'Estás Seguro de confirmar esta devolución?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `POST`,
            url: `/devoluciones`,
            data: devolucion
          })
          .then(() => {
            this.$notify({
              title: 'Devolución exitosa!',
              message: `La devolución se realizó de forma correcta en la base de datos`,
              type: 'success'
            })
            this.$store.dispatch('startupEscencial')
            this.$store.dispatch('startupAdmin')
            this.uploading = false
            this.router.push('/tienda/articulos/devoluciones')
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
                    message: `Tienes problemas con la conexión a internet. Intente nuevamente.`,
                    type: 'info'
                  })
                  break
              }
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
      },
      handleClose(done) {
        if (this.uploading) {
          return
        }
        this.$confirm('Esto descartará los cambios.', 'Deseas cerrar el formulario?', {
          confirmButtonText: 'SI',
          cancelButtonText: 'NO',
          type: 'warning'
        })
          .then(() => {
            this.$router.push(`/tienda/${this.devolucion.ventas_id ? `ventas/${this.devolucion.ventas_id}` : `compras/${this.devolucion.compras_id}`}`)
            this.uploading = false
            this.verFormulario = false
            done()
            this.$message({
              type: 'success',
              message: 'Listo'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: 'Uff Estuvo Cerca'
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
