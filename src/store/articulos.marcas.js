import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllMarcas: null,
  },
  mutations: {
    setAllMarcas: (state, value) => {
      state.AllMarcas = value
    }
  },
  getters: {
    getAllMarcas: (state) => {
      return state.AllMarcas
    }
  },
  actions: {
    getAllMarcas (context) {
      context.commit('setAllMarcas', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/marcas`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllMarcas', res.data.data)
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
