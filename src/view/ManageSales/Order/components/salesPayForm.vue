<template>
  <!-- 支付信息 -->
  <div class="sales-pay-form">
    <div class="m-form-ly">
      <el-form :model="payData">
        <el-col :span="7" :offset="1">
          <el-form-item label="订金 :">
            <span class="info-color">{{ payData.deposit }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动订金 :">
            <span class="info-color">{{ payData.activity_deposit }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="应收-暄妍 :">
            <span class="info-color">{{ payData.xuan }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="微信支付 :">
            <span class="info-color">{{ payData.wechat_pay }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付宝支付 :">
            <span class="info-color">{{ payData.alipay_pay }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="POS-嘉联 :">
            <span class="info-color">{{ payData.pos_pay }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="赠送积分 :">
            <span class="info-color">{{ payData.integral }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现金支付 :">
            <span class="info-color">{{ payData.cash_pay }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="实付金额 :">
            <span class="info-color">{{ payData.actual_payment }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="22" :offset="1">
          <div class="deduction-total-bar">
            <el-col
              :span="11"
              :offset="1"
            >
              <span class="tit-font">实收金额：</span>
              <span class="num info-color">{{ payData.receipts }}</span>
            </el-col>
            <el-col :span="11">
              <span class="tit-font">合计：</span>
              <span class="num main-color">{{ payData.total }}</span>
            </el-col>
          </div>
        </el-col>
      </el-form>
      <div style="clear:both" />
    </div>
    <div class="m-menubar-ly">
      <el-button
        class="menu-btn"
        type="primary"
        @click="openDialog('payment')"
      >支付方式</el-button>
      <el-button
        class="menu-btn"
        type="primary"
        @click="check(2)"
      >结 账</el-button>
      <el-button
        class="menu-btn"
        type="primary"
        plain
      >暂 存</el-button>
      <el-button
        class="menu-btn"
        type="primary"
        plain
      >取 消</el-button>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/article'

export default {
  name: 'InlineEditTable',
  components: {},
  data() {
    return {
      payData: {
        total: '1988.00',
        change: '售后',
        receipts: '1000000.00',
        actual_payment: '1000000.00',
        activity_deposit: '300.00',
        deposit: '900.00',
        cash_pay: '1000000.00',
        wechat_pay: '0.00',
        alipay_pay: '0.00',
        pos_pay: '0.00',
        integral: '100',
        xuan: '0.00'
      }
    }
  },
  created() { },
  methods: {
    // 判断套餐类型
    check(val) {
      switch (val) {
        case 1:
          this.openDialog('satisfOrder')
          break
        case 2:
          this.openDialog('selectOrder')
          break
        case 3:
          this.openDialog('discountOrder')
          break
        default:
          console.log('参数错误')
      }
    },
    openDialog(type) {
      this.$emit('open', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.sales-pay-form {
  padding-top: 18px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .deduction-total-bar {
    height: 50px;
    // margin: -10px 50px 0;
    border-left: 4px solid #6666fe;
    border-radius: 4px;
    background-color: #f5f7fa;
    line-height: 50px;
    font-size: 14px;
    .num {
      font-size: 20px;
    }
  }
  .m-menubar-ly {
    width: 100%;
    height: 60px;
    margin-left: -26px;
    text-align: center;
  }
  .menu-btn {
    margin: 0 14px;
  }
}
</style>
