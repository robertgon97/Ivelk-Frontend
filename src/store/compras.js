import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllCompras: null,
  },
  mutations: {
    setAllCompras: (state, value) => {
      state.AllCompras = value
    }
  },
  getters: {
    getAllCompras: (state) => {
      return state.AllCompras
    }
  },
  actions: {
    getAllCompras (context, query = { compras_created: null, status_id: null, personas_name: null, compras_id: null }) {
      context.commit('setAllCompras', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/compra`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        },
        params: {
          compras_created: query.compras_created ? query.compras_created : null,
          status_id: query.status_id ? query.status_id : null,
          personas_name: query.personas_name ? query.personas_name : null,
          compras_id: query.compras_id ? query.compras_id : null
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllCompras', res.data.data)
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
