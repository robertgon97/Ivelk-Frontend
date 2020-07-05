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
    <div v-else-if="getAllArticulos && getAllArticulos.length">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-operation"></i>
          <span> Filtros</span>
        </div>
        <div>
          <form @submit.prevent="searchapi" class="text items">
            <div class="d-flex flex-wrap justify-content-around">
              <div class="col-md-3 p-0 mb-2 mx-1">
                <label>Nombre del Artículo</label>
                <el-input placeholder="Nombre del Artículo" size="mini" type="text" v-model="search.articulos_nombres" clearable></el-input>
              </div>
              <div class="col-md-3 p-0 mb-2 mx-1">
                <label>Categoría del Artículo</label>
                <el-select class="w-100" placeholder="Categoría del Artículo" size="mini" v-model="search.articulo_tipo_nombre" clearable>
                  <el-option v-for="categoria of getAllCategoria" :key="categoria.articulo_tipo_id" :label="categoria.articulo_tipo_nombre" :value="categoria.articulo_tipo_nombre" />
                </el-select>
              </div>
              <div class="col-md-3 p-0 mb-2 mx-1">
                <label>Marca del Artículo</label>
                <el-select class="w-100" placeholder="Marca del Artículo" size="mini" v-model="search.articulo_marcas_nombre" clearable>
                  <el-option v-for="marca of getAllMarcas" :key="marca.articulo_marcas_id" :label="marca.articulo_marcas_nombre" :value="marca.articulo_marcas_nombre" />
                </el-select>
              </div>
              <div class="col-md-3 p-0 mb-2 mx-1">
                <label>Medida del Artículo</label>
                <el-select class="w-100" placeholder="Medida del Artículo" size="mini" v-model="search.articulo_medidas_nombre" clearable>
                  <el-option v-for="medida of getAllMedidas" :key="medida.articulo_medida_id" :label="medida.articulo_medidas_nombre" :value="medida.articulo_medidas_nombre" />
                </el-select>
              </div>
              <div class="col-md-3 p-0 mb-2 mx-1">
                <label>Tamaño del Artículo</label>
                <el-select class="w-100" placeholder="Medida del Artículo" size="mini" v-model="search.articulo_tamano_nombre" clearable>
                  <el-option v-for="tamano of getAllTamanos" :key="tamano.articulo_tamano_id" :label="tamano.articulo_tamano_nombre" :value="tamano.articulo_tamano_nombre" />
                </el-select>
              </div>
              <div class="col-md-3 p-0 mb-2 mx-1">
                <label>ID de Artículo</label>
                <el-input placeholder="123456789" size="mini" type="number" min="1" v-model="search.articulos_id" clearable></el-input>
              </div>
            </div>
            <div class="d-flex justify-content-center flex-wrap">
              <el-button size="small" class="btn-primario" @click="searchapi">Buscar Artículo</el-button>
            </div>
          </form>
        </div>
      </el-card>
      <br>
      <el-card>
        <div slot="header" class="clearfix">
          <div slot="header" class="clearfix">
            <i class="el-icon-finished"></i>
            <span> Lista de Artículos</span>
          </div>
        </div>
        <div class="contenido">
          <el-table v-loading="uploading" :data="getAllArticulos" class="w-100" :default-sort = "{prop: 'articulos_id', order: 'descending'}">
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
              <template slot-scope="props">
                <el-button class="text-primary" type="text" size="small" icon="el-icon-edit" @click="$router.push(`/tienda/usuarios/${props.row.usuario_id}`)">Ver</el-button>
                <el-button class="text-danger" type="text" size="small" icon="el-icon-delete" @click="eliminar(props.row)">Eliminar</el-button>
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
    </div>
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
      searchapi () {
        this.$store.dispatch('getAllArticulos', this.search)
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
      getAllArticulos () {
        return this.$store.getters.getAllArticulos
      },
      getAllCategoria () {
        return this.$store.getters.getAllCategoria
      },
      getAllMarcas () {
        return this.$store.getters.getAllMarcas
      },
      getAllMedidas () {
        return this.$store.getters.getAllMedidas
      },
      getAllTamanos () {
        return this.$store.getters.getAllTamanos
      }
    }
  }
</script>
