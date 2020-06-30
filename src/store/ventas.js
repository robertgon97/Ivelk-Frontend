import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllVentas: null,
    AllVentaUser: null,
    VentaID: null
  },
  mutations: {
    setAllVentas: (state, value) => {
      state.AllVentas = value
    },
    setAllVentaUser: (state, value) => {
      state.AllVentaUser = value
    },
    setVentaID: (state, value) => {
      state.VentaID = value
    }
  },
  getters: {
    getAllVentas: (state) => {
      return state.AllVentas
    },
    getAllVentaUser: (state) => {
      return state.AllVentaUser
    },
    getVentaID: (state) => {
      return state.VentaID
    }
  },
  actions: {
    getAllVentas (context) {
      if (!localStorage.token_ivelk) return context.commit('setAllVentas', null)
      context.commit('setAllVentas', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/orden`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllVentas', res.data.data)
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
    getAllVentaUser (context) {
      if (!localStorage.token_ivelk) return context.commit('setAllVentaUser', null)
      context.commit('setAllVentaUser', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/orden/myorders`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllVentaUser', res.data.data)
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
    getVentaID (context, ID) {
      if (!localStorage.token_ivelk || ID.value) return context.commit('setVentaID', null)
      context.commit('setVentaID', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/orden/ID/${ID.value}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setVentaID', res.data.data)
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
