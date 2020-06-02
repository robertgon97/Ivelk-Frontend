<template>
  <transition mode="in-out">
    <div class="d-flex justify-content-center">
      <div id="visualizador" class="col-md-10 mb-3">
        <div class="imagen my-3">
          <img src="./../../assets/Imagenes/logo.jpg" alt="Ivelc" class="img-fluid" />
        </div>
        <router-view />
        <br class="my-5 py-5" />
        <br class="my-5 py-5" />
        <br class="my-5 py-5" />
        <footer>
          <nav class="navbar fixed-bottom justify-content-center p-2 bg-white">
            <p class="text-center"><b>Ivelk Copyright @2020 - Todos los derechos reservados</b></p>
          </nav>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    //
  }
</script>
<style lang="scss" scoped>
  #visualizador {
    .imagen {
      align-items: center;
      text-align: center;
      margin-bottom: 5px;
      img {
        text-align: center;
        width: 40%;
      }
    }
    b {
      text-transform: uppercase;
    }
  }
</style>
