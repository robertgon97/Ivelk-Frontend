<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>Balances Generales</span>
        <el-divider direction="vertical"></el-divider>
        <span>Total en este mes: </span>
        <span class="text-primary">+ 50.000bs</span>
      </div>
      <div class="contenido">
        <el-table :data="tableData" class="w-100">
          <el-table-column fixed prop="id" label="#" width="50"></el-table-column>
          <el-table-column prop="orden" label="Orden N°"></el-table-column>
          <el-table-column prop="usuario" label="Cliente"></el-table-column>
          <el-table-column prop="debito" label="Tipo"></el-table-column>
          <el-table-column prop="total" label="Total">
            <template slot-scope="props">
              <div>
                <i v-if="props.row.tipodebito == 2" class="el-icon-plus"></i>
                <i v-if="props.row.tipodebito == 1" class="el-icon-minus"></i>
                <span :class="`text-${(props.row.tipodebito == 1) ? 'danger' : 'primary'}`"> {{props.row.total}} </span>
              </div>
            </template>
          </el-table-column>
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
      titleTemplate: '%s | Balances Generales'
    },
    data () {
      return {
        tableData: [
          {
            id: 1,
            usuario: 'Deni Aguirre',
            debito: 'Debito',
            tipodebito: 1,
            total: 50000,
            orden: 234
          },
          {
            id: 2,
            usuario: 'Deni Aguirre',
            debito: 'Credito',
            tipodebito: 2,
            total: 50000,
            orden: 235
          },
          {
            id: 3,
            usuario: 'Deni Aguirre',
            debito: 'Debito',
            tipodebito: 1,
            total: 50000,
            orden: 236
          },
          {
            id: 4,
            usuario: 'Deni Aguirre',
            debito: 'Credito',
            tipodebito: 2,
            total: 100000,
            orden: 237
          }
        ]
      }
    }
  }
</script>
