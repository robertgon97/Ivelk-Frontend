<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :router="true" :default-active="$route.path" mode="vertical" :collapse="!true">
      <router-link to="/tienda" class="no-underline">
        <div class="d-flex flex-wrap p-2 justify-content-center align-items-center">
          <el-avatar :size="60" src="@/assets/logo.png" class="my-2">
            <img src="@/assets/logo.png"/>
          </el-avatar>
          <h5 class="text-center mt-2 mx-2">{{titleApp || 'Sin título'}}</h5>
        </div>
      </router-link>
      <el-divider class="my-2 p-0">Menú</el-divider>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>Perfil</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/perfil/editar">Modificar mi Perfil</router-link>
          <router-link tag="el-menu-item" exact to="/logout">Cerrar Sesión</router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-divider class="m-0 p-0"></el-divider>
      <el-menu-item-group index="2">
        <router-link tag="el-menu-item" exact to="/tienda"><i class="el-icon-house"></i> Inicio</router-link>
      </el-menu-item-group>
      <el-submenu v-if="userdata.usuarios_tipo_super_admin" index="3">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>Usuarios y Clientes</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/usuarios/lista">Lista</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/usuarios/crear">Crear Usuario</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/usuarios/crearclientes">Crear Cliente</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/nivelesusuario/lista">Niveles de Usuario</router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>Artículos</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/lista">Lista de Artículos</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/crear">Crear Artículo</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/devoluciones">Devoluciones</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/garantias">Garantías</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/marcas">Marcas</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/medidas">Medidas</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/tamanos">Tamaños</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/articulos/categoria">Categorias</router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>Proveedores</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/proveedores/lista">Lista de Proveedores</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/proveedores/crear">Añadir Proveedor</router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-sold-out"></i>
          <span>Compras</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/compras/lista">Lista de Compras</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/compras/crear">Crear Orden</router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-shopping-cart-full"></i>
          <span>Ventas</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/ventas/lista">Todas las Ventas</router-link>
          <!-- <router-link tag="el-menu-item" exact to="/tienda/ventas/crear">Nueva Venta</router-link> -->
          <!-- <router-link tag="el-menu-item" exact to="/tienda/ventas/tipo">Tipos de Ventas</router-link> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu v-if="userdata.usuarios_tipo_super_admin" index="8">
        <template slot="title">
          <i class="el-icon-coin"></i>
          <span>Balances</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/balances/lista">Balances Generales</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/balances/cuentas/cobrar">Cuentas por cobrar</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/balances/cuentas/pagar">Cuentas por pagar</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/balances/tipo">Tipos de Balances</router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu v-if="userdata.usuarios_tipo_super_admin" index="99">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Configuración</span>
        </template>
        <el-menu-item-group>
          <router-link tag="el-menu-item" exact to="/tienda/configuracion/general">Configuración General</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/configuracion/status">Estatus</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/configuracion/auditoria">Auditoría</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/configuracion/bancos">Bancos</router-link>
          <router-link tag="el-menu-item" exact to="/tienda/configuracion/nacionalidades">Tipo de Documento</router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import config from './../../config'
  export default {
    created () {
      this.userdata = JSON.parse(localStorage.getItem('ud_ivelk'))
    },
    data () {
      return {
        uploading: false,
        titleApp: config.frontend.titulo,
        userdata: null
      }
    }
  }
</script>
<style scoped>
  .no-underline {
    text-decoration: none;
  }
</style>
