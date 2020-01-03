<template>
  <!-- 临时赠送 -->
  <div class="app-container">
    <div class="filter-container clearfix">
      <el-input
        v-model="listQuery.name1"
        class="input-160 filter-item"
        placeholder="请输入会员姓名"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-date-picker
        v-model="timearr"
        type="daterange"
        class="dateCompontent filter-item"
        unlink-panels
        range-separator="—"
        start-placeholder="选择赠送时间段"
        end-placeholder="选择赠送时间段"
        value-format="timestamp"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="submitSearch"
      >查 询</el-button>
      <el-button
        type="primary"
        class="filter-item"
        icon="el-icon-plus"
        @click="openDialog('create')"
      >新 建</el-button>
      <!-- <el-button
        disabled
        class="filter-item"
        type="primary"
        icon="el-icon-zoom-in"
      >撤销申请</el-button> -->
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
          label="门店"
          align="center"
          fixed="left"
        >
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column
          label="会员姓名"
          align="center"
        >
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column
          label="会员编号"
          align="center"
        >
          <template slot-scope="{row}">{{ row.mennum }}</template>
        </el-table-column>
        <el-table-column
          label="赠送内容"
          align="center"
          min-width="140px"
        >
          <template slot-scope="{row}">{{ row.shopname }}</template>
        </el-table-column>
        <el-table-column
          label="赠送类型"
          align="center"
        >
          <template slot-scope="{row}">{{ row.proname }}</template>
        </el-table-column>
        <el-table-column
          label="赠送人"
          align="center"
        >
          <template slot-scope="{row}">{{ row.buynum }}</template>
        </el-table-column>
        <el-table-column
          label="当前审批人"
          align="center"
        >
          <template slot-scope="{row}">{{ row.synum }}</template>
        </el-table-column>
        <el-table-column
          label="审批状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-button
              :type="row.state==1?'success':'danger'"
              size="mini"
              plain
              @click="openDialog"
            >
              {{ row.state==1?'正常':'未通过' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作人"
          align="center"
        >
          <template slot-scope="{row}">{{ row.oname }}</template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="center"
          min-width="120px"
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

    <temporary-gift-dialog v-model="dialogVisible" />
    <gift-approval-dialog v-model="dialogApprovalVisible" />
  </div>
</template>

<script>
import temporaryGiftDialog from './components/temporaryGiftDialog'
import giftApprovalDialog from './components/giftApprovalDialog'
import { customerTransfer } from '@/api/ManageCustomer/CustomerManage'
const transferApi = new customerTransfer()

export default {
  name: 'InlineEditTable',
  components: { temporaryGiftDialog, giftApprovalDialog },
  data() {
    return {
      list: null,
      changeData: {},
      testList: [
        {
          ordernum: 'Test037036',
          mennum: 'Text001001',
          name: '张三',
          shopname: '新南分院',
          proname: '测试项目1',
          buynum: '100283115',
          synum: '100',
          dnum: '90',
          money: '288.00',
          quantity: '8988.00',
          paydate: 1532323442111,
          sday: 1592323442111,
          state: '1',
          oname: '乐乐',
          approve_at: 1543211231222
        },
        {
          ordernum: 'Test037000',
          mennum: 'Text001021',
          name: '李四',
          shopname: '锦里分院',
          proname: '测试项目2',
          buynum: '100283431',
          synum: '100',
          dnum: '90',
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
      dialogApprovalVisible: false,
      listLoading: false,
      timearr: [] // 检索时间组
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  methods: {
    test() {
      console.log(1)
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

    // - 弹框集中调用
    openDialog(type) {
      // this.listLoading = true
      if (type === 'create') {
        this.dialogVisible = !this.dialogVisible
      } else if (type === 'edit') {
        // - request
      } else {
        this.dialogApprovalVisible = !this.dialogApprovalVisible
      }
    },

    revokeSubmit() {
      // -
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
