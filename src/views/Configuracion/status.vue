<template>
  <div>
    <el-card class="mb-3">
      <div slot="header" class="clearfix">
        <i class="el-icon-plus"></i>
        <span> Agregar Estatus</span>
      </div>
      <div class="contenido">
        <form>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-6 mb-3">
              <label>Nombre</label>
              <el-input type="text" placeholder="Nombre" v-model="newstatus.status_nombre" clearable></el-input>
            </div>
            <div class="col-md-6 mb-3">
              <label>Descripción</label>
              <el-input type="text" placeholder="Descripción" v-model="newstatus.status_descripcion" clearable></el-input>
            </div>
          </div>
          <div class="row m-0 p-0 justify-content-center">
            <div class="col-md-5 mb-3 pt-4 text-center">
              <el-button class="btn-primario mt-2" round @click="AddToCart" v-loading.fullscreen.lock="uploading">Agregar Estatus</el-button>
            </div>
          </div>
        </form>
      </div>
      <div class="clearfix text-center">
        <p class="m-0 p-0"><small>Todos los campos son obligatorios</small></p>
      </div>
    </el-card>
    <el-card class="mb-3">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Estatus</span>
      </div>
      <div class="contenido">
        <el-table :data="[{status_id: 1,status_nombre: 'En proceso',status_descripcion: 'Espere a que un administrador verifique los datos suministrados'}, {status_id: 2,status_nombre: 'Verificado',status_descripcion: 'Su proceso ha sido verificado'}]">
          <el-table-column fixed width="50" prop="status_id" label="#"></el-table-column>
          <el-table-column prop="status_nombre" label="Nombre"></el-table-column>
          <el-table-column prop="status_descripcion" label="Descripcion"></el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit">Editar</el-button>
              <el-button class="text-danger" type="text" size="small" icon="el-icon-delete">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Configuración de Status'
    },
    data () {
      return {
        newstatus: {
          status_id: 0,
          status_nombre: null,
          status_descripcion: null
          }
      }
    }
  }
</script>
