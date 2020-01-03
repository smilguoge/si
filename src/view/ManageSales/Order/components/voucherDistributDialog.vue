<template>
  <!-- 业绩分配-代金券 -->
  <el-dialog
    title="选择销售人员"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="voucher-dis-dialog"
    width="700px"
  >

    <el-col :span="22" :offset="1">
      <div class="filter-container">
        <el-select
          v-model="voucherData.num"
          placeholder="请选择职务"
          class="filter-item filter-input"
        >
          <el-option label="前台" value="1" />
          <el-option label="顾问" value="2" />
          <el-option label="店长" value="3" />
        </el-select>
        <el-select
          v-model="voucherData.num"
          placeholder="请选择员工"
          class="filter-item filter-input"
        >
          <el-option label="张三" value="1" />
          <el-option label="李四" value="2" />
          <el-option label="王五" value="3" />
        </el-select>
        <el-input
          class="filter-item filter-input"
          style="margin-right:10px"
          placeholder="请输入抽奖次数"
        />
        <el-button
          type="primary"
          size="small"
          class="filter-item"
          @click="handleCreate"
        >添 加</el-button>
        <el-button
          type="primary"
          size="small"
          class="filter-item"
          style="margin-left: 10px"
          @click="handleDelete"
        >删 除</el-button>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <div class="distribution-table">
        <el-table
          :data="voucherData.table"
          style="width:100%"
          height="260px"
        >
          <el-table-column
            type="selection"
            width="50px"
            align="center"
          />
          <el-table-column
            label="职务"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.class }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="次数"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <div style="clear:both" />
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCancel"
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
      queryData: {},
      voucherData: {
        table: []
      },
      dialogVisible: false
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
    handleCreate() {},
    handleDelete() {},
    handleCancel() {
      this.$emit('cancel')
      // this.$parent.distributVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.voucher-dis-dialog {
  .filter-container {
    margin-top: -10px;
  }
  .filter-input {
    width: 130px;
  }
  .distribution-table {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
  }
}
</style>
