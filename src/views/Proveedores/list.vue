<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/proveedores' }">Proveedores</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/proveedores/lista' }">Lista de Proveedores</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getAllProveedores && getAllProveedores == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <el-card class="mb-3" v-else-if="getAllProveedores && getAllProveedores.length">
      <div slot="header" class="clearfix">
        <i class="el-icon-finished"></i>
        <span> Lista de Proveedores</span>
      </div>
      <div class="contenido">
        <el-table :data="getAllProveedores">
          <el-table-column fixed width="80" prop="proveedor_id" label="ID"></el-table-column>
          <el-table-column width="350" prop="proveedor_razon_social" label="Razón Social"></el-table-column>
          <el-table-column width="110" prop="tipo_documento_letra" label="Nacionalidad"></el-table-column>
          <el-table-column width="110" prop="proveedor_rif" label="Rif"></el-table-column>
          <el-table-column width="200" prop="proveedor_correo" label="Correo"></el-table-column>
          <el-table-column width="200" prop="proveedor_telefono" label="Teléfono"></el-table-column>
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template slot-scope="props">
              <el-button class="text-primary" type="text" size="small" icon="el-icon-edit" @click="$router.push(`/tienda/proveedores/${props.row.proveedor_id}`)">Ver</el-button>
              <el-button class="text-danger" type="text" size="small" icon="el-icon-delete" @click="eliminar(props.row)">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
          <div class="d-flex justify-content-center">
            <p class="m-0 p-0"><small>Mostrando {{getAllProveedores.length}} Registros</small></p>
          </div>
        </div>
      </div>
    </el-card>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>No hay proveedores registrados</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Lista de Proveedores'
    },
    data () {
      return {
        uploading: false
      }
    },
    methods: {
      eliminar (proveedor) {
        this.$confirm('Deseas eliminar este Proveedor?', 'Estás Seguro de esto?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `DELETE`,
            url: `/proveedores`,
            data: {
              proveedor_id: proveedor.proveedor_id,
              tipo_documento_id: proveedor.tipo_documento_id,
              proveedor_razon_social: proveedor.proveedor_razon_social,
              proveedor_rif: proveedor.proveedor_rif,
              proveedor_direccion: proveedor.proveedor_direccion,
              proveedor_ciudad: proveedor.proveedor_ciudad,
              proveedor_estado: proveedor.proveedor_estado,
              proveedor_pais: proveedor.proveedor_pais,
              proveedor_correo: proveedor.proveedor_correo,
              proveedor_telefono: proveedor.proveedor_telefono
            }
          })
          .then(() => {
            this.$notify({
              title: 'Eliinación Exitosa!',
              message: `El Proveedor ${proveedor.proveedor_razon_social} se eliminó correctamente!`,
              type: 'success'
            })
            this.$store.dispatch('startupEscencial')
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Uff... cancelado'
          })
        })
      }
    },
    computed: {
      getAllProveedores () {
        return this.$store.getters.getAllProveedores
      }
    }
  }
</script>
