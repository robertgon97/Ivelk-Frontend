<template>
  <div>
    <form @submit.prevent="findUser">
      <div class="row m-0 p-0 justify-content-center">
        <div class="col-md-12 mb-3 text-center">
          <h3>Búsqueda de Usuario</h3>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center">
        <div class="col-12 col-md-7 mb-3">
          <el-input placeholder="Usuario" type="text" autocomplete="username" clearable v-model="login.usuario_username" />
        </div>
        <div class="col-12 col-md-7 mb-3 text-center">
          <hr />
          <el-button class="btn-primario" round @click="findUser" v-loading.fullscreen.lock="uploading">Buscar usuario</el-button>
        </div>
        <div class="col-12 text-center">
          <p class="m-0 p-0">Quieres crear un nuevo usuario? <router-link to="/autenticador/registro">Regístrate!</router-link> </p>
          <p class="m-0 p-0">Recordastes tus datos? <router-link to="/autenticador/login">Regresa al login!</router-link> </p>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Recuperación de Usuario'
    },
    data () {
      return {
        login: {
          usuario_username: null
        },
        uploading: false
      }
    },
    methods: {
      findUser() {
        if (!this.login.usuario_username) return false
        this.uploading = true
        this.axios({
          method: `GET`,
          url: `/user/username`,
          params: {
            username: this.login.usuario_username
          }
        })
        .then((respuesta) => {
          this.uploading = false
          if (respuesta.data.data && respuesta.data.data.usuario_id) {
            this.$router.push(`/autenticador/cambiocontrasena?usuario_id=${respuesta.data.data.usuario_id}`)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Este usuario no existe, inténtalo de nuevo.',
              type: 'error'
            })
          }
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
