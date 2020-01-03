<template>
  <!-- 公海休眠客验证 -->
  <el-dialog
    v-el-drag-dialog
    title="验证电话号码"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="check-dialog"
    width="430px"
  >
    <el-col :span="22" :offset="1">
      <div class="info-color info-wrap">
        <p>
          <span class="block-font">{{ changeData.name }}</span>
          <span>为公海休眠客，转入本门店前需要进行短信验证</span>
        </p>
        <p>
          <span>已发送验证码到手机：</span>
          <span class="block-font">{{ changeData.phone }}</span>
        </p>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <el-input v-model="changeData.checknum" placeholder="请输入验证码" class="input-with-select w100">
        <el-button slot="append" @click="resend">重新发送</el-button>
      </el-input>
    </el-col>
    <div style="clear:both" />
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button @click="handleCancel">跳 过</el-button>
        <el-button
          type="primary"
          @click="handleCancel"
        >验 证</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
export default {
  name: '',
  directives: { elDragDialog },
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
      changeData: {
        name: '刘刘刘',
        phone: '18010038633'
      },
      dialogVisible: false,
      flagTime: 0
      //
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() { },
  methods: {
    //
    handleCancel() {
      //
      this.$parent.checkPhoneVisible = false
    },
    resend() {
      /**
       * TODO: 验证码位数限制，重新发送样式和倒计时
       */
      console.log('重新发送验证码')
      // const curr = new Date()
      // if (curr - this.flagTime > 60000) {
      //   this.flagTime = curr
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.check-dialog {
  .info-wrap {
    line-height: 1.5;
  }
  .block-font {
    font-weight: 700;
  }
}
</style>
