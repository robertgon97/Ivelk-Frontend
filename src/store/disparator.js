export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
      context.dispatch('getAllArticulos')
      context.dispatch('getAllBancos')
    },
    startupClient (context) {
      context.dispatch('getCarritoAll')
    },
    startupAdmin (context) {
      context.dispatch('getCarritoAll')
    }
  }
}
