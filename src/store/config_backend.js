import axios from 'axios'
import config from './../config'

export default {
  state: {
    getAppConfig: null,
    AllConfig: null
  },
  mutations: {
    setgetAppConfig: (state, value) => {
      state.getAppConfig = value
    },
    setAllConfig: (state, value) => {
      state.AllConfig = value
    }
  },
  getters: {
    getgetAppConfig: (state) => {
      return state.getAppConfig
    },
    getAllConfig: (state) => {
      return state.AllConfig
    }
  },
  actions: {
    getAllConfig (context) {
      context.commit('setAllConfig', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/configuracion`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllConfig', res.data.data)
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
