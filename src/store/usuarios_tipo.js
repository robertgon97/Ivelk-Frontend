import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllTypeUsers: null,
  },
  mutations: {
    setAllTypeUsers: (state, value) => {
      state.AllTypeUsers = value
    }
  },
  getters: {
    getAllTypeUsers: (state) => {
      return state.AllTypeUsers
    }
  },
  actions: {
    getAllTypeUsers (context) {
      context.commit('setAllTypeUsers', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/usertype`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setAllTypeUsers', res.data.data)
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
