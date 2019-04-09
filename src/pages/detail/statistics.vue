<template>
  <div class="wrapper">
    <div class="block-up">
      <p class="title">数据统计</p>
      <div class="account">历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</div>
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="产品类型：">
          <el-radio-group v-model="form.type">
            <el-radio-button
              v-for="item in form.typeOptions"
              :key="item.value"
              :label="item.label">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="适用地区：">
          <el-select v-model="form.city">
            <el-option
              v-for="item in form.cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
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
      <p class="account">历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      <el-tag v-for="(item, index) in list" :key="index" color="#fff">{{ item }}</el-tag>
    </div>

    <el-dialog title="支付" :visible.sync="dialogConfirmVisible" :close-on-click-modal="false">
      <el-table :data="table" :header-cell-style="{ background: '#55b17c', color: '#fff' }" border>
        <el-table-column
          property="type"
          label="产品类型"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          property="city"
          label="适用地区"
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
        type: '红色版',
        typeOptions: [
          {
            label: '红色版',
            value: 'red'
          },
          {
            label: '绿色版',
            value: 'green'
          },
          {
            label: '紫色版',
            value: 'purple'
          }
        ],
        city: '北京',
        cityOptions: [
          {
            label: '北京',
            value: 'Beijing'
          },
          {
            label: '天津',
            value: 'Tianjin'
          },
          {
            label: '上海',
            value: 'Shanghai'
          },
          {
            label: '杭州',
            value: 'Hangzhou'
          },
          {
            label: '广州',
            value: 'Guangzhou'
          },
          {
            label: '深圳',
            value: 'Shenzhen'
          },
          {
            label: '武汉',
            value: 'Wuhan'
          },
          {
            label: '重庆',
            value: 'Chongqing'
          },
          {
            label: '成都',
            value: 'Chengdu'
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
      // 将订单信息POST给后端，从API获取totalPrice
      return 500
    },
    table () {
      return [{
        type: this.form.type,
        city: this.form.city,
        time: '半年',
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
