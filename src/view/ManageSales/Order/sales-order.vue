<template>
  <!-- 销售开单 -->
  <div class="app-container">
    <div class="sales-top">
      <div class="detail-wrap">
        <div class="action-bar">
          <div class="customer-l">
            <!-- 顾客详细信息 -->
            <sales-member-form @open="openDialog($event)" />
          </div>
          <div class="staff-r">
            <!-- 功能操作、技师列表 -->
            <sales-menubar @open="openDialog($event)" />
            <sales-staff-table />
          </div>
        </div>
        <div class="shortcut-bar">
          <!-- 快捷栏 -->
          <sales-shortcut-bar />
        </div>
      </div>
      <div class="pay-wrap">
        <!-- 支付模块 -->
        <sales-pay-form @open="openDialog($event)" />
      </div>
    </div>
    <div class="sales-bottom">
      <!-- 品项列表 -->
      <sales-item-table @open="openDialog($event)" />
    </div>

    <!-- 验证手机 -->
    <check-phone-dialog v-model="checkPhoneVisible" />
    <!-- 业绩分摊 -->
    <distribution-dialog v-model="distributionVisible" />
    <!-- 品项选择 -->
    <item-dialog v-model="itemVisible" />
    <!-- 支付方式 -->
    <payment-dialog v-model="paymentVisible" />
    <!-- 积分兑换 -->
    <integral-dialog v-model="integralVisible" />
    <!-- 抵扣 -->
    <deductions-dialog v-model="deductionVisible" />
    <!-- 代金券选择 -->
    <voucher-select-dialog v-model="voucherSelectVisible" />
    <!-- 欠货明细 -->
    <owe-goods-dialog v-model="oweGoodsVisible" />
    <!-- 赠送明细 -->
    <give-detail-dialog v-model="giveDetailVisible" />
    <!-- 开单审批 -->
    <order-approval-dialog v-model="orderApprovalVisible" />

    <!-- 满额开单 -->
    <satisf-order-dialog v-model="satisfOrderVisible" />
    <!-- 几选几开单 -->
    <select-order-dialog v-model="selectOrderVisible" />
    <!-- 折扣开单 -->
    <discount-order-dialog v-model="discountOrderVisible" />
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/article'
// - 页面组件
import salesMemberForm from './components/salesMemberForm' // 顾客信息
import salesMenubar from './components/salesMenubar' // 功能菜单
import salesStaffTable from './components/salesStaffTable' // 技师列表
import salesPayForm from './components/salesPayForm' // 支付信息
import salesShortcutBar from './components/salesShortcutBar' // 快捷选项
import salesItemTable from './components/salesItemTable' // 品项列表
// - 弹窗组件
import checkPhoneDialog from './components/checkPhoneDialog' // 验证手机
import distributionDialog from './components/distributionDialog' // 业绩分摊
import itemDialog from './components/itemDialog' // 品项选择
import paymentDialog from './components/paymentDialog' // 支付
import integralDialog from './components/integralDialog' // 积分兑换
import deductionsDialog from './components/deductionsDialog' // 抵扣
import voucherSelectDialog from './components/voucherSelectDialog' // 代金券选择
import oweGoodsDialog from './components/oweGoodsDialog' // 欠货明细
import giveDetailDialog from './components/giveDetailDialog' // 赠送明细
import orderApprovalDialog from './components/orderApprovalDialog' // 开单审批
import satisfOrderDialog from './components/satisfOrderDialog' // 满额开单
import selectOrderDialog from './components/selectOrderDialog' // 几选几开单
import discountOrderDialog from './components/discountOrderDialog' // 折扣开单

export default {
  name: 'InlineEditTable',
  components: {
    // -
    salesMemberForm, // 顾客信息
    salesMenubar, // 功能菜单
    salesStaffTable, // 技师列表
    salesPayForm, // 支付信息
    salesShortcutBar, // 快捷选项
    salesItemTable, // 品项列表
    // -
    checkPhoneDialog, // 验证手机号
    distributionDialog, // 业绩分摊
    itemDialog, // 品项选择
    paymentDialog, // 支付
    integralDialog, // 积分兑换
    deductionsDialog, // 抵扣
    voucherSelectDialog, // 代金券选择
    oweGoodsDialog, // 欠货明细
    giveDetailDialog, // 赠送明细
    orderApprovalDialog, // 开单审批
    satisfOrderDialog, // 满额开单
    selectOrderDialog, // 几选几开单
    discountOrderDialog // 折扣开单
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      // - Model Visible
      checkPhoneVisible: true, // 验证手机 FIXME: 结算后调用
      distributionVisible: false, // 业绩分摊
      paymentVisible: false, // 支付
      itemVisible: false, // 品项选择
      integralVisible: false, // 积分兑换
      deductionVisible: false, // 抵扣
      voucherSelectVisible: false, // 代金券选择
      oweGoodsVisible: false, // 欠货明细
      giveDetailVisible: false, // 赠送明细 FIXME: 结算后调用
      orderApprovalVisible: false, // 开单审批
      satisfOrderVisible: false, // 满额开单
      selectOrderVisible: false, // 几选几开单
      discountOrderVisible: false // 折扣开单
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    test(data) {
      console.log('test', data)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    openDialog(type) {
      // - type
      switch (type) {
        case 'distribution':
          // console.log('业绩分摊:', type)
          // this.distributionVisible = true
          this.distributionVisible = !this.distributionVisible
          break
        case 'itemselect':
          // console.log('品项选择:', type)
          this.itemVisible = !this.itemVisible
          break
        case 'payment':
          // console.log('支付:', type)
          this.paymentVisible = !this.paymentVisible
          break
        case 'integral':
          // console.log('积分兑换:', type)
          this.integralVisible = !this.integralVisible
          break
        case 'deduction':
          // console.log('抵扣:', type)
          this.deductionVisible = !this.deductionVisible
          break
        case 'voucherSelect':
          // console.log('代金券:', type)
          this.voucherSelectVisible = !this.voucherSelectVisible
          break
        case 'oweGoods':
          // console.log('欠货明细:', type)
          this.oweGoodsVisible = !this.oweGoodsVisible
          break
        case 'satisfOrder':
          // console.log('满额:', type)
          this.satisfOrderVisible = !this.satisfOrderVisible
          break
        case 'selectOrder':
          // console.log('几选几:', type)
          this.selectOrderVisible = !this.selectOrderVisible
          break
        case 'discountOrder':
          // console.log('折扣开单:', type)
          this.discountOrderVisible = !this.discountOrderVisible
          break
        case 'checkPhone':
          // console.log('验证电话号码', type)
          this.checkPhoneVisible = !this.checkPhoneVisible
          break
        case 'giveDetail':
          // console.log('赠送明细', type)
          this.giveDetailVisible = !this.giveDetailVisible
          break
        case 'orderApproval':
          // console.log('赠送明细', type)
          this.orderApprovalVisible = !this.orderApprovalVisible
          break
        default:
          console.log('参数错误:', type)
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  min-width: 1500px;
}
.sales-top {
  width: 100%;
  height: 360px;
  display: flex;
}
.detail-wrap {
  width: 64%;
  height: 100%;
}
.action-bar {
  width: 100%;
  height: 300px;
  display: flex;
  flex: 1;
}
.action-bar .customer-l {
  height: 100%;
  width: 50%;
}
.action-bar .staff-r {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.shortcut-bar {
  width: 100%;
  height: 60px;
  padding-top: 24px;
}
.pay-wrap {
  width: 36%;
  height: 100%;
}
.sales-bottom {
  width: 100%;
  /* min-height: 200px; */
  height: calc(100vh - 590px);
  padding-top: 20px;
}
</style>
