<template>
  <div></div>
</template>
<script>
  export default {
    metaInfo: {
      titleTemplate: '%s | Cerrar Sesión'
    },
    created () {
      this.logout()
    },
    data () {
      return {
        uploading: false
      }
    },
    methods: {
      logout () {
        localStorage.clear()
        this.uploading = false
        this.$router.push(`/`)
      }
    }
  }
</script>
