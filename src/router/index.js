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
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
