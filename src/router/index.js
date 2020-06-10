import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/autenticador',
    name: 'Modulo de autenticacion',
    redirect: '/autenticador/login',
    component: () => import('./../views/Autenticacion/contenedor.vue'),
    children: [
      {
        path: 'login',
        name: 'Login de Usuario',
        component: () => import('./../views/Autenticacion/login.vue')
      },
      {
        path: 'registro',
        name: 'Registro de Usuario',
        component: () => import('./../views/Autenticacion/registro.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Inicio',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
