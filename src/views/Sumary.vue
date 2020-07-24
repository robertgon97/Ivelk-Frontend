<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-row :gutter="20" v-if="getAllSummary && getAllSummary != 'Loading'">
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
      <el-col class="col-md-6 mb-3" v-if="getAllSummary && getAllSummary.ventasPerDay && getAllSummary.ventasPerDay.length">
        <el-card shadow="hover">
          <highcharts :options="returnDataVentasPorDia(getAllSummary.ventasPerDay)"></highcharts>
        </el-card>
      </el-col>
      <el-col class="col-md-6 mb-3" v-if="getAllSummary && getAllSummary.comprasPerDay && getAllSummary.comprasPerDay.length">
        <el-card shadow="hover">
          <highcharts :options="returnDataComprasPorDia(getAllSummary.comprasPerDay)"></highcharts>
        </el-card>
      </el-col>
      <el-col class="col-md-6 mb-3">
        <el-card shadow="hover" v-if="getAllSummary && getAllSummary.auditPerDay && getAllSummary.auditPerDay.length">
          <highcharts :options="returnDataAuditoriaPorDia(getAllSummary.auditPerDay)"></highcharts>
        </el-card>
      </el-col>
      <el-col class="col-md-6 mb-3">
        <el-card shadow="hover" v-if="getAllSummary && getAllSummary.bestBuyItem && getAllSummary.bestBuyItem.length">
          <highcharts :options="returnDataBBuyPorDia(getAllSummary.bestBuyItem)"></highcharts>
        </el-card>
      </el-col>
      <el-col class="col-md-6 mb-3">
        <el-card shadow="hover" v-if="getAllSummary && getAllSummary.bestClient && getAllSummary.bestClient.length">
          <highcharts :options="returnDataBClientPorDia(getAllSummary.bestClient)"></highcharts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Resumen'
    },
    created () {
      // https://github.com/highcharts/highcharts-vue
    },
    methods: {
      returnDataVentasPorDia (array = []) {
        moment.locale('es')
        var resultado = {
          title: {
            text: `Ventas en el mes de ${moment().format('MMMM')}`
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          xAxis: {
            categories: [],
            title: {
              text: 'Días del Mes'
            }
          },
          series: {
            name: moment().format('MMM') || 'Julio',
            data: []
          }
        }
        array.forEach(element => {
          resultado.xAxis.categories.push(element.dia)
          resultado.series.data.push(element.nventas)
        })
        return resultado
      },
      returnDataComprasPorDia (array = []) {
        moment.locale('es')
        var resultado = {
          title: {
            text: `Compras en el mes de ${moment().format('MMMM')}`
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          xAxis: {
            categories: [],
            title: {
              text: 'Días del Mes'
            }
          },
          series: {
            name: moment().format('MMM') || 'Julio',
            data: []
          }
        }
        array.forEach(element => {
          resultado.xAxis.categories.push(element.dia)
          resultado.series.data.push(element.ncompras)
        })
        return resultado
      },
      returnDataAuditoriaPorDia (array = []) {
        moment.locale('es')
        var resultado = {
          title: {
            text: `Movimientos del sistema en el mes de ${moment().format('MMMM')}`
          },
          subtitle: {
            text: '(Auditoría)'
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          xAxis: {
            categories: [],
            title: {
              text: 'Días del Mes'
            }
          },
          series: {
            name: moment().format('MMM') || 'Julio',
            data: []
          }
        }
        array.forEach(element => {
          resultado.xAxis.categories.push(element.dia)
          resultado.series.data.push(element.nauditoria)
        })
        return resultado
      },
      returnDataBBuyPorDia (array = []) {
        moment.locale('es')
        var resultado = {
          title: {
            text: `El artículo más comprado en la tienda`
          },
          subtitle: {
            text: 'Los mejores 3'
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          xAxis: {
            categories: [],
            title: {
              text: 'Artículos'
            }
          },
          series: {
            name: 'Artículos',
            data: []
          }
        }
        array.forEach(element => {
          resultado.xAxis.categories.push(element.articulos_nombres)
          resultado.series.data.push(element.numVendidos)
        })
        return resultado
      },
      returnDataBClientPorDia (array = []) {
        moment.locale('es')
        var resultado = {
          title: {
            text: `Los mejores clientes de la tienda`
          },
          subtitle: {
            text: 'Los que hicieron más compras'
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          xAxis: {
            categories: [],
            title: {
              text: 'Artículos'
            }
          },
          series: {
            name: 'Artículos',
            data: []
          }
        }
        array.forEach(element => {
          resultado.xAxis.categories.push(element.usuario_username)
          resultado.series.data.push(element.nventas)
        })
        return resultado
      }
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
