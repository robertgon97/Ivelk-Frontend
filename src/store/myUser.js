import axios from 'axios'
import config from './../config'

export default {
  state: {
    MyUser: null,
  },
  mutations: {
    setMyUser: (state, value) => {
      state.MyUser = value
    }
  },
  getters: {
    getMyUser: (state) => {
      return state.MyUser
    }
  },
  actions: {
    getMyUser (context) {
      if (!localStorage.token_ivelk) return context.commit('setMyUser', null)
      context.commit('setMyUser', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/user/myuser`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setMyUser', res.data.data)
        localStorage.setItem('ud_ivelk', JSON.stringify(res.data.data))
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              context.commit('setMyUser', null)
              localStorage.clear()
              document.location.href = '/login'
              break
            case 404:
              context.commit('setMyUser', null)
              localStorage.clear()
              document.location.href = '/login'
              break
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
