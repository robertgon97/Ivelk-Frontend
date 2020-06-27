export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
    },
    startupClient (context) {
      context.dispatch('getCarritoAll')
    },
    startupAdmin (context) {
      context.dispatch('getCarritoAll')
    }
  }
}
