import Vue from 'vue'
import Vuex from 'vuex'

import usuarios_tipos from './usuarios_tipo'
import tipo_documento from './tipo_documento'
import balances_tipos from './balances_tipos'
import disparator from './disparator'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuarios_tipos,
    tipo_documento,
    balances_tipos,
    disparator
  }
})
