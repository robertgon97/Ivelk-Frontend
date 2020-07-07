import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllTypeVentas: null,
  },
  mutations: {
    setAllTypeVentas: (state, value) => {
      state.AllTypeVentas = value
    }
  },
  getters: {
    getAllTypeVentas: (state) => {
      return state.AllTypeVentas
    }
  },
  actions: {
    getAllTypeVentas (context) {
      context.commit('setAllTypeVentas', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/ventastipos`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllTypeVentas', res.data.data)
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
