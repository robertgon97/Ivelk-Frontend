<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos/marcas' }">Marcas</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card class="mb-3">
      <div slot="header" class="clearfix">
        <i class="el-icon-plus"></i>
        <span> Agregar Marca</span>
      </div>
      <div class="contenido">
        <form @submit.prevent="addStatus">
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Nombre <small>(REQUERIDO)</small></label>
              <el-input type="text" placeholder="Nombre" v-model="article.articulo_marcas_nombre" clearable show-word-limit maxlength="100"></el-input>
            </div>
            <div class="col-md-6 mb-3">
              <label>Descripción <small>(REQUERIDO)</small></label>
              <el-input type="text" placeholder="Descripción" v-model="article.articulo_marcas_descripcion" clearable show-word-limit maxlength="300"></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label for="articulo_marcas_imagen">Imagen</label>
              <input class="form-control" type="file" name="articulo_marcas_imagen" id="articulo_marcas_imagen" placeholder="Selecciona tu imagen" accept="image/*" @change="updateImage" />
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-5 mb-3 pt-4 text-center">
              <el-button class="btn-primario mt-2" round @click="addStatus" v-loading.fullscreen.lock="uploading">Agregar Marca</el-button>
            </div>
          </div>
        </form>
      </div>
      <div class="clearfix text-center">
        <p class="m-0 p-0"><small>Todos los campos son obligatorios</small></p>
      </div>
    </el-card>
    <div v-if="getAllMarcas && getAllMarcas == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllMarcas && getAllMarcas.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Marcas</span>
        <el-divider direction="vertical"></el-divider>
        <el-button class="btn-primario" icon="el-icon-sort-down" @click="print">Imprimir reporte</el-button>
      </div>
      <div class="contenido">
        <el-table :data="getAllMarcas">
          <el-table-column fixed width="50" prop="articulo_marcas_id" label="#"></el-table-column>
          <el-table-column prop="articulo_marcas_nombre" label="Nombre"></el-table-column>
          <el-table-column prop="articulo_marcas_descripcion" label="Descripcion"></el-table-column>
          <el-table-column fixed label="Imagen" width="150">
            <template slot-scope="props">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar shape="square" size="medium" :src="props.row.articulo_marcas_imagen || '/noimage.png'"></el-avatar>
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
            <p class="m-0 p-0"><small>Mostrando {{getAllMarcas.length}} Registros</small></p>
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
  import fileDownload from 'js-file-download'
  export default {
    metaInfo: {
      titleTemplate: '%s | Gestión de Marcas'
    },
    data () {
      return {
        uploading: false,
        formData: new FormData(),
        article: {
          articulo_marcas_id: 0,
          articulo_marcas_nombre: null,
          articulo_marcas_descripcion: null
        }
      }
    },
    methods: {
      addStatus () {
        this.uploading = true
        this.formData.delete('articulo_marcas_id')
        this.formData.append('articulo_marcas_id', this.article.articulo_marcas_id)
        this.formData.delete('articulo_marcas_nombre')
        this.formData.append('articulo_marcas_nombre', this.article.articulo_marcas_nombre)
        this.formData.delete('articulo_marcas_descripcion')
        this.formData.append('articulo_marcas_descripcion', this.article.articulo_marcas_descripcion)
        this.axios({
          method: `POST`,
          url: `/marcas`,
          data: this.formData
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `La marca se agregó correctamente!`,
            type: 'success'
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.article = {
            articulo_marcas_id: 0,
            articulo_marcas_nombre: null,
            articulo_marcas_descripcion: null
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
        this.formData.delete('articulo_marcas_imagen')
        if (files.length) {
          for (let image of files) {
            this.formData.append('articulo_marcas_imagen', image, image.name)
          }
        }
      },
      eliminar (marca) {
        this.$confirm('Deseas eliminar esta marca?', 'Estás Seguro de esto?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `DELETE`,
            url: `/marcas`,
            data: {
              articulo_marcas_id: marca.articulo_marcas_id,
              articulo_marcas_nombre: marca.articulo_marcas_nombre,
              articulo_marcas_descripcion: marca.articulo_marcas_descripcion,
              articulo_marcas_imagen: marca.articulo_marcas_imagen || 'aa'
            }
          })
          .then(() => {
            this.$notify({
              title: 'Eliinación Exitosa!',
              message: `La marca ${marca.articulo_marcas_nombre} se eliminó correctamente!`,
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
      },
      print () {
        this.axios({
          method: `GET`,
          url: `/marcas?pdf=true`,
          responseType: 'blob'
        })
        .then((response) => {
          fileDownload(response.data, 'Marcas.pdf');
        })
      }
    },
    computed: {
      getAllMarcas () {
        return this.$store.getters.getAllMarcas
      }
    }
  }
</script>
