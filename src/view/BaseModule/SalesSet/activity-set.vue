<template>
  <!-- 活动套餐设置 -->
  <el-container class="m-container">

    <div class="m-filter">
      <el-form ref="filterForm" :model="listQuery" :inline="true" class="search-form">
        <el-form-item prop="title">
          <el-input v-model="listQuery.title" clearable placeholder="请输入活动名称" style="width:140px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="listQuery.status" clearable style="width:120px;" placeholder="请选择状态" class="filter-item">
            <el-option v-for="item in stautsOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="date">
          <el-date-picker
            v-model="listQuery.date"
            class="filter-item"
            style="width:310px;"
            type="daterange"
            range-separator="-"
            start-placeholder="请选择创建时间段"
            end-placeholder="请选择创建时间段"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" @click="handleFilter">查 询</el-button>
          <el-button @click="resetFilter('filterForm')">重 置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleCreate()">新 建</el-button>
      <el-button type="primary" @click="handleCreate()">导 出</el-button>
      <el-button type="primary" @click="handleCreate()">导 入</el-button>
    </div>

    <el-header class="m-header">
      <el-row>
        <el-col :span="20">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">新建</el-button>
          <exportexcel
            :datakey="datakey"
            :title="title"
            :export-data="list"
          />
          <el-button type="primary" icon="el-icon-upload2" @click="importExcel()">导入</el-button>
        </el-col>
      </el-row>
    </el-header>

    <div
      :style="{width: drawerFlag ? '30%' : '100%'}"
      class="m-content"
    >
      <div class="m-table">
        <el-table
          ref="singleTable"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          width="100%"
          height="100%"
        >
          <el-table-column label="活动名称" width="150">
            <template slot-scope="scope">{{ scope.row.activename }}</template>
          </el-table-column>

          <el-table-column label="促销活动" width="150">
            <template slot-scope="scope">{{ scope.row.salesname }}</template>
          </el-table-column>

          <el-table-column label="活动文件号" width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.activeid }}
            </template>
          </el-table-column>

          <el-table-column label="活动编码" width="150" align="center">
            <template slot-scope="scope">{{ scope.row.activecode }}</template>
          </el-table-column>

          <el-table-column align="center" label="赠送积分" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.jifen }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="是否折上折" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.discount }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="状态" width="100">

            <template slot-scope="scope">
              <span v-if="scope.row.status % 2 == 0">
                <el-tag type="success">正常</el-tag>
              </span>
              <span v-else>
                <el-tag type="danger">过期</el-tag>
              </span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="是否顾客属性" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.property }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="开始日期" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.startdate | parseTime('{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="结束日期" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.endate | parseTime('{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="适用门店" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作人" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作时间" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="m-footer">
        <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30]" :page-size="listQuery.rows" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>

    <!-- right -->
    <drawerBox
      :style="{right: drawerFlag ? '0' : '-70%'}"
      class="m-drawer"
      @close="closeDrawer"
    />

  </el-container>
</template>

<script>
// import { fetchList } from '@/api/demo/article'
import exportexcel from '@/component/ExportExcel/index'
import drawerBox from './activity-set/drawer-box'

const list = []
for (var i = 0; i < 2; i++) {
  list.push({
    activename: '活动名称' + i,
    salesname: '促销活动' + i,
    activeid: '活动文件号' + i,
    activecode: '活动编码' + i,
    jifen: '10',
    youhui: '',
    discount: '是',
    property: '售前售后',
    status: i,
    userstype: '售后',
    startdate: '20190101',
    endate: '20190102',
    storename: '门店' + i,
    username: '用户' + i,
    timestamp: '2019-11-11'
  })
}

export default {
  name: 'ActivityTable',
  components: {
    exportexcel,
    drawerBox
  },
  data() {
    return {
      listLoading: false,
      list: null,
      total: null,
      listQuery: {
        page: 1,
        rows: 20,
        title: '',
        status: '',
        date: ''
      },
      stautsOptions: [{ name: '过期', value: 0 }, { name: '正常', value: 1 }],
      drawerFlag: false,
      title: ['项目类别', '项目编号', '项目名称', '销售价格', '状态', '操作人', '操作时间'],
      datakey: ['itemid', 'itemid', 'unit', 'price', 'status', 'username', 'timestamp']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.list = list
        this.total = list.length
        this.listLoading = false
      }, 1000)
    },
    handleFilter() {
      this.getList()
    },
    resetFilter(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      // 新增
      this.drawerFlag = true
    },
    handleEdit(row) {
      // console.info(row)
      // 编辑
      this.drawerFlag = true
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
    },
    importExcel() {
      // 导入
    },
    closeDrawer() {
      // 关闭抽屉
      this.drawerFlag = false
    }
  }
}
</script>

<style lang='css' scoped>
.line {
  text-align: center;
}
.m-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.m-filter {
  padding: 12px 20px 11px;
  border-bottom: 1px solid #ebeef5;
}
.m-filter .el-form-item{margin-bottom:0}
.m-header {
  line-height: 60px;
}
.m-footer {
  padding: 20px 0;
}
.m-content {
  width: 100%;
  padding: 0 20px;
  flex: 1;
  transition: 0.5s;
  -webkit-transition: 0.5s;
}
.m-table{
  height: calc(100vh - 290px);
  width:100%
}
.m-drawer {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  transition: 0.5s;
  -webkit-transition: 0.5s;
}
</style>
