export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
      context.dispatch('getAllArticulos')
    },
    startupClient (context) {
      context.dispatch('getCarritoAll')
      context.dispatch('getAllBancos')
    },
    startupAdmin (context) {
      context.dispatch('getCarritoAll')
      context.dispatch('getAllBancos')
    }
  }
}
