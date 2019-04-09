<template>
  <div class="wrapper">
    <div class="block-up">
      <p class="title">数据预测</p>
      <div class="account">未来，大数据会变得越来越重要，其核心应用预测也会成为互联网行业以及产业变革的重要力量，我们很有必要对数据预测及其分析方法进行全面且深入的了解。在这一点上，《大数据预测》是本很好的读物，适合大数据所有相关行业的人阅读。</div>
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="购买数量：">
          <el-input-number v-model="form.count" :min="1" :max="99"></el-input-number>
        </el-form-item>
        <el-form-item label="媒介：">
          <el-checkbox-group v-model="form.medium" :min="1">
            <el-checkbox-button
              v-for="item in form.mediumOptions"
              :key="item.value"
              :label="item.label">
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="有效时间：">一年</el-form-item>
        <el-form-item label="总价：">{{ totalPrice }}元</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogConfirmVisible = true">立即购买</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="block-down">
      <p class="title">产品说明</p>
      <p class="account">2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线；
车内推荐系统会根据你的饮食习惯预测你可能会喜欢吃什么，并推荐沿途的早餐店；你的电子社交助理已经为你自动选择了你可能感兴趣的社交网信息；当车内系统预测到你驾车有些分心时，座椅会自动震动进行提醒……
以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。
大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。随着越来越多的数据被记录和整理，未来预测分析必定会成为所有领域的关键技术。
作为预测分析领域的专家，埃里克·西格尔博士深谙预测分析界已经实现和正在发生的事情、面临的问题和将来可能的前景。在《大数据预测》一书中，他结合预测分析的应用实例，对其进行了深入、细致且全面的解读。
关于预测分析，你想了解的全部，你的生活以及这个世界会因为预测分析改变到什么程度，《大数据预测》都会告诉你。</p>
    </div>

    <el-dialog title="支付" :visible.sync="dialogConfirmVisible" :close-on-click-modal="false">
      <el-table :data="table" :header-cell-style="{ background: '#55b17c', color: '#fff' }" border>
        <el-table-column
          property="count"
          label="数量"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          property="medium"
          label="媒介"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          property="time"
          label="有效时间"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          property="price"
          label="总价"
          align="center"
          :resizable="false">
        </el-table-column>
      </el-table>
      <p class="bank">请选择银行</p>
      <bank-chooser @change="onChangeBank"></bank-chooser>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmVisible = false">取消</el-button>
        <el-button type="primary" @click="doBuy">确认购买</el-button>
      </div>
    </el-dialog>

    <check-order :dialog-check-visible="dialogCheckVisible" @closeCheck="closeCheck"></check-order>
  </div>
</template>

<script>
import BankChooser from '@/components/bankChooser'
import CheckOrder from '@/components/checkOrder'

export default {
  components: { BankChooser, CheckOrder },
  data () {
    return {
      dialogConfirmVisible: false,
      dialogCheckVisible: false,
      form: {
        count: 1,
        medium: ['纸质报告'],
        mediumOptions: [
          {
            label: '纸质报告',
            value: '0'
          },
          {
            label: 'PDF',
            value: '1'
          },
          {
            label: '页面报告',
            value: '2'
          },
          {
            label: '邮件',
            value: '3'
          }
        ]
      },
      bankId: null
    }
  },
  computed: {
    totalPrice () {
      // 从API获取后端数据（POST）
      return this.form.count * 500
    },
    table () {
      return [{
        count: this.form.count,
        medium: this.form.medium,
        time: '一年',
        price: this.totalPrice
      }]
    }
  },
  methods: {
    onChangeBank (bank) {
      this.bankId = bank.id
    },
    doBuy () {
      // 后端打开网银支付窗口
      // 将订单信息POST给后端createOrder，并记录orderId
      this.dialogConfirmVisible = false
      setTimeout(() => {
        this.dialogCheckVisible = true
      }, 300)
    },
    closeCheck () {
      this.dialogCheckVisible = false
    }
  }
}
</script>

<style scoped>
.block-up, .block-down {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 11px;
}
.account {
  margin-bottom: 10px;
  line-height: 18px;
  color: #555;
}
.block-up .account {
  background-color: rgba(197, 241, 247, 0.2);
  color: #999;
  padding: 10px;
}
.el-form-item {
  margin-bottom: 10px;
}
.bank {
  font-size: 16px;
  line-height: 32px;
  font-weight: bold;
  padding-top: 10px;
}
.wrapper >>> .el-dialog {
  width: 760px;
  padding: 0 20px 10px 20px;
}
</style>
