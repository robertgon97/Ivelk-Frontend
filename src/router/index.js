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
    path: '/tienda',
    name: 'Gestión de la tienda',
    component: () => import('./../views/Menu/MenuView.vue'),
    children: [
      {
        path: 'perfil',
        redirect: 'perfil/editar'
      },
      {
        path: 'perfil/editar',
        name: 'Editar mi Usuario',
        component: () => import('./../views/Perfil/edit.vue')
      },
      {
        path: 'usuarios',
        redirect: 'usuarios/lista'
      },
      {
        path: 'usuarios/lista',
        name: 'Lista de Usuarios',
        component: () => import('./../views/Usuarios/list.vue')
      },
      {
        path: 'usuarios/crear',
        name: 'Nuevo Usuario',
        component: () => import('./../views/Usuarios/add.vue')
      },
      {
        path: 'usuarios/:ID',
        name: 'Editar Usuario',
        component: () => import('./../views/Usuarios/add.vue')
      },
      {
        path: 'articulos',
        redirect: 'articulos/lista'
      },
      {
        path: 'articulos/lista',
        name: 'Lista de Artículos',
        component: () => import('./../views/Articulos/list.vue')
      },
      {
        path: 'articulos/crear',
        name: 'Nuevo Artículo',
        component: () => import('./../views/Articulos/add.vue')
      },
      {
        path: 'articulos/:ID',
        name: 'Editar Artículo',
        component: () => import('./../views/Articulos/add.vue')
      },
      {
        path: 'proveedores',
        redirect: 'proveedores/lista'
      },
      {
        path: 'proveedores/lista',
        name: 'Lista de Proveedores',
        component: () => import('./../views/Proveedores/list.vue')
      },
      {
        path: 'proveedores/crear',
        name: 'Nuevo Proveedor',
        component: () => import('./../views/Proveedores/add.vue')
      },
      {
        path: 'proveedores/:ID',
        name: 'Editar Proveedor',
        component: () => import('./../views/Proveedores/add.vue')
      }
    ]
  },
  {
    path: '/logout',
    name: 'Cerrar Sesión',
    component: () => import('./../views/Logout.vue')
  },
  {
    path: '*',
    name: 'Error 404',
    component: () => import('./../views/Error404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active is-active',
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
