<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :md="6">
      <div class="prod-list">
        <p>全部产品</p>
        <div class="list-content">
          <div v-for="(product, key) in productList" :key="key" :class="key">
            <p>{{ product.title }}</p>
            <ul>
              <li v-for="item in product.list" :key="item.name">
                <router-link :to="{ path: item.url }">{{ item.name }}</router-link>
              </li>
            </ul>
            <div v-if="!product.last"><hr/></div>
          </div>
        </div>
      </div>
      <div class="news">
        <p>最新消息</p>
        <div class="news-list">
          <ul>
            <li v-for="item in newsList" :key="item.name">
              <router-link :to="{ path: item.url}">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="16" :md="18">
      <el-row class="carousel">
        <carousel></carousel>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :span="12" v-for="(item, index) in boardList" :key="index">
          <el-row class="block">
            <el-col :span="7" :md="6" class="pic"><img src="@/assets/logo.png" alt="logo"></el-col>
            <el-col :span="17" :md="18">
              <p class="content-title">{{ item.title }}</p>
              <p class="content-desc">{{ item.description }}</p>
              <el-button type="primary" size="small">立即购买</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Carousel from '@/components/carousel'

export default {
  components: { Carousel },
  data () {
    return {
      productList: {
        pc: {
          title: 'PC产品',
          list: [
            {
              name: '数据统计',
              url: '/detail/statistics'
            },
            {
              name: '数据预测',
              url: '/detail/prediction'
            },
            {
              name: '流量分析',
              url: '/detail/analysis'
            },
            {
              name: '广告发布',
              url: '/detail/ad'
            }
          ]
        },
        app: {
          title: '应用类',
          last: true,
          list: [
            {
              name: '91助手',
              url: ''
            },
            {
              name: '产品助手',
              url: ''
            },
            {
              name: '智能地图',
              url: ''
            },
            {
              name: '团队语音',
              url: ''
            }
          ]
        }
      },
      newsList: [
        {
          name: '数据统计',
          url: '/detail/statistics'
        },
        {
          name: '数据预测',
          url: '/detail/prediction'
        },
        {
          name: '流量分析',
          url: '/detail/analysis'
        },
        {
          name: '广告发布',
          url: '/detail/ad'
        }
      ],
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          soldout: false
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更好地找到定位',
          soldout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永远保持最前端的速度',
          soldout: true
        },
        {
          title: '勇攀高峰',
          description: '帮你勇闯高峰，到达事业的顶峰',
          soldout: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.prod-list, .news {
  background-color: #fff;
  margin-bottom: 20px;
}
.list-content {
  padding-bottom: 10px;
}
.prod-list>p, .news>p {
  padding: 5px 10px;
  background-color: #55b17c;
  color: #fff;
}
.pc>p, .app>p {
  padding: 10px;
  font-weight: bold;
}
.pc ul, .app ul, .news ul {
  padding: 0 15px;
  line-height: 20px;
}
.news-list {
  padding: 10px 0;
}
.carousel {
  margin-bottom: 20px;
}
.block {
  height: 110px;
  overflow: hidden;
  background-color: #fff;
  padding: 15px 10px;
  margin-bottom: 20px;
}
.pic {
  margin-top: 14px;
  text-align: center;
}
.pic img {
  width: 50px;
}
.content-title {
  font-size: 15px;
  font-weight: bold;
  line-height: 20px;
}
.content-desc {
  line-height: 25px;
}
</style>
