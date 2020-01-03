<template>
  <el-dialog
    title="补录卡登记"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="main-dialog store-dialog-ly"
    width="700px"
  >
    <el-form
      ref="changeData"
      label-position="right"
      :model="changeData"
      label-width="94px"
      :rules="rules"
    >
      <el-col :span="23">
        <el-form-item label="会员编号">
          <el-input
            v-model="changeData.pcode"
            disabled
          />
        </el-form-item>
      </el-col>
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
        <el-form-item label="所属门店">
          <el-input
            v-model="changeData.shopname"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item
          label="项目名称"
          prop="proname"
        >
          <el-input
            v-model="changeData.proname"
            placeholder="请检索项目名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item
          label="项目卡号"
          prop="pronum"
        >
          <el-input
            v-model="changeData.pronum"
            placeholder="请输入项目卡号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="购买日期"
          prop="buydate"
        >
          <el-date-picker
            v-model="changeData.buydate"
            style="width:236px"
            type="date"
            placeholder="请选择购买日期"
            value-format="timestamp"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item
          label="有效期"
          prop="ydate"
        >
          <el-date-picker
            v-model="changeData.ydate"
            style="width:208px"
            type="date"
            placeholder="请选择有效期"
            value-format="timestamp"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="购买次数"
          prop="cinum"
        >
          <el-input
            v-model="changeData.cinum"
            placeholder="请输入购买次数"
          />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item
          label="剩余次数"
          prop="snum"
        >
          <el-input
            v-model="changeData.snum"
            placeholder="请输入剩余次数"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="单财"
          prop="dcnum"
        >
          <el-input
            v-model="changeData.dcnum"
            placeholder="请输入单财"
          />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item
          label="剩余金额"
          prop="smoney"
        >
          <el-input
            v-model="changeData.smoney"
            placeholder="请输入剩余金额"
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item
          label="备注"
          prop="mark"
        >
          <el-input
            v-model="changeData.mark"
            type="textarea"
            placeholder="请输入备注"
          />
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
        name: [
          {
            required: true,
            message: '顾客姓名是必填项',
            trigger: 'blur'
          }
        ],
        proname: [
          {
            required: true,
            message: '项目名称是必填项',
            trigger: 'blur'
          }
        ],
        pronum: [
          {
            pattern: /^[\da-zA-Z]{0,15}$/,
            message: '项目卡号由数字、字母组成，最多输入15个字符',
            trigger: 'blur'
          }
        ],
        cinum: [
          {
            required: true,
            message: '购买次数是必填项',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]{0,10}$/,
            message: '购买次数必须是数字，最多输入10个字符',
            trigger: 'blur'
          }
        ],
        snum: [
          {
            required: true,
            message: '剩余次数是必填项',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]{0,10}$/,
            message: '剩余次数必须是数字，最多输入10个字符',
            trigger: 'blur'
          }
        ],
        dcnum: [
          {
            required: true,
            message: '单财是必填项',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]{0,10}$/,
            message: '单财必须是数字，最多输入10个字符',
            trigger: 'blur'
          }
        ],
        smoney: [
          {
            required: true,
            message: '剩余金额是必填项',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]{0,10}$/,
            message: '剩余金额必须是数字，最多输入10个字符',
            trigger: 'blur'
          }
        ],
        buydate: [
          {
            required: true,
            message: '请选择开店日期',
            trigger: 'change'
          }
        ],
        ydate: [
          {
            required: true,
            message: '请选择有效期',
            trigger: 'change'
          }
        ],
        mark: [
          {
            max: 200,
            message: '备注最多可以输入200个字符',
            trigger: 'blur'
          }
        ]
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
    }
  }
}
</script>

<style lang="css">
.store-dialog-ly .el-form-item__error {
  width: 260px;
}
</style>
