<template>
  <div class="app-container reissue-manage-body">
    <div
      class="sbar-ly"
      :style="{width:drawerVisible==false?'calc(100% - 40px)':'calc(100% - 310px)'}"
    >
      <div class="filter-container clearfix">
        <el-input
          v-model="listQuery.customer_no"
          class="input-160 filter-item"
          placeholder="请输入会员编号"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-input
          v-model="listQuery.name1"
          class="input-160 filter-item"
          placeholder="请输入顾客姓名"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-input
          v-model="listQuery.name2"
          class="input-160 filter-item"
          placeholder="请选择顾客属性"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-input
          v-model="listQuery.name3"
          class="input-160 filter-item"
          placeholder="请输入项目名称"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-date-picker
          v-model="timearr"
          type="daterange"
          class="dateCompontent filter-item"
          unlink-panels
          range-separator="—"
          start-placeholder="选择补录时间段"
          end-placeholder="选择补录时间段"
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
          icon="el-icon-search"
          @click="submitSearch"
        >0 次查询</el-button>
        <el-button
          type="primary"
          class="filter-item"
          icon="el-icon-plus"
          @click="openDialog('input')"
        >新 建</el-button>
        <el-button
          disabled
          class="filter-item"
          type="primary"
          icon="el-icon-edit-outline"
        >审 批</el-button>
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
            label="所属美容院"
            align="center"
            min-width="140px"
          >
            <template slot-scope="{row}">{{ row.shopname }}</template>
          </el-table-column>
          <el-table-column
            label="项目名称"
            align="center"
            min-width="140px"
          >
            <template slot-scope="{row}">{{ row.proname }}</template>
          </el-table-column>
          <el-table-column
            label="项目卡号"
            align="center"
            min-width="120px"
          >
            <template slot-scope="{row}">{{ row.buynum }}</template>
          </el-table-column>
          <el-table-column
            label="购买次数"
            align="center"
          >
            <template slot-scope="{row}">{{ row.synum }}</template>
          </el-table-column>
          <el-table-column
            label="剩余次数"
            align="center"
          >
            <template slot-scope="{row}">{{ row.dnum }}</template>
          </el-table-column>
          <el-table-column
            label="单财"
            align="center"
          >
            <template slot-scope="{row}">{{ row.money }}</template>
          </el-table-column>
          <el-table-column
            label="剩余金额"
            align="center"
          >
            <template slot-scope="{row}">{{ row.quantity }}</template>
          </el-table-column>
          <el-table-column
            label="购买日期"
            align="center"
            min-width="160px"
          >
            <template slot-scope="{row}">{{ row.paydate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
          </el-table-column>
          <el-table-column
            label="有效期"
            align="center"
            min-width="160px"
          >
            <!-- <template slot-scope="{row}">{{ row.sday+'天' }}</template> -->
            <template slot-scope="{row}">{{ row.sday | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
          </el-table-column>
          <el-table-column
            label="补录状态"
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
          <!-- <el-table-column
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
          </el-table-column> -->
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
    <reissue-dialog v-model="dialogVisible" :form-data="changeData" @cancel="cancelDialog" />

  </div>
</template>

<script>
import treeDrawer from './components/treeDrawer'
import reissueDialog from './components/reissueDialog' // del
import { customerTransfer } from '@/api/ManageCustomer/CustomerManage'
const transferApi = new customerTransfer()

export default {
  name: 'InlineEditTable',
  components: { treeDrawer, reissueDialog },
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
          shopname: '新南分院',
          proname: '测试项目1',
          buynum: '100283115',
          synum: '100',
          dnum: '90',
          money: '288.00',
          quantity: '8988.00',
          paydate: 1532323442111,
          sday: 1592323442111,
          state: '正常',
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
          state: '正常',
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
    this.getTree()
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

    getTree() {
      transferApi.shopView().then(res => {
        this.departTree = res.data
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
      // FIXME: 待删除
      this.$message.warning('功能尚在开发中')
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
.reissue-manage-body {
  overflow: hidden;

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
    max-height: calc(100% - 60px);
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
