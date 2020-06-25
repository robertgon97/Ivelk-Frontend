<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover">
    <el-image class="w-100" fit="cover" :src="src[0]" :preview-src-list="src">
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
      <span>{{title}}</span>
      <div class="bottom clearfix">
        <time class="time">{{ description }}</time>
        <el-button type="text" class="button">{{parseMoneda(costo)}}</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: "Sin Título"
      },
      description: {
        type: String,
        default: "Sin Descripción"
      },
      costo: {
        type: Number,
        default: () => {
          return 0
        }
      },
      src: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        //
      }
    },
    methods: {
      parseMoneda (value) {
        var numer = parseFloat(value || 0)
        if (numer) return numer.toLocaleString('es-VE') + ' Bs.'
        else return 'Gratis'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
