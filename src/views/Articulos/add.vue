<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos/crear' }">Crear Artículo</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card>
      <form @submit.prevent="registro">
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Nombre del Artículo</label>
            <el-input type="text" placeholder="Nombre del artículo" v-model="article.articulos_nombres" prefix-icon="el-icon-goods" clearable show-word-limit maxlength="100"></el-input>
          </div>
          <div class="col-md-6 mb-3">
            <label>Descripción del Artículo</label>
            <el-input type="text" placeholder="Descripción del artículo" v-model="article.articulos_descripcion" prefix-icon="el-icon-document" clearable show-word-limit maxlength="300"></el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Categoría del Artículo</label>
            <el-select class="w-100" placeholder="Categoría del Artículo" v-model="article.articulo_tipo_id">
              <el-option v-for="categoria of getAllCategoria" :key="categoria.articulo_tipo_id" :label="categoria.articulo_tipo_nombre" :value="categoria.articulo_tipo_id" />
            </el-select>
          </div>
          <div class="col-md-6 mb-3">
            <label>Marca</label>
            <el-select class="w-100" placeholder="Marca del Artículo" v-model="article.articulo_marcas_id">
              <el-option v-for="marca of getAllMarcas" :key="marca.articulo_marcas_id" :label="marca.articulo_marcas_nombre" :value="marca.articulo_marcas_id" />
            </el-select>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Medida</label>
            <el-select class="w-100" placeholder="Seleccione la medida del articulo" v-model="article.articulo_medida_id" clearable>
              <el-option v-for="medida of getAllMedidas" :key="medida.articulo_medida_id" :label="medida.articulo_medidas_nombre" :value="medida.articulo_medida_id" />
            </el-select>
          </div>
          <div class="col-md-6 mb-3">
            <label>Tamaño</label>
            <el-select class="w-100" placeholder="Seleccione el tamaño del articulo" v-model="article.articulo_tamano_id" clearable>
              <el-option v-for="tamano of getAllTamanos" :key="tamano.articulo_tamano_id" :label="tamano.articulo_tamano_nombre" :value="tamano.articulo_tamano_id" />
            </el-select>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Cantidad Inicial</label>
            <el-input type="number" placeholder="Cantidad del artículo" min="0" :max="getgetAppConfig.config_inventario_maximo" v-model="article.stock_cantidad" prefix-icon="el-icon-takeaway-box" clearable></el-input>
          </div>
          <div class="col-md-6 mb-3">
            <label>Precio Inicial</label>
            <el-input type="number" placeholder="Precio del artículo" min="0" step="0.01" v-model="article.stock_precio" prefix-icon="el-icon-money" clearable></el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label for="articulos_imagen_principal">Imagen</label>
            <input class="form-control" type="file" name="articulos_imagen_principal" id="articulos_imagen_principal" placeholder="Selecciona tu imagen" accept="image/*" @change="updateImage" />
          </div>
          <div class="col-md-6 mb-3">
            <label>Proveedores Asociados</label>
            <el-select class="w-100" placeholder="Seleccionar Varios.." multiple v-model="article.proveedores" :loading="(getAllProveedores == 'Loading') ? true : false">
              <el-option v-for="articulo of getAllProveedores" :key="articulo.proveedor_id" :label="articulo.proveedor_razon_social" :value="articulo.proveedor_id" />
            </el-select>
          </div>
        </div>
        <hr />
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-3 mb-3 text-center">
            <el-button class="btn-primario" round @click="registro" v-loading.fullscreen.lock="uploading">Registrar</el-button>
          </div>
        </div>
      </form>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Registro de Artículos'
    },
    data () {
      return {
        article: {
          articulos_id: 0,
          articulo_tipo_id: null,
          articulo_marcas_id: null,
          articulo_medida_id: null,
          articulo_tamano_id: null,
          articulos_nombres: null,
          articulos_descripcion: null,
          articulos_imagen_principal: null,
          stock_cantidad: 0,
          stock_precio: 0,
          proveedores: []
        },
        uploading: false,
        formData: new FormData()
      }
    },
    methods: {
      registro () {
        this.uploading = true
        this.formData.delete('articulos_id')
        this.formData.append('articulos_id', this.article.articulos_id)
        this.formData.delete('articulo_tipo_id')
        this.formData.append('articulo_tipo_id', this.article.articulo_tipo_id)
        this.formData.delete('articulo_marcas_id')
        this.formData.append('articulo_marcas_id', this.article.articulo_marcas_id)
        this.formData.delete('articulo_medida_id')
        this.formData.append('articulo_medida_id', this.article.articulo_medida_id)
        this.formData.delete('articulo_tamano_id')
        this.formData.append('articulo_tamano_id', this.article.articulo_tamano_id)
        this.formData.delete('articulos_nombres')
        this.formData.append('articulos_nombres', this.article.articulos_nombres)
        this.formData.delete('articulos_descripcion')
        this.formData.append('articulos_descripcion', this.article.articulos_descripcion)
        this.formData.delete('stock_cantidad')
        this.formData.append('stock_cantidad', this.article.stock_cantidad)
        this.formData.delete('stock_precio')
        this.formData.append('stock_precio', this.article.stock_precio)
        this.formData.delete('proveedores')
        this.formData.append('proveedores', this.article.proveedores)
        this.axios({
          method: `POST`,
          url: `/articulos`,
          data: this.formData
        })
        .then(() => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `El articulo ${this.article.articulos_nombres} se registró correctamente!`,
            type: 'success'
          })
          this.article = {
            articulos_id: 0,
            articulo_tipo_id: null,
            articulo_marcas_id: null,
            articulo_medida_id: null,
            articulo_tamano_id: null,
            articulos_nombres: null,
            articulos_descripcion: null,
            articulos_imagen_principal: null,
            stock_cantidad: 0,
            stock_precio: 0
          }
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
      },
      updateImage (event) {
        let files = event.target.files
        this.formData.delete('articulos_imagen_principal')
        if (files.length) {
          for (let image of files) {
            this.formData.append('articulos_imagen_principal', image, image.name)
          }
        }
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
      },
      getAllProveedores () {
        return this.$store.getters.getAllProveedores
      },
      getgetAppConfig () {
        return this.$store.getters.getgetAppConfig
      }
    }
  }
</script>
