<template>
  <!-- 还货 -->
  <el-dialog
    title="还货"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    width="500px"
  >
    <el-form :model="changeData" label-width="80px">
      <el-col :span="22" :offset="1">
        <el-form-item label="欠货产品">
          <el-input v-model="changeData.name" disabled class="w100" />
        </el-form-item>
      </el-col>
      <el-col :span="22" :offset="1">
        <el-form-item label="库存数量">
          <el-input v-model="changeData.name" disabled class="w100" />
        </el-form-item>
      </el-col>
      <el-col :span="22" :offset="1">
        <el-form-item label="还货数量">
          <el-input v-model="changeData.name" class="w100" />
        </el-form-item>
      </el-col>
      <el-col :span="22" :offset="1">
        <el-form-item label="备注">
          <el-input v-model="changeData.mask" type="textarea" class="w100" />
        </el-form-item>
      </el-col>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCancel"
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
      changeData: {},
      dialogVisible: false
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
      this.$emit('cancel')
    }
  }
}
</script>
