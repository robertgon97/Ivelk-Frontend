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
          <router-link class="nav-link" exact to="/articulos">Articulos</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" exact to="/ayuda">Ayuda</router-link>
        </li>
      </ul>
    </div>
    <div v-if="userdata" class="form-inline my-2 my-lg-0">
      <el-button v-if="getCarritoAll && getCarritoAll == 'Loading'" type="text" :loading="true">...</el-button>
      <router-link v-else to="/carrito" class="text-decoration-none">
        <el-badge :value="getCarritoAll.carrito.length" class="item mx-2" type="primary">
          <el-button type="text">
            <i v-if="getCarritoAll.carrito.length" class="el-icon-shopping-cart-full"></i>
            <i v-else class="el-icon-shopping-cart-1"></i>
            Carrito</el-button>
        </el-badge>
      </router-link>
      <el-dropdown class="mx-2">
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i> {{userdata.usuario_username}} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/miuser" class="text-dark">
              <i class="el-icon-user"></i> Mi Usuario
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/compras" class="text-dark">
              <i class="el-icon-goods"></i> Mis Compras
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="userdata.usuarios_tipo_trabajador != 1">
            <router-link to="/tienda" class="text-dark">
              <i class="el-icon-setting"></i> Administrar
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link to="/logout" class="text-dark">
              <i class="el-icon-key"></i> Cerrar Sesión
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else class="form-inline my-2 my-lg-0">
      <router-link class="btn btn-primary my-2 my-sm-0 text-white" tag="a" exact to="/autenticador/login">Iniciar Sesión</router-link>
    </div>
  </nav>
</template>
<script>
  import config from './../config'
  export default {
    created () {
      this.userdata = JSON.parse(localStorage.getItem('ud_ivelk'))
    },
    data() {
      return {
        title: config.frontend.titulo,
        userdata: null
      }
    },
    computed: {
      getCarritoAll () {
        return this.$store.getters.getCarritoAll
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
