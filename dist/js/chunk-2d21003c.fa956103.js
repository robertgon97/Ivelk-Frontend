(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21003c"],{b5a4:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("Inicio")]),e("el-breadcrumb-item",{attrs:{to:{path:"/tienda"}}},[t._v("Administración Tienda")]),e("el-breadcrumb-item",{attrs:{to:{path:"/tienda/configuracion"}}},[t._v("Configuración")]),e("el-breadcrumb-item",{attrs:{to:{path:"/tienda/configuracion/status"}}},[t._v("Lista de Estatus")])],1),e("br"),e("el-card",{staticClass:"mb-3"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-plus"}),e("span",[t._v(" Agregar Estatus")])]),e("div",{staticClass:"contenido"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.addStatus(s)}}},[e("div",{staticClass:"row m-0 p-0 justify-content-center"},[e("div",{staticClass:"col-md-6 mb-3"},[e("label",[t._v("Nombre")]),e("el-input",{attrs:{type:"text",placeholder:"Nombre",clearable:""},model:{value:t.newstatus.status_nombre,callback:function(s){t.$set(t.newstatus,"status_nombre",s)},expression:"newstatus.status_nombre"}})],1),e("div",{staticClass:"col-md-6 mb-3"},[e("label",[t._v("Descripción")]),e("el-input",{attrs:{type:"text",placeholder:"Descripción",clearable:""},model:{value:t.newstatus.status_descripcion,callback:function(s){t.$set(t.newstatus,"status_descripcion",s)},expression:"newstatus.status_descripcion"}})],1)]),e("div",{staticClass:"row m-0 p-0 justify-content-center"},[e("div",{staticClass:"col-md-5 mb-3 pt-4 text-center"},[e("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.uploading,expression:"uploading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"btn-primario mt-2",attrs:{round:""},on:{click:t.addStatus}},[t._v("Agregar Estatus")])],1)])])]),e("div",{staticClass:"clearfix text-center"},[e("p",{staticClass:"m-0 p-0"},[e("small",[t._v("Todos los campos son obligatorios")])])])]),t.getAllStatus&&"Loading"==t.getAllStatus?e("div",[e("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:!0,expression:"true",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"text"}})],1):t.getAllStatus&&t.getAllStatus.length?e("el-card",{staticClass:"mb-3"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-finished"}),e("span",[t._v(" Lista de Estatus")])]),e("div",{staticClass:"contenido"},[e("el-table",{attrs:{data:t.getAllStatus}},[e("el-table-column",{attrs:{fixed:"",width:"50",prop:"status_id",label:"#"}}),e("el-table-column",{attrs:{prop:"status_nombre",label:"Nombre"}}),e("el-table-column",{attrs:{prop:"status_descripcion",label:"Descripcion"}}),e("el-table-column",{attrs:{fixed:"right",label:"Operaciones",width:"150"}},[[e("el-button",{staticClass:"text-primary",attrs:{type:"text",size:"small",icon:"el-icon-edit"}},[t._v("Editar")]),e("el-button",{staticClass:"text-danger",attrs:{type:"text",size:"small",icon:"el-icon-delete"}},[t._v("Eliminar")])]],2)],1),e("el-divider"),e("div",[e("div",{staticClass:"d-flex justify-content-center"},[e("p",{staticClass:"m-0 p-0"},[e("small",[t._v("Mostrando "+t._s(t.getAllStatus.length)+" Registros")])])])])],1)]):e("div",{staticClass:"d-flex my-5 justify-content-center"},[t._m(0)])],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"col-10 my-5"},[e("h1",{staticClass:"display-3 text-center"},[e("i",{staticClass:"el-icon-s-custom"})]),e("div",{staticClass:"text-center"},[e("h3",[t._v("No hay estatus registrados")])])])}],l={metaInfo:{titleTemplate:"%s | Configuración de Status"},data:function(){return{uploading:!1,newstatus:{status_id:0,status_nombre:null,status_descripcion:null}}},methods:{addStatus:function(){var t=this;this.uploading=!0,this.axios({method:"POST",url:"/status",data:this.newstatus}).then((function(){t.$notify({title:"Registro Exitoso!",message:"El Estatus se agregó correctamente!",type:"success",duration:0}),t.$store.dispatch("startupEscencial"),t.$store.dispatch("startupAdmin"),t.uploading=!1})).catch((function(s){s.response?(t.$notify({title:"Error",message:"Agunos datos son requeridos o son inválidos",type:"info"}),console.log(s.response.data.message)):t.$notify({title:"Error",message:"Agunos datos son requeridos o son inválidos",type:"error"}),t.uploading=!1}))}},computed:{getAllStatus:function(){return this.$store.getters.getAllStatus}}},n=l,o=e("2877"),r=Object(o["a"])(n,a,i,!1,null,null,null);s["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d21003c.fa956103.js.map