<template>
  <!-- 积分兑换 -->
  <el-dialog
    :title="dialogType==='dis'?'赠送项目':'正常项目'"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="order-item-dialog"
    width="600px"
  >
    <el-col :span="22" :offset="1">
      <div class="filter-container">
        <el-radio-group v-model="state">
          <el-radio label="1" class="filter-item">组合一</el-radio>
          <el-radio label="2" class="filter-item">组合二</el-radio>
          <el-radio label="3" class="filter-item">组合三</el-radio>
        </el-radio-group>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <div class="discount-table">
        <el-table v-model="itemList" style="width:100%" height="300px" fit>
          <el-table-column prop="类别" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="规格" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="原价" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="数量" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="操作" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini">添 加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
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
    },
    type: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      // -
      itemList: [],
      dialogType: '',
      state: '1',
      dialogVisible: false,
      flagTime: 0
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    },
    type(val) {
      this.dialogType = val
    }
  },
  created() {
    // -
  },
  methods: {
    handleCancel() {
      // this.$parent.integralVisible = false
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
.order-item-dialog {
  .discount-table {
    margin-bottom:20px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
