<template>
  <div>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }"
      >
        UP
      </div>
    </el-backtop>
    <el-card>
      <div class="contenido">
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-6 mb-3">
            <label>Proveedor</label>
            <el-input type="text" placeholder="Proveedor" prefix-icon="el-icon-user" v-model="item.proveedor_id" clearable></el-input>
          </div>
          <div class="col-md-6 mb-3">
            <label>Artículo</label>
            <el-input type="text" placeholder="Nombre del artículo" prefix-icon="el-icon-goods" v-model="item.stock_id" clearable></el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-6 mb-3">
            <label>Cantidad</label>
            <el-input type="number" placeholder="Cantidad de artículo" min="1" prefix-icon="el-icon-sell" v-model="item.compras_detalle_cantidad" clearable></el-input>
          </div>
          <div class="col-md-3 pt-4 mb-3">
            <el-button class="btn-primario mt-2" round @click="AddToCart" v-loading.fullscreen.lock="uploading">Agregar Item a la Lista</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <br />
    <el-card>
      <div slot="header" class="clearfix">
        <span>Lista de Items a comprar</span>
      </div>
      <div class="contenido d-flex flex-wrap justify-content-between p-1">
        <div class="align-self-center">
          <p class="m-0 p-0">Teléfono Samsung H4</p>
        </div>
        <div class="align-self-center">
          <el-button-group size="mini">
            <el-button @click="SumItem()" type="danger" size="mini" icon="el-icon-minus" round plain></el-button>
            <el-button size="mini" icon="el-icon-sell" round plain disabled>5</el-button>
            <el-button @click="ResItem()" type="primary" size="mini" icon="el-icon-plus" round plain></el-button>
          </el-button-group>
        </div>
        <div class="align-self-center">
          <p class="m-0 p-0">15.000 bs</p>
        </div>
        <div class="align-self-center">
          <el-popconfirm confirmButtonText='Sí' cancelButtonText='No, Gracias' icon="el-icon-info" iconColor="red" title="Estás seguro de eliminar este ítem?" @onConfirm="DelToCart()">
            <el-button type="danger" slot="reference">Eliminar</el-button>
          </el-popconfirm>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="d-flex flex-wrap justify-content-end p-1">
        <div class="align-self-center mx-2">
          <h4><small class="text-muted">SubTotal: 15.000 BS</small></h4>
          <h4><small class="text-muted">IVA (16%) : 3.000 BS</small></h4>
          <h4><small class="text-muted">Total: 17.000 BS</small></h4>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="d-flex justify-content-center">
        <el-button @click="enviarCarrito" class="btn-primario">Procesar Orden de compra</el-button>
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
        item: {
          compras_detalles_id: 0,
          compras_id: null,
          proveedor_id: null,
          stock_id: null,
          compras_detalle_cantidad: null,
          compras_detalles_preciobase: null,
          compras_detalles_total: null
        },
        uploading: false
      }
    },
    methods: {
      AddToCart () {
        this.uploading = true
      },
      DelToCart () {
        console.log('Eliminado del Carrito')
      },
      SumItem () {
        console.log('Sumando al item')
      },
      ResItem () {
        console.log('Restando item')
      },
      enviarCarrito () {
        console.log('Enviando item')
        this.uploading = true
      }
    }
  }
</script>
