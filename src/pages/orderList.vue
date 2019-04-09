<template>
  <div class="wrapper">
    <el-form :model="searchForm" size="small" inline>
      <el-form-item label="选择产品：">
        <el-select v-model="searchForm.product" @change="getOrderList">
          <el-option
            v-for="(item, index) in searchForm.productList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始日期：">
        <el-date-picker
          v-model="searchForm.startDate"
          type="date"
          :picker-options="pickerOptionsStart"
          @change="getOrderList">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期：">
        <el-date-picker
          v-model="searchForm.endDate"
          type="date"
          :picker-options="pickerOptionsEnd"
          @change="getOrderList">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input
          v-model="searchForm.keyword"
          prefix-icon="el-icon-search"
          clearable
          @change="getOrderList">
        </el-input>
      </el-form-item>
    </el-form>

    <el-table
      :data="orderList"
      size="small"
      :header-cell-style="{ background: '#55b17c', color: '#fff' }"
      border
      tooltip-effect="light">
      <el-table-column
        prop="orderId"
        label="订单号"
        width="150px"
        :resizable="false"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="product"
        label="购买产品"
        min-width="180px"
        :resizable="false"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本类型"
        width="180px"
        :resizable="false"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="period"
        label="有效时间"
        width="80px"
        :resizable="false"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="购买日期"
        width="120px"
        :resizable="false"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量"
        width="70px"
        :resizable="false"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="总价"
        width="100px"
        :resizable="false"
        align="center">
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="->, prev, pager, next, total"
      :page-size="20"
      :total="orderList.length"
      @current-change="gotoPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        product: '0',
        productList: [
          {
            label: '全部',
            value: '0'
          },
          {
            label: '数据统计',
            value: '1'
          },
          {
            label: '数据预测',
            value: '2'
          },
          {
            label: '流量分析',
            value: '3'
          },
          {
            label: '广告发布',
            value: '4'
          }
        ],
        startDate: null,
        endDate: null,
        keyword: ''
      }
    }
  },
  computed: {
    pickerOptionsStart () {
      return {
        disabledDate: (time) => {
          if (this.searchForm.endDate) {
            return time.getTime() > this.searchForm.endDate || time.getTime() > Date.now()
          } else {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    pickerOptionsEnd () {
      return {
        disabledDate: (time) => {
          if (this.searchForm.startDate) {
            return time.getTime() < this.searchForm.startDate || time.getTime() > Date.now()
          } else {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    orderList: {
      get () {
        let list = this.$store.getters.getOrderList
        if (this.searchForm.product !== '0') {
          const product = this.searchForm.productList.find((prod) => {
            return prod.value === this.searchForm.product
          })
          if (product) { // TODO 使用store获取后端数据
            // this.$store.commit('updateParams', {
            //   key: 'productId',
            //   val: product.value
            // })
            // this.$store.dispatch('fetchOrderList')
            list = list.filter((order) => {
              return order.product === product.label
            })
          }
        }
        if (this.searchForm.startDate) {
          const startDate = this.searchForm.startDate.toLocaleDateString('cn', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
          list = list.filter((order) => {
            return order.date >= startDate
          })
        }
        if (this.searchForm.endDate) {
          const endDate = this.searchForm.endDate.toLocaleDateString('cn', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
          list = list.filter((order) => {
            return order.date <= endDate
          })
        }
        if (this.searchForm.keyword) {
          const keyword = this.searchForm.keyword.split('')
          let condition = ''
          keyword.forEach((val) => {
            condition += '\\S*' + val
          })
          list = list.filter((order) => {
            return new RegExp(condition, 'gi').test(order.product)
          })
        }
        return list
      },
      set () {}
    }
  },
  mounted () {
    // this.$store.dispatch('fetchOrderList')
  },
  methods: {
    getOrderList () {
      // 将筛选数据POST给后端getOrderList获取orderList
    },
    gotoPage (currentPage) {
      // console.log(currentPage)
      // 根据currentPage和每页显示条目数获取要显示的orderList
    }
  }
}
</script>

<style scoped>
.wrapper >>> .el-input {
  width: 150px;
}
.wrapper >>> .cell {
  white-space: nowrap;
}
.wrapper >>> .sort-caret.ascending {
  border-bottom-color: rgba(255, 255, 255, 0.7);
}
.wrapper >>> .ascending .sort-caret.ascending {
  border-bottom-color: #fff;
}
.wrapper >>> .sort-caret.descending {
  border-top-color: rgba(255, 255, 255, 0.7);
}
.wrapper >>> .descending .sort-caret.descending {
  border-top-color: #fff;
}
</style>
