import axios from 'axios'
import config from './../config'

export default {
  state: {
    MyUser: null,
    Myquestions: null
  },
  mutations: {
    setMyUser: (state, value) => {
      state.MyUser = value
    },
    setMyquestions: (state, value) => {
      state.Myquestions = value
    }
  },
  getters: {
    getMyUser: (state) => {
      return state.MyUser
    },
    getMyquestions: (state) => {
      return state.Myquestions
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
    },
    getMyquestions (context) {
      if (!localStorage.token_ivelk) return context.commit('setMyquestions', null)
      context.commit('setMyquestions', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/user/questions`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setMyquestions', res.data.data)
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              context.commit('setMyquestions', null)
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
