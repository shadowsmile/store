<template>
  <div class="wrapper">
    <el-dialog :visible.sync="dialogPayVisible" :close-on-click-modal="false">
      <span>请检查你的支付状态！</span>
      <el-button type="primary" @click="havePaid">支付成功</el-button>
      <el-button type="primary" @click="notPaid">支付失败</el-button>
    </el-dialog>

    <el-dialog :visible.sync="dialogSuccessVisible" :close-on-click-modal="false" @closed="gotoOrderList">
      <span>购买成功！</span>
      <div slot="footer">
        <el-button type="primary" @click="dialogSuccessVisible = false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFailVisible" :close-on-click-modal="false">
      <span>购买失败！</span>
      <div slot="footer">
        <el-button type="primary" @click="dialogFailVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogCheckVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogSuccessVisible: false,
      dialogFailVisible: false
    }
  },
  computed: {
    dialogPayVisible () {
      return this.dialogCheckVisible
    }
  },
  methods: {
    // dialogPay close 执行 checkStatus()
    // 显示 loading 图标
    // 将orderId（从父组件props）POST给后端checkOrder，查询订单是否支付成功
    // this.$emit('closeCheck')
    // 成功：this.dialogSuccessVisible = true
    // 失败：this.dialogFailVisible = true
    havePaid () {
      this.$emit('closeCheck')
      setTimeout(() => {
        this.dialogSuccessVisible = true
      }, 300)
    },
    notPaid () {
      this.$emit('closeCheck')
      setTimeout(() => {
        this.dialogFailVisible = true
      }, 300)
    },
    gotoOrderList () {
      this.$router.push({ path: '/order' })
    }
  }
}
</script>

<style scoped>
.wrapper >>> .el-dialog {
  width: 760px;
  padding: 0 20px 10px 20px;
}
</style>
