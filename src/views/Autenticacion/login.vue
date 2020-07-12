<template>
  <div>
    <form @submit.prevent="loginBackend">
      <div class="row m-0 p-0 justify-content-center">
        <div class="col-md-12 mb-3 text-center">
          <h3>Iniciar Sesión</h3>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center">
        <div class="col-12 col-md-7 mb-3">
          <el-input placeholder="Usuario" type="text" autocomplete="username" clearable v-model="login.usuario_username" />
        </div>
        <div class="col-12 col-md-7 mb-3">
          <el-input placeholder="Contraseña" type="password" autocomplete="password" clearable show-password v-model="login.usuario_password" />
        </div>
        <div class="col-12 col-md-7 mb-3 text-center">
          <hr />
          <el-button class="btn-primario" round @click="loginBackend" v-loading.fullscreen.lock="uploading">Iniciar Sesion</el-button>
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
          usuario_username: null,
          usuario_password: null
        },
        uploading: false
      }
    },
    methods: {
      loginBackend() {
        // this.$router.push(`/tienda`)
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/user/login`,
          data: this.login
        })
        .then(response => {
          this.uploading = false
          this.$notify({
            title: 'Autenticación Exitosa!',
            message: `Bienvenido, ${response.data.data.usuario.usuarios_tipo_nombre} ${response.data.data.usuario.usuario_username}!`,
            type: 'success',
            duration: 0
          })
          const loading = this.$loading({
            lock: true,
            text: 'Cargando...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.6)'
          })
          localStorage.setItem('token_ivelk', response.data.data.token)
          localStorage.setItem('ud_ivelk', JSON.stringify(response.data.data.usuario))
          this.$store.dispatch('startupEscencial')
          switch (response.data.data.usuario.usuarios_tipo_trabajador) {
            case 1:
              this.$store.dispatch('startupClient')
              this.$router.push(`/`)
              break
            default:
              this.$store.dispatch('startupAdmin')
              this.$router.push(`/tienda`)
              break;
          }
          location.reload()
          setTimeout(() => {
            loading.close()
          }, 2000)
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: err.response.data.message,
              type: 'info'
            })
          } else {
            this.$notify({
              title: 'Error',
              message: 'No tienes conexión a internet. Verifica e inténtalo de nuevo',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      }
    }
  }
</script>
