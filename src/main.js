import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Componentsglobals from './globalComponents'
import Config from './config'
import Element from 'element-ui'
import Locale from 'element-ui/lib/locale/lang/es'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import VueAxios from 'vue-axios'
import Axios from 'axios'

Vue.config.productionTip = false
Axios.defaults.baseURL = Config.backend.url
Axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: localStorage.token_ivelk ? `Bearer ${localStorage.token_ivelk}` : null
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Element, { Locale })
Vue.use(Meta)
Vue.use(Componentsglobals)
Vue.use(VueAxios, Axios)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/scss/estilos.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
