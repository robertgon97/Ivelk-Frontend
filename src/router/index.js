import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('./../views/Home.vue'),
    meta: {
      requiresAuth: false,
      guest: true
    }
  },
  {
    path: '/login',
    redirect: '/autenticador/login'
  },
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
    ],
    meta: {
      requiresAuth: false,
      guest: true
    }
  },
  {
    path: '*',
    name: 'Error 404',
    component: () => import('./../views/Error404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.token_ivelk == null) {
      next({
        path: '/autenticador/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.token_ivelk == null) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
