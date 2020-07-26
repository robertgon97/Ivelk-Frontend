import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllProveedores: null,
    IDProveedores: null
  },
  mutations: {
    setAllProveedores: (state, value) => {
      state.AllProveedores = value
    },
    setIDProveedores: (state, value) => {
      state.IDProveedores = value
    }
  },
  getters: {
    getAllProveedores: (state) => {
      return state.AllProveedores
    },
    getIDProveedores: (state) => {
      return state.IDProveedores
    }
  },
  actions: {
    getAllProveedores (context, query = { proveedor_id: null, proveedor_razon_social: null, proveedor_rif: null, proveedor_telefono: null, proveedor_direccion: null, proveedor_correo: null }) {
      context.commit('setAllProveedores', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/proveedores`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        },
        params: {
          proveedor_id: query.proveedor_id ? query.proveedor_id : null,
          proveedor_razon_social: query.proveedor_razon_social ? query.proveedor_razon_social : null,
          proveedor_rif: query.proveedor_rif ? query.proveedor_rif : null,
          proveedor_telefono: query.proveedor_telefono ? query.proveedor_telefono : null,
          proveedor_direccion: query.proveedor_direccion ? query.proveedor_direccion : null,
          proveedor_correo: query.proveedor_correo ? query.proveedor_correo : null
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllProveedores', res.data.data)
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            default:
              // eslint-disable-next-line
              console.log(error.response.data)
              break
          }
        } else {
          // eslint-disable-next-line
          console.log(error)
          // eslint-disable-next-line
          console.clear()
        }
      })
    },
    getIDProveedores (context, ID) {
      context.commit('setIDProveedores', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/proveedores/id/${ID.value}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setIDProveedores', res.data.data)
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            default:
              // eslint-disable-next-line
              console.log(error.response.data)
              break
          }
        } else {
          // eslint-disable-next-line
          console.log(error)
          // eslint-disable-next-line
          console.clear()
        }
      })
    }
  }
}
