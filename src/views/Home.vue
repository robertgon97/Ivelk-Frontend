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
    </el-carousel>
    <div>
      <h1 class="display-4 text-center">Bienvenido a {{title}}! </h1>
      <div class="px-5">
        <el-input placeholder="Buscador de Artículos" v-model="search" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <br />
    <el-divider>Artículos Recién Agregados</el-divider>
    <div class="d-flex overflow-auto py-5 bg-light">
      <div class="col-3">
        <item-normal />
      </div>
      <div class="col-3">
        <item-normal />
      </div>
      <div class="col-3">
        <item-normal />
      </div>
      <div class="col-3">
        <item-normal />
      </div>
      <div class="col-3">
        <item-normal />
      </div>
      <div class="col-3">
        <item-normal />
      </div>
      <div class="col-3">
        <item-normal />
      </div>
      <div class="col-3">
        <item-normal />
      </div>
    </div>
    <br />
    <el-divider>Nuestras Categorías</el-divider>
    <div class="d-flex flex-wrap py-5 justify-content-center bg-light">
      <div class="border border-primary p-4 m-1">
        <p class="p-0 m-0 text-primary"><small class="text-primary">Categoría </small></p>
      </div>
      <div class="border border-primary p-4 m-1">
        <p class="p-0 m-0 text-primary"><small class="text-primary">Categoría </small></p>
      </div>
      <div class="border border-primary p-4 m-1">
        <p class="p-0 m-0 text-primary"><small class="text-primary">Categoría </small></p>
      </div>
      <div class="border border-primary p-4 m-1">
        <p class="p-0 m-0 text-primary"><small class="text-primary">Categoría </small></p>
      </div>
      <div class="border border-primary p-4 m-1">
        <p class="p-0 m-0 text-primary"><small class="text-primary">Categoría </small></p>
      </div>
      <div class="border border-primary p-4 m-1">
        <p class="p-0 m-0 text-primary"><small class="text-primary">Categoría </small></p>
      </div>
      <div class="border border-primary p-4 m-1">
        <p class="p-0 m-0 text-primary"><small class="text-primary">Categoría </small></p>
      </div>
    </div>
    <br>
    <p class="text-center"><small class="text-dark">{{title}} Copyright 2020 - Todos los derechos reservados</small></p>
  </div>
</template>
<script>
  import config from './../config'
  export default {
    data () {
      return {
        title: config.frontend.titulo,
        search: null
      }
    }
  }
</script>
