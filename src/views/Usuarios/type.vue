<template>
  <div>
    <el-card class="mb-3">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Niveles de Usuario</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllTypeUsers">
          <el-table-column fixed width="80" prop="usuarios_tipo_id" label="ID"></el-table-column>
          <el-table-column prop="usuarios_tipo_nombre" label="Nombre"></el-table-column>
          <el-table-column width="110" prop="usuarios_tipo_super_admin" label="Programador">
            <template slot-scope="props">
              <div class="text-center">
                <span v-if="props.row.usuarios_tipo_super_admin" class="text-primary">SI</span>
                <span v-else class="text-danger">NO</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="110" prop="usuarios_tipo_admin" label="Administrador">
            <template slot-scope="props">
              <div class="text-center">
                <span v-if="props.row.usuarios_tipo_admin" class="text-primary">SI</span>
                <span v-else class="text-danger">NO</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="110" prop="usuarios_tipo_trabajador" label="Empleado">
            <template slot-scope="props">
              <div class="text-center">
                <span v-if="props.row.usuarios_tipo_trabajador" class="text-primary">SI</span>
                <span v-else class="text-danger">NO</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllTypeUsers.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Niveles de Usuario'
    },
    data () {
      return {
        uploading: false
      }
    },
    computed: {
      getAllTypeUsers () {
        return this.$store.getters.getAllTypeUsers
      },
    }
  }
</script>
