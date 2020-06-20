<template>
  <div>
    <el-row :gutter="20">
      <el-col class="col-md-4 mb-3">
        <el-card>
          <div slot="header" class="clearfix">
            <i class="el-icon-setting"></i>
            <span> Configuración Actual</span>
          </div>
          <div class="text item">
            <p><i class="el-icon-tickets"></i> IVA: <b>16 %</b></p>
            <p><i class="el-icon-d-arrow-left"></i> Inventario Mínimo: <b>10 Unidades</b></p>
            <p><i class="el-icon-d-arrow-right"></i> Inventario Máximo: <b>100 Unidades</b></p>
          </div>
        </el-card>
      </el-col>
      <el-col class="col-md-8 mb-3">
        <el-card>
          <div slot="header" class="clearfix">
            <i class="el-icon-plus"></i>
            <span> Agregar Configuración</span>
          </div>
          <div class="contenido">
            <form>
              <div class="row m-0 p-0 justify-content-center">
                <div class="col-md-6 mb-3">
                  <label>Inventario Mínimo</label>
                  <el-input type="number" min="0" placeholder="Número mínimo" prefix-icon="el-icon-d-arrow-left" v-model="newconfig.config_inventario_minimo" clearable></el-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Inventario Máximo</label>
                  <el-input type="number" min="0" placeholder="Número máximo" prefix-icon="el-icon-d-arrow-right" v-model="newconfig.config_inventario_maximo" clearable></el-input>
                </div>
              </div>
              <div class="row m-0 p-0 justify-content-center">
                <div class="col-md-5 mb-3">
                  <label>IVA (Porcentaje)</label>
                  <el-input type="number" min="0" max="100" placeholder="IVA%" prefix-icon="el-icon-tickets" v-model="newconfig.config_iva" clearable></el-input>
                </div>
                <div class="col-md-5 mb-3 pt-4">
                  <el-button class="btn-primario mt-2" round @click="AddToCart" v-loading.fullscreen.lock="uploading">Aplicar esta configuración</el-button>
                </div>
              </div>
            </form>
          </div>
          <div class="clearfix text-center">
            <p class="m-0 p-0"><small>Todos los campos son obligatorios</small></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="el-icon-refresh-left"></i>
        <span> Configuraciones Anteriores</span>
      </div>
      <div class="contenido">
        <el-table :data="[{config_id: 1,config_inventario_minimo: 10,config_inventario_maximo: 100,config_iva: 16}, {config_id: 2,config_inventario_minimo: 20,config_inventario_maximo: 60,config_iva: 16}]">
          <el-table-column fixed width="50" prop="config_id" label="#"></el-table-column>
          <el-table-column prop="config_inventario_minimo" label="Inventario Mínimo"></el-table-column>
          <el-table-column prop="config_inventario_maximo" label="Inventario Máximo"></el-table-column>
          <el-table-column prop="config_iva" label="IVA %"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Configuración General'
    },
    data () {
      return {
        newconfig: {
          config_id: 0,
          config_inventario_minimo: null,
          config_inventario_maximo: null,
          config_iva: null
        }
      }
    }
  }
</script>
