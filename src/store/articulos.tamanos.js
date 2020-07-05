import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllTamanos: null,
  },
  mutations: {
    setAllTamanos: (state, value) => {
      state.AllTamanos = value
    }
  },
  getters: {
    getAllTamanos: (state) => {
      return state.AllTamanos
    }
  },
  actions: {
    getAllTamanos (context) {
      context.commit('setAllTamanos', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/tamanos`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllTamanos', res.data.data)
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
