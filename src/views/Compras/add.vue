<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>NUEVA ORDEN DE COMPRA</span>
        <el-button style="float: right; padding: 3px 0" type="text">Procesar Orden</el-button>
      </div>
      <div class="contenido">
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-6 mb-3">
            <label>Artículo</label>
            <el-input type="text" placeholder="Nombre del artículo"  prefix-icon="el-icon-goods" clearable></el-input>
          </div>
          <div class="col-md-6 mb-3">
            <label>Proveedor</label>
            <el-input type="text" placeholder="Nombre del artículo"  prefix-icon="el-icon-goods" clearable></el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-6 mb-3">
            <label>Artículo</label>
            <el-input type="text" placeholder="Nombre del artículo"  prefix-icon="el-icon-goods" clearable></el-input>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Registro de Compras'
    },
    data () {
      return {        
        compra: {
          compras_id: 0,
          personas_id: null,
          status_id: null,
          compras_created: null,
          compras_iva: null,
          compras_subtotal: null,
          compras_total: null
        },
        detalleCompra: [
          // {
          //   compras_detalles_id: 0,
          //   compras_id: null,
          //   proveedor_id: null,
          //   stock_id: null,
          //   compras_detalle_cantidad: null,
          //   compras_detalles_preciobase: null,
          //   compras_detalles_total: null
          // }
        ],
        uploading: false
      }
    },
    methods: {
      addProveedor () {
        this.uploading = true
      }
    }
  }
</script>
