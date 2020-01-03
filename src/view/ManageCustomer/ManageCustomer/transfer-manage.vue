<template>
  <div class="app-container transfer-manage-body">
    <div
      class="sbar-ly"
      :style="{width:drawerVisible==false?'calc(100% - 40px)':'calc(100% - 310px)'}"
    >
      <div class="filter-container clearfix">
        <el-input
          v-model="listQuery.name"
          class="input-160 filter-item"
          placeholder="请输入顾客姓名"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-input
          v-model="listQuery.customer_no"
          class="input-160 filter-item"
          placeholder="请输入会员编号"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-date-picker
          v-model="timearr"
          type="daterange"
          class="dateCompontent filter-item"
          unlink-panels
          range-separator="—"
          start-placeholder="选择转让时间段"
          end-placeholder="选择转让时间段"
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
          icon="el-icon-edit-outline"
          @click="openDialog('input')"
        >转让登记</el-button>
        <el-button
          disabled
          class="filter-item"
          type="primary"
          icon="el-icon-zoom-in"
          @click="openDialog('')"
        >高级查询</el-button>
        <el-button
          disabled
          class="filter-item"
          type="primary"
          icon="el-icon-upload2"
        >导出</el-button>
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
            label="NO."
            align="center"
            fixed="left"
          >
            <template slot-scope="{row}">{{ row.id }}</template>
          </el-table-column>
          <el-table-column
            label="转让日期"
            align="center"
            min-width="160px"
          >
            <template slot-scope="{row}">{{ row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
          </el-table-column>
          <el-table-column
            label="顾客姓名"
            align="center"
            min-width="120px"
          >
            <template slot-scope="{row}">{{ row.customer.name }}</template>
          </el-table-column>
          <el-table-column
            label="会员编号"
            align="center"
            min-width="140px"
          >
            <template slot-scope="{row}">{{ row.customer_no }}</template>
          </el-table-column>
          <el-table-column
            label="所属门店"
            align="center"
            min-width="140px"
          >
            <template slot-scope="{row}">{{ row.shop.name }}</template>
          </el-table-column>
          <el-table-column
            label="接收顾客姓名"
            align="center"
            min-width="120px"
          >
            <template slot-scope="{row}">{{ row.other_name }}</template>
          </el-table-column>
          <el-table-column
            label="接收顾客会员编号"
            align="center"
            min-width="140px"
          >
            <template slot-scope="{row}">{{ row.other_customer_no }}</template>
          </el-table-column>
          <el-table-column
            label="接收顾客所属门店"
            align="center"
            min-width="140px"
          >
            <template slot-scope="{row}">{{ row.other_shop_name }}</template>
          </el-table-column>
          <el-table-column
            label="金额"
            align="center"
            min-width="100px"
          >
            <template slot-scope="{row}">{{ row.amount }}</template>
          </el-table-column>
          <el-table-column
            label="数量"
            align="center"
            min-width="80px"
          >
            <template slot-scope="{row}">{{ row.quantity }}</template>
          </el-table-column>
          <el-table-column
            label="操作人"
            align="center"
            min-width="120px"
          >
            <template slot-scope="{row}">{{ row.operator }}</template>
          </el-table-column>
          <el-table-column
            label="审批人"
            align="center"
            min-width="120px"
          >
            <template slot-scope="{row}">{{ row.approve_staff_name }}</template>
          </el-table-column>
          <el-table-column
            label="审批时间"
            align="center"
            min-width="160px"
          >
            <template slot-scope="{row}">{{ row.approve_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
            align="center"
            fixed="right"
          >
            <template slot-scope="{row}">
              <el-button
                size="mini"
                type="primary"
                disabled
                @click="openDialog('edit',row.id)"
              >审批</el-button>
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
    <div
      class="openbtn"
      :style="{'left':(drawerVisible?'270px':'0'), 'z-index':(dialogVisible?'2000':'3000')}"
      @click="openDrawer(drawerVisible)"
    >
      <i :class="drawerVisible==true?'el-icon-caret-left icon':'el-icon-caret-right icon'" />
    </div>
    <tree-drawer v-model="drawerVisible" :tree-data="departTree" />
    <transfer-dialog v-model="dialogVisible" :form-data="changeData" @cancel="cancelDialog" />

  </div>
</template>

<script>
import treeDrawer from './components/treeDrawer'
import transferDialog from './components/transferDialog'
import { customerTransfer } from '@/api/ManageCustomer/CustomerManage'
const transferApi = new customerTransfer()

export default {
  name: 'InlineEditTable',
  components: { treeDrawer, transferDialog },
  data() {
    return {
      list: null,
      departTree: [],
      changeData: {},
      total: null,
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
      drawerVisible: false,
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
      transferApi.shopView().then(res => {
        this.departTree = res.data
      })
      transferApi.index(params).then(res => {
        const items = res.data
        if (items.list.lenght !== 0) {
          this.list = items.list
          this.total = parseInt(items.count)
          this.listLoading = false
        } else {
          this.list = []
          this.$message.warning('没有更多数据')
          this.listLoading = false
        }
      })
    },

    submitSearch() {
      if (this.timearr && this.timearr.length > 0) {
        this.listQuery.start_at = Math.floor(this.timearr[0] / 1000)
        this.listQuery.end_at = Math.floor(this.timearr[1] / 1000)
      } else {
        this.listQuery.start_at = ''
        this.listQuery.end_at = ''
      }
      this.getList(this.listQuery)
    },

    // - 弹框集中调用
    openDialog(type) {
      // this.listLoading = true
      if (type === 'input') {
        this.dialogVisible = !this.dialogVisible
      } else {
        // - request
      }
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

    cancelDialog() {
      this.dialogVisible = false
    },

    openDrawer(val) {
      this.drawerVisible = !val
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
.transfer-manage-body{
  .input-160 {
    width: 158px !important;
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

  .sbar-ly {
    position: absolute;
    top: 20px;
    right: 20px;
    bottom: 20px;
    transition: 0.2s ease all;
  }
  .openbtn {
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 80px;
    padding: 20px;
    transform: translateY(-50%);
    z-index: 3000;
    border-left: 18px solid rgb(100, 100, 100);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.4;
    transition: 0.2s ease all;
    .icon {
      position: absolute;
      left: -21px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 24px;
    }
  }
}
</style>
