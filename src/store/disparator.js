export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getMyUser')
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
      context.dispatch('getAllArticulos')
      context.dispatch('getAllCategoria')
      context.dispatch('getAllCategoryFields')
      context.dispatch('getAllStatus')
      context.dispatch('getAllConfig')
    },
    startupClient (context) {
      context.dispatch('getCarritoAll')
      context.dispatch('getAllBancos')
      context.dispatch('getAllVentaUser')
    },
    startupAdmin (context) {
      context.dispatch('getCarritoAll')
      context.dispatch('getAllVentaUser')
      context.dispatch('getAllVentas', { venta_date: null, status_id: null, personas_name: null, ventas_id: null })
      context.dispatch('getAllUsers')
      context.dispatch('getAllBancos')
      context.dispatch('getAllAuditoria', { auditoria_date: null, auditoria_id: null, usuario_email: null, personas_name: null, auditoria_accion: null, auditoria_descripcion: null })
    }
  }
}
