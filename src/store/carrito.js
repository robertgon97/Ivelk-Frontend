import axios from 'axios'
import config from './../config'

export default {
  state: {
    CarritoAll: null,
  },
  mutations: {
    setCarritoAll: (state, value) => {
      state.CarritoAll = value
    }
  },
  getters: {
    getCarritoAll: (state) => {
      return state.CarritoAll
    }
  },
  actions: {
    getCarritoAll (context) {
      if (!localStorage.token_ivelk) return context.commit('setCarritoAll', null)
      context.commit('setCarritoAll', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/carrito`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setCarritoAll', res.data.data)
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
