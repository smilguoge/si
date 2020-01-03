<template>
  <!-- 代金券 -->
  <el-dialog
    title="代金券"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="voucher-dialog"
    width="1200px"
  >
    <el-col :span="22" :offset="1">
      <div class="filter-container clearfix">
        <span class="filter-item tit-font">券名称：</span>
        <el-input
          v-model="packageData.name3"
          class="filter-item"
          style="width:210px;margin-right:10px"
          placeholder="请输入券名称"
        />
        <el-button
          class="filter-item"
          type="primary"
        >查 询</el-button>
        <el-button
          class="filter-item"
          type="danger"
          @click="openDialog()"
        >测 试 (业绩分配)</el-button>
        <el-button
          class="filter-item"
          type="danger"
          @click="openDialog('pay')"
        >测 试 (支付)</el-button>
      </div>
      <div class="voucher-table">
        <el-table
          :data="packageData.table1"
          height="380px"
          class="item-table"
          fit
        >
          <el-table-column type="selection" width="50px" align="center" />
          <el-table-column
            align="center"
            label="券名"
          >
            <template slot-scope="{row}">
              {{ row.name1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="发送数量"
          >
            <template slot-scope="{row}">
              {{ row.name2 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="总张数"
          >
            <template slot-scope="{row}">
              {{ row.name3 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="剩余张数"
          >
            <template slot-scope="{row}">
              {{ row.name5 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="来源"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="130px"
            label="顾客可购买张数/最高赠送张数"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="失效方式"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="有效天数"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="开始时间"
            min-width="160px"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="结束时间"
            min-width="160px"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="券种类"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="面额"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="赠送金额"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="适用顾客属性"
            min-width="160px"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="适用项目范围"
            min-width="160px"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit()"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>

    <!-- 业绩分配 -->
    <test-dialog v-model="distributVisible" @cancel="cancel" />
    <!-- 代金券支付 -->
    <test-pay-dialog v-model="distributPayVisible" @cancel="cancel" />
  </el-dialog>
</template>
<script>
import testDialog from './voucherDistributDialog'
import testPayDialog from './voucherPayDialog'

export default {
  name: '',
  components: { testDialog, testPayDialog },
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      // -
      packageData: {
        name1: '666.00',
        num: '666.00',
        table1: []
      },
      dialogVisible: false,
      distributVisible: false,
      distributPayVisible: false,
      flagTime: 0
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() {
    // -
  },
  methods: {
    openDialog(val) {
      if (val === 'pay') {
        this.distributPayVisible = !this.distributPayVisible
      } else {
        this.distributVisible = !this.distributVisible
      }
    },
    handleSubmit(formName) {
      const curr = new Date()
      if (curr - this.flagTime > 1000) {
        this.handleCancel()
        this.flagTime = curr
      }
    },
    cancel() {
      this.distributVisible = false
      this.distributPayVisible = false
    },
    handleCancel() {
      this.$parent.voucherSelectVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.voucher-dialog{
  .filter-container {
    margin-top: -10px;
    padding: 16px 24px 8px;
    border: 1px solid #DCDFE6;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
  }

  .voucher-table {
    margin-bottom: 20px;
    border: 1px solid #DCDFE6;
    border-radius: 0 0 4px 4px;
    overflow: hidden;
  }
}

</style>
