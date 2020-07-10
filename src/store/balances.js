import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllBalances: null,
  },
  mutations: {
    setAllBalances: (state, value) => {
      state.AllBalances = value
    }
  },
  getters: {
    getAllBalances: (state) => {
      return state.AllBalances
    }
  },
  actions: {
    getAllBalances (context) {
      context.commit('setAllBalances', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/balances`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllBalances', res.data.data)
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
