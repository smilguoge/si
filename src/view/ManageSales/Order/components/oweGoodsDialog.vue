<template>
  <!-- 欠货明细 -->
  <el-dialog
    title="欠货明细"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="owe-goods-dialog"
    width="1100px"
  >
    <el-col :span="22" :offset="1">
      <el-date-picker
        v-model="timearr"
        type="daterange"
        class="dateCompontent filter-item"
        unlink-panels
        range-separator="—"
        start-placeholder="选择统计时间段"
        end-placeholder="选择统计时间段"
        value-format="timestamp"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="submitSearch"
      >查 询</el-button>
      <el-button
        class="filter-item"
        type="primary"
        @click="openDialog('exchange')"
      >兑 换</el-button>
      <el-button
        class="filter-item"
        type="primary"
        disabled
      >导 出</el-button>
    </el-col>
    <el-col :span="22" :offset="1">
      <div class="owe-goods-table">
        <el-table :data="itemList" style="width:100%" height="300px" fit>
          <el-table-column label="NO." align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属套餐" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="品项名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="欠货数量" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="销售时间" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="openDialog('return')">还 货</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="m-footer main-page">
        <el-pagination
          v-show="total>0"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30]"
          :page-size="listQuery.page_size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
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
          @click="handleCancel"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>

    <return-dialog v-model="returnVisible" @cancel="handleChildCancel('return')" />
    <change-dialog v-model="exchangeVisible" @cancel="handleChildCancel('exchange')" />
  </el-dialog>
</template>
<script>
import changeDialog from './oweGoodsExchangeDialog'
import returnDialog from './oweGoodsReturnDialog'
export default {
  name: '',
  components: { changeDialog, returnDialog },
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
      itemList: [{ id: 1, name: '1' }],
      timearr: [],
      dialogVisible: false,
      returnVisible: false,
      exchangeVisible: false,
      // total: null,
      total: 1,
      listQuery: {
        page: 1,
        page_size: 10,
        start_at: '',
        end_at: ''
      },
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
    handleCancel() {
      this.$parent.oweGoodsVisible = false
      // this.$emit('cancel')
    },
    openDialog(type) {
      if (type === 'return') {
        this.returnVisible = !this.returnVisible
      } else {
        this.exchangeVisible = !this.exchangeVisible
      }
    },
    submitSearch() {
      // -
    },
    handleChildCancel(type) {
      if (type === 'return') {
        this.returnVisible = false
      } else {
        this.exchangeVisible = false
      }
    },

    // - 分页
    handleSizeChange(val) {
      this.listQuery.page_size = val
      // this.getList(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.getList(this.listQuery)
    }
  }
}
</script>
<style lang="scss" scoped>
.owe-goods-dialog {
  .dateCompontent {
    width: 310px;
    margin-right:10px;
  }
  .owe-goods-table {
    margin-top:10px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
