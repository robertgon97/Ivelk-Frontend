export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
    }
  }
}
