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
                <div>IVA: </div>
                <div><span class="text-primary">{{getVentaID.venta.venta_iva}} %</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Subtotal: </div>
                <div><span class="text-primary">{{parseMoneda(getVentaID.venta.venta_subtotal)}}</span></div>
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
              <br>
              <div class="clearfix">
                <p class="text-center text-info"><span>Acciones rápidas de la venta</span></p>
                <div class="d-flex flex-wrap my-3 justify-content-center">
                  <el-button class="btn-primario m-2" plain @click="modificarEstatus = true" :loading="uploading">Cambiar Estatus</el-button>
                  <el-popconfirm confirmButtonText='Sí' cancelButtonText='No, Gracias' icon="el-icon-info" iconColor="red" title="Estás seguro de anular esta orden?" @onConfirm="anular(getVentaID.venta.ventas_id)">
                    <el-button slot="reference" class="btn-primario m-2" plain :loading="uploading">Anular Orden</el-button>
                  </el-popconfirm>
                  <el-tooltip placement="top">
                    <div slot="content">Aquí puedes agregar las transacciones confirmadas del usuario y así abonar el monto a la venta</div>
                    <el-button class="btn-primario m-2" plain @click="agregarPago = true" :loading="uploading">+ Transacción de Pago</el-button>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col class="col-md-12 mb-3">
          <el-card shadow="hover">
            <div slot="header" class="clearfix text-primary">
              <i class="el-icon-shopping-bag-1"></i>
              <span> Lista de Pagos</span>
              <el-divider direction="vertical"></el-divider>
              <span class="text-dark">Total Abonado: </span>
              <span class="text-success"> {{parseMoneda(getTotalAbonado(getVentaID.pagosAbonados))}} </span>
            </div>
            <div>
              <el-table :data="getVentaID.pagosAbonados" class="h-100 w-100" v-loading="uploading">
                <el-table-column fixed prop="balances_abonado_id" label="#" width="80" sortable></el-table-column>
                <el-table-column prop="balances_abonado_transaccion" label="N° Transacción" width="150" sortable></el-table-column>
                <el-table-column prop="balances_abonado_abonado" label="Monto Abonado" width="200" sortable>
                  <template slot-scope="props">
                    <div>
                      <span> {{parseMoneda(props.row.balances_abonado_abonado)}} </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="bancos_nombre" label="Nombre del Banco" width="190" sortable></el-table-column>
                <el-table-column prop="bancos_cuenta" label="Cuenta Destino"  width="200" sortable></el-table-column>
                <el-table-column fixed="right" label="Operaciones" width="100">
                  <template slot-scope="props">
                    <el-popconfirm v-if="props.row.balances_abonado_credito != 9" confirmButtonText='Sí' cancelButtonText='No, Gracias' icon="el-icon-info" iconColor="red" title="Estás seguro de anular esta operación?" @onConfirm="anularPagoBalance(props.row)">
                      <el-button slot="reference" class="text-danger" type="text" size="small" :loading="uploading">Anular</el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
              <el-divider></el-divider>
              <div>
                <div class="d-flex justify-content-center">
                  <p class="m-0 p-0"><small>Mostrando {{getVentaID.pagosAbonados.length}} Registros</small></p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-drawer title="Cambio del Estatus de la Orden" ref="drawer" :before-close="handleClose" :visible.sync="modificarEstatus" direction="rtl" custom-class="demo-drawer overflow-auto">
        <div class="Contenido p-2">
          <form class="" @submit.prevent="modificar(getVentaID.venta)">
            <div class="col-12">
              <label>Estatus de la venta</label>
              <el-select class="w-100" placeholder="Nivel" size="large" v-model="getVentaID.venta.status_id">
                <el-option v-for="status of getAllStatus" :key="status.status_id" :label="status.status_nombre" :value="status.status_id" />
              </el-select>
            </div>
          </form>
          <el-divider></el-divider>
          <div class="d-flex flex-wrap justify-content-between" >
            <el-button class="btn-primario" @click="modificarEstatus = false">Cancelar</el-button>
            <el-button class="btn-primario" @click="modificar(getVentaID.venta)" :loading="uploading">{{ uploading ? 'Enviando ...' : 'Enviar' }}</el-button>
          </div>
        </div>
      </el-drawer>
      <el-drawer title="Abonar referencia de pago" ref="drawerpago" :before-close="handleClose" :visible.sync="agregarPago" direction="rtl" custom-class="demo-drawer overflow-auto">
        <div class="Contenido p-2">
          <form class="" @submit.prevent="agregarPagoBalance(abonado)">
            <div class="col-12 mb-3">
              <label>Seleccione donde se realizó el pago</label>
              <el-select class="w-100" placeholder="Banco donde se realizó el pago" v-model="abonado.banco_id">
                <el-option v-for="banco of getAllBancos" :key="banco.banco_id" :label="banco.bancos_nombre" :value="banco.banco_id" />
              </el-select>
            </div>
            <div class="col-12 mb-3">
              <label>Ingrese el número de transacción del banco</label>
              <el-input type="number" min="0" placeholder="Número de transacción" v-model="abonado.balances_abonado_transaccion" prefix-icon="el-icon-document"></el-input>
            </div>
            <div class="col-12 mb-3">
              <label>Ingrese el Monto del Pago</label>
              <el-input type="number" placeholder="Monto del Pago" min="0" step="0.01" v-model="abonado.balances_abonado_abonado" prefix-icon="el-icon-money"></el-input>
            </div>
          </form>
          <el-divider></el-divider>
          <div class="d-flex flex-wrap justify-content-between" >
            <el-button class="btn-primario" @click="modificarEstatus = false">Cancelar</el-button>
            <el-button class="btn-primario" @click="agregarPagoBalance(abonado, getVentaID.venta.balances_id)" :loading="uploading">{{ uploading ? 'Enviando ...' : 'Enviar' }}</el-button>
          </div>
        </div>
      </el-drawer>
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
    data () {
      return {
        uploading: false,
        modificarEstatus: false,
        agregarPago: false,
        abonado: {
          balances_abonado_id: 0,
          balances_id: 0,
          banco_id: null,
          balances_abonado_transaccion: null,
          balances_abonado_abonado: 0,
          balances_abonado_credito: 1
        }
      }
    },
    methods: {
      find(route) {
        this.$store.dispatch('getVentaID', { value: route || this.$route.params.ID })
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
      getTotalAbonado (array) {
        var total = 0
        array.forEach(element => {
          total = total + (element.balances_abonado_abonado)
        })
        return total
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
            this.loading = false
            this.modificarEstatus = false
            this.agregarPago = false
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
      },
      anular (idventa) {
        this.uploading = true
        this.axios({
          method: `PUT`,
          url: `/orden/anular`,
          data: {
            ventas_id: idventa
          }
        })
        .then(() => {
          this.$notify({
            title: 'Anulación Exitosa!',
            message: `La Orden ${idventa} se anuló correctamente!`,
            type: 'success',
            duration: 0
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find()
          this.uploading = false
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Hubo un error del servidor',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Hubo un problema con la conexión',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      },
      modificar (venta) {
        this.uploading = true
        this.axios({
          method: `PUT`,
          url: `/orden`,
          data: {
            ventas_id: venta.ventas_id,
            venta_tipo_id: venta.venta_tipo_id,
            status_id: venta.status_id,
            banco_id: venta.banco_id,
            personas_id: venta.personas_id,
            venta_date: venta.venta_date,
            venta_iva: venta.venta_iva,
            venta_subtotal: venta.venta_subtotal,
            venta_total: venta.venta_total
          }
        })
        .then(() => {
          this.$notify({
            title: 'Modifcación Exitosa!',
            message: `La Orden ${venta.ventas_id} se modificó correctamente!`,
            type: 'success',
            duration: 0
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find()
          this.uploading = false
          this.modificarEstatus = false
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Hubo un error del servidor',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Hubo un problema con la conexión',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      },
      agregarPagoBalance (venta, balance) {
        venta.balances_id = balance
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/balances/abonar`,
          data: venta
        })
        .then(() => {
          this.$notify({
            title: 'Realizado!',
            message: `La referencia de pago se abonó exitosamente!`,
            type: 'success'
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find()
          this.uploading = false
          this.modificarEstatus = false
          this.agregarPago = false
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Hubo un error del servidor',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Hubo un problema con la conexión',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      },
      anularPagoBalance (venta) {
        venta.balances_abonado_abonado = (venta.balances_abonado_abonado * -1)
        venta.balances_abonado_credito = 9
        this.axios({
          method: `POST`,
          url: `/balances/abonar`,
          data: {
            balances_abonado_id: venta.balances_abonado_id,
            balances_id: venta.balances_id,
            banco_id: venta.banco_id,
            balances_abonado_transaccion: venta.balances_abonado_transaccion,
            balances_abonado_abonado: venta.balances_abonado_abonado,
            balances_abonado_credito: venta.balances_abonado_credito
          }
        })
        .then(() => {
          this.$notify({
            title: 'Realizado!',
            message: `La referencia de pago se anuló exitosamente!`,
            type: 'success'
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find()
          this.uploading = false
          this.modificarEstatus = false
          this.agregarPago = false
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Hubo un error del servidor',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Hubo un problema con la conexión',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      }
    },
    computed: {
      getVentaID () {
        return this.$store.getters.getVentaID
      },
      getAllStatus () {
        return this.$store.getters.getAllStatus
      },
      getAllBancos () {
        return this.$store.getters.getAllBancos
      }
    }
  }
</script>
