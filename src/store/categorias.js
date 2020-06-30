import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllCategoria: null,
    AllCategoryFields: null
  },
  mutations: {
    setAllCategoria: (state, value) => {
      state.AllCategoria = value
    },
    setAllCategoryFields: (state, value) => {
      state.AllCategoryFields = value
    }
  },
  getters: {
    getAllCategoria: (state) => {
      return state.AllCategoria
    },
    getAllCategoryFields: (state) => {
      return state.AllCategoryFields
    }
  },
  actions: {
    getAllCategoria (context) {
      context.commit('setAllCategoria', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/categoria`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllCategoria', res.data.data)
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
    getAllCategoryFields (context) {
      context.commit('setAllCategoryFields', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/categoria/fields`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllCategoryFields', res.data.data)
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
