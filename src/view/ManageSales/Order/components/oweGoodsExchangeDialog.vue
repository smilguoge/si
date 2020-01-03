<template>
  <!-- 欠货兑换 -->
  <el-dialog
    title="欠货兑换"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="deduction-dialog"
    width="1200px"
  >
    <el-col :span="22" :offset="1" style="margin-top:-30px">
      <div class="deduction-table">
        <div class="deduction-head">
          <el-button class="filter-item" type="primary" size="mini">添加</el-button>
          <el-button class="filter-item" type="primary" size="mini" plain>{{ '合计：'+total }}</el-button>
        </div>
        <el-table
          :data="changeData.table1"
          height="240px"
          class="item-table"
          fit
        >
          <el-table-column
            align="center"
            label="NO."
          >
            <template slot-scope="{row}">
              {{ row.name2 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="产品名称"
          >
            <template slot-scope="{row}">
              {{ row.name1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="欠货数量"
          >
            <template slot-scope="{row}">
              {{ row.name3 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="实收金额"
          >
            <template slot-scope="{row}">
              {{ row.name4 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="兑换数量"
          >
            <template slot-scope="{row}">
              {{ row.name5 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="销售价"
          >
            <template slot-scope="{row}">
              {{ row.name6 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="小计"
          >
            <template slot-scope="{row}">
              {{ row.name7 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="150px"
            label="操作"
          >
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" plain>添 加</el-button>
              <el-button type="danger" size="mini" plain>删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <div class="deduction-table">
        <div class="deduction-head">
          <el-button class="filter-item" type="primary" size="mini">添加</el-button>
          <el-button class="filter-item" type="primary" size="mini" plain>{{ '合计：'+total }}</el-button>
        </div>
        <el-table
          :data="changeData.table2"
          height="240px"
          class="item-table"
          fit
        >
          <el-table-column
            align="center"
            label="NO."
          >
            <template slot-scope="{row}">
              {{ row.name1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="产品名称"
          >
            <template slot-scope="{row}">
              {{ row.name2 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="兑换数量"
          >
            <template slot-scope="{row}">
              {{ row.name3 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="销售价"
          >
            <template slot-scope="{row}">
              {{ row.name4 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="小计"
          >
            <template slot-scope="{row}">
              {{ row.name5 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="150px"
            label="操作"
          >
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" plain>添 加</el-button>
              <el-button type="danger" size="mini" plain>删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <el-tag type="primary">{{ '补差金额：'+changeData.name1 }}</el-tag>
    </el-col>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleCancel">兑 换</el-button>
        <el-button
          type="primary"
          @click="handleSubmit()"
        >等价交换</el-button>
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
      changeData: {
        name1: '666.00',
        table1: [],
        table2: []
      },
      total: '999',
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
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
.deduction-dialog{
  .deduction-table {
    margin: 16px 0;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    overflow: hidden;
    .deduction-head {
      height: 42px;
      line-height: 42px;
      padding: 0 16px;
      background-color: #F5F7FA;
      border-bottom: 1px solid #DCDFE6
    }
  }
}
</style>
