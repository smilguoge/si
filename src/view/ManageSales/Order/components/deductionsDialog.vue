<template>
  <!-- 抵扣 -->
  <el-dialog
    title="抵扣"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="deduction-dialog"
    width="1200px"
  >

    <div class="deduction-total-bar">
      <el-col :span="11" :offset="1">
        <span class="tit-font">券累计使用金额：</span>
        <span class="num info-color">{{ deductionData.name1 }}</span>
      </el-col>
      <el-col :span="11">
        <span class="tit-font">老卡累计使用金额：</span>
        <span class="num info-color">{{ deductionData.name1 }}</span>
      </el-col>
    </div>
    <el-col :span="22" :offset="1">
      <div class="deduction-table">
        <div class="deduction-head">
          <span class="tit-font">代金券</span>
        </div>
        <el-table
          :data="deductionData.table1"
          height="240px"
          class="item-table"
          fit
        >
          <el-table-column
            type="selection"
            width="50px"
            align="center"
          />
          <el-table-column
            align="center"
            label="券名称"
            fixed="left"
          >
            <template slot-scope="{row}">
              {{ row.name1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="券编码"
          >
            <template slot-scope="{row}">
              {{ row.name2 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="券来源"
          >
            <template slot-scope="{row}">
              {{ row.name3 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="失效日期"
          >
            <template slot-scope="{row}">
              {{ row.name4 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="面额"
          >
            <template slot-scope="{row}">
              {{ row.name5 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="剩余金额"
          >
            <template slot-scope="{row}">
              {{ row.name6 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="使用金额"
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
              {{ row.name8 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="发放人"
          >
            <template slot-scope="{row}">
              {{ row.name9 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="发放日期"
          >
            <template slot-scope="{row}">
              {{ row.name10 | parseTime('{y}-{m}-{d}') }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <div class="deduction-table">
        <div class="deduction-head">
          <span class="tit-font">兑换</span>
        </div>
        <el-table
          :data="deductionData.table2"
          height="240px"
          class="item-table"
          fit
        >
          <el-table-column
            type="selection"
            width="50px"
            align="center"
          />
          <el-table-column
            align="center"
            label="品项编号"
            fixed="left"
          >
            <template slot-scope="{row}">
              {{ row.name1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="品项名称"
          >
            <template slot-scope="{row}">
              {{ row.name2 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="套餐名称"
          >
            <template slot-scope="{row}">
              {{ row.name3 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="总金额"
          >
            <template slot-scope="{row}">
              {{ row.name4 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="单财"
          >
            <template slot-scope="{row}">
              {{ row.name5 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="调整金额"
          >
            <template slot-scope="{row}">
              {{ row.name6 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="购买次数"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="剩余次数"
          >
            <template slot-scope="{row}">
              {{ row.name8 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="兑换次数"
          >
            <template slot-scope="{row}">
              {{ row.name9 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="增值倍数"
          >
            <template slot-scope="{row}">
              {{ row.name9 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="失效日期"
          >
            <template slot-scope="{row}">
              {{ row.name10 | parseTime('{y}-{m}-{d}') }}
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
  </el-dialog>
</template>
<script>
export default {
  name: '',
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
      deductionData: {
        name1: '666.00',
        table1: [],
        table2: []
      },
      dialogVisible: false,
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
    handleSubmit(formName) {
      const curr = new Date()
      if (curr - this.flagTime > 1000) {
        this.handleCancel()
        this.flagTime = curr
      }
    },
    handleCancel() {
      this.$parent.deductionVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.deduction-dialog{
  .deduction-total-bar {
      height: 50px;
      margin: -10px 50px 0;
      border-left: 4px solid #6666FE;
      border-radius: 4px;
      background-color: #F5F7FA;
      line-height: 50px;
      font-size: 14px;
      .num {
        font-size: 16px;
      }
    }
  .deduction-table {
    margin: 20px 0;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    overflow: hidden;
    .deduction-head {
      height: 36px;
      line-height: 36px;
      padding: 0 24px;
      background-color: #F5F7FA;
      border-bottom: 1px solid #DCDFE6
    }
  }
}
</style>
