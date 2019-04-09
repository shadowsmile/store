// import Vue from 'vue'

const state = {
  orderList: [
    {
      orderId: '1000201902041448',
      product: '数据统计',
      version: '高级版',
      period: '1年',
      count: '2',
      date: '2019-02-04',
      amount: '500'
    },
    {
      orderId: '1000201903022461',
      product: '流量分析',
      version: '户外版',
      period: '3个月',
      count: 1,
      date: '2019-03-02',
      amount: '2200'
    },
    {
      orderId: '1000201904036317',
      product: '广告发布',
      version: '商铺版',
      period: '3年',
      count: 12,
      date: '2019-04-03',
      amount: '7890'
    }
  ],
  params: {}
}

const getters = {
  // 调用state中的值
  getOrderList: state => state.orderList
}

const actions = {
  // 异步请求
  fetchOrderList ({ commit, state }) {
    // 将state.params用Vue.http.post()传给后端getOrderList获取orderList
    // commit('updateOrderList', res.data.list)
  }
}

const mutations = {
  // 同步操作
  // 将传进来的orderList复写到state中
  updateOrderList (state, paylaod) {
    state.orderList = paylaod
  },
  // 筛选时更新params的值
  updateParams (state, { key, val }) {
    state.params[key] = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
