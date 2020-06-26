import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllBalancesTipos: null,
  },
  mutations: {
    setAllBalancesTipos: (state, value) => {
      state.AllBalancesTipos = value
    }
  },
  getters: {
    getAllBalancesTipos: (state) => {
      return state.AllBalancesTipos
    }
  },
  actions: {
    getAllBalancesTipos (context) {
      context.commit('setAllBalancesTipos', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/balances/tipos`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setAllBalancesTipos', res.data.data)
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
