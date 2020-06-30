<template>
  <div class="container">
    <h1 class="display-4 text-center">Nuestras Categorías.!</h1>
    <div v-if="getAllCategoryFields && getAllCategoryFields == 'Loading'" class="py-5 text-center">
      <h3 class="display-4">...Cargando</h3>
    </div>
    <div v-else-if="getAllCategoryFields && getAllCategoryFields.length">
      <div v-for="(category, index) of getAllCategoryFields" :key="index" class="mt-4">
        <el-divider>{{category.articulo_tipo_nombre}}</el-divider>
        <div v-if="category.articles.length" class="row justify-content-center m-0 p-0">
          <div v-for="(articulo) in category.articles" :key="articulo.articulos_id" class="col-3">
            <item-normal :to="`/articulo/${articulo.articulos_id}`"
              :title="articulo.articulos_nombres" :description="articulo.articulos_descripcion"
              :costo="articulo.stock_precio" :src="[articulo.articulos_imagen_principal || false]"
              :admin="false" :complete="articulo" />
            </div>
        </div>
      </div>
    </div>
    <div v-else class="py-5 text-center">
      <h3 class="display-4">Actualmente no tenemos categorías disponibles</h3>
    </div>
  </div>
</template>
<script>
  import config from './../config'
  export default {
    metaInfo: {
      titleTemplate: '%s | Categoria'
    },
    data () {
      return {
        title: config.frontend.titulo,
        search: null
      }
    },
    computed: {
      getAllCategoryFields () {
        return this.$store.getters.getAllCategoryFields
      }
    }
  }
</script>
