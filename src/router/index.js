import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import OrderListPage from '@/pages/orderList'
import DetailPage from '@/pages/detail'
import DetailStatPage from '@/pages/detail/statistics'
import DetailPredPage from '@/pages/detail/prediction'
import DetailAnalyPage from '@/pages/detail/analysis'
import DetailAdPage from '@/pages/detail/ad'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/order',
      name: 'OrderListPage',
      component: OrderListPage
    },
    {
      path: '/detail',
      redirect: '/detail/statistics',
      name: 'DetailPage',
      component: DetailPage,
      children: [
        {
          path: 'statistics',
          name: 'DetailStatPage',
          component: DetailStatPage
        },
        {
          path: 'prediction',
          name: 'DetailPredPage',
          component: DetailPredPage
        },
        {
          path: 'analysis',
          name: 'DetailAnalyPage',
          component: DetailAnalyPage
        },
        {
          path: 'ad',
          name: 'DetailAdPage',
          component: DetailAdPage
        }
      ]
    }
  ]
})
