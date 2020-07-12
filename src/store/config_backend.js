import axios from 'axios'
import config from './../config'

export default {
  state: {
    getAppConfig: null,
    AllConfig: null,
    AllSummary: null
  },
  mutations: {
    setgetAppConfig: (state, value) => {
      state.getAppConfig = value
    },
    setAllConfig: (state, value) => {
      state.AllConfig = value
    },
    setAllSummary: (state, value) => {
      state.AllSummary = value
    }
  },
  getters: {
    getgetAppConfig: (state) => {
      return state.getAppConfig
    },
    getAllConfig: (state) => {
      return state.AllConfig
    },
    getAllSummary: (state) => {
      return state.AllSummary
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
    },
    getAllSummary (context) {
      context.commit('setAllSummary', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/startup`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllSummary', res.data.data)
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
