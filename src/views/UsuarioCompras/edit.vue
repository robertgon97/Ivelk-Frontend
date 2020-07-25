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
      <el-card shadow="hover" class="container">
        <div slot="header" class="clearfix">
          <i class="el-icon-shopping-cart-full"></i>
          <span> Orden de Compra</span>
          <el-divider direction="vertical"></el-divider>
          <span class="text-primary">N° {{getVentaID.venta.ventas_id}}</span>
          <el-divider direction="vertical"></el-divider>
          <span class="text-info">Estatus: {{getVentaID.venta.status_nombre}}</span>
        </div>
        <div class="info mb-2">
          <p class="p-0 m-0"> Emitida a nombre de: <b>{{getMyUser.personas_name}} {{getMyUser.personas_apellido}}</b></p>
          <p class="p-0 m-0"> Razón Social: <b>{{getMyUser.tipo_documento_letra}}{{getMyUser.personas_documento_identidad}}</b></p>
          <p class="p-0 m-0"> Dirección: <b>{{getMyUser.personas_direccion}}</b></p>
          <p class="p-0 m-0"> Ciudad: <b>{{getMyUser.personas_ciudad}}</b></p>
          <p class="p-0 m-0"> Estado: <b>{{getMyUser.personas_estado}}</b></p>
          <p class="p-0 m-0"> País: <b>{{getMyUser.personas_pais}}</b></p>
          <p class="p-0 m-0"> Teléfono: <b>{{getMyUser.personas_telefono}}</b></p>
          <p class="p-0 m-0"> Artículos: </p>
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
          <el-table-column prop="articulos_nombres" label="Nombre del Artículo" width="200" />
          <el-table-column prop="ventas_detalle_cantidad" label="Cantidad" width="100" />
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
            <span class="text-primary">BANCO PREFERENCIAL A PAGAR</span>
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
      </el-card>
      <el-card shadow="hover" class="container mt-3" v-if="getVentaID.pagosAbonados.length">
        <div slot="header" class="clearfix text-primary">
          <i class="el-icon-shopping-bag-1"></i>
          <span> Lista de Pagos</span>
          <el-divider direction="vertical"></el-divider>
          <span class="text-dark">Total Abonado: </span>
          <span class="text-success"> {{parseMoneda(getTotalAbonado(getVentaID.pagosAbonados))}} </span>
          <div v-if="getTotalPagar(getTotalAbonado(getVentaID.pagosAbonados), getVentaID.venta.venta_total) > 0">
            <span class="text-dark">Total por abonar: </span>
            <span class="text-info"> {{parseMoneda(getTotalPagar(getTotalAbonado(getVentaID.pagosAbonados), getVentaID.venta.venta_total))}} </span>
          </div>
        </div>
        <el-table :data="getVentaID.pagosAbonados" class="h-100 w-100" v-loading="uploading">
          <el-table-column prop="balances_abonado_transaccion" label="N° Transacción" width="150" sortable></el-table-column>
          <el-table-column prop="bancos_nombre" label="Nombre del Banco" width="190" sortable></el-table-column>
          <el-table-column prop="balances_abonado_abonado" label="Monto Abonado" width="150" sortable>
            <template slot-scope="props">
              <div>
                <span> {{parseMoneda(props.row.balances_abonado_abonado)}} </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="bancos_cuenta" label="Cuenta Destino"  width="200" sortable></el-table-column>
          <el-table-column prop="bancos_dni" label="Identificación"  width="130" sortable></el-table-column>
          <el-table-column prop="bancos_tipo_cuenta" label="Tipo de Cuenta"  width="140" sortable></el-table-column>
          <el-table-column prop="bancos_telefono" label="Teléfono"  width="200" sortable></el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getVentaID.pagosAbonados.length}} Registros</small></p>
          </div>
        </div>
      </el-card>
      <div class="d-flex flex-wrap justify-content-end mt-2">
        <div v-if="((getVentaID.venta.status_id == 3 || getVentaID.venta.status_id == 4 || getVentaID.venta.status_id == 5) ? false : true)">
          <el-tooltip placement="top">
            <div slot="content">En esta opción puedes añadir las transferencias que hagas al banco</div>
            <el-button class="btn-primario m-2" @click="agregarPago = true" :loading="uploading">+ Referencia de Pago</el-button>
          </el-tooltip>
        </div>
        <el-tooltip placement="top">
          <div slot="content">Imprime esta vista si deseas algún comprobante</div>
          <a :href="`http://localhost:4010/orden/ID/${getVentaID.venta.ventas_id}?pdf=true`" target="_BLANK">
            <el-button class="btn-primario m-2" :loading="uploading">Imprimir comprobante</el-button>
          </a>
        </el-tooltip>
      </div>
      <el-drawer title="Abonar referencia de pago" ref="drawerpago" :before-close="handleClose" :visible.sync="agregarPago" direction="rtl" custom-class="demo-drawer overflow-auto">
        <div class="Contenido p-2">
          <form class="" @submit.prevent="agregarPagoBalance(abonado)">
            <div class="col-12 mb-3">
              <label>Seleccione donde se realizó el pago <small>(Requerido)</small></label>
              <el-select class="w-100" placeholder="Banco donde se realizó el pago" v-model="abonado.banco_id">
                <el-option v-for="banco of getAllBancos" :key="banco.banco_id" :label="banco.bancos_nombre" :value="banco.banco_id" />
              </el-select>
            </div>
            <div v-if="abonado.banco_id && abonado.banco_id > 0" class="col-12 mb-3">
              <b>
                <span class="d-block">{{returnBanco(getAllBancos, abonado.banco_id).bancos_nombre}} </span>
                <span class="d-block">{{returnBanco(getAllBancos, abonado.banco_id).bancos_dni}} </span>
                <span class="d-block">{{returnBanco(getAllBancos, abonado.banco_id).bancos_tipo_cuenta}} </span>
                <span class="d-block">{{returnBanco(getAllBancos, abonado.banco_id).bancos_cuenta}} </span>
                <span class="d-block">{{returnBanco(getAllBancos, abonado.banco_id).bancos_telefono}} </span>
              </b>
            </div>
            <div class="col-12 mb-3">
              <label>Ingrese el número de transacción del banco <small>(Requerido)</small></label>
              <el-input type="number" min="0" placeholder="Número de transacción" v-model="abonado.balances_abonado_transaccion" prefix-icon="el-icon-document"></el-input>
            </div>
            <div class="col-12 mb-3">
              <label>Ingrese el Monto del Pago. <small>(Requerido)</small></label>
              <el-input type="number" placeholder="Ingrese el monto que pago en el banco" min="0" step="0.01" v-model="abonado.balances_abonado_abonado" prefix-icon="el-icon-money"></el-input>
              <small>Nota: el uso de ( . ) y ( , ) indica los decimales</small>
            </div>
          </form>
          <el-divider></el-divider>
          <div class="d-flex flex-wrap justify-content-between" >
            <el-button class="btn-primario" @click="agregarPago = false">Cancelar</el-button>
            <el-button class="btn-primario" @click="agregarPagoBalance(abonado, getVentaID.venta.balances_id)" :loading="uploading">{{ uploading ? 'Enviando ...' : 'Enviar' }}</el-button>
          </div>
        </div>
      </el-drawer>
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
  import fileDownload from 'js-file-download'
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
        uploading: false,
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
      getTitle(route) {
        if (typeof route != 'string') route = this.$route.params.ID
        this.$store.dispatch('getVentaID', { value: route })
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
      print (id) {
        this.axios({
          method: `GET`,
          url: `/orden/ID/${id}?pdf=true`
        })
        .then((response) => {
          fileDownload(response.data, 'Comprobante.pdf');
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
            this.uploading = false
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
      getTotalAbonado (array) {
        var total = 0
        array.forEach(element => {
          total = total + (element.balances_abonado_abonado)
        })
        return parseFloat(total)
      },
      getTotalPagar(abonado, totalventa) {
        return parseFloat(totalventa) - parseFloat(abonado)
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
          this.$store.dispatch('startupClient')
          this.getTitle()
          this.uploading = false
          this.agregarPago = false
          this.abonado = {
            balances_abonado_id: 0,
            balances_id: 0,
            banco_id: null,
            balances_abonado_transaccion: null,
            balances_abonado_abonado: 0,
            balances_abonado_credito: 1
          }
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Los valores que ingresaste no son válidos',
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
      returnBanco(bancos, idbanco) {
        var banco = null
        bancos.forEach(banca => {
          if(banca.banco_id == idbanco) banco = banca
        })
        return banco
      }
    },
    computed: {
      getVentaID () {
        return this.$store.getters.getVentaID
      },
      getAllBancos () {
        return this.$store.getters.getAllBancos
      },
      getMyUser () {
        return this.$store.getters.getMyUser
      }
    }
  }
</script>
