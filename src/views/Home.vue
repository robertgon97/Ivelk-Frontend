<template>
  <div>
    <el-carousel :interval="5000" arrow="always" indicator-position="outside" height="400px">
      <el-carousel-item>
        <el-image fit="cover" class="h-100" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mlv-home-desktop-slider-picture-ac746ca0-0aac-4331-b776-b70321f642dd.jpg">
          <div slot="placeholder" class="image-slot">
            Cargando<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <div class="p-5 text-center">
              <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
            </div>
          </div>
        </el-image>
      </el-carousel-item>
      <el-carousel-item>
        <el-image fit="cover" class="h-100" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLV-yo-me-quedo-en-casa/7beaaf60-9076-11ea-a5b3-0b0084fe2988-home-slider_desktop.jpg">
          <div slot="placeholder" class="image-slot">
            Cargando<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <div class="p-5 text-center">
              <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
            </div>
          </div>
        </el-image>
      </el-carousel-item>
      <el-carousel-item>
        <el-image fit="cover" class="h-100" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLV-especial-dia-del-nino/ecff6d00-bd74-11ea-a55e-c3cef0325006-home-slider_desktop.jpg">
          <div slot="placeholder" class="image-slot">
            Cargando<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <div class="p-5 text-center">
              <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
            </div>
          </div>
        </el-image>
      </el-carousel-item>
      <el-carousel-item>
        <el-image fit="cover" class="h-100" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mlv-home-desktop-slider-picture-0bcea931-c615-4797-b8f5-1f54db1c3ace.jpg">
          <div slot="placeholder" class="image-slot">
            Cargando<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <div class="p-5 text-center">
              <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
            </div>
          </div>
        </el-image>
      </el-carousel-item>
      <el-carousel-item>
        <el-image fit="cover" class="h-100" src="https://http2.mlstatic.com/resources/deals/exhibitors_resources/mlv-search-header-background-url-942c9a06-67e3-4aef-8bca-a0df4ef52ba2.jpg">
          <div slot="placeholder" class="image-slot">
            Cargando<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <div class="p-5 text-center">
              <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
            </div>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <div>
      <h1 class="display-4 text-center">Bienvenido a {{title}}! </h1>
      <div class="px-5">
        <form action="search" method="get">
          <el-input placeholder="Buscador de Artículos" name="search" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </form>
      </div>
    </div>
    <br />
    <el-divider>Artículos Recién Agregados</el-divider>
    <div v-if="getAllArticulos && getAllArticulos != 'Loading' && getAllArticulos.length" class="d-flex overflow-auto py-5 bg-light">
      <div v-for="(articulo) in getAllArticulos.slice(0, 20)" :key="articulo.articulos_id" class="col-3">
        <item-normal :to="`/articulos/${articulo.articulos_id}`"
        :title="articulo.articulos_nombres" :description="articulo.articulos_descripcion"
        :costo="articulo.stock_precio" :src="[articulo.articulos_imagen_principal || null]"
        :admin="false" :complete="articulo" />
      </div>
    </div>
    <div v-else-if="getAllArticulos == 'Loading'">
      <h3>Cargando</h3>
    </div>
    <div v-else class="text-center">
      <h3>No tenemos disponible aún ítems para que compres</h3>
    </div>
    <br />
    <el-divider>Nuestras Categorías</el-divider>
    <div v-if="getAllCategoria && getAllCategoria != 'Loading' && getAllCategoria.length" class="d-flex flex-wrap py-5 justify-content-center bg-light">
      <div v-for="category of getAllCategoria" :key="category.articulo_tipo_id" class="border border-primary p-4 m-1 text-center">
        <el-image class="" fit="cover" :src="category.articulo_imagen || null">
          <div slot="placeholder" class="image-slot">
            Cargando<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <div class="text-center">
              <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
            </div>
          </div>
        </el-image>
        <p class="p-0 m-0 text-primary"><small class="text-primary">{{category.articulo_tipo_nombre || 'Sin Nombre'}} </small></p>
        <!-- <p class="p-0 m-0"><small>{{category.articulo_tipo_descripcion || 'Sin Nombre'}} </small></p> -->
      </div>
    </div>
    <div v-else-if="getAllCategoria == 'Loading'">
      <h3>Cargando</h3>
    </div>
    <div v-else class="text-center">
      <h3>No tenemos disponible aún ítems categorías para que las veas</h3>
    </div>
    <br>
    <p class="text-center"><small class="text-dark">{{title}} Copyright 2020 - Todos los derechos reservados</small></p>
  </div>
</template>
<script>
  import config from './../config'
  export default {
    metaInfo: {
      titleTemplate: '%s | Inicio'
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
      },
      getAllCategoria () {
        return this.$store.getters.getAllCategoria
      }
    }
  }
</script>
