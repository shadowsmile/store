<template>
  <div class="wrapper">
    <div class="block-up">
      <p class="title">广告发布</p>
      <div class="account">广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</div>
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="购买数量：">
          <el-input-number v-model="form.count" :min="1" :max="99"></el-input-number>
        </el-form-item>
        <el-form-item label="行业：">
          <el-select v-model="form.industry">
            <el-option
              v-for="item in form.industryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品版本：">
          <el-checkbox-group v-model="form.ver" :min="1">
            <el-checkbox-button
              v-for="item in form.verOptions"
              :key="item.value"
              :label="item.label">
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="有效时间：">半年</el-form-item>
        <el-form-item label="总价：">{{ totalPrice }}元</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogConfirmVisible = true">立即购买</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="block-down">
      <p class="title">产品说明</p>
      <p class="account">广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
      <el-tag v-for="(item, index) in list" :key="index" color="#fff">{{ item }}</el-tag>
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
          property="industry"
          label="行业"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          property="ver"
          label="产品版本"
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
        industry: '出版业',
        industryOptions: [
          {
            label: '出版业',
            value: '0'
          },
          {
            label: '媒体',
            value: '1'
          },
          {
            label: '金融',
            value: '2'
          },
          {
            label: '互联网',
            value: '3'
          },
          {
            label: '游戏',
            value: '4'
          }
        ],
        ver: ['初级版'],
        verOptions: [
          {
            label: '初级版',
            value: '0'
          },
          {
            label: '中级版',
            value: '1'
          },
          {
            label: '高级版',
            value: '2'
          },
          {
            label: '专家版',
            value: '3'
          }
        ]
      },
      list: [
        '安全安保', '办公文教', '车辆物流', '出版传媒', '电脑硬件',
        '电子电工', '房地产建筑装修', '分类平台', '服装鞋帽', '箱包饰品',
        '化工原料制品', '机械设备', '家庭日用品', '家用电器', '教育培训',
        '节能环保', '金融服务', '礼品', '旅游住宿', '美容化妆',
        '母婴护理', '农林牧渔', '软件', '商务服务', '神农谷或服务',
        '食品保健品', '手机数码', '通讯服务设备', '网络服务', '医疗服务',
        '游戏', '运动休闲娱乐', '招商加盟'
      ],
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
        industry: this.form.industry,
        time: '半年',
        ver: this.form.ver.join(),
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
.el-tag {
  /* width: 120px; */
  color: #555;
  border-color: #ddd;
  margin: 0 5px 5px 0;
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
