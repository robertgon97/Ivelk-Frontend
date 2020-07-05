import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllAuditoria: null,
  },
  mutations: {
    setAllAuditoria: (state, value) => {
      state.AllAuditoria = value
    }
  },
  getters: {
    getAllAuditoria: (state) => {
      return state.AllAuditoria
    }
  },
  actions: {
    getAllAuditoria (context, query) {
      if (!localStorage.token_ivelk) return context.commit('setAllAuditoria', null)
      context.commit('setAllAuditoria', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/auditoria`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        },
        params: {
          auditoria_date: query.auditoria_date ? query.auditoria_date : null,
          auditoria_id: query.auditoria_id ? query.auditoria_id : null,
          usuario_email: query.usuario_email ? query.usuario_email : null,
          personas_name: query.personas_name ? query.personas_name : null,
          auditoria_accion: query.auditoria_accion ? query.auditoria_accion : null,
          auditoria_descripcion: query.auditoria_descripcion ? query.auditoria_descripcion : null
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllAuditoria', res.data.data)
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
