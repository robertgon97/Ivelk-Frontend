import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllBalances: null,
    AllCuentasCobrar: null,
    AllCuentasPagar: null
  },
  mutations: {
    setAllBalances: (state, value) => {
      state.AllBalances = value
    },
    setAllCuentasCobrar: (state, value) => {
      state.AllCuentasCobrar = value
    },
    setAllCuentasPagar: (state, value) => {
      state.AllCuentasPagar = value
    }
  },
  getters: {
    getAllBalances: (state) => {
      return state.AllBalances
    },
    getAllCuentasCobrar: (state) => {
      return state.AllCuentasCobrar
    },
    getAllCuentasPagar: (state) => {
      return state.AllCuentasPagar
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
    },
    getAllCuentasCobrar (context) {
      context.commit('setAllCuentasCobrar', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/balances/cuentas/cobrar`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllCuentasCobrar', res.data.data)
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
    getAllCuentasPagar (context) {
      context.commit('setAllCuentasPagar', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/balances/cuentas/pagar`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllCuentasPagar', res.data.data)
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
