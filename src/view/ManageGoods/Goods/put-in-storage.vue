<template>
  <div class="app-container">
    <div class="psty1">
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >新增</el-button>
    </div>
    <div class="filter-container flex">
      <div class="spsty1">
        <span>日期：</span>
        <el-date-picker v-model="start_time" type="date" placeholder="选择日期" size="small" value-format="timestamp" />
        <b>-</b>
        <el-date-picker v-model="end_time" type="date" placeholder="选择日期" value-format="timestamp" />
      </div>
      <div class="spsty2">
        <span>入库类型：</span>
        <el-select
          v-model="listQuery.stock_type"
          placeholder="入库类型"
          clearable
          class="filter-item"
          style="width: 130px"
        >
          <el-option v-for="item in stock_list" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </div>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-radio-group v-model="listQuery.status" class="spsty3" @change="handleFilter">
        <el-radio-button v-for="item of statusOptions" :key="item.id" :label="item.id">{{ item.name }}</el-radio-button>
      </el-radio-group>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
      :default-sort = "{prop: 'updated_at', order: 'descending'}"
    >
      <el-table-column label="单据号" align="center" width="150" sortable prop="document_no">
        <template slot-scope="scope">
          <span>{{ scope.row.document_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门店名称" align="center" width="165" prop="shop_name">
        <template slot-scope="scope">
          <span>{{ scope.row.shop_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对方门店 " align="center" width="165" prop="out_stock_shop">
        <template slot-scope="scope">
          <span>{{ scope.row.out_stock_shop }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库类型" align="center" width="180" prop="stock_type">
        <template slot-scope="scope">
          <span>{{ scope.row.stock_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center" width="120" prop="operator">
        <template slot-scope="scope">
          <span>{{ scope.row.operator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center" width="160" sortable prop="updated_at">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80" prop="status">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="200" prop="remark">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <!-- <el-button type="primary" size="mini" @click="handleCancel(scope.row)">撤销</el-button>
          <el-button size="small" type="primary" @click="handleEnd(scope.row)">确定收货</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-press-escape="dialogEsc"
      :close-on-click-modal="dialogEsc"
      width="550px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="版本号" prop="version">
          <el-input v-model="temp.version" placeholder="请输入版本号" />
        </el-form-item>
        <el-form-item label="系统" prop="os">
          <el-select
            v-model="temp.os"
            placeholder="系统系列号"
            clearable
            class="filter-item"
            style="width: 130px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="下载地址" prop="path">
          <el-input v-model="temp.path" placeholder="请输入下载地址" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData()">确定</el-button>
      </div>
    </el-dialog>
  <product-drawer
      v-model="drawerVisible"
      :get-data="changeData"
      @save="handleSave($event)"
      @clear="drawerClear"
      @mark="changeMark($event)"
      :stocklist='stock_list'
    />
  </div>
</template>

<script>
import productDrawer from './component/storageDialog'
import { stockList, createStock, deleteStock, getStocylist, stockCancel, stockCheck } from '@/api/ManageGoods/PutInStorage'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import PanThumb from '@/components/PanThumb'
const statusOptions = [
  { id: 1, name: '未完成' },
  { id: 2, name: '已完成' },
  { id: 3, name: '全部' }
]
export default {
  name: 'InStock',
  components: { PanThumb, Pagination, productDrawer },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      start_time:'',
      end_time:'',
      list: [],
      total: 0,
      listLoading: true,
      stock_list: null,
      listQuery: {
        page: 1,
        start_time: '',
        end_time: '',
        stock_type: '',
        page_size: 20,
        status: 1
      },
      statusOptions,
      temp: {
        version: '',
        os: '',
        path: ''
      },
      dialogFormVisible: false,
      dialogEsc: false,
      dialogStatus: '',
      textMap: {
        update: '编辑入库',
        create: '添加入库'
      },
      changeData: {},
      drawerVisible: false,
      rules: {
        version: [
          { required: true, message: '版本系列号为必填项', trigger: 'blur' }
        ],
        os: [
          { required: true, message: '系统类别为必填项', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '下载地址为必填项', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    // this.getStocylist()
  },
  methods: {
    handleCancel(row) {
      // if (row.status == 2) {
      //   this.$message.error('已经发货，不能撤销！')
      // } else {
      //   stockCancel(row.id).then(response => {
      //     this.$message({
      //       message: '撤销成功',
      //       type: 'success' })
      //   })
      // }
    },
    handleEnd(row) {
      if (row.status !== 2) {
        stockCheck(row.id).then(response => {
          this.$message({
            message: '撤销成功',
            type: 'success' })
        })
      } else if (row.status == 2) {
        this.$message.error('已经确定收货了！')
      }
    },
    close() {
      this.imagecropperShow = false
    },
    getList() {
      this.listLoading = true
      this.listQuery.start_time=this.start_time/1000
      this.listQuery.end_time=this.end_time/1000
      stockList(this.listQuery).then(response => {
        this.list = response.data.arrLog
        this.total = parseInt(response.data.totalnum)
        this.stock_list=response.data.arrType
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    // getStocylist() {
    //   getStocylist().then(response => {
    //     this.stock_list = response.data
    //   })
    // },
    drawerClear() {
      this.drawerVisible = false
      this.dialogType = ''
      this.changeData = {}
    },
    changeMark(val) {
      // - 切换遮罩状态
      this.drawerVisible = val
    },
    handleFilter() {
      this.listQuery.page = 1
      console.log(this.listQuery)
      this.getList()
    },
    handleModifyStatus(row, status) {
      row.status = status
      createStock(row).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
        row.status_name = response.data.status_name
      })
    },
    resetTemp() {
      this.temp = {
        version: '',
        os: '',
        path: ''
      }
    },
    handleCreate() {
      // - 新建
      // - 请求选项数据
      this.drawerVisible = true
      this.dialogStatus = 'create'
      this.changeData = JSON.parse(JSON.stringify(this.defaultData))
    },
    // handleCreate() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    handleSave(obj) {
      // 时间戳处理
      if ((this.changeData.effect_time + '').length > 10) {
        this.changeData.effect_time = Math.floor(
          this.changeData.effect_time / 1000
        )
      }
      if (!parseInt(this.changeData.points)) {
        this.changeData.points = 0
      }
      console.log(obj)
      if (this.dialogType === 'create') {
        dataApi.create(obj).then(res => {
          this.getList(this.listQuery)
          this.drawerClear()
          return
        })
      } else {
        dataApi.update(obj, this.editId).then(res => {
          this.getList(this.listQuery)
          this.drawerClear()
          return
        })
      }
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createStock(this.temp).then(response => {
            const addversion = response.data
            addversion.version = this.temp.version
            this.list.unshift(addversion)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      if (row.status == 1) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteStock(row).then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
          })
          .catch(() => {})
      } else {
        this.$message.error('已经发货，不能撤销！')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-tagbox.el-tag {
  margin-left: 10px;
}
.flex{
  display: flex;
  align-items:center;
}
.spsty1 >>> .el-date-editor.el-input{
  width: 150px;
}
.spsty2{
  margin-left: 25px;
  margin-right: 25px;
}
.spsty3{
  margin-left: 25px;
  margin-top: -10px;
}
.psty1{
    margin-bottom: 12px;
    margin-top: 20px;
}
.filter-container{
  margin-bottom: 5px;
}
.spsty2 .filter-container .filter-item{
  margin-bottom: 0;
}
</style>
