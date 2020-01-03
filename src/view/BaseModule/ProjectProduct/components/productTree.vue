<template>
  <div class="project-tree-body">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="openDialog('createParent') "
      >新建根项</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="openDialog('create') "
      >新建子项</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit-outline"
        @click="openDialog('edit') "
      >修 改</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-delete"
        @click="deleteData"
      >删 除</el-button>
      <span style="color:#f10215;font-size:14px;margin-left:24px">
        <!-- 提示信息 -->
        <span>提示：请使用</span>
        <span style="font-weight:700">“ 新建根项 ”</span>
        <span>来创建</span>
        <span style="font-weight:700">最高级</span>
        <span>的产品类别！</span>
      </span>
    </div>
    <div class="m-body">
      <el-tree
        ref="tree"
        v-loading="listLoading"
        class="filter-tree"
        :data="productData"
        :props="propConfig"
        :highlight-current="true"
        :expand-on-click-node="false"
        default-expand-all
        show-checkbox
        node-key="id"
        :indent="30"
        @node-click="handleNodeClick"
      />
    </div>

    <el-dialog
      :title="dialogType=='edit'?'修改产品信息':'新增产品信息'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="600px"
      class="main-dialog"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
    >
      <el-form ref="changeData" :rules="rules" :model="changeData" label-width="110px">
        <el-col :span="23">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="changeData.name" placeholder="请输入产品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="产品描述" prop="describe">
            <el-input v-model=" changeData.describe" placeholder="请输入产品描述" />
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer">
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
import { productClass } from '@/api/BaseModule/ProjectProduct'
const classApi = new productClass()

export default {
  name: 'InlineEditTable',
  props: {},
  data() {
    return {
      // ...
      productData: [],
      currentRow: null,
      changeData: {},
      rules: {
        name: [
          {
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          }
        ],
        describe: [
          {
            required: true,
            message: '请输入产品描述',
            trigger: 'blur'
          }
        ]
      },
      propConfig: {
        children: 'child',
        label: 'name'
      },

      flagTime: 0,
      listLoading: false,
      dialogVisible: false,
      dialogType: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      classApi
        .index()
        .then(res => {
          const items = res.data
          if (items.length !== 0) {
            this.productData = items
            this.$emit('send', items)
          } else {
            this.productData = []
            this.$message.warning('没有更多数据')
          }
          this.listLoading = false
        })
        .catch(res => {
          this.$message.warning('数据请求失败')
          this.listLoading = false
        })
    },
    openDialog(type) {
      if (type === 'createParent') {
        // - 新建根项
        this.changeData.parent_id = 0
        this.dialogType = 'create'
        this.dialogVisible = true
        console.log(this.changeData)
        return
      }
      if (this.currentRow == null) {
        this.$message.warning('请先选中记录')
        return
      }
      if (type === 'create') {
        this.changeData.parent_id = Object.assign({}, this.currentRow).id // copy id
        this.dialogType = type
        this.dialogVisible = true
        console.log(this.changeData)
        return
      } else {
        this.changeData = Object.assign({}, this.currentRow) // copy obj
        this.dialogType = type
        this.dialogVisible = true
        console.log(this.changeData)
        return
      }
    },
    // - 提交验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // - 提交请求
          const curr = new Date()
          if (curr - this.flagTime > 1000) {
            this.dialogType === 'edit' ? this.updateData() : this.createData()
            this.flagTime = curr
          }
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },
    createData() {
      // - request
      console.log('create')
      classApi
        .create(this.changeData)
        .then(res => {
          this.getList()
          this.dialogVisible = false
          this.resetForm('changeData')
        })
        .catch(res => {
          this.$message.warning(res.message)
          return
        })
    },
    updateData() {
      // - request
      console.log('edit')
      classApi
        .update(this.changeData, this.changeData.id)
        .then(res => {
          this.getList()
          this.dialogVisible = false
          this.resetForm('changeData')
        })
        .catch(res => {
          this.$message.warning(res.message)
          return
        })
    },
    deleteData() {
      // - request
      var deleteId = this.$refs.tree.getCheckedKeys()
      if (!deleteId.length) {
        this.$message.warning('请至少勾选一条记录再删除！')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          classApi
            .delete({ id: deleteId })
            .then(res => {
              this.getList()
            })
            .catch(res => {
              this.$message.warning(res.message)
              return
            })
        })
        .catch(res => {})
    },
    handleNodeClick(data) {
      //   console.log(data);
      this.currentRow = Object.assign({}, data) // copy obj
    },
    handleClose() {
      this.dialogVisible = false
      this.resetForm('changeData')
      this.dialogType = ''
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = {}
    },
    debounce(fn, wait) {
      // - 防抖
      var timeout = null
      return function() {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
      }
    }
  }
}
</script>

<style lang="scss" scope>
</style>
