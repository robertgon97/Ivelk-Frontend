<template>
  <div>
    <form @submit.prevent="register">
      <div class="row m-0 p-0 justify-content-center">
        <div class="col-md-12 mb-3 text-center">
          <h3>Registro de Cliente</h3>
        </div>
      </div>
      <br />
      <div class="d-flex flex-wrap justify-content-init">
        <div class="col-12 mt-3">
          <h5><small>Datos de autenticación y contacto</small></h5>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Usuario <small>(REQUERIDO)</small></label>
          <el-input placeholder="Usuario" type="text" autocomplete="username" clearable show-word-limit maxlength="30" v-model="registro.usuario_username">
            <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
          </el-input>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Contraseña <small>(REQUERIDO)</small></label>
          <el-input placeholder="Contraseña" type="password" autocomplete="password" clearable show-password v-model="registro.usuario_password" />
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Correo Electrónico <small>(REQUERIDO)</small></label>
          <el-input placeholder="Correo" type="email" autocomplete="email" clearable v-model="registro.usuario_email">
            <i slot="suffix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </div>
        <div class="col-12 mt-3">
          <h5><small>Datos básicos</small></h5>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Nombres <small>(REQUERIDO)</small></label>
          <el-input placeholder="Nombres" type="text" autocomplete="name" clearable show-word-limit maxlength="40" v-model="registro.personas_name">
            <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
          </el-input>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Apellidos <small>(REQUERIDO)</small></label>
          <el-input placeholder="Apellidos" type="text" autocomplete="lastname" clearable show-word-limit maxlength="40" v-model="registro.personas_apellido">
            <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
          </el-input>
        </div>
        <div class="col-12 col-md-2 mb-3">
          <label class="w-100">Tip. Doc.</label>
          <el-select placeholder="Selecciona tu Tipo de Documento" v-model="registro.tipo_documento_id">
            <el-option v-for="item in getAllTypeDocumento" :key="item.tipo_documento_id" :label="`${item.tipo_documento_nombre} (${item.tipo_documento_letra})`" :value="item.tipo_documento_id" />
          </el-select>
        </div>
        <div class="col-12 col-md-4 mb-3">
          <label class="w-100">Numero de Identificación <small>(REQUERIDO)</small></label>
          <el-input placeholder="123456789" type="number" autocomplete="dni" onKeyDown="if(this.value.length==9) return false;" max="999999999" min="1000000" maxlength="9" v-model="registro.personas_documento_identidad">

          </el-input>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Sexo <small>(REQUERIDO)</small></label>
          <el-select class="w-100" placeholder="Sexo" size="large" v-model="registro.personas_sexo">
            <el-option label="Hombre" value="Hombre" />
            <el-option label="Mujer" value="Mujer" />
          </el-select>
        </div>
        <div class="col-12 col-md-6 mb-3">
            <label>Fecha de Nacimiento <small>(REQUERIDO)</small></label>
            <el-input placeholder="Fecha de Nacimiento" type="date" autocomplete="nacimiento" :max="maxDate" clearable v-model="registro.personas_cumple">
            </el-input>
          </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Teléfono <small>(REQUERIDO)</small></label>
          <el-input placeholder="Número de Teléfono" type="text" autocomplete="phone" clearable show-word-limit maxlength="11" v-model="registro.personas_telefono">
            <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
          </el-input>
        </div>
        <div class="col-12 mt-3">
          <h5><small>Dirección del cliente</small></h5>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Dirección <small>(REQUERIDO)</small></label>
          <el-input placeholder="Dirección completa" type="text" autocomplete="direction" clearable show-word-limit maxlength="100" v-model="registro.personas_direccion">
            <i slot="suffix" class="el-input__icon el-icon-position"></i>
          </el-input>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Ciudad <small>(REQUERIDO)</small></label>
          <el-input placeholder="Ciudad" type="text" autocomplete="city" clearable show-word-limit maxlength="20" v-model="registro.personas_ciudad">
            <i slot="suffix" class="el-input__icon el-icon-position"></i>
          </el-input>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Estado <small>(REQUERIDO)</small></label>
          <el-select class="w-100" placeholder="Estado" size="large" v-model="registro.personas_estado">
            <el-option label="Amazonas" value="Amazonas" />
            <el-option label="Anzoátegui" value="Anzoátegui" />
            <el-option label="Apure" value="Apure" />
            <el-option label="Aragua" value="Aragua" />
            <el-option label="Barinas" value="Barinas" />
            <el-option label="Bolívar" value="Bolívar" />
            <el-option label="Carabobo" value="Carabobo" />
            <el-option label="Caracas" value="Caracas" />
            <el-option label="Cojedes" value="Cojedes" />
            <el-option label="Delta Amacuro" value="Delta Amacuro" />
            <el-option label="Falcón" value="Falcón" />
            <el-option label="Guárico" value="Guárico" />
            <el-option label="Lara" value="Lara" />
            <el-option label="Mérida" value="Mérida" />
            <el-option label="Miranda" value="Miranda" />
            <el-option label="Monagas" value="Monagas" />
            <el-option label="Nueva Esparta" value="Nueva Esparta" />
            <el-option label="Portuguesa" value="Portuguesa" />
            <el-option label="Sucre" value="Sucre" />
            <el-option label="Táchira" value="Táchira" />
            <el-option label="Trujillo" value="Trujillo" />
            <el-option label="Vargas" value="Vargas" />
            <el-option label="Yaracuy" value="Yaracuy" />
            <el-option label="Zulia" value="Zulia" />
          </el-select>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>País <small>(REQUERIDO)</small></label>
          <el-select class="w-100" placeholder="País" size="large" v-model="registro.personas_pais">
            <el-option label="Venezuela" value="VENEZUELA" />
          </el-select>
        </div>
        <div class="col-12 mt-3">
          <h5><small>Recuperación del Cliente</small></h5>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Seleccione un pregunta de Seguridad <small>(REQUERIDO)</small></label>
          <el-select class="w-100" placeholder="Seleccione..." size="large" v-model="registro.preguntas[0].pregunta">
            <el-option selected label="Cual es tu Artista Favorito?" value="Cual es tu Artista Favorito?" />
            <el-option label="Cual es el nombre de tu madre?" value="Cual es el nombre de tu madre?" />
            <el-option label="Cual es tu color favorito?" value="Cual es tu color favorito?" />
            <el-option label="Cual es tu comida favorita?" value="Cual es tu comida favorita?" />
            <el-option label="Cual es el nombre de tu mejor amigo?" value="Cual es el nombre de tu mejor amigo?" />
          </el-select>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Respuesta <small>(REQUERIDO)</small></label>
          <el-input placeholder="Respuesta de seguridad" type="password" autocomplete="question1" clearable show-password v-model="registro.preguntas[0].respuesta" />
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Seleccione un pregunta de Seguridad <small>(REQUERIDO)</small></label>
          <el-select class="w-100" placeholder="Seleccione..." size="large" v-model="registro.preguntas[1].pregunta">
            <el-option label="Cual es tu Artista Favorito?" value="Cual es tu Artista Favorito?" />
            <el-option selected label="Cual es el nombre de tu madre?" value="Cual es el nombre de tu madre?" />
            <el-option label="Cual es tu color favorito?" value="Cual es tu color favorito?" />
            <el-option label="Cual es tu comida favorita?" value="Cual es tu comida favorita?" />
            <el-option label="Cual es el nombre de tu mejor amigo?" value="Cual es el nombre de tu mejor amigo?" />
          </el-select>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Respuesta <small>(REQUERIDO)</small></label>
          <el-input placeholder="Respuesta de seguridad" type="password" autocomplete="question2" clearable show-password v-model="registro.preguntas[1].respuesta" />
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Seleccione un pregunta de Seguridad <small>(REQUERIDO)</small></label>
          <el-select class="w-100" placeholder="Seleccione..." size="large" v-model="registro.preguntas[2].pregunta">
            <el-option label="Cual es tu Artista Favorito?" value="Cual es tu Artista Favorito?" />
            <el-option label="Cual es el nombre de tu madre?" value="Cual es el nombre de tu madre?" />
            <el-option selected label="Cual es tu color favorito?" value="Cual es tu color favorito?" />
            <el-option label="Cual es tu comida favorita?" value="Cual es tu comida favorita?" />
            <el-option label="Cual es el nombre de tu mejor amigo?" value="Cual es el nombre de tu mejor amigo?" />
          </el-select>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>Respuesta <small>(REQUERIDO)</small></label>
          <el-input placeholder="Respuesta de seguridad" type="password" autocomplete="question2" clearable show-password v-model="registro.preguntas[2].respuesta" />
        </div>
        <div class="col-12 mb-3 text-center">
          <hr />
          <el-button class="btn-primario" round @click="register" v-loading.fullscreen.lock="uploading">Regístrate</el-button>
        </div>
        <div class="col-12 text-center">
          <p class="m-0 p-0">Ya tienes usuario? <router-link to="/autenticador/login">Inicia Sesión!</router-link> </p>
          <p class="m-0 p-0">Olvidastes tus datos? <router-link to="/autenticador/recuperar">Recupera tu contraseña!</router-link> </p>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Regístrate!'
    },
    data () {
      return {
        registro: {
          usuarios_tipo_id: 3,
          usuario_username: null,
          usuario_password: null,
          usuario_email: null,
          tipo_documento_id: null,
          personas_name: null,
          personas_apellido: null,
          personas_documento_identidad: null,
          personas_sexo: null,
          personas_cumple: null,
          personas_direccion: null,
          personas_ciudad: null,
          personas_estado: null,
          personas_pais: 'VENEZUELA',
          personas_telefono: null,
          preguntas: [
            {
              pregunta: 'Cual es tu Artista Favorito?',
              respuesta: null
            },
            {
              pregunta: 'Cual es tu Artista Favorito?',
              respuesta: null
            },
            {
              pregunta: 'Cual es tu Artista Favorito?',
              respuesta: null
            }
          ]
        },
        uploading: false
      }
    },
    methods: {
      register() {
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/user`,
          data: this.registro
        })
        .then(response => {
          this.$notify({
            title: 'Registro Exitoso!',
            message: `Bienvenido, ${response.data.data.usuario.usuarios_tipo_nombre} ${response.data.data.usuario.usuario_username}!`,
            type: 'success',
            duration: 0
          })
          const loading = this.$loading({
            lock: true,
            text: 'Cargando...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0)'
          })
          localStorage.setItem('token_ivelk', response.data.data.token)
          localStorage.setItem('ud_ivelk', JSON.stringify(response.data.data.usuario))
          this.$store.dispatch('startupClient')
          this.$store.dispatch('startupEscencial')
          this.$router.push(`/`)
          this.uploading = false
          location.reload()
          setTimeout(() => {
            loading.close()
          }, 2000)
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      }
    },
    computed: {
      getAllTypeUsers () {
        return this.$store.getters.getAllTypeUsers
      },
      getAllTypeDocumento () {
        return this.$store.getters.getAllTypeDocumento
      },
      maxDate () {
        return moment().subtract(18, 'years').format('YYYY-MM-DD')
      }
    }
  }
</script>
