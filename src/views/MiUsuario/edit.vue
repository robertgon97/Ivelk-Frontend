<template>
  <div class="container">
    <el-page-header @back="$router.push(`/`)" content="Perfil" title="Atrás" />
    <br />
    <div v-if="getMyUser && getMyUser == 'Loading'" class="d-flex my-5 justify-content-center">
      <el-card class="col-10 my-5">
        <h1 class="display-3 text-center">...Cargando</h1>
      </el-card>
    </div>
    <div v-else-if="getMyUser && getMyUser.usuario_email">
      <el-row :gutter="20">
        <el-col class="col-md-4 mb-3">
          <el-card>
            <div slot="header" class="clearfix text-primary">
              <i class="el-icon-user"></i>
              <span> {{getMyUser.usuario_username}}</span>
            </div>
            <div class="text item">
              <p><i class="el-icon-wallet"></i> Identificación: <b>{{getMyUser.tipo_documento_letra}}-{{getMyUser.personas_documento_identidad}}</b></p>
              <p><i class="el-icon-paperclip"></i> Correo: <b>{{getMyUser.usuario_email}}</b></p>
              <p><i class="el-icon-view"></i> <b>{{getMyUser.usuarios_tipo_nombre}}</b></p>
            </div>
          </el-card>
          <el-card class="my-2">
            <div slot="header" class="clearfix text-info d-flex flex-wrap justify-content-between aling-items-center">
              <span> Preguntas de Seguridad</span>
              <el-button type="text" class="m-0 p-0" @click="formularioregistro = true">+ Agregar</el-button>
            </div>
            <div v-for="o in getMyquestions" :key="o.usuario_pregunta_seguridad_id" class="d-flex flex-wrap justify-content-between">
              <span>{{o.usuario_pregunta_seguridad_pregunta}}</span>
              <el-button type="text" class="m-0 p-0" size="small" @click="delPregunta(o)">Eliminar</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col class="col-md-8 mb-3">
          <el-card shadow="">
            <div slot="header" class="clearfix">
              <i class="el-icon-edit"></i>
              <span> Editar Perfil</span>
            </div>
            <form class="contenido" @submit.prevent="register(getMyUser)">
              <div class="d-flex flex-wrap justify-content-init">
                <div class="col-12 mt-3">
                  <h5><small>Datos de autenticación y contacto</small></h5>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Correo Electrónico</label>
                  <el-input placeholder="Correo" type="email" autocomplete="email" clearable v-model="getMyUser.usuario_email">
                    <i slot="suffix" class="el-input__icon el-icon-message"></i>
                  </el-input>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Teléfono</label>
                  <el-input placeholder="Teléfono" type="phone" autocomplete="phone" clearable v-model="getMyUser.personas_telefono">
                    <i slot="suffix" class="el-input__icon el-icon-phone-outline"></i>
                  </el-input>
                </div>
                <div class="col-12 mt-3">
                  <h5><small>Datos básicos</small></h5>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Nombres</label>
                  <el-input placeholder="Nombres" type="text" autocomplete="name" clearable v-model="getMyUser.personas_name">
                    <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
                  </el-input>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Apellidos</label>
                  <el-input placeholder="Apellidos" type="text" autocomplete="lastname" clearable v-model="getMyUser.personas_apellido">
                    <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
                  </el-input>
                </div>
                <div class="col-12 col-md-2 mb-3">
                  <label class="w-100">Tip. Doc.</label>
                  <el-select placeholder="Selecciona tu Tipo de Documento" v-model="getMyUser.tipo_documento_id" disabled>
                    <el-option v-for="item in getAllTypeDocumento" :key="item.tipo_documento_id" :label="`${item.tipo_documento_nombre} (${item.tipo_documento_letra})`" :value="item.tipo_documento_id" />
                  </el-select>
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <label class="w-100">Numero de Identificación</label>
                  <el-input placeholder="123456789" type="text" disabled autocomplete="dni" clearable v-model="getMyUser.personas_documento_identidad">

                  </el-input>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Sexo</label>
                  <el-select class="w-100" placeholder="Sexo" size="large" v-model="getMyUser.personas_sexo">
                    <el-option label="Hombre" value="Hombre" />
                    <el-option label="Mujer" value="Mujer" />
                  </el-select>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Fecha de Nacimiento</label>
                  <el-input placeholder="Fecha de Nacimiento" type="date" autocomplete="nacimiento" :max="maxDate" clearable v-model="getMyUser.personas_cumple">
                  </el-input>
                </div>
                <div class="col-12 mt-3">
                  <h5><small>Dirección del usuario</small></h5>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Dirección</label>
                  <el-input placeholder="Dirección completa" type="text" autocomplete="direction" clearable v-model="getMyUser.personas_direccion">
                    <i slot="suffix" class="el-input__icon el-icon-position"></i>
                  </el-input>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Ciudad</label>
                  <el-input placeholder="Ciudad" type="text" autocomplete="city" clearable v-model="getMyUser.personas_ciudad">
                    <i slot="suffix" class="el-input__icon el-icon-position"></i>
                  </el-input>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label>Estado</label>
                  <el-select class="w-100" placeholder="Estado" size="large" v-model="getMyUser.personas_estado">
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
                  <el-select class="w-100" placeholder="País" size="large" v-model="getMyUser.personas_pais">
                    <el-option label="Venezuela" value="VENEZUELA" />
                  </el-select>
                </div>
                <div class="col-12 mb-3 text-center">
                  <hr />
                  <el-button class="btn-primario" round @click="register(getMyUser)" v-loading.fullscreen.lock="uploading">Guardar</el-button>
                </div>
              </div>
            </form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <el-card class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Error al cargar su información</h3>
        </div>
      </el-card>
    </div>
    <el-drawer title="Agregar Preguntas de Seguridad" ref="drawerpago" :before-close="handleClose" :visible.sync="formularioregistro" direction="rtl" custom-class="demo-drawer overflow-auto">
      <div class="Contenido p-2">
        <form class="" @submit.prevent="AddPregunta(preguntas)">
          <div class="col-12 mb-3">
            <label>Escriba su pregunta de seguridad <small>(Requerido)</small></label>
            <el-select class="w-100" placeholder="Seleccione..." size="large" v-model="preguntas.usuario_pregunta_seguridad_pregunta">
              <el-option selected label="Cual es tu Artista Favorito?" value="Cual es tu Artista Favorito?" />
              <el-option label="Cual es el nombre de tu madre?" value="Cual es el nombre de tu madre?" />
              <el-option label="Cual es tu color favorito?" value="Cual es tu color favorito?" />
              <el-option label="Cual es tu comida favorita?" value="Cual es tu comida favorita?" />
              <el-option label="Cual es el nombre de tu mejor amigo?" value="Cual es el nombre de tu mejor amigo?" />
            </el-select>
          </div>
          <div class="col-12 mb-3">
            <label>Ingrese la respuesta de seguridad <small>(Requerido)</small></label>
            <el-input placeholder="Contraseña" type="password" autocomplete="password" show-password v-model="preguntas.usuario_pregunta_seguridad_respuesta" maxlength="50" show-word-limit />
          </div>
        </form>
        <el-divider></el-divider>
        <div class="d-flex flex-wrap justify-content-between" >
          <el-button class="btn-primario" @click="formularioregistro = false">Cancelar</el-button>
          <el-button class="btn-primario" :loading="uploading" @click="AddPregunta(preguntas)">{{ uploading ? 'Enviando ...' : 'Enviar' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Modificar mi Perfil'
    },
    data () {
      return {
        uploading: false,
        formularioregistro: false,
        preguntas: {
          usuario_pregunta_seguridad_id: 0,
          usuario_id: 0,
          usuario_pregunta_seguridad_pregunta: 'Cual es tu Artista Favorito?',
          usuario_pregunta_seguridad_respuesta: null
        }
      }
    },
    methods: {
      register (value) {
        this.uploading = true
        this.axios({
          method: `PUT`,
          url: `/user`,
          data: {
            usuario_id: value.usuario_id,
            personas_id: value.personas_id,
            usuarios_tipo_id: value.usuarios_tipo_id,
            usuario_username: value.usuario_username,
            usuario_password: value.usuario_password || 'NO132456789',
            usuario_email: value.usuario_email,
            tipo_documento_id: value.tipo_documento_id,
            personas_name: value.personas_name,
            personas_apellido: value.personas_apellido,
            personas_documento_identidad: value.personas_documento_identidad,
            personas_sexo: value.personas_sexo,
            personas_cumple: value.personas_cumple ? moment(value.personas_cumple).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            personas_direccion: value.personas_direccion,
            personas_ciudad: value.personas_ciudad,
            personas_estado: value.personas_estado,
            personas_pais: value.personas_pais,
            personas_telefono: value.personas_telefono
          }
        })
        .then(response => {
          this.uploading = false
          this.$notify({
            title: 'Hecho!',
            message: `Tu usuario fue modificado exitosamente!`,
            type: 'success',
            duration: 5000
          })
          console.log('Confirmado ', response.data.appData.config_id)
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
        .finally(() => {
          this.$store.dispatch('startupEscencial')
        })
      },
      AddPregunta (pregunta) {
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/user/questions`,
          data: { ...pregunta }
        })
        .then(() => {
          this.uploading = false
          this.$notify({
            title: 'Hecho!',
            message: `Tu pregunta fue agregada exitosamente!`,
            type: 'success',
            duration: 5000
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupClient')
          this.formularioregistro = false
          this.preguntas = {
            usuario_pregunta_seguridad_id: 0,
            usuario_id: 0,
            usuario_pregunta_seguridad_pregunta: null,
            usuario_pregunta_seguridad_respuesta: null
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
      delPregunta (pregunta) {
        this.$confirm('Deseas eliminar esta pregunta?', 'Estás Seguro de esto?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `DELETE`,
            url: `/user/questions`,
            data: { ...pregunta }
          })
          .then(() => {
            this.uploading = false
            this.$notify({
              title: 'Hecho!',
              message: `Tu pregunta fue eliminada exitosamente!`,
              type: 'success',
              duration: 5000
            })
            this.$store.dispatch('startupEscencial')
            this.$store.dispatch('startupClient')
            this.formularioregistro = false
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Uff... cancelado'
          })
        })
      },
      handleClose(done) {
        if (this.uploading) {
          return
        }
        this.$confirm('Esto descartará los cambios.', 'Deseas cerrar el formulario?', {
          confirmButtonText: 'SI',
          cancelButtonText: 'NO',
          type: 'warning'
        })
          .then(() => {
            this.uploading = false
            this.formularioregistro = false
            done()
            this.$message({
              type: 'success',
              message: 'Listo'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: 'Uff Estuvo Cerca'
            })
          })
      },
    },
    computed: {
      getMyUser () {
        return this.$store.getters.getMyUser
      },
      getAllTypeDocumento () {
        return this.$store.getters.getAllTypeDocumento
      },
      getMyquestions () {
        return this.$store.getters.getMyquestions
      },
      maxDate () {
        return moment().subtract(18, 'years').format('YYYY-MM-DD')
      }
    }
  }
</script>
