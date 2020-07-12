import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllDevoluciones: null,
  },
  mutations: {
    setAllDevoluciones: (state, value) => {
      state.AllDevoluciones = value
    }
  },
  getters: {
    getAllDevoluciones: (state) => {
      return state.AllDevoluciones
    }
  },
  actions: {
    getAllDevoluciones (context) {
      context.commit('setAllDevoluciones', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/devoluciones`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllDevoluciones', res.data.data)
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
