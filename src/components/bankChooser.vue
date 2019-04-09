<template>
  <div>
    <div class="wrapper" v-for="item in banks" :key="item.id" @click="doChoose(item)">
      <el-card shadow="hover" :class="[item.name, {active: item.id === bank.id}]"></el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bank: { id: 201, label: '招商银行', name: 'zhaoshang' },
      banks: [
        {
          id: 201,
          label: '招商银行',
          name: 'zhaoshang'
        },
        {
          id: 301,
          label: '中国建设银行',
          name: 'jianshe'
        },
        {
          id: 601,
          label: '浦发银行',
          name: 'pufa'
        },
        {
          id: 1101,
          label: '交通银行',
          name: 'jiaotong'
        },
        {
          id: 101,
          label: '中国工商银行',
          name: 'gongshang'
        },
        {
          id: 401,
          label: '中国农业银行',
          name: 'nongye'
        },
        {
          id: 1201,
          label: '中国银行',
          name: 'zhongguo'
        },
        {
          id: 501,
          label: '中信银行',
          name: 'zhongxin'
        }
      ]
    }
  },
  methods: {
    doChoose (bank) {
      this.bank = bank
      this.$emit('change', bank)
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: inline-block;
  margin-right: 10px;
}
.el-card {
  display: inline-block;
  width: 117px;
  height: 32px;
  border: 1px solid #ebeef5;
  background-image: url(../assets/banks.png);
  cursor: pointer;
}
.active {
  border-color: #55b17c;
  box-shadow: 0 2px 10px 2px #eee;
}
.zhaoshang {
  background-position: -2158px 0;
}
.jianshe {
  background-position: -720px 0;
}
.pufa {
  background-position: -1802px 0;
}
.jiaotong {
  background-position: -3119px 0;
}
.gongshang {
  background-position: -2636px 0;
}
.nongye {
  background-position: -1682px 0;
}
.zhongguo {
  background-position: -2521px 0;
}
.zhongxin {
  background-position: -480px 0;
}
</style>
