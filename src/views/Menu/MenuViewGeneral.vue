<template>
  <div>
    <menu-ivlk></menu-ivlk>
    <br />
    <el-container class="mt-5">
      <el-main>
        <div class="iniciooo" id="iniciooo"></div>
        <el-backtop target=".iniciooo" :bottom="100">
          <div style="{
              height: 100%;
              width: 100%;
              background-color: #f2f5f6;
              box-shadow: 0 0 6px rgba(0,0,0, .12);
              text-align: center;
              line-height: 40px;
              color: #1989fa;
            }">
            SUBIR
          </div>
        </el-backtop>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import config from './../../config'
  export default {
    data () {
      return {
        uploading: false,
        titleApp: config.frontend.titulo
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
