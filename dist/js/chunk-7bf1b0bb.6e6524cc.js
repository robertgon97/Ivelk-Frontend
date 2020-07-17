(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bf1b0bb"],{"19de":function(e,t){e.exports=function(e,t,i,n){var o="undefined"!==typeof n?[n,e]:[e],a=new Blob(o,{type:i||"application/octet-stream"});if("undefined"!==typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(a,t);else{var s=window.URL&&window.URL.createObjectURL?window.URL.createObjectURL(a):window.webkitURL.createObjectURL(a),l=document.createElement("a");l.style.display="none",l.href=s,l.setAttribute("download",t),"undefined"===typeof l.download&&l.setAttribute("target","_blank"),document.body.appendChild(l),l.click(),setTimeout((function(){document.body.removeChild(l),window.URL.revokeObjectURL(s)}),200)}}},"5d7c":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("Inicio")]),i("el-breadcrumb-item",{attrs:{to:{path:"/tienda"}}},[e._v("Administración Tienda")]),i("el-breadcrumb-item",{attrs:{to:{path:"/tienda/configuracion"}}},[e._v("Configuración")]),i("el-breadcrumb-item",{attrs:{to:{path:"/tienda/configuracion/general"}}},[e._v("General")])],1),i("br"),i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:"col-md-4 mb-3"},[e.getgetAppConfig&&"Loading"!=e.getgetAppConfig?i("el-card",[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("i",{staticClass:"el-icon-setting"}),i("span",[e._v(" Configuración Actual")])]),i("div",{staticClass:"text item"},[i("p",[i("i",{staticClass:"el-icon-tickets"}),e._v(" IVA: "),i("b",[e._v(e._s(e.getgetAppConfig.config_iva)+" %")])]),i("p",[i("i",{staticClass:"el-icon-d-arrow-left"}),e._v(" Inventario Mínimo: "),i("b",[e._v(e._s(e.getgetAppConfig.config_inventario_minimo)+" Unidades")])]),i("p",[i("i",{staticClass:"el-icon-d-arrow-right"}),e._v(" Inventario Máximo: "),i("b",[e._v(e._s(e.getgetAppConfig.config_inventario_maximo)+" Unidades")])])]),i("el-button",{staticClass:"btn-primario",on:{click:e.getSQL}},[e._v("Crear Respaldo de Base de Datos")])],1):e._e()],1),i("el-col",{staticClass:"col-md-8 mb-3"},[i("el-card",[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("i",{staticClass:"el-icon-plus"}),i("span",[e._v(" Agregar Configuración")])]),i("div",{staticClass:"contenido"},[i("form",{on:{submit:function(t){return t.preventDefault(),e.add(t)}}},[i("div",{staticClass:"row m-0 p-0 justify-content-center"},[i("div",{staticClass:"col-md-6 mb-3"},[i("label",[e._v("Inventario Mínimo")]),i("el-input",{attrs:{type:"number",min:"0",placeholder:"Número mínimo","prefix-icon":"el-icon-d-arrow-left",clearable:""},model:{value:e.newconfig.config_inventario_minimo,callback:function(t){e.$set(e.newconfig,"config_inventario_minimo",t)},expression:"newconfig.config_inventario_minimo"}})],1),i("div",{staticClass:"col-md-6 mb-3"},[i("label",[e._v("Inventario Máximo")]),i("el-input",{attrs:{type:"number",min:"0",placeholder:"Número máximo","prefix-icon":"el-icon-d-arrow-right",clearable:""},model:{value:e.newconfig.config_inventario_maximo,callback:function(t){e.$set(e.newconfig,"config_inventario_maximo",t)},expression:"newconfig.config_inventario_maximo"}})],1)]),i("div",{staticClass:"row m-0 p-0 justify-content-center"},[i("div",{staticClass:"col-md-5 mb-3"},[i("label",[e._v("IVA (Porcentaje)")]),i("el-input",{attrs:{type:"number",min:"0",max:"100",placeholder:"IVA%","prefix-icon":"el-icon-tickets",clearable:""},model:{value:e.newconfig.config_iva,callback:function(t){e.$set(e.newconfig,"config_iva",t)},expression:"newconfig.config_iva"}})],1),i("div",{staticClass:"col-md-5 mb-3 pt-4"},[i("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.uploading,expression:"uploading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"btn-primario mt-2",attrs:{round:""},on:{click:e.add}},[e._v("Aplicar esta configuración")])],1)])])]),i("div",{staticClass:"clearfix text-center"},[i("p",{staticClass:"m-0 p-0"},[i("small",[e._v("Todos los campos son obligatorios")])])])])],1)],1),e.getAllConfig&&"Loading"==e.getAllConfig?i("div",[i("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:!0,expression:"true",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"text"}})],1):e.getAllConfig&&e.getAllConfig.length?i("el-card",[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("i",{staticClass:"el-icon-refresh-left"}),i("span",[e._v(" Configuraciones Anteriores")])]),i("div",{staticClass:"contenido"},[i("el-table",{attrs:{data:e.getAllConfig,"default-sort":{prop:"config_id",order:"descending"}}},[i("el-table-column",{attrs:{fixed:"",width:"50",prop:"config_id",label:"#"}}),i("el-table-column",{attrs:{prop:"config_inventario_minimo",label:"Inventario Mínimo"}}),i("el-table-column",{attrs:{prop:"config_inventario_maximo",label:"Inventario Máximo"}}),i("el-table-column",{attrs:{prop:"config_iva",label:"IVA %"}})],1)],1)]):i("div",{staticClass:"d-flex my-5 justify-content-center"},[e._m(0)])],1)},o=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"col-10 my-5"},[i("h1",{staticClass:"display-3 text-center"},[i("i",{staticClass:"el-icon-s-custom"})]),i("div",{staticClass:"text-center"},[i("h3",[e._v("No hay configuraciones registradas")])])])}],a=(i("d3b7"),i("19de")),s=i.n(a),l={metaInfo:{titleTemplate:"%s | Configuración General"},data:function(){return{uploading:!1,newconfig:{config_id:0,config_inventario_minimo:null,config_inventario_maximo:null,config_iva:null}}},methods:{add:function(){var e=this;this.uploading=!0,this.axios({method:"POST",url:"/configuracion",data:this.newconfig}).then((function(){e.$notify({title:"Registro Exitoso!",message:"La configuración se agregó correctamente!",type:"success",duration:0}),e.$store.dispatch("startupEscencial"),e.$store.dispatch("startupAdmin"),e.uploading=!1,e.newconfig={config_id:0,config_inventario_minimo:null,config_inventario_maximo:null,config_iva:null}})).catch((function(t){t.response?(e.$notify({title:"Error",message:"Agunos datos son requeridos o son inválidos",type:"info"}),console.log(t.response.data.message)):e.$notify({title:"Error",message:"Agunos datos son requeridos o son inválidos",type:"error"}),e.uploading=!1})).finally((function(){}))},getSQL:function(){this.axios({method:"GET",url:"/respaldo/get",data:this.newconfig}).then((function(e){s()(e.data,"ivelk.sql")}))}},computed:{getAllConfig:function(){return this.$store.getters.getAllConfig},getgetAppConfig:function(){return this.$store.getters.getgetAppConfig}}},r=l,c=i("2877"),d=Object(c["a"])(r,n,o,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-7bf1b0bb.6e6524cc.js.map