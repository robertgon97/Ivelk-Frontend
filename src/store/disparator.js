export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
    },
    startupClient (context) {
      context.dispatch('getAllTypeDocumento')
    },
    startupAdmin (context) {
      context.dispatch('getAllTypeDocumento')
    }
  }
}
