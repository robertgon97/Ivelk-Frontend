<template>
  <div class="container">
    <h1 class="display-4 text-center">Todos nuestros artículos.!</h1>
    <div v-if="getAllArticulos && getAllArticulos == 'Loading'" class="py-5 text-center">
      <h3 class="display-4">...Cargando</h3>
    </div>
    <div v-else-if="getAllArticulos && getAllArticulos.length" class="d-flex flex-wrap py-5 bg-light">
      <div v-for="(articulo) in getAllArticulos" :key="articulo.articulos_id" class="col-3 mb-3">
        <item-normal :to="`/articulo/${articulo.articulos_id}`"
        :title="articulo.articulos_nombres" :description="articulo.articulos_descripcion"
        :costo="articulo.stock_precio" :src="[articulo.articulos_imagen_principal || false]"
        :admin="false" :complete="articulo" />
      </div>
    </div>
    <div v-else class="py-5 text-center">
      <h3 class="display-4">Actualmente no tenemos artículos disponibles</h3>
    </div>
  </div>
</template>
<script>
  import config from './../config'
  export default {
    metaInfo: {
      titleTemplate: '%s | Articulos'
    },
    data () {
      return {
        title: config.frontend.titulo,
        search: null
      }
    },
    computed: {
      getAllArticulos () {
        return this.$store.getters.getAllArticulos
      }
    }
  }
</script>
