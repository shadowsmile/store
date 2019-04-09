<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :md="6">
      <div class="prod-list">
        <div class="pic">
          <img src="@/assets/logo.png" alt="logo">
        </div>
        <div class="list-content">
          <ul>
            <router-link
              v-for="(item, index) in prodList"
              :key="index" :to="{ path: item.url }"
              tag="li">
              {{ item.name }}
            </router-link>
          </ul>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="16" :md="18">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </el-col>
  </el-row>
</template>

<script>
import Carousel from '@/components/carousel'

export default {
  components: { Carousel },
  data () {
    return {
      prodList: [
        {
          name: '数据统计',
          url: 'statistics'
        },
        {
          name: '数据预测',
          url: 'prediction'
        },
        {
          name: '流量分析',
          url: 'analysis'
        },
        {
          name: '广告发布',
          url: 'ad'
        }
      ]
    }
  }
}
</script>

<style scoped>
.prod-list {
  background-color: #fff;
  padding: 20px 0;
}
.pic {
  height: 90px;
  position: relative;
}
.pic img {
  width: 80px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
ul {
  line-height: 30px;
}
li {
  padding: 0 25px;
  cursor: pointer;
}
li:hover,
.router-link-active {
  background-color: #55b17c;
  color: #fff;
}
</style>
