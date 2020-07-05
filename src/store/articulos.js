import axios from 'axios'
import config from './../config'

export default {
  state: {
    AllArticulos: null,
  },
  mutations: {
    setAllArticulos: (state, value) => {
      state.AllArticulos = value
    }
  },
  getters: {
    getAllArticulos: (state) => {
      return state.AllArticulos
    }
  },
  actions: {
    getAllArticulos (context, query) {
      context.commit('setAllArticulos', 'Loading')
      axios({
        method: `GET`,
        baseURL: config.backend.url,
        url: `/articulos`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : ''
        },
        params: {
          articulos_id: query.articulos_id ? query.articulos_id : null,
          articulos_nombres: query.articulos_nombres ? query.articulos_nombres : null,
          articulo_tipo_nombre: query.articulo_tipo_nombre ? query.articulo_tipo_nombre : null,
          articulo_marcas_nombre: query.articulo_marcas_nombre ? query.articulo_marcas_nombre : null,
          articulo_medidas_nombre: query.articulo_medidas_nombre ? query.articulo_medidas_nombre : null,
          articulo_tamano_nombre: query.articulo_tamano_nombre ? query.articulo_tamano_nombre : null
        }
      })
      .then(res => {
        context.commit('setgetAppConfig', res.data.appData)
        context.commit('setAllArticulos', res.data.data)
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
