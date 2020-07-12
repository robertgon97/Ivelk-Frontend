<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/tienda/compras` }">Compras</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/tienda/compras/${$route.params.ID}` }">Orden de Compra N° {{$route.params.ID}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getCompraID && getCompraID == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <div v-else-if="getCompraID && getCompraID.compra.compras_id">
      <el-row :gutter="20">
        <el-col class="col-md-3 mb-3">
          <el-card shadow="hover">
            <div slot="header" class="clearfix text-primary">
              <i class="el-icon-info text-dark"></i>
              <span class="text-dark"> Resumen</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{getCompraID.compra.status_nombre}}</span>
            </div>
            <div class="resumen">
              <h5 class="text-center">Orden de compra N° {{getCompraID.compra.compras_id}}</h5>
              <p class="text-center"><small>{{parseFecha(getCompraID.compra.compras_created)}}</small></p>
              <el-divider>Responsable</el-divider>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Nombres: </div>
                <div><span class="text-primary">{{getCompraID.compra.personas_name}}</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Apellidos: </div>
                <div><span class="text-primary">{{getCompraID.compra.personas_apellido}}</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Cédula: </div>
                <div><span class="text-primary">{{getCompraID.compra.tipo_documento_letra}}-{{getCompraID.compra.personas_documento_identidad}}</span></div>
              </div>
              <el-divider>Montos</el-divider>
              <div class="d-flex flex-wrap justify-content-between">
                <div>IVA: </div>
                <div><span class="text-primary">{{getCompraID.compra.compras_iva}} %</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Subtotal: </div>
                <div><span class="text-primary">{{parseMoneda(getCompraID.compra.compras_subtotal)}}</span></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div>Total: </div>
                <div><span class="text-primary">{{parseMoneda(getCompraID.compra.compras_total)}}</span></div>
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
              <el-table :data="getCompraID.items" class="h-100 w-100" v-loading="uploading">
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
                <el-table-column prop="compras_detalle_cantidad" label="Cantidad" width="100" />
                <el-table-column prop="compras_detalles_preciobase" label="Precio por Unidad" width="150">
                  <template slot-scope="props">
                    <div class="text-primary">
                      {{parseMoneda(props.row.compras_detalles_preciobase)}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="compras_detalles_total" label="Total" width="180">
                  <template slot-scope="props">
                    <div class="text-primary">
                      {{parseMoneda(props.row.compras_detalles_total)}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="Operaciones" width="100">
                  <template slot-scope="props">
                    <el-button :disabled="((getCompraID.compra.status_id == 5) ? false : true)" type="text" class="text-primary" @click="$router.push(`/tienda/articulos/devoluciones?compras_id=${props.row.compras_id}&compras_detalles_id=${props.row.compras_detalles_id}`)">Devolución</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <br>
              <div class="clearfix">
                <p class="text-center text-info"><span>Acciones rápidas de la venta</span></p>
                <div class="d-flex flex-wrap my-3 justify-content-center">
                  <el-button v-if="(getCompraID.compra.status_id == 3 || getCompraID.compra.status_id == 5) ? false : true" class="btn-primario m-2" plain @click="modificarEstatus = true" :loading="uploading">Cambiar Estatus</el-button>
                  <el-popconfirm v-if="getCompraID.compra.status_id != 3" confirmButtonText='Sí' cancelButtonText='No, Gracias' icon="el-icon-info" iconColor="red" title="Estás seguro de anular esta orden?" @onConfirm="anular(getCompraID.compra)">
                    <el-button slot="reference" class="btn-primario m-2" plain :loading="uploading">Cancelar Orden</el-button>
                  </el-popconfirm>
                  <div v-if="((getCompraID.compra.status_id == 3 || getCompraID.compra.status_id == 4 || getCompraID.compra.status_id == 5) ? false : true)">
                    <el-tooltip placement="top">
                      <div slot="content">Aquí puedes agregar las transacciones confirmadas del usuario y así abonar el monto a la venta</div>
                      <el-button class="btn-primario m-2" plain @click="agregarPago = true" :loading="uploading">+ Transacción de Pago</el-button>
                    </el-tooltip>
                  </div>
                  <el-tooltip placement="top">
                    <div slot="content">Aquí puedes obtener el comprobante de la venta para el usuario</div>
                    <el-button class="btn-primario m-2" plain>
                      <a class="text-white" href="" target="_BLANK">Imprimir Factura</a>
                    </el-button>
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
              <span class="text-success"> {{parseMoneda(getTotalAbonado(getCompraID.pagosAbonados))}} </span>
              <div v-if="getCompraID.compra.compras_total - getTotalAbonado(getCompraID.pagosAbonados) > 0">
                <span class="text-dark">Total por abonar: </span>
                <span class="text-info"> {{parseMoneda(getCompraID.compra.compras_total - getTotalAbonado(getCompraID.pagosAbonados))}} </span>
              </div>
            </div>
            <div>
              <el-table :data="getCompraID.pagosAbonados" class="h-100 w-100" v-loading="uploading">
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
                  <p class="m-0 p-0"><small>Mostrando {{getCompraID.pagosAbonados.length}} Registros</small></p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col class="col-md-12 mb-3">
          <el-card shadow="hover">
            <div slot="header" class="clearfix text-primary">
              <i class="el-icon-s-ticket"></i>
              <span> Lista de Garantías Realizadas</span>
            </div>
            <el-table v-loading="uploading" :data="getCompraID.garantias" class="w-100" :default-sort = "{prop: 'articulos_id', order: 'descending'}">
              <el-table-column sortable fixed prop="garantia_id" label="ID" width="80"></el-table-column>
              <el-table-column width="100" sortable prop="garantia_valido" label="Valido">
                <template slot-scope="props">
                  <div>
                    <span :class="(props.row.garantia_valido == 1) ? 'text-primary' : 'text-danger'">{{(props.row.garantia_valido == 1) ? 'Válido' : 'No Válido'}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="200" sortable prop="NombreItem" label="Nombre del Artículo"></el-table-column>
              <el-table-column width="250" sortable prop="garantia_date" label="Inicio de la Garantía">
                <template slot-scope="props">
                  <div>
                    {{parseFecha(props.row.garantia_date)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="250" sortable prop="garantia_expiracion" label="Fin de la Garantía">
                <template slot-scope="props">
                  <div>
                    {{parseFecha(props.row.garantia_expiracion)}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col class="col-md-12 mb-3" v-if="getCompraID.devoluciones.length">
          <el-card shadow="hover">
            <div slot="header" class="clearfix text-danger">
              <i class="el-icon-s-release"></i>
              <span> Lista de Devoluciones realizadas</span>
            </div>
            <el-table v-loading="uploading" :data="getCompraID.devoluciones" class="w-100" :default-sort = "{prop: 'articulos_id', order: 'descending'}">
              <el-table-column sortable fixed prop="devolucion_id" label="ID" width="100"></el-table-column>
              <el-table-column width="200" sortable prop="NombreItem" label="Nombre del Artículo"></el-table-column>
              <el-table-column width="400" sortable prop="devolucion_razon" label="Razón"></el-table-column>
              <el-table-column width="250" sortable prop="devolucion_date" label="Fecha de Devolución">
                <template slot-scope="props">
                  <div>
                    {{parseFecha(props.row.devolucion_date)}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-drawer title="Cambio del Estatus de la Orden" ref="drawer" :before-close="handleClose" :visible.sync="modificarEstatus" direction="rtl" custom-class="demo-drawer overflow-auto">
        <div class="Contenido p-2">
          <form class="" @submit.prevent="modificar(getCompraID.compra)">
            <div class="col-12">
              <label>Estatus de la compra</label>
              <el-select class="w-100" placeholder="Nivel" size="large" v-model="getCompraID.compra.status_id">
                <el-option v-for="status of getAllStatus" :key="status.status_id" :label="status.status_nombre" :value="status.status_id" />
              </el-select>
            </div>
          </form>
          <el-divider></el-divider>
          <div class="d-flex flex-wrap justify-content-between" >
            <el-button class="btn-primario" @click="modificarEstatus = false">Cancelar</el-button>
            <el-button class="btn-primario" @click="modificar(getCompraID.compra)" :loading="uploading">{{ uploading ? 'Enviando ...' : 'Enviar' }}</el-button>
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
              <el-input type="number" placeholder="Monto del Pago" min="0" :max="(getCompraID.compra.compras_total - getTotalAbonado(getCompraID.pagosAbonados))" step="0.01" v-model="abonado.balances_abonado_abonado" prefix-icon="el-icon-money"></el-input>
            </div>
          </form>
          <el-divider></el-divider>
          <div class="d-flex flex-wrap justify-content-between" >
            <el-button class="btn-primario" @click="agregarPago = false">Cancelar</el-button>
            <el-button class="btn-primario" @click="agregarPagoBalance(abonado, getCompraID.compra.balances_id)" :loading="uploading">{{ uploading ? 'Enviando ...' : 'Enviar' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Esta compra no existe</h3>
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
        this.$store.dispatch('getCompraID', { value: route || this.$route.params.ID })
      },
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        return numer.toLocaleString('es-VE') + ' Bs.'
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
        idventa.status_id = 3
        this.modificar(idventa)
      },
      modificar (venta) {
        this.uploading = true
        this.axios({
          method: `PUT`,
          url: `/compra`,
          data: {
            compras_id: venta.compras_id,
            personas_id: venta.personas_id,
            status_id: venta.status_id,
            compras_created: venta.compras_created,
            compras_iva: venta.compras_iva,
            compras_subtotal: venta.compras_subtotal,
            compras_total: venta.compras_total
          }
        })
        .then(() => {
          this.$notify({
            title: 'Modifcación Exitosa!',
            message: `La Orden de compra ${venta.compras_id} se modificó correctamente!`,
            type: 'success'
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
        .finally(() => {
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find()
          this.uploading = false
          this.modificarEstatus = false
          this.agregarPago = false
        })
      }
    },
    computed: {
      getCompraID () {
        return this.$store.getters.getCompraID
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
