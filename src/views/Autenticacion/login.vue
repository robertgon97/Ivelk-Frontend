<template>
  <div>
    <form>
      <div class="row m-0 p-0 justify-content-center">
        <div class="col-md-12 mb-3 text-center">
          <h3>Iniciar Sesión</h3>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center">
        <div class="col-12 col-md-7 mb-3">
          <el-input placeholder="Usuario" type="text" autocomplete="username" clearable v-model="login.user" />
        </div>
        <div class="col-12 col-md-7 mb-3">
          <el-input placeholder="Contraseña" type="password" autocomplete="password" clearable show-password v-model="login.password" />
        </div>
        <div class="col-12 col-md-7 mb-3 text-center">
          <hr />
          <el-button button="submit" class="btn-primario" round>Iniciar Sesion</el-button>
        </div>
        <div class="col-12 text-center">
          <p class="m-0 p-0">No tienes usuario? <router-link to="/autenticador/registro">Regístrate!</router-link> </p>
          <p class="m-0 p-0">Olvidastes tus datos? <router-link to="/autenticador/recuperar">Recupera tu usuario!</router-link> </p>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Login'
    },
    data () {
      return {
        login: {
          user: null,
          password: null
        }
      }
    }
  }
</script>
