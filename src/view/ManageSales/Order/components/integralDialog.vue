<template>
  <!-- 积分兑换 -->
  <el-dialog
    title="积分兑换"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    width="360px"
  >
    <el-form
      ref="integralData"
      :model="integralData"
      label-width="90px"
      :rules="rules"
    >
      <el-form-item
        label="有效积分"
      >
        <el-input
          v-model="integralData.num1"
          style="width:210px"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="可用积分"
        prop="integral"
      >
        <el-input
          v-model="integralData.integral"
          style="width:210px"
          placeholder="请输入积分"
        />
      </el-form-item>
      <el-form-item
        label="兑换金额"
      >
        <el-input
          v-model="integralData.num3"
          style="width:210px"
          disabled
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit('integralData')"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: '',
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      // -
      integralData: {},
      dialogVisible: false,
      rules: {
        integral: [
          { required: true, message: '此项为必填项', trigger: 'blur' },
          { pattern: /^[\d]+$/, message: '积分只能是数字', trigger: 'blur' }
        ]
      },
      flagTime: 0
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() {
    // -
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const curr = new Date()
          if (curr - this.flagTime > 1000) {
            this.handleCancel()
            this.flagTime = curr
          }
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.integralData = {}
    },
    handleCancel() {
      this.$parent.integralVisible = false
      this.resetForm('integralData')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
