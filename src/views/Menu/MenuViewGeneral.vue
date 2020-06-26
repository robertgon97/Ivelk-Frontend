<template>
  <div>
    <menu-ivlk></menu-ivlk>
    <br />
    <el-container class="mt-5">
      <el-main ref="scrollTarget" class="test-scroll">
        <el-backtop target=".test-scroll" :bottom="100">
          <span>test_up_text</span>
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
