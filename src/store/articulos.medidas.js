import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllMedidas: null,
  },
  mutations: {
    setAllMedidas: (state, value) => {
      state.AllMedidas = value
    }
  },
  getters: {
    getAllMedidas: (state) => {
      return state.AllMedidas
    }
  },
  actions: {
    getAllMedidas (context) {
      context.commit('setAllMedidas', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/medidas`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllMedidas', res.data.data)
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
