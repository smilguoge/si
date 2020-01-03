<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="searchForm"
        class="search-form"
      >
        <el-form-item>
          <el-input
            v-model="searchForm.shop_name"
            style="width: 160px;"
            placeholder="请输入所属门店"
            prefix-icon="el-icon-search"
            class="filter-item"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.name"
            style="width: 160px;"
            placeholder="请输入员工姓名"
            class="filter-item"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="table-wrap-ly"
      :style="{width:drawerVisible?'70%':'100%'}"
    >
      <el-table
        v-loading="listLoading"
        class="table-body-ly"
        style="100%"
        :data="list"
        border
        stripe
        fit
      >
        <el-table-column
          label="员工编号"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.staff_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="登陆账号"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="员工姓名"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.staff_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属门店"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.shop }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理门店"
          align="center"
        >
          <template slot-scope="{row}">
            <span
              v-for="(item,index) in row.shop_manage"
              :key="index"
            >{{ item + '；' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="170"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="handleUpdate(row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              disabled
              @click="handleDelete(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-footer main-page">
        <el-pagination
          v-show="total>0"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30]"
          :page-size="listQuery.rows"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <store-drawer
      v-model="drawerVisible"
      :select-arr="selectId"
      :tree-data="departTree"
      @clear="drawerClear"
      @mark="changeMark($event)"
      @getShop="handleSave($event)"
    />
    <div
      v-show="drawerVisible"
      class="mark"
    />
  </div>
</template>

<script>
import storeDrawer from './component/storeDrawer'
import { getDepartList } from '@/api/BaseModule/SetManage'

export default {
  name: 'InlineEditTable',
  components: { storeDrawer },
  data() {
    return {
      searchForm: {},
      // list: [],
      list: [
        {
          id: 1,
          staff_id: '1001',
          staff_name: '张三',
          username: 'zhangs',
          shop: '春熙路店',
          shop_manage: ['春熙路店', '玉林路店']
        },
        {
          id: 2,
          staff_id: '1045',
          staff_name: '李四',
          username: 'lis123',
          shop: '锦里店',
          shop_manage: ['锦里店']
        }
      ],
      departTree: [],

      total: null,
      listQuery: {
        page: 1,
        rows: 20,
        title: '',
        status: '',
        date: ''
      },

      selectId: [5, 6],
      editId: 0, // 当前编辑的数据id

      drawerVisible: false,

      // - 参数配置
      flagTime: 0,
      dialogStatus: '',
      listLoading: false,
      miniSize: 'mini',
      smallSize: 'small',
      dialogWidth: '430px',
      optionDialogWidth: '1100px',
      formLabelWidth: '90px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 节流
    // const curr = new Date();
    // if (curr - this.flagTime > 1000) {
    //   this.handleDone(this.dialogType);
    //   this.flagTime = curr;
    // }

    getList() {
      this.listLoading = true
      getDepartList().then(res => {
        this.departTree = res.data
      })
      setTimeout(() => {
        // this.list = list;
        // this.total = list.length;
        this.listLoading = false
      }, 1000)
    },
    handleFilter() {
      this.getList()
    },
    handleUpdate(id) {
      // - 修改
      // - request  请求id和已选中项目的数组
      this.dialogStatus = 'update'
      this.drawerVisible = true
      this.editId = id
      setTimeout(() => {
        this.selectId = [5]
      }, 100)
    },
    handleSave(arr) {
      // - 新增
      console.log('Parse', arr) // 接收到门店id与名称
      // - request
    },
    // eslint-disable-next-line space-before-function-paren
    handleDelete (id) {
      // - 删除
      console.log(id)
    },
    drawerClear() {
      this.drawerVisible = false
      this.selectId = []
      this.editId = 0
    },
    changeMark(val) {
      // - 切换遮罩状态
      this.drawerVisible = val
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

<style lang="css" scoped>
.mark {
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  opacity: 0.6;
  transition: 0.5s;
}
.table-wrap-ly {
  width: 100%;
  flex: 1;
  transition: 0.2s;
  -webkit-transition: 0.2s;
}
</style>
