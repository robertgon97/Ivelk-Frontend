import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllProveedores: null,
  },
  mutations: {
    setAllProveedores: (state, value) => {
      state.AllProveedores = value
    }
  },
  getters: {
    getAllProveedores: (state) => {
      return state.AllProveedores
    }
  },
  actions: {
    getAllProveedores (context) {
      context.commit('setAllProveedores', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/proveedores`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
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
    }
  }
}
