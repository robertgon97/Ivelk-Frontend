(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dfec43d0"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,o){var n=o("c6b6"),a=o("9263");e.exports=function(e,t){var o=e.exec;if("function"===typeof o){var i=o.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"841c":function(e,t,o){"use strict";var n=o("d784"),a=o("825a"),i=o("1d80"),r=o("129f"),s=o("14c3");n("search",1,(function(e,t,o){return[function(t){var o=i(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,o):new RegExp(t)[e](String(o))},function(e){var n=o(t,e,this);if(n.done)return n.value;var i=a(e),l=String(this),c=i.lastIndex;r(c,0)||(i.lastIndex=0);var u=s(i,l);return r(i.lastIndex,c)||(i.lastIndex=c),null===u?-1:u.index}]}))},9263:function(e,t,o){"use strict";var n=o("ad6d"),a=o("9f7f"),i=RegExp.prototype.exec,r=String.prototype.replace,s=i,l=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=a.UNSUPPORTED_Y||a.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=l||u||c;d&&(s=function(e){var t,o,a,s,d=this,v=c&&d.sticky,p=n.call(d),f=d.source,m=0,h=e;return v&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),h=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(f="(?: "+f+")",h=" "+h,m++),o=new RegExp("^(?:"+f+")",p)),u&&(o=new RegExp("^"+f+"$(?!\\s)",p)),l&&(t=d.lastIndex),a=i.call(v?o:d,h),v?a?(a.input=a.input.slice(m),a[0]=a[0].slice(m),a.index=d.lastIndex,d.lastIndex+=a[0].length):d.lastIndex=0:l&&a&&(d.lastIndex=d.global?a.index+a[0].length:t),u&&a&&a.length>1&&r.call(a[0],o,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(a[s]=void 0)})),a}),e.exports=s},"9f7f":function(e,t,o){"use strict";var n=o("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=n((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,o){"use strict";var n=o("23e7"),a=o("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,o){"use strict";var n=o("825a");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},c607:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[o("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("Inicio")]),o("el-breadcrumb-item",{attrs:{to:{path:"/tienda"}}},[e._v("Administración Tienda")]),o("el-breadcrumb-item",{attrs:{to:{path:"/tienda/articulos"}}},[e._v("Artículos")]),o("el-breadcrumb-item",{attrs:{to:{path:"/tienda/articulos/devoluciones"}}},[e._v("Lista de Devoluciones")])],1),o("br"),e.getAllDevoluciones&&"Loading"==e.getAllDevoluciones?o("div",[o("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:!0,expression:"true",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"text"}})],1):e.getAllDevoluciones&&e.getAllDevoluciones.length?o("div",[o("el-card",[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"el-icon-finished"}),o("span",[e._v(" Lista de Devoluciones")])])]),o("div",{staticClass:"contenido"},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.uploading,expression:"uploading"}],staticClass:"w-100",attrs:{data:e.getAllDevoluciones,"default-sort":{prop:"articulos_id",order:"descending"}}},[o("el-table-column",{attrs:{sortable:"",fixed:"",prop:"devolucion_id",label:"ID",width:"80"}}),o("el-table-column",{attrs:{width:"180",sortable:"",prop:"NombreItem",label:"Nombre del Artículo"}}),o("el-table-column",{attrs:{width:"300",sortable:"",prop:"devolucion_razon",label:"Razón"}}),o("el-table-column",{attrs:{width:"200",sortable:"",prop:"devolucion_date",label:"Fecha de Devolución"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",[e._v(" "+e._s(e.parseFecha(t.row.devolucion_date))+" ")])]}}])}),o("el-table-column",{attrs:{width:"100",sortable:"",label:"ID Orden"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",[e._v(" "+e._s(t.row.ventas_id||t.row.compras_id)+" ")])]}}])}),o("el-table-column",{attrs:{fixed:"right",label:"Operaciones",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"text-primary",attrs:{type:"text",size:"small",icon:"el-icon-edit"},on:{click:function(o){return e.$router.push("/tienda/"+(t.row.ventas_id?"ventas/"+t.row.ventas_id:"compras/"+t.row.compras_id))}}},[e._v("Ver")])]}}])})],1)],1),o("el-divider"),o("div",[o("div",{staticClass:"d-flex justify-content-center"},[o("p",{staticClass:"m-0 p-0"},[o("small",[e._v("Mostrando "+e._s(e.getAllDevoluciones.length)+" Registros")])])])])],1)],1):o("div",{staticClass:"d-flex my-5 justify-content-center"},[e._m(0)]),o("el-dialog",{staticClass:"overflow-auto",attrs:{center:"",visible:e.verFormulario,title:"Crear Devolución del Artículo","before-close":e.handleClose,width:"70%"},on:{"update:visible":function(t){e.verFormulario=t}}},[o("form",{on:{submit:function(t){return t.preventDefault(),e.enviar(e.devolucion)}}},[o("div",{staticClass:"container"},[o("div",{staticClass:"d-flex flex-wrap"},[o("div",{staticClass:"col-12 mb-3"},[o("label",[e._v("Describa la razón del porqué la devolución de este artículo")]),o("el-input",{attrs:{type:"textarea",placeholder:"Resumen de la razón de la devolución","prefix-icon":"el-icon-s-flag",maxlength:"500","show-word-limit":""},model:{value:e.devolucion.devolucion_razon,callback:function(t){e.$set(e.devolucion,"devolucion_razon",t)},expression:"devolucion.devolucion_razon"}})],1)])])]),o("span",{staticClass:"dialog-footer text-center",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{staticClass:"btn-primario",attrs:{loading:e.uploading},on:{click:e.handleClose}},[e._v("Cancelar")]),o("el-button",{staticClass:"btn-primario",attrs:{loading:e.uploading},on:{click:function(t){return e.enviar(e.devolucion)}}},[e._v(e._s(e.uploading?"Creando ...":"Crear"))])],1)])],1)},a=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"col-10 my-5"},[o("h1",{staticClass:"display-3 text-center"},[o("i",{staticClass:"el-icon-s-custom"})]),o("div",{staticClass:"text-center"},[o("h3",[e._v("No hay Devoluciones registrados")])])])}],i=(o("ac1f"),o("841c"),o("c1df")),r=o.n(i),s={metaInfo:{titleTemplate:"%s | Lista de Devoluciones"},created:function(){this.$route.query&&(this.$route.query.ventas_id&&(this.devolucion.ventas_id=this.$route.query.ventas_id,this.verFormulario=!0),this.$route.query.ventas_detalle_id&&(this.devolucion.ventas_detalle_id=this.$route.query.ventas_detalle_id),this.$route.query.compras_id&&(this.devolucion.compras_id=this.$route.query.compras_id,this.verFormulario=!0),this.$route.query.compras_detalles_id&&(this.devolucion.compras_detalles_id=this.$route.query.compras_detalles_id))},watch:{$route:function(){this.$route.query&&(this.$route.query.ventas_id&&(this.devolucion.ventas_id=this.$route.query.ventas_id,this.verFormulario=!0),this.$route.query.ventas_detalle_id&&(this.devolucion.ventas_detalle_id=this.$route.query.ventas_detalle_id),this.$route.query.compras_id&&(this.devolucion.compras_id=this.$route.query.compras_id,this.verFormulario=!0),this.$route.query.compras_detalles_id&&(this.devolucion.compras_detalles_id=this.$route.query.compras_detalles_id))}},data:function(){return{search:{articulos_id:null,articulos_nombres:null,articulo_tipo_nombre:null,articulo_marcas_nombre:null,articulo_medidas_nombre:null,articulo_tamano_nombre:null},devolucion:{devolucion_id:0,ventas_detalle_id:0,compras_detalles_id:0,devolucion_razon:null,devolucion_date:Date.now(),ventas_id:0,compras_id:0},verFormulario:!1,uploading:!1}},methods:{parseFecha:function(e){return e?(r.a.locale("es-VE"),r()(e).format("LL hh:mm A")):"Fecha Inválida"},searchapi:function(){this.$store.dispatch("getAllDevoluciones",this.search)},enviar:function(e){var t=this;this.$confirm("Estás seguro de hacer esta devolución?. Esta acción no se puede deshacer.","Estás Seguro de confirmar esta devolución?",{confirmButtonText:"OK",cancelButtonText:"Cancelar",type:"warning"}).then((function(){t.uploading=!0,t.axios({method:"POST",url:"/devoluciones",data:e}).then((function(){t.$notify({title:"Devolución exitosa!",message:"La devolución se realizó de forma correcta en la base de datos",type:"success"}),t.$store.dispatch("startupEscencial"),t.$store.dispatch("startupAdmin"),t.uploading=!1,t.verFormulario=!1,t.devolucion={devolucion_id:0,ventas_detalle_id:0,compras_detalles_id:0,devolucion_razon:null,devolucion_date:Date.now(),ventas_id:0,compras_id:0}})).catch((function(e){if(e.response)switch(e.response.status){case 400:t.$notify({title:"Error",message:e.response.data.message,type:"info"});break;default:t.$notify({title:"Error",message:"Tienes problemas con la conexión a internet. Intente nuevamente.",type:"info"});break}else t.$notify({title:"Error",message:"Agunos datos son requeridos o son inválidos",type:"error"});t.uploading=!1}))})).catch((function(){t.$message({type:"info",message:"Uff... cancelado"})}))},handleClose:function(e){var t=this;this.uploading||this.$confirm("Esto descartará los cambios.","Deseas cerrar el formulario?",{confirmButtonText:"SI",cancelButtonText:"NO",type:"warning"}).then((function(){t.$router.push("/tienda/".concat(t.devolucion.ventas_id?"ventas/".concat(t.devolucion.ventas_id):"compras/".concat(t.devolucion.compras_id))),t.uploading=!1,t.verFormulario=!1,e(),t.$message({type:"success",message:"Listo"})})).catch((function(){t.$message({type:"info",message:"Uff Estuvo Cerca"})}))}},computed:{getAllDevoluciones:function(){return this.$store.getters.getAllDevoluciones}}},l=s,c=o("2877"),u=Object(c["a"])(l,n,a,!1,null,null,null);t["default"]=u.exports},d784:function(e,t,o){"use strict";o("ac1f");var n=o("6eeb"),a=o("d039"),i=o("b622"),r=o("9263"),s=o("9112"),l=i("species"),c=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=i("replace"),v=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),p=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var o="ab".split(e);return 2!==o.length||"a"!==o[0]||"b"!==o[1]}));e.exports=function(e,t,o,d){var f=i(e),m=!a((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),h=m&&!a((function(){var t=!1,o=/a/;return"split"===e&&(o={},o.constructor={},o.constructor[l]=function(){return o},o.flags="",o[f]=/./[f]),o.exec=function(){return t=!0,null},o[f](""),!t}));if(!m||!h||"replace"===e&&(!c||!u||v)||"split"===e&&!p){var _=/./[f],g=o(f,""[e],(function(e,t,o,n,a){return t.exec===r?m&&!a?{done:!0,value:_.call(t,o,n)}:{done:!0,value:e.call(o,t,n)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:v}),x=g[0],b=g[1];n(String.prototype,e,x),n(RegExp.prototype,f,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}d&&s(RegExp.prototype[f],"sham",!0)}}}]);
//# sourceMappingURL=chunk-dfec43d0.c6d164f0.js.map