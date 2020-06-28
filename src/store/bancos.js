import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllBancos: null,
  },
  mutations: {
    setAllBancos: (state, value) => {
      state.AllBancos = value
    }
  },
  getters: {
    getAllBancos: (state) => {
      return state.AllBancos
    }
  },
  actions: {
    getAllBancos (context) {
      context.commit('setAllBancos', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/bancos`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllBancos', res.data.data)
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
