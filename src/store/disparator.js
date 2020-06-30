export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getMyUser')
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
      context.dispatch('getAllArticulos')
    },
    startupClient (context) {
      context.dispatch('getCarritoAll')
      context.dispatch('getAllBancos')
      context.dispatch('getAllVentaUser')
    },
    startupAdmin (context) {
      context.dispatch('getCarritoAll')
      context.dispatch('getAllVentaUser')
      context.dispatch('getAllVentas')
    }
  }
}
