<template>
  <div class="app-container">
    <div class="filter-container clearfix">
      <el-button
        type="primary"
        class="filter-item"
        icon="el-icon-plus"
        @click="openDialog('create')"
      >新增</el-button>
    </div>
    <div class="table-wrap-ly">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        style="width:100%;"
        height="100%"
        class="table-body-ly"
        stripe
        border
      >
        <el-table-column prop="shop_name" label="门店名称" align="center" />
        <el-table-column prop="name" label="仓库名称" align="center" />
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-tag
              :type="row.status== 1?'success':'danger'"
              close-transition
            >{{ row.status==1?'启用':'停用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operator_name" label="操作人" align="center" />
        <el-table-column label="操作时间" align="center">
          <template slot-scope="{row}">{{ row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button :size="miniSize" type="primary" @click="openDialog('edit',scope.row)">编辑</el-button>
            <el-button :size="miniSize" type="danger" @click=" deleteSubmit(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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

    <!-- 编辑、新建 -->
    <el-dialog
      :title="dialogType=='create'?'仓库新建':'仓库信息修改'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form
        ref="changeData"
        label-position="left"
        :rules="rules"
        :model="changeData"
        :label-width="formLabelWidth"
      >
        <el-col :span="23">
          <el-form-item label="门店名称" prop="shop_id">
            <el-select v-model="changeData.shop_id" class="w100" filterable placeholder="请输入门店名称">
              <el-option
                v-for="item in shopList"
                :key="item.id"
                :label="item.name"
                :value="item.id+''"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="仓库名称" prop="name">
            <el-input v-model="changeData.name" placeholder="请输仓库名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="仓库状态" prop="status">
            <el-radio-group v-model="changeData.status" :disabled="dialogType=='create'?true:false">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer" :span="23">
        <el-col :span="23">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="submitForm('changeData')">确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getShopList
} from '@/api/BaseModule/SetManage'

export default {
  name: 'Warehouse',
  data() {
    // - 验证门店是否存在
    var checkPrincipal = (rule, value, callback) => {
      console.log(value)
      const result = this.shopList.filter(v => {
        return v.id == value
      })
      if (!result.length) {
        callback(new Error('该门店不存在'))
      }
      callback()
    }

    return {
      tableData: [],
      shopList: [],
      operatorList: [
        {
          label: '张三',
          value: 1
        },
        {
          label: '李四',
          value: 2
        },
        {
          label: '王五',
          value: 3
        }
      ],
      changeData: {
        status: '1'
      },

      // - 验证规则
      rules: {
        shop_id: [
          {
            required: true,
            validator: checkPrincipal,
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入仓库名称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择仓库状态',
            trigger: 'change'
          }
        ]
      },

      // - Dialog类型
      dialogType: '',

      total: null,
      listQuery: {
        page: 1,
        page_size: 10
      },

      // - 页面参数配置
      dialogVisible: false,
      flagTime: 0,
      listLoading: true,
      miniSize: 'mini',
      smallSize: 'small',
      dialogWidth: '400px',
      formLabelWidth: '110px'
    }
  },
  created() {
    this.getList(this.listQuery)
    this.getShop()
  },
  methods: {
    // - 弹框集中调用
    openDialog(type, data) {
      if (type === 'create') {
        // console.log("create Dialog");
        this.dialogType = type
        this.dialogVisible = true
      } else {
        // console.log("edit Dialog");
        data.shop_id = data.shop.id
        this.changeData = JSON.parse(JSON.stringify(data))
        this.dialogType = type
        this.dialogVisible = true
      }
    },

    // - 提交/验证 基础信息表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const curr = new Date()
          if (curr - this.flagTime > 1000) {
            this.handleDone(this.dialogType)
            this.flagTime = curr
          }
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },

    // - 请求
    handleDone(type) {
      if (type == 'create') {
        this.changeData.shop_name = this.changeData.shop_name * 1 // 变更数据类型
        console.log(typeof this.changeData.shop_name, '1')
        console.log(typeof this.changeData.warehouse_name, '2')
        console.log(typeof this.changeData.status, '3')
        console.log(this.changeData, 'req')
        // - request
        createWarehouse(this.changeData)
          .then(res => {
            console.log('ok', res)
            this.getList()
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            console.log('err', res)
            this.$message.warning(res.message)
            return
          })
      } else {
        // - request
        console.log(this.changeData.id)
        updateWarehouse(this.changeData, this.changeData.id)
          .then(res => {
            console.log('ok', res)
            this.getList()
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            console.log('err', res)
            this.$message.warning(res.message)
            return
          })
      }
    },

    // - 删除
    deleteSubmit(id) {
      console.log('Delete Submit')
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // - request
          deleteWarehouse(id)
            .then(res => {
              console.log(res)
              this.getList()
            })
            .catch(res => {
              this.$message.warning(res.message)
              return
            })
        })
        .catch(() => {})
    },

    // - 重置验证
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = {
        status: '1'
      }
    },

    // - 关闭弹框
    handleClose() {
      this.dialogVisible = false
      this.resetForm('changeData')
      this.dialogType = ''
    },

    // - 回显
    gradeBack(optionArr, index) {
      let res
      res = optionArr.filter(el => el.value == index)[0]
      return res.label
    },

    // - 请求门店列表
    getShop() {
      // this.tableLoading = true;
      getShopList()
        .then(res => {
          const items = res.data
          if (items.lenght != 0) {
            this.shopList = items
            // this.tableLoading = false;
          } else {
            this.shopList = []
            this.$message.warning('没有更多门店数据')
          }
        })
        .catch(res => {
          this.$message.warning('数据请求失败')
          return
        })
    },

    // - 请求数据
    getList(params) {
      this.listLoading = true
      getWarehouse(params)
        .then(res => {
          const items = res.data
          if (items.lenght != 0) {
            this.tableData = items.list
            this.total = parseInt(items.count)
            this.listLoading = false
          } else {
            this.tableData = []
            this.$message.warning('没有更多数据')
          }
        })
        .catch(res => {
          console.log(res)
          this.$message.warning('数据请求失败')
          return
        })
    },

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
.table-wrap-ly {
  width: 100%;
  height: calc(100vh - 260px);
  flex: 1;
  transition: 0.2s;
  -webkit-transition: 0.2s;
}
.table-body-ly {
  max-height: calc(100% - 40px);
}
</style>
