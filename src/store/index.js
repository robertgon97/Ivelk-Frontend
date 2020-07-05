import Vue from 'vue'
import Vuex from 'vuex'

import usuarios_tipos from './usuarios_tipo'
import tipo_documento from './tipo_documento'
import balances_tipos from './balances_tipos'
import carrito from './carrito'
import articulo from './articulos'
import configData from './config_backend'
import bancos from './bancos'
import ventas from './ventas'
import myUser from './myUser'
import categoria from './categorias'
import status from './estatus'
import usuarios from './usuarios'
import auditoria from './auditoria'
import marcas from './articulos.marcas'
import medidas from './articulos.medidas'
import disparator from './disparator'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuarios_tipos,
    tipo_documento,
    balances_tipos,
    carrito,
    articulo,
    configData,
    bancos,
    ventas,
    myUser,
    categoria,
    status,
    usuarios,
    auditoria,
    marcas,
    medidas,
    disparator
  }
})
