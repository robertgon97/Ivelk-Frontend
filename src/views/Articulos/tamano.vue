<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos/tamanos' }">Tamaños</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card class="mb-3">
      <div slot="header" class="clearfix">
        <i class="el-icon-plus"></i>
        <span> Agregar Medida</span>
      </div>
      <div class="contenido">
        <form @submit.prevent="addStatus">
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Nombre</label>
              <el-input type="text" placeholder="Nombre" v-model="article.articulo_tamano_nombre" clearable></el-input>
            </div>
            <div class="col-md-6 mb-3">
              <label>Diminutivo</label>
              <el-input type="text" placeholder="Diminutivo" v-model="article.articulo_tamano_letra" clearable></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Descripcion</label>
              <el-input type="text" placeholder="Descripcion" v-model="article.articulo_tamano_descripcion" clearable></el-input>
            </div>
            <div class="col-md-6 mb-3">
              <label for="articulo_tamano_imagen">Imagen</label>
              <input class="form-control" type="file" name="articulo_tamano_imagen" id="articulo_tamano_imagen" placeholder="Selecciona tu imagen" accept="image/*" @change="updateImage" />
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-5 mb-3 pt-4 text-center">
              <el-button class="btn-primario mt-2" round @click="addStatus" v-loading.fullscreen.lock="uploading">Agregar Medida</el-button>
            </div>
          </div>
        </form>
      </div>
      <div class="clearfix text-center">
        <p class="m-0 p-0"><small>Todos los campos son obligatorios</small></p>
      </div>
    </el-card>
    <div v-if="getAllTamanos && getAllTamanos == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllTamanos && getAllTamanos.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Medidas</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllTamanos">
          <el-table-column fixed width="50" prop="articulo_tamano_id" label="#"></el-table-column>
          <el-table-column prop="articulo_tamano_nombre" label="Nombre" width="250"></el-table-column>
          <el-table-column prop="articulo_tamano_letra" label="Dm." width="50"></el-table-column>
          <el-table-column prop="articulo_tamano_descripcion" label="Descripcion" width="300"></el-table-column>
          <el-table-column fixed label="Imagen" width="100">
            <template slot-scope="props">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar shape="square" size="medium" :src="props.row.articulo_tamano_imagen || '/noimage.png'"></el-avatar>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="props">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit">Editar</el-button>
              <el-button class="text-danger" type="text" size="small" icon="el-icon-delete" @click="eliminar(props.row)">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllTamanos.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay estatus registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Gestión de Tamaños'
    },
    data () {
      return {
        uploading: false,
        formData: new FormData(),
        article: {
          articulo_tamano_id: 0,
          articulo_tamano_nombre: null,
          articulo_tamano_letra: null,
          articulo_tamano_descripcion: null
        }
      }
    },
    methods: {
      addStatus () {
        this.uploading = true
        this.formData.delete('articulo_tamano_id')
        this.formData.append('articulo_tamano_id', this.article.articulo_tamano_id)
        this.formData.delete('articulo_tamano_nombre')
        this.formData.append('articulo_tamano_nombre', this.article.articulo_tamano_nombre)
        this.formData.delete('articulo_tamano_letra')
        this.formData.append('articulo_tamano_letra', this.article.articulo_tamano_letra)
        this.formData.delete('articulo_tamano_descripcion')
        this.formData.append('articulo_tamano_descripcion', this.article.articulo_tamano_descripcion)
        this.axios({
          method: `POST`,
          url: `/tamanos`,
          data: this.formData
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `El tamaño se agregó correctamente!`,
            type: 'success'
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.article = {
            articulo_tamano_id: 0,
            articulo_tamano_nombre: null,
            articulo_tamano_letra: null,
            articulo_tamano_descripcion: null
          }
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
      },
      updateImage (event) {
        let files = event.target.files
        this.formData.delete('articulo_tamano_imagen')
        if (files.length) {
          for (let image of files) {
            this.formData.append('articulo_tamano_imagen', image, image.name)
          }
        }
      },
      eliminar (marca) {
        this.$confirm('Deseas eliminar este tamaño?', 'Estás Seguro de esto?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `DELETE`,
            url: `/tamanos`,
            data: {
              articulo_tamano_id: marca.articulo_tamano_id,
              articulo_tamano_nombre: marca.articulo_tamano_nombre,
              articulo_tamano_letra: marca.articulo_tamano_letra,
              articulo_tamano_descripcion: marca.articulo_tamano_descripcion,
              articulo_tamano_imagen: marca.articulo_tamano_imagen || 'aa'
            }
          })
          .then(() => {
            this.$notify({
              title: 'Eliinación Exitosa!',
              message: `El tamaño ${marca.articulo_tamano_nombre} se eliminó correctamente!`,
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
      getAllTamanos () {
        return this.$store.getters.getAllTamanos
      }
    }
  }
</script>
