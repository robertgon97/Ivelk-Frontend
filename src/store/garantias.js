import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllGarantias: null,
  },
  mutations: {
    setAllGarantias: (state, value) => {
      state.AllGarantias = value
    }
  },
  getters: {
    getAllGarantias: (state) => {
      return state.AllGarantias
    }
  },
  actions: {
    getAllGarantias (context) {
      context.commit('setAllGarantias', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/garantias`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllGarantias', res.data.data)
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
