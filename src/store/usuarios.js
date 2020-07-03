import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllUsers: null,
  },
  mutations: {
    setAllUsers: (state, value) => {
      state.AllUsers = value
    }
  },
  getters: {
    getAllUsers: (state) => {
      return state.AllUsers
    }
  },
  actions: {
    getAllUsers (context) {
      context.commit('setAllUsers', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/user`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllUsers', res.data.data)
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
