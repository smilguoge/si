<template>
  <!-- 销售暂存单管理 -->
  <div class="app-container">
    <div class="filter-container clearfix">
      <el-input
        v-model="listQuery.customer_no"
        class="input-160 filter-item"
        placeholder="请输入会员编号"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-select
        v-model="listQuery.name2"
        class="input-160 filter-item"
        placeholder="请选择顾客属性"
      >
        <el-option label="嘉宾" value="1" />
        <el-option label="售前" value="2" />
        <el-option label="售后" value="3" />
      </el-select>
      <el-select
        v-model="listQuery.name3"
        class="input-160 filter-item"
        placeholder="请选择订单状态"
      >
        <el-option label="撤销" value="1" />
        <el-option label="暂存" value="2" />
      </el-select>
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
        disabled
        class="filter-item"
        type="primary"
        icon="el-icon-zoom-in"
      >高级查询</el-button>
      <el-button
        disabled
        class="filter-item"
        type="primary"
        icon="el-icon-upload2"
      >导 出</el-button>
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
          label="订单号"
          align="center"
          fixed="left"
          min-width="140px"
        >
          <template slot-scope="{row}">{{ row.ordernum }}</template>
        </el-table-column>
        <el-table-column
          label="会员编号"
          align="center"
          min-width="140px"
        >
          <template slot-scope="{row}">{{ row.mennum }}</template>
        </el-table-column>
        <el-table-column
          label="顾客姓名"
          align="center"
          min-width="120px"
        >
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column
          label="磁卡编号"
          align="center"
          min-width="140px"
        >
          <template slot-scope="{row}">{{ row.shopname }}</template>
        </el-table-column>
        <el-table-column
          label="顾客属性"
          align="center"
          min-width="140px"
        >
          <template slot-scope="{row}">{{ row.proname }}</template>
        </el-table-column>
        <el-table-column
          label="手机号码"
          align="center"
          min-width="120px"
        >
          <template slot-scope="{row}">{{ row.buynum }}</template>
        </el-table-column>
        <el-table-column
          label="订单总额"
          align="center"
        >
          <template slot-scope="{row}">{{ row.synum }}</template>
        </el-table-column>
        <el-table-column
          label="实收业绩"
          align="center"
        >
          <template slot-scope="{row}">{{ row.dnum }}</template>
        </el-table-column>
        <el-table-column
          label="实付业绩"
          align="center"
        >
          <template slot-scope="{row}">{{ row.money }}</template>
        </el-table-column>
        <el-table-column
          label="接待美容院"
          align="center"
        >
          <template slot-scope="{row}">{{ row.quantity }}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">{{ row.state }}</template>
        </el-table-column>
        <el-table-column
          label="操作人"
          align="center"
          min-width="120px"
        >
          <template slot-scope="{row}">{{ row.oname }}</template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="center"
          min-width="160px"
        >
          <template slot-scope="{row}">{{ row.approve_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          align="center"
          fixed="right"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="danger"
              @click="revokeSubmit(row.id)"
            >撤销</el-button>
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
      departTree: [],
      changeData: {},
      testList: [
        {
          ordernum: 'Test037036',
          mennum: 'Text001001',
          name: '张三',
          shopname: '3374552',
          proname: '售后',
          buynum: '100283115',
          synum: '100',
          dnum: '90',
          money: '288.00',
          quantity: '测试分店',
          state: '正常',
          oname: '乐乐',
          approve_at: 1543211231222
        }
      ],

      // total: null,
      total: 1,
      listQuery: {
        page: 1,
        page_size: 10,
        name: '',
        customer_no: '',
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

    revokeSubmit(id) {
      this.$confirm('此操作将驳回这条审批，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // FIXME: 待删除
          this.$message.warning('功能尚在开发中')
          console.log('撤销')
        })
        .catch(() => { })
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
.input-160 {
  width: 160px !important;
}
.dateCompontent {
  width: 300px;
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
</style>
