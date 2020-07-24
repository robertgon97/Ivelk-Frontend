<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion' }">Configuración</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/configuracion/auditoria' }">Auditorías del Sistema</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-row :gutter="20">
      <el-col class="col-md-3 mb-3">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-operation"></i>
            <span> Filtros</span>
          </div>
          <form @submit.prevent="searchapi" class="text items">
            <div class="col-12 p-0 mb-3">
              <label>Fecha Inicial</label>
              <el-input placeholder="Fecha" type="date" clearable v-model="search.auditoria_date" :max="search.auditoria_date_end || maxDate"></el-input>
            </div>
            <div class="col-12 p-0 mb-3">
              <label>Fecha Final</label>
              <el-input placeholder="Fecha" type="date" clearable v-model="search.auditoria_date_end" :max="maxDate" :min="search.auditoria_date"></el-input>
            </div>
            <div class="col-12 p-0 mb-3">
              <label>Correo</label>
              <el-input placeholder="Correo del Usuario" type="email" v-model="search.usuario_email" clearable></el-input>
            </div>
            <div class="col-12 p-0 mb-3">
              <label>Nombre del Usuario</label>
              <el-input placeholder="Nombre del Usuario" type="text" v-model="search.personas_name" clearable></el-input>
            </div>
            <div class="col-12 p-0 mb-3">
              <label>Acción</label>
              <el-input placeholder="Acción del Usuario" type="text" v-model="search.auditoria_accion" clearable></el-input>
            </div>
            <div class="col-12 p-0 mb-3">
              <label>Descripción</label>
              <el-input placeholder="Descripción Usuario" type="text" v-model="search.auditoria_descripcion" clearable></el-input>
            </div>
            <div class="col-12 p-0 mb-3">
              <label>ID Auditoria</label>
              <el-input placeholder="123456789" type="number" min="1" v-model="search.auditoria_id" clearable></el-input>
            </div>
            <div class="col-12 p-0 text-center">
              <button type="submit" class="btn btn-primario">Buscar</button>
            </div>
          </form>
        </el-card>
      </el-col>
      <el-col class="col-md-9 mb-3">
        <div v-if="getAllAuditoria && getAllAuditoria == 'Loading'">
          <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
        </div>
        <el-card v-else-if="getAllAuditoria && getAllAuditoria.length" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-finished"></i>
            <span> Lista</span>
          </div>
          <el-table class="h-100 w-100" :data="getAllAuditoria" >
            <el-table-column fixed prop="auditoria_id" label="ID" width="50"></el-table-column>
            <el-table-column prop="auditoria_date" label="Fecha" width="220">
              <template slot-scope="props">
                <div class="">
                  {{parseFecha(props.row.auditoria_date)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="usuario_email" label="Correo" width="200"></el-table-column>
            <el-table-column prop="personas_name" label="Nombre" width="110"></el-table-column>
            <el-table-column prop="auditoria_accion" label="Acción" width="400"></el-table-column>
            <el-table-column prop="auditoria_descripcion" label="Descripción" width="400"></el-table-column>
          </el-table>
        </el-card>
        <div v-else class="d-flex my-5 justify-content-center">
          <div class="col-10 my-5">
            <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
            <div class="text-center">
              <h3>No hay información disponible</h3>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Auditoría del Sistema'
    },
    data () {
      return {
        uploading: false,
        maxDate: moment().format('YYYY-MM-DD'),
        search: {
          auditoria_date: null,
          auditoria_date_end: null,
          auditoria_id: null,
          usuario_email: null,
          personas_name: null,
          auditoria_accion: null,
          auditoria_descripcion: null
        }
      }
    },
    methods: {
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
      },
      parseFecha(value) {
        if (value) {
          moment.locale('es-VE')
          return moment(value).format('LL hh:mm A')
        } else return 'Fecha Inválida'
      },
      searchapi () {
        this.$store.dispatch('getAllAuditoria', this.search)
      }
    },
    computed: {
      getAllAuditoria () {
        return this.$store.getters.getAllAuditoria
      }
    }
  }
</script>
