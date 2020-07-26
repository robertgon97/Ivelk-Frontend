<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/perfil/editar' }">Editar Perfil</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getMyUser && getMyUser == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-row :gutter="20" v-else-if="getMyUser && getMyUser.usuario_email">
      <el-col class="col-md-9">
        <el-card shadow="hover">
          <form @submit.prevent="register(getMyUser)">
            <div class="d-flex flex-wrap justify-content-init">
              <div class="col-12 mt-3">
                <h5><small>Datos de autenticación y contacto</small></h5>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Correo Electrónico <small>(REQUERIDO)</small></label>
                <el-input placeholder="Correo" type="email" autocomplete="email" clearable v-model="getMyUser.usuario_email">
                  <i slot="suffix" class="el-input__icon el-icon-message"></i>
                </el-input>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Teléfono <small>(REQUERIDO)</small></label>
                <el-input placeholder="Teléfono" type="phone" autocomplete="phone" clearable show-word-limit maxlength="11" v-model="getMyUser.personas_telefono">
                  <i slot="suffix" class="el-input__icon el-icon-phone-outline"></i>
                </el-input>
              </div>
              <div class="col-12 mt-3">
                <h5><small>Datos básicos</small></h5>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Nombres <small>(REQUERIDO)</small></label>
                <el-input placeholder="Nombres" type="text" autocomplete="name" clearable show-word-limit maxlength="40" v-model="getMyUser.personas_name">
                  <i slot="suffix" class="el-input__icon el-icon-s-custom"></i>
                </el-input>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Apellidos <small>(REQUERIDO)</small></label>
                <el-input placeholder="Apellidos" type="text" autocomplete="lastname" clearable show-word-limit maxlength="40" v-model="getMyUser.personas_apellido">
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
                <label class="w-100">Numero de Identificación <small>(REQUERIDO)</small></label>
                <el-input placeholder="123456789" type="number" disabled autocomplete="dni" onKeyDown="if(this.value.length==9) return false;" max="999999999" min="1000000" show-word-limit maxlength="9" v-model="getMyUser.personas_documento_identidad">

                </el-input>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Sexo <small>(REQUERIDO)</small></label>
                <el-select class="w-100" placeholder="Sexo" size="large" v-model="getMyUser.personas_sexo">
                  <el-option label="Hombre" value="Hombre" />
                  <el-option label="Mujer" value="Mujer" />
                </el-select>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Fecha de Nacimiento <small>(REQUERIDO)</small></label>
                <el-input placeholder="Fecha de Nacimiento" type="date" autocomplete="nacimiento" :max="maxDate" clearable v-model="getMyUser.personas_cumple">
                </el-input>
              </div>
              <div class="col-12 mt-3">
                <h5><small>Dirección del usuario</small></h5>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Dirección <small>(REQUERIDO)</small></label>
                <el-input placeholder="Dirección completa" type="text" autocomplete="direction" clearable show-word-limit maxlength="100" v-model="getMyUser.personas_direccion">
                  <i slot="suffix" class="el-input__icon el-icon-position"></i>
                </el-input>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Ciudad <small>(REQUERIDO)</small></label>
                <el-input placeholder="Ciudad" type="text" autocomplete="city" clearable show-word-limit maxlength="20" v-model="getMyUser.personas_ciudad">
                  <i slot="suffix" class="el-input__icon el-icon-position"></i>
                </el-input>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label>Estado <small>(REQUERIDO)</small></label>
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
                <label>País <small>(REQUERIDO)</small></label>
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
      <el-col class="col-md-3">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img src="https://www.gravatar.com/avatar/?s=2048" class="image">
          <div style="padding: 14px;">
            <span>{{getMyUser.personas_name}} {{getMyUser.personas_apellido}}</span>
            <div class="bottom clearfix">
              <time class="time">{{getMyUser.usuario_email}}</time>
            </div>
          </div>
        </el-card>
        <p class="text-center"><router-link to="/miuser">Gestionar Preguntas de Seguridad</router-link></p>
      </el-col>
    </el-row>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Error al cargar su información</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        uploading: false
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
      }
    },
    computed: {
      getMyUser () {
        return this.$store.getters.getMyUser
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
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
