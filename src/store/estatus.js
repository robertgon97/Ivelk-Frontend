import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllStatus: null,
  },
  mutations: {
    setAllStatus: (state, value) => {
      state.AllStatus = value
    }
  },
  getters: {
    getAllStatus: (state) => {
      return state.AllStatus
    }
  },
  actions: {
    getAllStatus (context) {
      context.commit('setAllStatus', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/status`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllStatus', res.data.data)
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
