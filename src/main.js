import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Element from 'element-ui'
import Locale from 'element-ui/lib/locale/lang/es'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Element, { Locale })

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/scss/estilos.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
