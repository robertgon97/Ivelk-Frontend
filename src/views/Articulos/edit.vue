<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda' }">Administración Tienda</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/tienda/articulos' }">Artículos</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/tienda/articulos/${$route.params.ID}` }">Artículo #{{$route.params.ID}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <div v-if="getIDArticulo && getIDArticulo == 'Loading'">
      <el-button type="text" v-loading.fullscreen.lock="true"></el-button>
    </div>
    <div v-else-if="getIDArticulo && getIDArticulo.articulo.articulos_id">
      <el-row :gutter="20">
        <el-col class="col-md-4 mb-3">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="clearfix text-primary">
              <i class="el-icon-goods text-dark"></i>
              <span class="text-dark"> Artículo</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{getIDArticulo.articulo.articulos_nombres}}</span>
            </div>
            <el-image class="w-100 d-block" fit="cover" :src="getIDArticulo.articulo.articulos_imagen_principal || false" :preview-src-list="getIMGS(getIDArticulo.imagenes)">
              <div slot="placeholder" class="image-slot">
                Cargando<span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <div class="p-5 text-center">
                  <h1 class="m-0 p-0"><i class="el-icon-picture-outline"></i></h1>
                </div>
              </div>
            </el-image>
            <div style="padding: 14px;">
              <p class="">{{getIDArticulo.articulo.articulos_descripcion}}</p>
              <div class="bottom d-flex justify-content-end clearfix">
                <el-button type="text" class="button">{{parseMoneda(getIDArticulo.articulo.stock_precio)}}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col class="col-md-8 mb-3">
          <el-card>
            <div slot="header" class="clearfix">
              <i class="el-icon-edit"></i>
              <span> Modificar Artículo</span>
            </div>
            <form @submit.prevent="update(getIDArticulo.articulo)">
              <div class="row m-0 p-0 justify-content-between">
                <div class="col-md-6 mb-3">
                  <label>Nombre del Artículo</label>
                  <el-input type="text" placeholder="Nombre del artículo" v-model="getIDArticulo.articulo.articulos_nombres" prefix-icon="el-icon-goods" clearable show-word-limit maxlength="100"></el-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Descripción del Artículo</label>
                  <el-input type="text" placeholder="Descripción del artículo" v-model="getIDArticulo.articulo.articulos_descripcion" prefix-icon="el-icon-document" clearable show-word-limit maxlength="300"></el-input>
                </div>
              </div>
              <div class="row m-0 p-0 justify-content-between">
                <div class="col-md-6 mb-3">
                  <label>Categoría del Artículo</label>
                  <el-select class="w-100" placeholder="Categoría del Artículo" v-model="getIDArticulo.articulo.articulo_tipo_id">
                    <el-option v-for="categoria of getAllCategoria" :key="categoria.articulo_tipo_id" :label="categoria.articulo_tipo_nombre" :value="categoria.articulo_tipo_id" />
                  </el-select>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Marca</label>
                  <el-select class="w-100" placeholder="Marca del Artículo" v-model="getIDArticulo.articulo.articulo_marcas_id">
                    <el-option v-for="marca of getAllMarcas" :key="marca.articulo_marcas_id" :label="marca.articulo_marcas_nombre" :value="marca.articulo_marcas_id" />
                  </el-select>
                </div>
              </div>
              <div class="row m-0 p-0 justify-content-between">
                <div class="col-md-6 mb-3">
                  <label>Medida</label>
                  <el-select class="w-100" placeholder="Seleccione la medida del articulo" v-model="getIDArticulo.articulo.articulo_medida_id" clearable>
                    <el-option v-for="medida of getAllMedidas" :key="medida.articulo_medida_id" :label="medida.articulo_medidas_nombre" :value="medida.articulo_medida_id" />
                  </el-select>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Tamaño</label>
                  <el-select class="w-100" placeholder="Seleccione el tamaño del articulo" v-model="getIDArticulo.articulo.articulo_tamano_id" clearable>
                    <el-option v-for="tamano of getAllTamanos" :key="tamano.articulo_tamano_id" :label="tamano.articulo_tamano_nombre" :value="tamano.articulo_tamano_id" />
                  </el-select>
                </div>
              </div>
              <div class="row m-0 p-0 justify-content-between">
                <div class="col-md-6 mb-3">
                  <label>Cantidad Actual</label>
                  <el-input type="number" placeholder="Cantidad del artículo" min="0" v-model="getIDArticulo.articulo.stock_cantidad" :max="getgetAppConfig.config_inventario_maximo" prefix-icon="el-icon-takeaway-box" clearable></el-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Precio Actual</label>
                  <el-input type="number" placeholder="Precio del artículo" min="0" step="0.01" v-model="getIDArticulo.articulo.stock_precio" prefix-icon="el-icon-money" clearable></el-input>
                </div>
              </div>
              <div class="row m-0 p-0 justify-content-between">
                <div class="col-md-6 mb-3">
                  <label for="articulos_imagen_principal">Imagen Principal</label>
                  <input class="form-control" type="file" name="articulos_imagen_principal" id="articulos_imagen_principal" placeholder="Selecciona tu imagen" accept="image/*" @change="updateImage" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="articulos_imagen_principal">Imágenes Secundarias</label>
                  <input class="form-control" type="file" multiple name="articulos_imagen_secundario" id="articulos_imagen_secundario" placeholder="Selecciona tu imagen" accept="image/*" @change="updateImages" />
                </div>
              </div>
              <hr />
              <div class="row m-0 p-0 justify-content-center">
                <div class="col-md-3 mb-3 text-center">
                  <el-button class="btn-primario" round @click="update(getIDArticulo.articulo)" v-loading.fullscreen.lock="uploading">Actualizar</el-button>
                </div>
              </div>
            </form>
          </el-card>
        </el-col>
        <el-col class="col-md-12 mb-3">
          <el-card>
            <div slot="header" class="text-primary d-flex flex-wrap justify-content-between">
              <p class="m-0 p-0">
                <i class="el-icon-s-cooperation text-dark"></i>
                <span class="text-dark"> Proveedores Asociados</span>
                <el-divider direction="vertical"></el-divider>
                <span v-if="getIDArticulo.proveedores">{{getIDArticulo.proveedores.length}} Asociados</span>
              </p>
              <el-button type="text" @click="abrirAddProveedor = true">+ Agregar Proveedor</el-button>
            </div>
            <el-table :data="getIDArticulo.proveedores">
              <el-table-column prop="articulo_proveedor_id" label="#" width="100"></el-table-column>
              <el-table-column prop="proveedor_razon_social" label="Raxón Social" width="250"></el-table-column>
              <el-table-column prop="proveedor_correo" label="Correo" width="200"></el-table-column>
              <el-table-column prop="proveedor_telefono" label="Teléfono" width="150"></el-table-column>
              <el-table-column prop="proveedor_direccion" label="Dirección" width="300"></el-table-column>
              <el-table-column fixed="right" label="Eliminar" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" class="text-danger" @click="delProveedor(scope.row)">Eliminar</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-drawer title="Agregar Proveedor Asociado" ref="drawerpago" :visible.sync="abrirAddProveedor" direction="rtl" custom-class="demo-drawer overflow-auto">
        <div class="contenido p-2">
          <form @submit.prevent="AddProvedor(proveedor, getIDArticulo.articulo.articulos_id)">
            <div class="col-12 mb-3">
              <label>Proveedor</label>
              <el-select class="w-100" placeholder="Proveedor" v-model="proveedor.proveedor_id" :loading="(getAllProveedores == 'Loading') ? true : false">
                <el-option v-for="proveedor of getAllProveedores" :key="proveedor.proveedor_id" :label="proveedor.proveedor_razon_social" :value="proveedor.proveedor_id" />
              </el-select>
            </div>
            <div class="col-12 mb-3">
              <el-checkbox v-model="proveedor.disponibilidad" label="Disponible para el proveedor" border></el-checkbox>
            </div>
          </form>
          <el-divider></el-divider>
          <div class="d-flex flex-wrap justify-content-between" >
            <el-button class="btn-primario" @click="abrirAddProveedor = false">Cancelar</el-button>
            <el-button class="btn-primario" @click="AddProvedor(proveedor, getIDArticulo.articulo.articulos_id)" :loading="uploading">{{ uploading ? 'Enviando ...' : 'Enviar' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
    <div v-else class="d-flex my-5 justify-content-center">
      <div class="col-10 my-5">
        <h1 class="display-3 text-center"><i class="el-icon-s-custom"></i></h1>
        <div class="text-center">
          <h3>Este artículo no existe</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    metaInfo: {
      titleTemplate: '%s | Detalles del Artículo'
    },
    created() {
      this.find(this.$route.params.ID)
    },
    watch: {
      $route() {
        this.find(this.$route.params.ID)
      }
    },
    data () {
      return {
        uploading: false,
        formData: new FormData(),
        abrirAddProveedor: false,
        proveedor: {
          proveedor_id: null,
          disponibilidad: true
        }
      }
    },
    methods: {
      find(route) {
        this.$store.dispatch('getIDArticulo', { value: route || this.$route.params.ID })
      },
      parseMoneda(value) {
        var numer = parseFloat(value || 0)
        return numer.toLocaleString('es-VE') + ' Bs.'
      },
      parseFecha(value) {
        if (value) {
          moment.locale('es-VE')
          return moment(value).format('LL hh:mm A')
        } else return 'Fecha Inválida'
      },
      updateImage (event) {
        let files = event.target.files
        this.formData.delete('articulos_imagen_principal')
        if (files.length) {
          for (let image of files) {
            this.formData.append('articulos_imagen_principal', image, image.name)
          }
        }
      },
      updateImages (event) {
        let files = event.target.files
        this.formData.delete('articulos_imagen_secundario')
        if (files.length) {
          for (let image of files) {
            this.formData.append('articulos_imagen_secundario', image, image.name)
          }
        }
      },
      getIMGS(array) {
        if (!array.length) return [""]
        else {
          var resultados = []
          array.forEach(element => {
            resultados.push(element.imagen_url)
          })
          return resultados
        }
      },
      update(articulo) {
        this.uploading = true
        this.formData.delete('articulos_id')
        this.formData.append('articulos_id', articulo.articulos_id)
        this.formData.delete('articulo_tipo_id')
        this.formData.append('articulo_tipo_id', articulo.articulo_tipo_id)
        this.formData.delete('articulo_marcas_id')
        this.formData.append('articulo_marcas_id', articulo.articulo_marcas_id)
        this.formData.delete('articulo_medida_id')
        this.formData.append('articulo_medida_id', articulo.articulo_medida_id)
        this.formData.delete('articulo_tamano_id')
        this.formData.append('articulo_tamano_id', articulo.articulo_tamano_id)
        this.formData.delete('articulos_nombres')
        this.formData.append('articulos_nombres', articulo.articulos_nombres)
        this.formData.delete('articulos_descripcion')
        this.formData.append('articulos_descripcion', articulo.articulos_descripcion)
        this.formData.delete('stock_cantidad')
        this.formData.append('stock_cantidad', articulo.stock_cantidad)
        this.formData.delete('stock_precio')
        this.formData.append('stock_precio', articulo.stock_precio)
        this.formData.delete('stock_id')
        this.formData.append('stock_id', articulo.stock_id)
        this.axios({
          method: `PUT`,
          url: `/articulos`,
          data: this.formData
        })
        .then(() => {
          this.$notify({
            title: 'Actualización Exitosa!',
            message: `El articulo ${articulo.articulos_nombres} se modificó correctamente!`,
            type: 'success'
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find()
          this.uploading = false
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
      },
      AddProvedor(datos, id) {
        datos.articulos_id = id
        datos.disponibilidad = datos.disponibilidad ? 1 : 0
        this.uploading = true
        this.axios({
          method: `POST`,
          url: `/articulos/proveedor`,
          data: datos
        })
        .then(() => {
          this.$notify({
            title: 'Actualización Exitosa!',
            message: `Se añadió el proveedor correctamente!`,
            type: 'success'
          })
          this.$store.dispatch('startupEscencial')
          this.$store.dispatch('startupAdmin')
          this.find()
          this.uploading = false
          this.proveedor.proveedor_id = null

        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'info'
            })
            console.log (err.response.data.message)
          } else {
            this.$notify({
              title: 'Error',
              message: 'Agunos datos son requeridos o son inválidos',
              type: 'error'
            })
          }
          this.uploading = false
          // console.clear()
        })
        .finally(() => {
          this.abrirAddProveedor = false
        })
      },
      delProveedor(value) {
        this.$confirm('Deseas eliminar ese registro?', 'Estás Seguro de esto?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        })
        .then(() => {
          this.uploading = true
          this.axios({
            method: `DELETE`,
            url: `/articulos/proveedor`,
            data: value
          })
          .then(() => {
            this.$notify({
              title: 'Eliminación Exitosa!',
              message: `Se eliminó el proveedor de la lista correctamente!`,
              type: 'success'
            })
            this.$store.dispatch('startupEscencial')
            this.$store.dispatch('startupAdmin')
            this.find()
            this.uploading = false
            this.proveedor.proveedor_id = null

          })
          .catch(err => {
            if (err.response) {
              this.$notify({
                title: 'Error',
                message: 'Agunos datos son requeridos o son inválidos',
                type: 'info'
              })
              console.log (err.response.data.message)
            } else {
              this.$notify({
                title: 'Error',
                message: 'Agunos datos son requeridos o son inválidos',
                type: 'error'
              })
            }
            this.uploading = false
            // console.clear()
          })
          .finally(() => {
            this.abrirAddProveedor = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Uff... cancelado'
          })
        })
      }
    },
    computed: {
      getIDArticulo () {
        return this.$store.getters.getIDArticulo
      },
      getAllCategoria () {
        return this.$store.getters.getAllCategoria
      },
      getAllMarcas () {
        return this.$store.getters.getAllMarcas
      },
      getAllMedidas () {
        return this.$store.getters.getAllMedidas
      },
      getAllTamanos () {
        return this.$store.getters.getAllTamanos
      },
      getAllProveedores () {
        return this.$store.getters.getAllProveedores
      },
      getgetAppConfig () {
        return this.$store.getters.getgetAppConfig
      }
    }
  }
</script>
