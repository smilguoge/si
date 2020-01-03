<template>
  <div class="app-container">
    <div class="filter-container clearfix">
      <el-form :inline="true" :model="listQuery" class="search-form">
        <el-form-item>
          <el-input
            v-model="listQuery.name"
            prefix-icon="el-icon-search"
            placeholder="请输入职务名称"
            class="filter-item"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="filter-item"
            icon="el-icon-search"
            @click="submitSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="filter-item"
        style="margin-left:10px;"
        @click="openDialog('create')"
      >新增</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        class="filter-item"
        @click="openDialog('delete')"
      >删除</el-button>
      <el-button
        :disabled="true"
        type="primary"
        class="filter-item"
        icon="el-icon-tickets"
        @click="openDialog('into')"
      >导入</el-button>
    </div>
    <div class="table-wrap-ly">
      <el-table
        ref="mainTable"
        v-loading="listLoading"
        :data="tableData"
        class="table-body-ly"
        style="width:100%"
        height="100%"
        highlight-current-row
        border
        stripe
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column label="职务名称" align="center">
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column label="职系" align="center">
          <template slot-scope="{row}">{{ row.dic_position_series }}</template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="{row}">{{ row.operator_name }}</template>
        </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template slot-scope="{row}">{{ row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-tag
              :type="row.status== 1?'success':'danger'"
              close-transition
            >{{ row.status==1?'启用':'停用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="100">
          <template slot-scope="{row}">
            <el-button :size="miniSize" type="primary" @click="openDialog('edit',row)">编辑</el-button>
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
    <!-- Dialog -->
    <el-dialog
      :title="dialogType=='create'?'新增职务':'修改职务'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="dialogWidth"
      class="main-dialog"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
    >
      <el-form
        ref="changeData"
        label-position="right"
        :rules="rules"
        :model="changeData"
        :label-width="formLabelWidth"
      >
        <el-col :span="23">
          <el-form-item label="职务名称" prop="name">
            <el-input v-model="changeData.name" placeholder="请输入职务名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="职系" prop="dic_position_series">
            <el-select v-model="changeData.dic_position_series" class="w100" placeholder="请选择职系">
              <el-option
                v-for="item in gradeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="职务描述" prop="descrip">
            <el-input v-model="changeData.descrip" placeholder="请输入职务描述" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="排序号" prop="sort">
            <el-input v-model="changeData.sort" placeholder="请输入排序号" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="职务状态" prop="status">
            <el-radio-group v-model="changeData.status" @change="storeStateChange">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-col :span="23">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="submitForm('changeData', changeData)">确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPosition,
  createPosition,
  deletePosition,
  updatePosition,
  positionGcreate,
  positionGupdate
} from '@/api/BaseModule/SetManage'

export default {
  /**
   * 模块进度：
   *
   *  FIXME: 合并门店操作未完成
   *
   */
  name: 'StoreSetting',
  data() {
    return {
      tableData: [],

      page: 0,
      page_size: 20,

      changeData: {
        id: '',
        name: '',
        descrip: '',
        dic_position_series: '',
        sort: '',
        status: -1
      },

      currentRow: null,
      multipleSelection: [],
      searchForm: {},

      gradeOption: [],

      // - Dialog类型
      dialogType: '',

      // - Page数据
      total: null,
      listQuery: {
        page: 1,
        page_size: 10,
        name: ''
      },

      // - 验证规则
      rules: {
        name: [
          {
            required: true,
            message: '请输入职务名称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '排序号只能是数字',
            trigger: 'blur'
          }
        ],
        descrip: [
          {
            max: 50,
            message: '最多输入 50 个字符',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择职务状态',
            trigger: 'change'
          }
        ],
        dic_position_series: [
          {
            required: true,
            message: '请选择职系',
            trigger: 'change'
          }
        ]
      },

      // - 参数配置
      dialogVisible: false,
      listLoading: false,
      getData: 1,
      miniSize: 'mini',
      dialogWidth: '500px',
      formLabelWidth: '90px'
    }
  },
  created() {
    this.loadPosition(this.listQuery)
    this.loadSeries()
  },
  methods: {
    // 职务管理列表
    loadPosition(params) {
      this.listLoading = true
      getPosition(params)
        .then(res => {
          const items = res.data
          console.log(res)
          this.tableData = items.positions
          this.total = parseInt(items.count)
          this.listLoading = false
        })
        .catch(err => {})
    },

    // 职系列表
    loadSeries() {
      positionGcreate()
        .then(res => {
          this.gradeOption = res.data.dic_position_series
        })
        .catch(res => {})
    },

    // - 收集选中数据
    selectedRow(val) {
      // this.currentRow = val;
      // console.log(this.currentRow);
    },

    // - 收集多选数据
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection);
    },

    // - 提交搜索
    submitSearch() {
      this.loadPosition(this.listQuery)
    },

    // - 弹框集中调用
    openDialog(type, data) {
      if (type === 'create') {
        this.dialogType = type
        this.dialogVisible = true
      } else if (type === 'edit') {
        positionGupdate(data.id)
          .then(res => {
            this.changeData = JSON.parse(JSON.stringify(res.data.detail))
            this.dialogType = type
            this.dialogVisible = true
          })
          .catch(res => {})
      } else {
        if (this.multipleSelection.length < 1) {
          this.$message.warning('请先选中记录')
          return
        }
        this.deleteSubmit(this.multipleSelection)
      }
    },

    // - 提交/验证 基础信息表单
    submitForm(formName, fromData) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log("验证通过");
          this.handleDone(this.dialogType, fromData)
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },

    // - 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = {}
    },

    // - 处理确定Dialog
    handleDone(type, fromData) {
      if (type == 'create') {
        // - request 创建请求
        const data1 = {
          name: this.changeData.name,
          descrip: this.changeData.descrip,
          dic_position_series: this.changeData.dic_position_series,
          sort: this.changeData.sort,
          status: this.changeData.status
        }
        createPosition(data1)
          .then(res => {
            // - 请求成功
            this.$message.success('新增成功!')
            this.loadPosition()
          })
          .catch(res => {
            this.$message.warning(res.message)
          })
        this.dialogVisible = false
        this.resetForm('changeData')
      } else {
        // - request 更新请求
        const id = this.changeData.id
        const data = {
          name: fromData.name,
          descrip: fromData.descrip,
          dic_position_series: fromData.dic_position_series,
          sort: fromData.sort,
          status: fromData.status
        }
        updatePosition(id, data)
          .then(res => {
            this.$message.success('编辑成功!')
            this.loadPosition()
          })
          .catch(res => {
            this.$message.warning(res.message)
          })
        this.dialogVisible = false
        this.resetForm('changeData')
      }
    },

    // - 处理关闭Dialog
    handleClose() {
      this.dialogVisible = false
      this.resetForm('changeData')
      this.dialogType = ''
    },

    // - 删除操作
    deleteSubmit(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.batch_delete(data)
        })
        .catch(() => {})
    },

    // 批量删除
    batch_delete(data) {
      if (data && data.length > 0) {
        const array = []
        data.forEach(item => {
          array.push(item.id * 1)
        })
        const arr = {
          id_arr: array
        }
        deletePosition(arr)
          .then(res => {
            this.$message.success('删除成功!')
            this.loadPosition()
          })
          .catch(res => {
            this.$message.warning(res.message)
          })
      }
    },

    // - 回显
    gradeBack(optionArr, index) {
      const res = optionArr.filter(el => el.value == index)[0]
      return res.label
    },

    // - 状态
    storeStateChange(val) {
      // console.log(val)
    },

    handleSizeChange(val) {
      this.listQuery.page_size = val
      this.loadPosition(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.loadPosition(this.listQuery)
    }
  }
}
</script>

<style lang='scss' scoped>
.search-form {
  height: 36px;
}
.table-wrap-ly {
  width: 100%;
  height: calc(100vh - 260px);
  flex: 1;
  transition: 0.2s;
  -webkit-transition: 0.2s;
}
.table-body-ly {
  max-height: calc(100% - 20px);
}
</style>
