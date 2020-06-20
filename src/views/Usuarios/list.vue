<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <form class="d-flex flex-wrap justify-content-between">
          <div class="col-md-3 my-1">
            <el-button class="btn-primario">Actualizar Lista</el-button>
          </div>
          <div class="col-md-5 my-1">
            <el-input type="search" placeholder="Puedes buscar tus usuarios aquí" v-model="search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </form>
      </div>
      <div class="contenido">
        <el-table :data="tableData" class="w-100">
          <el-table-column fixed prop="usuario_id" label="#" width="50"></el-table-column>
          <el-table-column prop="usuario_username" label="Usuario"></el-table-column>
          <el-table-column prop="usuarios_tipo_id" label="Nivel"></el-table-column>
          <el-table-column prop="personas_name" label="Nombres"></el-table-column>
          <el-table-column prop="personas_apellido" label="Apellidos"></el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit">Ver</el-button>
              <el-button class="text-danger" type="text" size="small" icon="el-icon-delete">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="d-flex justify-content-center">
          <p class="m-0 p-0"><small>Mostrando 4 Registros</small></p>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Lista de Usuarios'
    },
    data () {
      return {
        search: null,
        tableData: [
          {
            usuario_id: 1,
            usuario_username: 'deni_aguirre',
            usuarios_tipo_id: 'Administrador',
            personas_name: 'Deni',
            personas_apellido: 'Aguirre'
          },
          {
            usuario_id: 2,
            usuario_username: 'deniprograma',
            usuarios_tipo_id: 'Programador',
            personas_name: 'Deni',
            personas_apellido: 'Aguirre'
          },
          {
            usuario_id: 3,
            usuario_username: 'vendedora123',
            usuarios_tipo_id: 'Vendedor',
            personas_name: 'Adriana',
            personas_apellido: 'Gonzalez'
          },
          {
            usuario_id: 4,
            usuario_username: 'pepito342',
            usuarios_tipo_id: 'Almacenista',
            personas_name: 'Pedro',
            personas_apellido: 'Torrealba'
          }
        ]
      }
    }
  }
</script>
