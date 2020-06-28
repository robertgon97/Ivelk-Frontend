import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllTypeDocumento: null,
  },
  mutations: {
    setAllTypeDocumento: (state, value) => {
      state.AllTypeDocumento = value
    }
  },
  getters: {
    getAllTypeDocumento: (state) => {
      return state.AllTypeDocumento
    }
  },
  actions: {
    getAllTypeDocumento (context) {
      context.commit('setAllTypeDocumento', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/usertypedocument`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllTypeDocumento', res.data.data)
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
