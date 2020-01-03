<template>
  <el-dialog
    title="转让登记"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="main-dialog"
    width="520px"
  >
    <el-form
      ref="changeData"
      label-position="right"
      :model="changeData"
      label-width="140px"
      :rules="rules"
    >
      <el-col :span="23">
        <el-form-item
          label="顾客姓名"
          prop="name"
        >
          <el-input
            v-model="changeData.name"
            placeholder="请检索顾客姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="会员编号">
          <el-input
            v-model="changeData.name"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="所属门店">
          <el-input
            v-model="changeData.name"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item
          label="接收顾客姓名"
          prop="otherName"
        >
          <el-input
            v-model="changeData.name"
            placeholder="请检索接收顾客姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="接收顾客会员编号">
          <el-input
            v-model="changeData.name"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="接收顾客所属门店">
          <el-input
            v-model="changeData.sort"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="转让内容" prop="card">
          <div style="white-space: nowrap">
            <el-checkbox v-model="changeData.card">项目卡</el-checkbox>
            <el-input
              v-model="changeData.sort"
              style="width:230px;margin-left:20px"
              placeholder="单击此处以选择项目"
              :disabled="changeData.card?false:true"
              readonly
              @click.native="selectProject"
            />
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item prop="all">
          <el-checkbox v-model="changeData.all">全部</el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="相关附件" prop="file">
          <el-input
            v-show="false"
            v-model="changeData.file"
          />
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            disabled
          >
            <el-button size="small" type="primary" disabled>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('changeData')"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'InlineEditTable',
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      changeData: {},
      rules: {
        name: [{
          required: true,
          message: '顾客姓名是必填项',
          tigger: 'change'
        }],
        otherName: [{
          required: true,
          message: '接收顾客姓名是必填项',
          tigger: 'change'
        }],
        file: [{
          required: true,
          message: '请上传转让相关附件',
          tigger: 'blur'
        }],
        card: [{
          required: true,
          message: '请选择转让内容',
          tigger: 'change'
        }],
        all: [{
          required: true,
          message: '请选择转让内容',
          tigger: 'change'
        }]
      }
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() { },
  methods: {
    handleCancel() {
      this.$emit('cancel')
      this.resetForm('changeData')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = {}
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // FIXME: 待删除
          this.$message.warning('功能尚在开发中')
          this.handleCancel()
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },
    selectProject() {
      // ...
    },
    // upload event
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多可以选择 3 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scope>
</style>
