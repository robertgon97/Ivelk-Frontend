<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos/lista' }">Lista de Artículos</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllArticulos && getAllArticulos == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card v-else-if="getAllArticulos && getAllArticulos.length">
      <div slot="header" class="clearfix">
        <form class="d-flex flex-wrap justify-content-between">
          <div class="col-md-3 my-1">
            <el-button class="btn-primario" @click="$store.dispatch('getAllArticulos')">Actualizar Lista</el-button>
          </div>
        </form>
      </div>
      <div class="contenido">
        <el-table :data="getAllArticulos" class="w-100" :default-sort = "{prop: 'articulos_id', order: 'descending'}">
          <el-table-column sortable fixed prop="articulos_id" label="ID" width="80"></el-table-column>
          <el-table-column width="300" sortable prop="articulos_nombres" label="Nombre"></el-table-column>
          <el-table-column width="150" sortable prop="articulo_tipo_nombre" label="Categoría"></el-table-column>
          <el-table-column width="140" sortable prop="stock_id" label="Disponibilidad"></el-table-column>
          <el-table-column width="150" sortable prop="stock_precio" label="Precio">
            <template slot-scope="props">
              <div class="text-primary">
                {{parseMoneda(props.row.stock_precio)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit" @click="$router.push(`/tienda/usuarios/${props.row.usuario_id}`)">Ver</el-button>
              <el-button class="text-danger" type="text" size="small" icon="el-icon-delete">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="d-flex justify-content-center">
          <p class="m-0 p-0"><small>Mostrando {{getAllArticulos.length}} Registros</small></p>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay Artículos registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Lista de Artículos'
    },
    data () {
      return {
        search: null
      }
    },
    methods: {
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
      }
    },
    computed: {
      getAllArticulos () {
        return this.$store.getters.getAllArticulos
      }
    }
  }
</script>
