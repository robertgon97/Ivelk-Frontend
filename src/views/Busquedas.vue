<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/search` }">Búsqueda "<b>{{search.articulos_nombres || $route.query.search}}</b>"</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-row class="m-0 p-0" :gutter="20">
      <el-col class="col-md-4 mb-3">
        <el-card class="sticky-top">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-operation"></i>
            <span> Filtros de búsqueda</span>
          </div>
          <form @submit.prevent="searchFunction" class="text items">
            <div class="d-flex flex-wrap justify-content-around">
              <div class="col-md-12 p-0 mb-2">
                <label>Nombre del Artículo</label>
                <el-input placeholder="Nombre del Artículo" size="mini" type="text" v-model="search.articulos_nombres" clearable></el-input>
              </div>
              <div class="col-md-12 p-0 mb-2">
                <label>Categoría del Artículo</label>
                <el-select class="w-100" placeholder="Categoría del Artículo" size="mini" v-model="search.articulo_tipo_nombre" clearable>
                  <el-option v-for="categoria of getAllCategoria" :key="categoria.articulo_tipo_id" :label="categoria.articulo_tipo_nombre" :value="categoria.articulo_tipo_nombre" />
                </el-select>
              </div>
              <div class="col-md-12 p-0 mb-2">
                <label>Marca del Artículo</label>
                <el-select class="w-100" placeholder="Marca del Artículo" size="mini" v-model="search.articulo_marcas_nombre" clearable>
                  <el-option v-for="marca of getAllMarcas" :key="marca.articulo_marcas_id" :label="marca.articulo_marcas_nombre" :value="marca.articulo_marcas_nombre" />
                </el-select>
              </div>
              <div class="col-md-12 p-0 mb-2">
                <label>Medida del Artículo</label>
                <el-select class="w-100" placeholder="Medida del Artículo" size="mini" v-model="search.articulo_medidas_nombre" clearable>
                  <el-option v-for="medida of getAllMedidas" :key="medida.articulo_medida_id" :label="medida.articulo_medidas_nombre" :value="medida.articulo_medidas_nombre" />
                </el-select>
              </div>
              <div class="col-md-12 p-0 mb-2">
                <label>Tamaño del Artículo</label>
                <el-select class="w-100" placeholder="Medida del Artículo" size="mini" v-model="search.articulo_tamano_nombre" clearable>
                  <el-option v-for="tamano of getAllTamanos" :key="tamano.articulo_tamano_id" :label="tamano.articulo_tamano_nombre" :value="tamano.articulo_tamano_nombre" />
                </el-select>
              </div>
              <div class="col-md-12 p-0 mb-2">
                <label>ID de Artículo</label>
                <el-input placeholder="123456789" size="mini" type="number" min="1" v-model="search.articulos_id" clearable></el-input>
              </div>
            </div>
            <div class="d-flex justify-content-center flex-wrap">
              <el-button size="small" class="btn-primario" @click="searchFunction">Buscar Artículo</el-button>
            </div>
          </form>
        </el-card>
      </el-col>
      <el-col class="col-md-8 mb-3">
        <h2>Resultados para: <small>{{$route.query.search}}</small></h2>
        <el-divider></el-divider>
        <div v-if="resultados && resultados == 'Loading'">
          <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
        </div>
        <div v-else-if="resultados && resultados.length">
          <router-link v-for="item of resultados" tag="a" :key="item.articulos_id" :to="`/articulos/${item.articulos_id}`" class="d-block my-2 text-decoration-none">
            <el-card shadow="hover">
              <div class="media">
                <el-image style="width: 60px;height: 60px" fit="contain" class="align-self-center mr-3" :src="item.articulos_imagen_principal || false">
                  <div slot="placeholder" class="image-slot">
                    Cargando<span class="dot">...</span>
                  </div>
                  <div slot="error" class="image-slot">
                    <div class="p-5 text-center">
                      <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
                    </div>
                  </div>
                </el-image>
                <div class="media-body">
                  <h5 class="mt-0">{{item.articulos_nombres}}</h5>
                  <p class="m-0 p-0">{{item.articulos_descripcion}}</p>
                  <span class="badge badge-primary mx-2">{{item.articulo_tipo_nombre}}</span>
                  <span class="badge badge-primary mx-2">{{item.articulo_marcas_nombre}}</span>
                  <span class="badge badge-primary mx-2">{{item.articulo_medidas_nombre}}</span>
                  <span class="badge badge-primary mx-2">{{item.articulo_tamano_nombre}}</span>
                </div>
              </div>
            </el-card>
          </router-link>
        </div>
        <div v-else class="d-flex my-5 justify-content-center">
          <div class="col-10 my-5">
            <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
            <div class="text-center">
              <h3>Este artículo no existe</h3>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
  import config from './../config'
  export default {
    metaInfo: {
      titleTemplate: '%s | Búsqueda de artículos'
    },
    created () {
      this.search.articulos_nombres = this.$route.query.search
      this.searchFunction()
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
        resultados: [],
        uploading: false
      }
    },
    methods: {
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
      },
      searchFunction() {
        this.uploading = true
        this.$route.query.search = this.search.articulos_nombres
        this.resultados = 'Loading'
        var query = this.search
        axios({
          method: `GET`,
          baseURL: config.backend.url,
          url: `/articulos`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
          },
          params: {
            articulos_id: query.articulos_id ? query.articulos_id : null,
            articulos_nombres: query.articulos_nombres ? query.articulos_nombres : null,
            articulo_tipo_nombre: query.articulo_tipo_nombre ? query.articulo_tipo_nombre : null,
            articulo_marcas_nombre: query.articulo_marcas_nombre ? query.articulo_marcas_nombre : null,
            articulo_medidas_nombre: query.articulo_medidas_nombre ? query.articulo_medidas_nombre : null,
            articulo_tamano_nombre: query.articulo_tamano_nombre ? query.articulo_tamano_nombre : null
          }
        })
        .then(res => {
          this.resultados = res.data.data
          this.uploading = false
          this.$notify({
            title: 'Hecho!',
            message: `Tu busqueda se completó satisfactoriamente.`,
            type: 'success'
          })
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
                  message: `Primero debes iniciar sesión` || err.response.data.message,
                  type: 'info'
                })
                break
            }
          } else {
            this.$notify({
              title: 'Error',
              message: 'No tienes conexión a internet. Verifica e inténtalo de nuevo',
              type: 'error'
            })
          }
          this.uploading = false
          this.resultados = []
          // console.clear()
        })
      }
    },
    computed: {
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
