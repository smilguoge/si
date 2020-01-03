<template>
  <div class="app-container">
    <!-- <div class="filter-container clearfix">
        <el-button
          type="primary"
          class="filter-item"
          icon="el-icon-plus"
          @click="openDialog('create')"
        >新增</el-button>
    </div>-->
    <!-- Table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width:100%"
      class="main-table"
      stripe
      border
    >
      <el-table-column prop="name" label="公司名称" align="center" />
      <el-table-column prop="telephone" label="公司电话" align="center" />
      <el-table-column prop="address" label="公司地址" align="center" />
      <el-table-column prop="operator_name" label="操作人" align="center" />
      <el-table-column label="操作时间" align="center">
        <template slot-scope="{row}">{{ row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template slot-scope="{row}">
          <el-button :size="miniSize" type="primary" @click="openDialog('edit',row.id)">编辑</el-button>
          <!-- <el-button :size="miniSize" type="danger" @click="deleteSubmit(row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- Table End -->

    <!-- Dialog -->
    <el-dialog
      :title="dialogType=='create'?'公司新建':'公司信息修改'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form
        ref="changeData"
        label-position="right"
        :rules="rules"
        :model="changeData"
        :label-width="formLabelWidth"
      >
        <el-col :span="23">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="changeData.name" placeholder="请输入公司名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="公司电话" prop="telephone">
            <el-input v-model="changeData.telephone" placeholder="请输入公司电话" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="营业执照名称" prop="license_name">
            <el-input v-model="changeData.license_name" placeholder="请输入营业执照名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="营业执照代码" prop="license_num">
            <el-input v-model="changeData.license_num" placeholder="请输入营业执照代码" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="changeData.address" placeholder="请输入公司地址" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="公司介绍">
            <editor v-model="changeData.introduce" :is-clear="editorIsClear" @change="editorBlur" />
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
    <!-- Dialog End -->
  </div>
</template>

<script>
import {
  getCompany,
  editCompany,
  createCompany,
  updateCompany,
  deleteCompany
} from '@/api/BaseModule/SetManage'

import Editor from '@/component/wangEditor/index'

export default {
  name: 'CompanySetting',
  components: {
    Editor
  },
  data() {
    return {
      tableData: [],
      changeData: {},

      pager: {
        total: 90,
        page: 1,
        rows: 15
      },

      // - Dialog类型
      dialogType: '',

      // - Dialog状态
      dialogVisible: false,

      // - 验证规则
      rules: {
        name: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多可以输入 15 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\u2E80-\u9FFFa-zA-Z]+$/,
            message: '公司名称只能由汉字或字母组成',
            trigger: 'blur'
          }
        ],
        telephone: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '多可以输入 15 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '电话号码只能是数字',
            trigger: 'blur'
          }
        ],
        license_name: [
          {
            required: true,
            message: '请输入营业执照名称',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '最多可以输入 30 个字符',
            trigger: 'blur'
          }
        ],
        license_num: [
          {
            required: true,
            message: '请输入营业执照代码',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '最多可以输入 30 个字符',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入公司地址',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '最多可以输入 30 个字符',
            trigger: 'blur'
          }
        ]
      },

      // - 触发清空文本域
      editorIsClear: false,

      // - 页面参数配置
      listLoading: false,
      flagTime: 0,
      miniSize: 'mini',
      dialogWidth: '600px',
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    // - 弹框集中调用
    openDialog(type, id) {
      if (type === 'create') {
        this.dialogType = type
        this.dialogVisible = true
      } else {
        // - request
        editCompany(id)
          .then(res => {
            this.changeData = res.data
            this.dialogType = type
            this.dialogVisible = true
          })
          .catch(res => {
            this.$message.warning(res.message)
          })
      }
    },

    // - 验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // - request
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

    // - 处理确定Dialog
    handleDone(type) {
      if (type == 'create') {
        createCompany(this.changeData)
          .then(res => {
            this.getTable()
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            this.$message.warning(res.message)
            return
          })
      } else {
        // - request
        updateCompany(this.changeData, this.changeData.id)
          .then(res => {
            this.getTable()
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            this.$message.warning(res.message)
            return
          })
      }
    },

    // - 删除 deleteEvent
    deleteSubmit(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // - request
          deleteCompany(id)
            .then(res => {
              this.getTable()
            })
            .catch(res => {
              this.$message.warning(res.message)
              return
            })
        })
        .catch(() => {})
    },

    // - 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = {}
      this.editorClear()
    },

    // - 关闭弹框
    handleClose() {
      this.dialogVisible = false
      this.resetForm('changeData')
      this.dialogType = ''
    },

    // - editor
    editorClear() {
      this.isClear = true
      setTimeout(() => {
        this.isClear = false
      }, 100)
    },
    editorBlur(val) {
      // console.log(val)
      this.changeData.introduce = val
    },

    getTable() {
      this.listLoading = true
      getCompany()
        .then(res => {
          const items = res.data
          if (items.lenght != 0) {
            this.tableData = items
            this.listLoading = false
          } else {
            this.tableData = []
            this.$message.warning('没有更多数据')
            this.listLoading = false
          }
        })
        .catch(res => {
          console.log(res)
          this.$message.warning('数据请求失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
