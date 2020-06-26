<template>
  <nav id="navbar" class="navbar navbar-expand-lg fixed-top navbar-dark py-2 bg-white">
    <router-link class="navbar-brand" exact to="/">
      <img src="./../assets/logo.png" height="30" :alt="title">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse pt-2" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" exact to="/inicio">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" exact to="/categorias">Categorías</router-link>
        </li>
      </ul>
    </div>
    <div class="form-inline my-2 my-lg-0">
      <router-link class="btn btn-primary my-2 my-sm-0 text-white" tag="a" exact to="/autenticador/login">Iniciar Sesión</router-link>
    </div>
  </nav>
</template>
<script>
  import config from './../config'
  export default {
    data() {
      return {
        title: config.frontend.titulo
      }
    }
  }
</script>
<style lang="scss" scoped>
  #navbar {
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px #196587;
  }
</style>
