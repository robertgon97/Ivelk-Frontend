import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BASE',
    redirect: '/inicio',
    component: () => import('./../views/Menu/MenuViewGeneral.vue'),
    children: [
      {
        path: 'inicio',
        name: 'Inicio',
        component: () => import('./../views/Home.vue')
      },
      {
        path: 'articulos',
        name: 'Articulos',
        component: () => import('./../views/Articulos.vue')
      },
      {
        path: 'ayuda',
        name: 'Ayuda',
        component: () => import('./../views/About.vue')
      },
      {
        path: 'carrito',
        name: 'Tu Carrito',
        component: () => import('./../views/Carrito/carrito.vue'),
        meta: {
          requiresAuth: true,
          guest: false
        }
      },
      {
        path: 'compras',
        name: 'Tu historial de compras',
        component: () => import('./../views/UsuarioCompras/list.vue'),
        meta: {
          requiresAuth: true,
          guest: false
        }
      },
      {
        path: 'compras/:ID',
        name: 'Resumen de Compra',
        component: () => import('./../views/UsuarioCompras/edit.vue'),
        meta: {
          requiresAuth: true,
          guest: false
        }
      },
      {
        path: 'miuser',
        name: 'Perfil de Usuario',
        component: () => import('./../views/MiUsuario/edit.vue'),
        meta: {
          requiresAuth: true,
          guest: false
        }
      }
    ],
    meta: {
      requiresAuth: false,
      guest: false
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
    component: () => import('./../views/Menu/MenuViewAdmin.vue'),
    children: [
      {
        path: '/',
        name: 'Resumen',
        component: () => import('./../views/Sumary.vue')
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
        path: 'nivelesusuario',
        redirect: 'nivelesusuario/lista'
      },
      {
        path: 'nivelesusuario/lista',
        name: 'Niveles de Usuario',
        component: () => import('./../views/Usuarios/type.vue')
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
        path: 'articulos/devoluciones',
        name: 'Lista de Devoluciones',
        component: () => import('./../views/Articulos/devolucion.vue')
      },
      {
        path: 'articulos/garantias',
        name: 'Lista de Garantias',
        component: () => import('./../views/Articulos/garantias.vue')
      },
      {
        path: 'articulos/marcas',
        name: 'Gestión de Marcas',
        component: () => import('./../views/Articulos/marcas.vue')
      },
      {
        path: 'articulos/medidas',
        name: 'Gestión de Medidas',
        component: () => import('./../views/Articulos/medidas.vue')
      },
      {
        path: 'articulos/tamanos',
        name: 'Gestión de Tamaños',
        component: () => import('./../views/Articulos/tamano.vue')
      },
      {
        path: 'articulos/categoria',
        name: 'Gestión de Categorías',
        component: () => import('./../views/Articulos/categorias.vue')
      },
      {
        path: 'articulos/:ID',
        name: 'Editar Artículo',
        component: () => import('./../views/Articulos/edit.vue')
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
        component: () => import('./../views/Proveedores/edit.vue')
      },
      {
        path: 'compras',
        redirect: 'compras/lista'
      },
      {
        path: 'compras/lista',
        name: 'Lista de Compras',
        component: () => import('./../views/Compras/list.vue')
      },
      {
        path: 'compras/crear',
        name: 'Nueva Orden de Compra',
        component: () => import('./../views/Compras/add.vue')
      },
      {
        path: 'compras/:ID',
        name: 'Ver Orden de Compra',
        component: () => import('./../views/Compras/edit.vue')
      },
      {
        path: 'ventas',
        redirect: 'ventas/lista'
      },
      {
        path: 'ventas/lista',
        name: 'Lista de Ventas',
        component: () => import('./../views/Ventas/list.vue')
      },
      {
        path: 'ventas/crear',
        name: 'Nueva Orden de Venta',
        component: () => import('./../views/Ventas/add.vue')
      },
      {
        path: 'ventas/tipo',
        name: 'Tipos de Ventas',
        component: () => import('./../views/Ventas/type.vue')
      },
      {
        path: 'ventas/:ID',
        name: 'Ver Orden de Venta',
        component: () => import('./../views/Ventas/edit.vue')
      },
      {
        path: 'balances',
        redirect: 'balances/lista'
      },
      {
        path: 'balances/lista',
        name: 'Lista de Balances',
        component: () => import('./../views/Balances/list.vue')
      },
      {
        path: 'balances/tipo',
        name: 'Tipos de Balances',
        component: () => import('./../views/Balances/type.vue')
      },
      {
        path: 'balances/cuentas/cobrar',
        name: 'Cuentas por Cobrar',
        component: () => import('./../views/Balances/cuentas_cobrar.vue')
      },
      {
        path: 'balances/cuentas/pagar',
        name: 'Cuentas por Pagar',
        component: () => import('./../views/Balances/cuentas_pagar.vue')
      },
      {
        path: 'balances/:ID',
        name: 'Ver Balance',
        component: () => import('./../views/Balances/edit.vue')
      },
      {
        path: 'configuracion',
        redirect: 'configuracion/general'
      },
      {
        path: 'configuracion/general',
        name: 'Configuración General del Sistema',
        component: () => import('./../views/Configuracion/general.vue')
      },
      {
        path: 'configuracion/status',
        name: 'Configuración de Estatus',
        component: () => import('./../views/Configuracion/status.vue')
      },
      {
        path: 'configuracion/nacionalidades',
        name: 'Configuración de Tipos de Documentos',
        component: () => import('./../views/Configuracion/nacionalidades.vue')
      },
      {
        path: 'configuracion/bancos',
        name: 'Configuración de Bancos',
        component: () => import('./../views/Configuracion/bancos.vue')
      },
      {
        path: 'configuracion/auditoria',
        name: 'Auditoría del Sistema',
        component: () => import('./../views/Configuracion/auditoria.vue')
      }
    ],
    meta: {
      requiresAuth: true,
      guest: false
    }
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
  scrollBehavior (to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    else return { x: 0, y: 0 }
  }
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
