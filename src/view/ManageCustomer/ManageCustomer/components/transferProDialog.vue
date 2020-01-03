<template>
  <el-dialog
    title="选择项目卡"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="main-dialog"
    width="720px"
  >
    <el-table
      v-loading="listLoading"
      :show-overflow-tooltip="true"
      class="table-body-ly"
      style="width:100%"
      :data="proList"
      height="100%"
      border
      stripe
      fit
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="编号"
        align="center"
      >
        <template slot-scope="{row}">{{ row.num }}</template>
      </el-table-column>
      <el-table-column
        label="套餐名称"
        align="center"
        min-width="120px"
      >
        <template slot-scope="{row}">{{ row.tname }}</template>
      </el-table-column>
      <el-table-column
        label="项目名称"
        align="center"
        min-width="120px"
      >
        <template slot-scope="{row}">{{ row.pname }}</template>
      </el-table-column>
      <el-table-column
        label="剩余次数"
        align="center"
      >
        <template slot-scope="{row}">{{ row.ynum }}</template>
      </el-table-column>
      <el-table-column
        label="剩余金额"
        align="center"
      >
        <template slot-scope="{row}">{{ row.ymoney }}</template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="{row}">{{ row.status }}</template>
      </el-table-column>
      <el-table-column
        label="审批时间"
        align="center"
        min-width="160px"
      >
        <template slot-scope="{row}">{{ row.cname | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>

    </el-table>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCancel('changeData')"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'InlineEditTable',
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
      proList: [
        {
          num: '037000',
          tname: '测试套餐1',
          pname: '项目名称',
          ynum: '剩余次数',
          ymoney: '300.00',
          status: '正常',
          cname: 1652135281111
        },
        {
          num: '037000',
          tname: '测试套餐2',
          pname: '项目名称',
          ynum: '剩余次数',
          ymoney: '600.00',
          status: '正常',
          cname: 1652135281111
        }
      ],
      listLoading: true,
      dialogVisible: false
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() { },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    selectProject() {
      // ...
    }
  }
}
</script>

<style lang="scss" scope>
</style>
