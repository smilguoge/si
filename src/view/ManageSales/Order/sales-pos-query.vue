<template>
  <!-- POS单查询 -->
  <div class="app-container pos-query">
    <div class="filter-container clearfix">
      <el-input
        v-model="listQuery.name1"
        class="input-160 filter-item"
        placeholder="请输入门店名称"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-date-picker
        v-model="timearr"
        type="daterange"
        class="dateCompontent filter-item"
        unlink-panels
        range-separator="—"
        start-placeholder="选择开单时间段"
        end-placeholder="选择开单时间段"
        value-format="timestamp"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="submitSearch"
      >查 询</el-button>
      <el-button
        disabled
        class="filter-item"
        type="primary"
        icon="el-icon-upload2"
      >导 出（待定）</el-button>
    </div>
    <div class="table-wrap-ly">
      <el-table
        v-loading="listLoading"
        :show-overflow-tooltip="true"
        class="table-body-ly"
        style="width:100%"
        :data="list"
        height="100%"
        border
        stripe
        fit
      >
        <el-table-column
          label="交易日期"
          align="center"
          min-width="120px"
        >
          <template slot-scope="{row}">{{ row.approve_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          label="交易单号"
          align="center"
        >
          <template slot-scope="{row}">{{ row.dnum }}</template>
        </el-table-column>
        <el-table-column
          label="原始金额"
          align="center"
        >
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column
          label="门店"
          align="center"
        >
          <template slot-scope="{row}">{{ row.shopname }}</template>
        </el-table-column>
        <el-table-column
          label="核销金额"
          align="center"
        >
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column
          label="转其他店金额"
          align="center"
        >
          <template slot-scope="{row}">{{ row.mennum }}</template>
        </el-table-column>
        <el-table-column
          label="剩余金额"
          align="center"
        >
          <template slot-scope="{row}">{{ row.buynum }}</template>
        </el-table-column>
        <el-table-column
          label="核销时间"
          align="center"
          min-width="120px"
        >
          <template slot-scope="{row}">{{ row.approve_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          label="审批状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="row.state==1?'success':'danger'">
              {{ row.state==1?'正常':'作废' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="160px"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="openDialog"
            >转 店</el-button>
            <el-button
              size="mini"
              type="danger"
            >作 废</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </div>

    <el-dialog
      title="POS单转店"
      :visible.sync="dialogVisible"
      :before-close="cancelDialog"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="400px"
    >
      <el-form
        :model="changeData"
        label-width="80px"
      >
        <el-form-item label="转入门店">
          <el-input v-model="changeData.name" class="w100" placeholder="请输入门店" />
        </el-form-item>
        <el-form-item label="转入金额">
          <el-input v-model="changeData.num" class="w100" placeholder="请输入金额" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-col :span="23">
          <el-button @click="cancelDialog">取 消</el-button>
          <el-button
            type="primary"
            @click="cancelDialog"
          >确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { customerTransfer } from '@/api/ManageCustomer/CustomerManage'
const transferApi = new customerTransfer()

export default {
  name: 'InlineEditTable',
  data() {
    return {
      list: null,
      changeData: {},
      testList: [
        {
          ordernum: '19999.00',
          mennum: '19999.00',
          name: '19999.00',
          shopname: '新南分院',
          proname: '测试项目1',
          buynum: 'TEST321456',
          synum: '100',
          dnum: 'TEST321456',
          money: '288.00',
          quantity: '8988.00',
          paydate: 1532323442111,
          sday: 1592323442111,
          state: '1',
          oname: '乐乐',
          approve_at: 1543211231222
        },
        {
          ordernum: '19999.00',
          mennum: '19999.00',
          name: '19999.00',
          shopname: '锦里分院',
          proname: '测试项目2',
          buynum: 'TEST321456',
          synum: '100',
          dnum: 'TEST321456',
          money: '199.00',
          quantity: '6888.00',
          paydate: 1532321254001,
          sday: 1602321254001,
          state: '2',
          oname: '康康',
          approve_at: 1543211231222
        }
      ],

      // total: null,
      total: 1,
      listQuery: {
        page: 1,
        page_size: 10,
        name: '',
        start_at: '',
        end_at: ''
      },

      // 配置参数
      dialogVisible: false,
      listLoading: false,
      timearr: [] // 检索时间组
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  methods: {
    openDialog() {
      this.dialogVisible = !this.dialogVisible
    },
    cancelDialog() {
      this.dialogVisible = false
    },
    getList(params) {
      this.listLoading = true
      setTimeout(() => {
        this.list = this.testList
        this.listLoading = false
      }, 1300)
      // transferApi.index(params).then(res => {
      //   const items = res.data
      //   if (items.list.lenght !== 0) {
      //     this.list = items.list
      //     this.total = parseInt(items.count)
      //     this.listLoading = false
      //   } else {
      //     this.list = []
      //     this.$message.warning('没有更多数据')
      //     this.listLoading = false
      //   }
      // })
    },

    submitSearch() {
      if (this.timearr && this.timearr.length > 0) {
        this.listQuery.start_at = Math.floor(this.timearr[0] / 1000)
        this.listQuery.end_at = Math.floor(this.timearr[1] / 1000)
      } else {
        this.listQuery.start_at = ''
        this.listQuery.end_at = ''
      }
      // FIXME: 待删除
      this.$message.warning('功能尚在开发中')
      this.getList(this.listQuery)
    },

    // - 分页
    handleSizeChange(val) {
      this.listQuery.page_size = val
      this.getList(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList(this.listQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
.pos-query {
  .input-160 {
    width: 160px !important;
  }
  .dateCompontent {
    width: 300px;
    margin-right: 10px;
  }
  .table-wrap-ly {
    height: calc(100vh - 260px);
    flex: 1;
    transition: 0.2s;
    -webkit-transition: 0.2s;
  }
  .table-body-ly {
    max-height: calc(100% - 20px);
    transition: 0.21s ease all;
  }
}
</style>
