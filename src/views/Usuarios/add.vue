<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/usuarios/crear' }">Registro de Usuario</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <i class="el-icon-plus"></i>
        <span> Agregar Usuario</span>
      </div>
      <form @submit.prevent="register">
        <div class="d-flex flex-wrap justify-content-init">
          <div class="col-12 mt-3">
            <h5><small>Datos de autenticación y contacto</small></h5>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Usuario</label>
            <el-input maxlength="30" show-word-limit placeholder="Usuario" type="text" autocomplete="username" clearable v-model="registro.usuario_username">
              <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
            </el-input>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Contraseña</label>
            <el-input maxlength="30" show-word-limit placeholder="Contraseña" type="password" autocomplete="password" clearable show-password v-model="registro.usuario_password" />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Correo Electrónico</label>
            <el-input maxlength="40" show-word-limit placeholder="Correo" type="email" autocomplete="email" clearable v-model="registro.usuario_email">
              <i slot="suffix" class="el-input__icon el-icon-message"></i>
            </el-input>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Nivel de Usuario</label>
            <el-select class="w-100" placeholder="Nivel" size="large" v-model="registro.usuarios_tipo_id">
              <el-option v-for="tipo of getAllTypeUsers" :key="tipo.usuarios_tipo_id" :label="tipo.usuarios_tipo_nombre" :value="tipo.usuarios_tipo_id" />
            </el-select>
          </div>
          <div class="col-12 mt-3">
            <h5><small>Datos básicos</small></h5>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Nombres</label>
            <el-input maxlength="40" show-word-limit placeholder="Nombres" type="text" autocomplete="name" clearable v-model="registro.personas_name">
              <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
            </el-input>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Apellidos</label>
            <el-input maxlength="40" show-word-limit placeholder="Apellidos" type="text" autocomplete="lastname" clearable v-model="registro.personas_apellido">
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
            <label class="w-100">Numero de Identificación</label>
            <el-input maxlength="9" show-word-limit placeholder="123456789" type="text" autocomplete="dni" clearable v-model="registro.personas_documento_identidad">

            </el-input>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Sexo</label>
            <el-select class="w-100" placeholder="Sexo" size="large" v-model="registro.personas_sexo">
              <el-option label="Hombre" value="Hombre" />
              <el-option label="Mujer" value="Mujer" />
            </el-select>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Fecha de Nacimiento</label>
            <el-input placeholder="Fecha de Nacimiento" type="date" autocomplete="nacimiento" :max="maxDate" clearable v-model="registro.personas_cumple">
            </el-input>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Teléfono</label>
            <el-input maxlength="11" show-word-limit placeholder="Número de Teléfono" type="text" autocomplete="phone" clearable v-model="registro.personas_telefono">
              <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
            </el-input>
          </div>
          <div class="col-12 mt-3">
            <h5><small>Dirección del usuario</small></h5>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Dirección</label>
            <el-input maxlength="100" show-word-limit placeholder="Dirección completa" type="text" autocomplete="direction" clearable v-model="registro.personas_direccion">
              <i slot="suffix" class="el-input__icon el-icon-position"></i>
            </el-input>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Ciudad</label>
            <el-input maxlength="20" show-word-limit placeholder="Ciudad" type="text" autocomplete="city" clearable v-model="registro.personas_ciudad">
              <i slot="suffix" class="el-input__icon el-icon-position"></i>
            </el-input>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Estado</label>
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
            <label>País</label>
            <el-select class="w-100" placeholder="País" size="large" v-model="registro.personas_pais">
              <el-option label="Venezuela" value="VENEZUELA" />
            </el-select>
          </div>
          <div class="col-12 mt-3">
            <h5><small>Recuperación del Usuario</small></h5>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Seleccione un pregunta de Seguridad</label>
            <el-select class="w-100" placeholder="Seleccione..." size="large" v-model="registro.preguntas[0].pregunta">
              <el-option selected label="Cual es tu Artista Favorito?" value="Cual es tu Artista Favorito?" />
              <el-option label="Cual es el nombre de tu madre?" value="Cual es el nombre de tu madre?" />
              <el-option label="Cual es tu color favorito?" value="Cual es tu color favorito?" />
              <el-option label="Cual es tu comida favorita?" value="Cual es tu comida favorita?" />
              <el-option label="Cual es el nombre de tu mejor amigo?" value="Cual es el nombre de tu mejor amigo?" />
            </el-select>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Respuesta</label>
            <el-input placeholder="Respuesta de seguridad" type="password" autocomplete="question1" clearable show-password v-model="registro.preguntas[0].respuesta" />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Seleccione un pregunta de Seguridad</label>
            <el-select class="w-100" placeholder="Seleccione..." size="large" v-model="registro.preguntas[1].pregunta">
              <el-option label="Cual es tu Artista Favorito?" value="Cual es tu Artista Favorito?" />
              <el-option selected label="Cual es el nombre de tu madre?" value="Cual es el nombre de tu madre?" />
              <el-option label="Cual es tu color favorito?" value="Cual es tu color favorito?" />
              <el-option label="Cual es tu comida favorita?" value="Cual es tu comida favorita?" />
              <el-option label="Cual es el nombre de tu mejor amigo?" value="Cual es el nombre de tu mejor amigo?" />
            </el-select>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Respuesta</label>
            <el-input placeholder="Respuesta de seguridad" type="password" autocomplete="question2" clearable show-password v-model="registro.preguntas[1].respuesta" />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Seleccione un pregunta de Seguridad</label>
            <el-select class="w-100" placeholder="Seleccione..." size="large" v-model="registro.preguntas[2].pregunta">
              <el-option label="Cual es tu Artista Favorito?" value="Cual es tu Artista Favorito?" />
              <el-option label="Cual es el nombre de tu madre?" value="Cual es el nombre de tu madre?" />
              <el-option selected label="Cual es tu color favorito?" value="Cual es tu color favorito?" />
              <el-option label="Cual es tu comida favorita?" value="Cual es tu comida favorita?" />
              <el-option label="Cual es el nombre de tu mejor amigo?" value="Cual es el nombre de tu mejor amigo?" />
            </el-select>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label>Respuesta</label>
            <el-input placeholder="Respuesta de seguridad" type="password" autocomplete="question2" clearable show-password v-model="registro.preguntas[2].respuesta" />
          </div>
          <div class="col-12 my-3 text-center">
            <el-button class="btn-primario" round @click="register" v-loading.fullscreen.lock="uploading">Registrar</el-button>
          </div>
        </div>
      </form>
    </el-card>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Registro de Usuario'
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
            message: `El usuario ${response.data.data.usuario.usuario_username} se registró correctamente!`,
            type: 'success',
            duration: 0
          })
          this.$store.dispatch('startupAdmin')
          this.uploading = false
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
