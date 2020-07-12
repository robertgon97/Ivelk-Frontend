<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-row :gutter="20">
      <el-col class="col-md-6 mb-3">
        <el-card shadow="hover">
          <div slot="header" class="clearfix text-primary">
            <i class="el-icon-warning-outline"></i>
            <span> Alertas de Inventario</span>
          </div>
          <el-alert class="my-1" v-for="(not, index) in getAllSummary.alertaNiveles" :key="index" type="info" :description="`El artículo ${not.articulos_nombres} ${(getgetAppConfig.config_inventario_minimo >= not.stock_cantidad) ? `Está por debajo de los niveles de stock. Por favor, registre una compra` : `Está por encima de los niveles de stock. Por favor evite el ingreso de nuevas unidades de este artículo.`}`" show-icon :closable="false">
           <div slot="title">
             <router-link :to="`/tienda/articulos/${not.articulos_id}`"> {{not.articulos_nombres}} </router-link>
           </div>
          </el-alert>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Resumen'
    },
    computed: {
      getAllSummary () {
        return this.$store.getters.getAllSummary
      },
      getgetAppConfig () {
        return this.$store.getters.getgetAppConfig
      }
    }
  }
</script>
