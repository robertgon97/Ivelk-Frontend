(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-120ea111"],{"159b":function(a,t,e){var s=e("da84"),n=e("fdbc"),o=e("17c2"),l=e("9112");for(var i in n){var r=s[i],c=r&&r.prototype;if(c&&c.forEach!==o)try{l(c,"forEach",o)}catch(d){c.forEach=o}}},"17c2":function(a,t,e){"use strict";var s=e("b727").forEach,n=e("a640"),o=e("ae40"),l=n("forEach"),i=o("forEach");a.exports=l&&i?[].forEach:function(a){return s(this,a,arguments.length>1?arguments[1]:void 0)}},2085:function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[a._v("Inicio")]),e("el-breadcrumb-item",{attrs:{to:{path:"/compras"}}},[a._v("Historial de Compras")]),e("el-breadcrumb-item",{attrs:{to:{path:"/compras/"+a.$route.params.ID}}},[a._v("Ver Orden")])],1),e("br"),a.getVentaID&&"Loading"==a.getVentaID?e("div",[e("el-card",{staticClass:"d-flex my-5 justify-content-center"},[e("h1",{staticClass:"display-3 text-center"},[a._v("...Cargando")])])],1):a.getVentaID&&a.getVentaID.venta.ventas_id?e("div",[e("el-card",{staticClass:"container",attrs:{shadow:"hover",id:"print"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-shopping-cart-full"}),e("span",[a._v(" Factura")]),e("el-divider",{attrs:{direction:"vertical"}}),e("span",{staticClass:"text-primary"},[a._v("N° "+a._s(a.getVentaID.venta.ventas_id))]),e("el-divider",{attrs:{direction:"vertical"}}),e("span",{staticClass:"text-info"},[a._v("Estatus: "+a._s(a.getVentaID.venta.status_nombre))])],1),e("div",{staticClass:"info mb-2"},[e("p",{staticClass:"p-0 m-0"},[a._v(" Factura Emitida a nombre de: "),e("b",[a._v(a._s(a.getMyUser.personas_name)+" "+a._s(a.getMyUser.personas_apellido))])]),e("p",{staticClass:"p-0 m-0"},[a._v(" Razón Social: "),e("b",[a._v(a._s(a.getMyUser.tipo_documento_letra)+a._s(a.getMyUser.personas_documento_identidad))])]),e("p",{staticClass:"p-0 m-0"},[a._v(" Dirección: "),e("b",[a._v(a._s(a.getMyUser.personas_direccion))])]),e("p",{staticClass:"p-0 m-0"},[a._v(" Ciudad: "),e("b",[a._v(a._s(a.getMyUser.personas_ciudad))])]),e("p",{staticClass:"p-0 m-0"},[a._v(" Estado: "),e("b",[a._v(a._s(a.getMyUser.personas_estado))])]),e("p",{staticClass:"p-0 m-0"},[a._v(" País: "),e("b",[a._v(a._s(a.getMyUser.personas_pais))])]),e("p",{staticClass:"p-0 m-0"},[a._v(" Teléfono: "),e("b",[a._v(a._s(a.getMyUser.personas_telefono))])]),e("p",{staticClass:"p-0 m-0"},[a._v(" Artículos: ")])]),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.uploading,expression:"uploading"}],staticClass:"w-100",attrs:{data:a.getVentaID.items}},[e("el-table-column",{attrs:{fixed:"",label:"Imagen",width:"150"},scopedSlots:a._u([{key:"default",fn:function(a){return[e("div",{staticClass:"demo-basic--circle"},[e("div",{staticClass:"block text-center"},[e("el-avatar",{attrs:{shape:"square",size:"medium",src:a.row.articulos_imagen_principal||"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"}})],1)])]}}])}),e("el-table-column",{attrs:{prop:"articulos_nombres",label:"Nombre del Artículo",width:"200"}}),e("el-table-column",{attrs:{prop:"ventas_detalle_cantidad",label:"Cantidad",width:"100"}}),e("el-table-column",{attrs:{prop:"ventas_detalle_precio_base",label:"Precio por Unidad",width:"150"},scopedSlots:a._u([{key:"default",fn:function(t){return[e("div",{staticClass:"text-primary"},[a._v(" "+a._s(a.parseMoneda(t.row.ventas_detalle_precio_base))+" ")])]}}])}),e("el-table-column",{attrs:{prop:"ventas_detalle_total",label:"Total",width:"200"},scopedSlots:a._u([{key:"default",fn:function(t){return[e("div",{staticClass:"text-primary"},[a._v(" "+a._s(a.parseMoneda(t.row.ventas_detalle_total))+" ")])]}}])})],1),e("div",{staticClass:"clearfix mt-3 d-flex flex-wrap justify-content-between"},[e("div",{staticClass:"col-md-6 mb-3"},[e("span",{staticClass:"text-primary"},[a._v("BANCO PREFERENCIAL A PAGAR")]),e("el-divider",[a._v("Datos del Banco")]),e("p",{staticClass:"m-0 p-0"},[e("small",[a._v(a._s(a.getVentaID.venta.bancos_nombre||"Sin Nombre de banco"))])]),e("p",{staticClass:"m-0 p-0"},[e("small",[a._v(a._s(a.getVentaID.venta.bancos_dni||"Sin Identificación"))])]),e("p",{staticClass:"m-0 p-0"},[e("small",[a._v(a._s(a.getVentaID.venta.bancos_cuenta||"Sin Número de Cuenta"))])]),e("p",{staticClass:"m-0 p-0"},[e("small",[a._v(a._s(a.getVentaID.venta.bancos_tipo_cuenta||"Sin tipo de cuenta"))])]),e("p",{staticClass:"m-0 p-0"},[e("small",[a._v(a._s(a.getVentaID.venta.bancos_telefono||"Sin teléfono"))])])],1),e("div",{staticClass:"col-md-5 mb-3"},[e("span",{staticClass:"text-primary"},[a._v("Montos Totales")]),e("el-divider",[a._v("Resumen")]),e("div",{staticClass:"d-flex flex-wrap"},[e("p",{staticClass:"col-6 m-0 p-0"},[a._v(" IVA: ")]),e("p",{staticClass:"col-6 m0 p-0 text-right"},[e("span",{staticClass:"text-primary"},[e("span",{staticClass:"text-primary"},[a._v(" "+a._s(a.getVentaID.venta.venta_iva)+" % ")])])])]),e("div",{staticClass:"d-flex flex-wrap"},[e("p",{staticClass:"col-6 m-0 p-0"},[a._v(" SubTotal: ")]),e("p",{staticClass:"col-6 m0 p-0 text-right"},[e("span",{staticClass:"text-primary"},[a._v(" "+a._s(a.parseMoneda(a.getVentaID.venta.venta_subtotal))+" ")])])]),e("div",{staticClass:"d-flex flex-wrap"},[e("p",{staticClass:"col-6 m-0 p-0"},[a._v(" Total: ")]),e("p",{staticClass:"col-6 m0 p-0 text-right"},[e("span",{staticClass:"text-primary"},[a._v(" "+a._s(a.parseMoneda(a.getVentaID.venta.venta_total))+" ")])])])],1)])],1),a.getVentaID.pagosAbonados.length?e("el-card",{staticClass:"container mt-3",attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix text-primary",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-shopping-bag-1"}),e("span",[a._v(" Lista de Pagos")]),e("el-divider",{attrs:{direction:"vertical"}}),e("span",{staticClass:"text-dark"},[a._v("Total Abonado: ")]),e("span",{staticClass:"text-success"},[a._v(" "+a._s(a.parseMoneda(a.getTotalAbonado(a.getVentaID.pagosAbonados)))+" ")]),a.getTotalPagar(a.getTotalAbonado(a.getVentaID.pagosAbonados),a.getVentaID.venta.venta_total)>0?e("div",[e("span",{staticClass:"text-dark"},[a._v("Total por abonar: ")]),e("span",{staticClass:"text-info"},[a._v(" "+a._s(a.parseMoneda(a.getTotalPagar(a.getTotalAbonado(a.getVentaID.pagosAbonados),a.getVentaID.venta.venta_total)))+" ")])]):a._e()],1),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.uploading,expression:"uploading"}],staticClass:"h-100 w-100",attrs:{data:a.getVentaID.pagosAbonados}},[e("el-table-column",{attrs:{prop:"balances_abonado_transaccion",label:"N° Transacción",width:"150",sortable:""}}),e("el-table-column",{attrs:{prop:"bancos_nombre",label:"Nombre del Banco",width:"190",sortable:""}}),e("el-table-column",{attrs:{prop:"balances_abonado_abonado",label:"Monto Abonado",width:"150",sortable:""},scopedSlots:a._u([{key:"default",fn:function(t){return[e("div",[e("span",[a._v(" "+a._s(a.parseMoneda(t.row.balances_abonado_abonado))+" ")])])]}}],null,!1,717211975)}),e("el-table-column",{attrs:{prop:"bancos_cuenta",label:"Cuenta Destino",width:"200",sortable:""}}),e("el-table-column",{attrs:{prop:"bancos_dni",label:"Identificación",width:"130",sortable:""}}),e("el-table-column",{attrs:{prop:"bancos_tipo_cuenta",label:"Tipo de Cuenta",width:"140",sortable:""}}),e("el-table-column",{attrs:{prop:"bancos_telefono",label:"Teléfono",width:"200",sortable:""}})],1),e("el-divider"),e("div",[e("div",{staticClass:"d-flex justify-content-center"},[e("p",{staticClass:"m-0 p-0"},[e("small",[a._v("Mostrando "+a._s(a.getVentaID.pagosAbonados.length)+" Registros")])])])])],1):a._e(),e("div",{staticClass:"d-flex flex-wrap justify-content-end mt-2"},[3!=a.getVentaID.venta.status_id&&4!=a.getVentaID.venta.status_id&&5!=a.getVentaID.venta.status_id?e("div",[e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[a._v("En esta opción puedes añadir las transferencias que hagas al banco")]),e("el-button",{staticClass:"btn-primario m-2",attrs:{loading:a.uploading},on:{click:function(t){a.agregarPago=!0}}},[a._v("+ Referencia de Pago")])],1)],1):a._e(),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[a._v("Imprime esta vista si deseas algún comprobante no oficial")]),e("el-button",{staticClass:"btn-primario m-2",attrs:{loading:a.uploading},on:{click:function(t){return a.print("print")}}},[a._v("Imprimir Pantalla")])],1)],1),e("el-drawer",{ref:"drawerpago",attrs:{title:"Abonar referencia de pago","before-close":a.handleClose,visible:a.agregarPago,direction:"rtl","custom-class":"demo-drawer overflow-auto"},on:{"update:visible":function(t){a.agregarPago=t}}},[e("div",{staticClass:"Contenido p-2"},[e("form",{on:{submit:function(t){return t.preventDefault(),a.agregarPagoBalance(a.abonado)}}},[e("div",{staticClass:"col-12 mb-3"},[e("label",[a._v("Seleccione donde se realizó el pago "),e("small",[a._v("(Requerido)")])]),e("el-select",{staticClass:"w-100",attrs:{placeholder:"Banco donde se realizó el pago"},model:{value:a.abonado.banco_id,callback:function(t){a.$set(a.abonado,"banco_id",t)},expression:"abonado.banco_id"}},a._l(a.getAllBancos,(function(a){return e("el-option",{key:a.banco_id,attrs:{label:a.bancos_nombre,value:a.banco_id}})})),1)],1),a.abonado.banco_id&&a.abonado.banco_id>0?e("div",{staticClass:"col-12 mb-3"},[e("b",[e("span",{staticClass:"d-block"},[a._v(a._s(a.returnBanco(a.getAllBancos,a.abonado.banco_id).bancos_nombre)+" ")]),e("span",{staticClass:"d-block"},[a._v(a._s(a.returnBanco(a.getAllBancos,a.abonado.banco_id).bancos_dni)+" ")]),e("span",{staticClass:"d-block"},[a._v(a._s(a.returnBanco(a.getAllBancos,a.abonado.banco_id).bancos_tipo_cuenta)+" ")]),e("span",{staticClass:"d-block"},[a._v(a._s(a.returnBanco(a.getAllBancos,a.abonado.banco_id).bancos_cuenta)+" ")]),e("span",{staticClass:"d-block"},[a._v(a._s(a.returnBanco(a.getAllBancos,a.abonado.banco_id).bancos_telefono)+" ")])])]):a._e(),e("div",{staticClass:"col-12 mb-3"},[e("label",[a._v("Ingrese el número de transacción del banco "),e("small",[a._v("(Requerido)")])]),e("el-input",{attrs:{type:"number",min:"0",placeholder:"Número de transacción","prefix-icon":"el-icon-document"},model:{value:a.abonado.balances_abonado_transaccion,callback:function(t){a.$set(a.abonado,"balances_abonado_transaccion",t)},expression:"abonado.balances_abonado_transaccion"}})],1),e("div",{staticClass:"col-12 mb-3"},[e("label",[a._v("Ingrese el Monto del Pago. "),e("small",[a._v("(Requerido)")])]),e("el-input",{attrs:{type:"number",placeholder:"Ingrese el monto que pago en el banco",min:"0",step:"0.01","prefix-icon":"el-icon-money"},model:{value:a.abonado.balances_abonado_abonado,callback:function(t){a.$set(a.abonado,"balances_abonado_abonado",t)},expression:"abonado.balances_abonado_abonado"}}),e("small",[a._v("Nota: el uso de ( . ) y ( , ) indica los decimales")])],1)]),e("el-divider"),e("div",{staticClass:"d-flex flex-wrap justify-content-between"},[e("el-button",{staticClass:"btn-primario",on:{click:function(t){a.agregarPago=!1}}},[a._v("Cancelar")]),e("el-button",{staticClass:"btn-primario",attrs:{loading:a.uploading},on:{click:function(t){return a.agregarPagoBalance(a.abonado,a.getVentaID.venta.balances_id)}}},[a._v(a._s(a.uploading?"Enviando ...":"Enviar"))])],1)],1)])],1):e("div",{staticClass:"d-flex my-5 justify-content-center"},[e("el-card",{staticClass:"col-10 my-5"},[e("h1",{staticClass:"display-3 text-center"},[e("i",{staticClass:"el-icon-shopping-cart-1"})]),e("div",{staticClass:"text-center"},[e("h3",[a._v("Esta orden no existe o no te pertenece!")])])])],1)],1)},n=[],o=(e("4160"),e("159b"),e("c1df")),l=e.n(o),i=e("d67e"),r=e.n(i),c={metaInfo:{titleTemplate:"%s | Visualizar órden"},created:function(){this.getTitle(this.$route.params.ID)},watch:{$route:function(){this.getTitle(this.$route.params.ID)}},data:function(){return{uploading:!1,agregarPago:!1,abonado:{balances_abonado_id:0,balances_id:0,banco_id:null,balances_abonado_transaccion:null,balances_abonado_abonado:0,balances_abonado_credito:1}}},methods:{getTitle:function(a){"string"!=typeof a&&(a=this.$route.params.ID),this.$store.dispatch("getVentaID",{value:a})},parseMoneda:function(a){var t=parseFloat(a||0);return t.toLocaleString("es-VE")+" Bs."},parseFecha:function(a){return a?(l.a.locale("es-VE"),l()(a).format("LL hh:mm A")):"Fecha Inválida"},print:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"print";r()().from(document.getElementById(a)).save("Comprobante.pdf")},handleClose:function(a){var t=this;this.uploading||this.$confirm("Esto descartará los cambios.","Deseas cerrar el formulario?",{confirmButtonText:"SI",cancelButtonText:"NO",type:"warning"}).then((function(){t.uploading=!1,t.agregarPago=!1,a(),t.$message({type:"success",message:"Listo"})})).catch((function(){t.$message({type:"info",message:"Uff Estuvo Cerca"})}))},getTotalAbonado:function(a){var t=0;return a.forEach((function(a){t+=a.balances_abonado_abonado})),parseFloat(t)},getTotalPagar:function(a,t){return parseFloat(t)-parseFloat(a)},agregarPagoBalance:function(a,t){var e=this;a.balances_id=t,this.uploading=!0,this.axios({method:"POST",url:"/balances/abonar",data:a}).then((function(){e.$notify({title:"Realizado!",message:"La referencia de pago se abonó exitosamente!",type:"success"}),e.$store.dispatch("startupEscencial"),e.$store.dispatch("startupClient"),e.getTitle(),e.uploading=!1,e.agregarPago=!1,e.abonado={balances_abonado_id:0,balances_id:0,banco_id:null,balances_abonado_transaccion:null,balances_abonado_abonado:0,balances_abonado_credito:1}})).catch((function(a){a.response?(e.$notify({title:"Error",message:"Los valores que ingresaste no son válidos",type:"info"}),console.log(a.response.data.message)):e.$notify({title:"Error",message:"Hubo un problema con la conexión",type:"error"}),e.uploading=!1}))},returnBanco:function(a,t){var e=null;return a.forEach((function(a){a.banco_id==t&&(e=a)})),e}},computed:{getVentaID:function(){return this.$store.getters.getVentaID},getAllBancos:function(){return this.$store.getters.getAllBancos},getMyUser:function(){return this.$store.getters.getMyUser}}},d=c,p=e("2877"),b=Object(p["a"])(d,s,n,!1,null,null,null);t["default"]=b.exports},4160:function(a,t,e){"use strict";var s=e("23e7"),n=e("17c2");s({target:"Array",proto:!0,forced:[].forEach!=n},{forEach:n})},fdbc:function(a,t){a.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-120ea111.21311de5.js.map