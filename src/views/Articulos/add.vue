<template>
  <div>
    <el-card>
      <form>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Nombre del Artículo</label>
            <el-input type="text" placeholder="Nombre del artículo" v-model="article.articulos_nombres" prefix-icon="el-icon-goods" clearable></el-input>
          </div>
          <div class="col-md-6 mb-3">
            <label>Descripción del Artículo</label>
            <el-input type="text" placeholder="Descripción del artículo" v-model="article.articulos_descripcion" prefix-icon="el-icon-document" clearable></el-input>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Tipo</label>
            <el-select class="w-100" placeholder="Seleccione el tipo de articulo" v-model="article.articulo_tipo_id" clearable></el-select>
          </div>
          <div class="col-md-6 mb-3">
            <label>Marca</label>
            <el-select class="w-100" placeholder="Seleccione la marca del articulo" v-model="article.articulo_marcas_id" clearable></el-select>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Medida</label>
            <el-select class="w-100" placeholder="Seleccione la medida del articulo" v-model="article.articulo_medida_id" clearable></el-select>
          </div>
          <div class="col-md-6 mb-3">
            <label>Tamaño</label>
            <el-select class="w-100" placeholder="Seleccione el tamaño del articulo" v-model="article.articulo_tamano_id" clearable></el-select>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-between">
          <div class="col-md-6 mb-3">
            <label>Imagen</label>
            <el-input type="file" placeholder="Imagen del artículo" v-model="article.articulos_imagen_principal" prefix-icon="el-icon-paperclip" clearable></el-input>
          </div>
        </div>
        <hr />
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-md-3 mb-3 text-center">
            <el-button class="btn-primario" round @click="addArt" v-loading.fullscreen.lock="uploading">Registrar</el-button>
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
          articulos_imagen_principal: null
        },
        uploading: false,
        FormData: new FormData()
      }
    },
    methods: {
      addArt () {
        this.uploading = true
      }
    }
  }
</script>
