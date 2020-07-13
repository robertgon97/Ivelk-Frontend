<template>
  <div>
    <div class="titulo mb-4">
      <h1 class="display-4 text-center">Preguntas Frecuentes</h1>
    </div>
    <br><br>
    <div class="container">
      <el-collapse accordion>
        <el-collapse-item title="Tienen algún instructivo en PDF?" name="1">
          <el-card>
            <div slot="header" class="clearfix">
              <span class="text-primary"> Nuestra Respuesta:</span>
            </div>
            <p>Claro que sí!.</p>
            <p>Puedes descargar nuestro manual básico haciendo
              <a v-if="usuario && usuario.usuarios_tipo_id == 1" href="/ManualdeUsuarioIvelk-Administrador.pdf" download="Manual de Usuario"> click aquí!</a>
              <a v-else-if="usuario && usuario.usuarios_tipo_id == 2" href="/ManualdeUsuarioIvelk-Vendedor.pdf" download="Manual de Usuario"> click aquí!</a>
              <a v-else href="ManualdeUsuarioIvelk-Cliente.pdf" download="Manual de Usuario"> Cliente click aquí!</a>
            </p>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="Cómo contactarnos?" name="2">
          <el-image class="w-100" src="/contacto.jpg" :preview-src-list="['/contacto.jpg']">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
            <div slot="placeholder" class="image-slot">
              Cargando<span class="dot">...</span>
            </div>
          </el-image>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
  export default {
    created () {
      this.usuario = JSON.parse(localStorage.getItem('ud_ivelk'))
    },
    data () {
      return {
        usuario: null
      }
    }
  }
</script>
