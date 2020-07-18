<template>
  <div>
    <form @submit.prevent="changuePassword">
      <div class="row m-0 p-0 justify-content-center">
        <div class="col-md-12 mb-3 text-center">
          <h3>Cambio de Contraseña</h3>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center">
        <div class="col-12 col-md-7 mb-3">
          <label>Seleccione la pregunta de seguridad</label>
          <el-select class="w-100" placeholder="Pregunta de Seguridad" v-model="cambio.usuario_pregunta_seguridad_id">
            <el-option v-for="marca of questions" :key="marca.usuario_pregunta_seguridad_id" :label="marca.usuario_pregunta_seguridad_pregunta" :value="marca.usuario_pregunta_seguridad_id" />
          </el-select>
        </div>
        <div class="col-12 col-md-7 mb-3">
          <el-input placeholder="Escriba la respuesta aquí" type="text" autocomplete="respuesta" clearable v-model="cambio.usuario_pregunta_seguridad_respuesta" />
        </div>
        <div class="col-12 col-md-7 mb-3">
          <el-divider>Ingrese la Nueva Contraseña</el-divider>
        </div>
        <div class="col-12 col-md-7 mb-3">
          <el-input placeholder="Nueva Contraseña" type="password" autocomplete="password" clearable show-password v-model="cambio.usuario_password" />
        </div>
        <div class="col-12 col-md-7 mb-3 text-center">
          <hr />
          <el-button class="btn-primario" round @click="changuePassword" v-loading.fullscreen.lock="uploading">Cambiar Contraseña</el-button>
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
      titleTemplate: '%s | Cambio de contraseña'
    },
    created () {
      this.usuario_id = this.$route.query.usuario_id
      if (!this.usuario_id) {
        this.$router.push(`/autenticador`)
      }
      this.getQuestions()
    },
    data () {
      return {
        usuario_id: null,
        questions: [],
        cambio: {
          usuario_pregunta_seguridad_id: null,
          usuario_pregunta_seguridad_respuesta: null,
          usuario_password: null,
          usuario_id: null
        }
      }
    },
    methods: {
      getQuestions() {
        if (!this.usuario_id) return false
        this.uploading = true
        this.axios({
          method: `GET`,
          url: `/user/recoverquestions`,
          params: {
            usuario_id: this.usuario_id
          }
        })
        .then((respuesta) => {
          this.uploading = false
          if (respuesta.data.data && respuesta.data.data.length) {
            this.questions = respuesta.data.data
            // this.$router.push(`/autenticador/cambiocontrasena?usuario_id=${respuesta.data.data.usuario_id}`)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Este usuario no tiene preguntas de seguridad, consulta con el administrador.',
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
      },
      changuePassword() {
        //
      }
    }
  }
</script>
