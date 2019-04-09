<template>
  <el-carousel>
    <el-carousel-item v-for="(item, index) in pics" :key="index">
      <img :src="item.url" alt="image">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      pics: [
        {
          url: require('@/assets/1.jpg')
        },
        {
          url: require('@/assets/2.jpg')
        },
        {
          url: require('@/assets/3.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__container {
  height: 30%;
}
.el-carousel__item {
  background-color: #d3dce6;
}
img {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
