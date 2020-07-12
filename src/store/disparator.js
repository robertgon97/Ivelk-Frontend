export default {
  actions: {
    startupEscencial (context) {
      context.dispatch('getMyUser')
      context.dispatch('getMyquestions')
      context.dispatch('getAllTypeUsers')
      context.dispatch('getAllTypeDocumento')
      context.dispatch('getAllArticulos', { articulos_id: null, articulos_nombres: null, articulo_tipo_nombre: null, articulo_marcas_nombre: null, articulo_medidas_nombre: null, articulo_tamano_nombre: null })
      context.dispatch('getAllCategoria')
      context.dispatch('getAllCategoryFields')
      context.dispatch('getAllStatus')
      context.dispatch('getAllConfig')
      context.dispatch('getAllMarcas')
      context.dispatch('getAllMedidas')
      context.dispatch('getAllTamanos')
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
      context.dispatch('getAllProveedores')
      context.dispatch('getAllTypeVentas')
      context.dispatch('getAllCompras')
      context.dispatch('getAllBalancesTipos')
      context.dispatch('getAllBalances')
      context.dispatch('getAllCuentasCobrar')
      context.dispatch('getAllCuentasPagar')
      context.dispatch('getAllDevoluciones')
      context.dispatch('getAllGarantias')
      context.dispatch('getAllSummary')
    }
  }
}
