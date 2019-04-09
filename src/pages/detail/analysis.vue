<template>
  <div class="wrapper">
    <div class="block-up">
      <p class="title">流量分析</p>
      <div class="account">是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</div>
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="购买数量：">
          <el-input-number v-model="form.count" :min="1" :max="99"></el-input-number>
        </el-form-item>
        <el-form-item label="产品类型：">
          <el-select v-model="form.type">
            <el-option
              v-for="item in form.typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：">
          <el-radio-group v-model="form.time">
            <el-radio-button
              v-for="item in form.timeOptions"
              :key="item.value"
              :label="item.label">
            </el-radio-button>
          </el-radio-group>
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
        <el-form-item label="总价：">{{ totalPrice }}元</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogConfirmVisible = true">立即购买</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="block-down">
      <p class="title">产品说明</p>
      <p class="account">网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

      <p class="title">用户行为指标</p>
      <ul>
        <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
        <li>用户在网站的停留时间；</li>
        <li>用户来源网站（也叫“引导网站”）；</li>
        <li>用户所使用的搜索引擎及其关键词；</li>
        <li>在不同时段的用户访问量情况等。</li>
      </ul>

      <p class="title">浏览网站方式</p>
      <ul>
        <li>用户上网设备类型</li>
        <li>用户浏览器的名称和版本</li>
        <li>访问者电脑分辨率显示模式</li>
        <li>用户所使用的操作系统名称和版本</li>
        <li>用户所在地理区域分布状况等</li>
      </ul>
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
          property="type"
          label="产品类型"
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
          property="ver"
          label="产品版本"
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
        type: '入门版',
        typeOptions: [
          {
            label: '入门版',
            value: '0'
          },
          {
            label: '中级版',
            value: '1'
          },
          {
            label: '高级版',
            value: '2'
          }
        ],
        time: '半年',
        timeOptions: [
          {
            label: '半年',
            value: '0'
          },
          {
            label: '一年',
            value: '1'
          },
          {
            label: '三年',
            value: '2'
          }
        ],
        ver: ['客户版'],
        verOptions: [
          {
            label: '客户版',
            value: '0'
          },
          {
            label: '代理商版',
            value: '1'
          },
          {
            label: '专家版',
            value: '2'
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
        type: this.form.type,
        time: this.form.time,
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
  line-height: 40px;
}
.title:first-child {
  line-height: 18px;
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
.block-down ul {
  margin-bottom: 10px;
}
.block-down li {
  line-height: 18px;
  color: #555;
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
