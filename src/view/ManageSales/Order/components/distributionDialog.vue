<template>
  <!-- 业绩分配-主界面 -->
  <el-dialog
    title="业绩分摊"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="distribution-dialog"
    width="700px"
  >

    <el-col :span="22" :offset="1">
      <div class="filter-container">
        <el-button
          type="primary"
          size="small"
          class="filter-item"
          @click="handleCreate"
        >添 加</el-button>
        <el-button
          type="primary"
          size="small"
          class="filter-item"
          style="margin-left: 10px"
          @click="handleDelete"
        >删 除</el-button>
        <el-tag style="margin-left: 10px" class="filter-item">{{ '有效业绩：'+achievement }}</el-tag>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <div class="distribution-table">
        <el-table
          :data="achiData"
          style="width:100%"
          height="260px"
        >
          <el-table-column
            type="selection"
            width="50px"
            align="center"
          />
          <el-table-column
            label="职务"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.class }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="业绩"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.name }}</span>
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

    <el-dialog
      :visible.sync="dialogChildVisible"
      :before-close="handleChildCancel"
      title="业绩信息"
      style="margin-top:40px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="300px"
    >
      <el-form
        :model="formData"
        label-position="left"
        label-width="70px"
      >
        <el-form-item
          label="职务"
        >
          <el-input
            v-model="formData.position"
            placeholder="请输入职务"
          />
        </el-form-item>
        <el-form-item
          label="姓名"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item
          label="业绩分摊"
        >
          <el-input
            v-model="formData.achievement"
            placeholder="请输入业绩"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-col :span="23">
          <el-button @click="handleChildCancel">取 消</el-button>
          <el-button
            type="primary"
            @click="handleChildCancel"
          >确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
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
      achiData: [], // 主弹框
      formData: {}, // 第二层Dialog
      achievement: '10000.00', // 有效业绩
      dialogVisible: false,
      dialogChildVisible: false
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
    // -
    handleCreate() {
      // -
      this.dialogChildVisible = true
    },
    handleDelete() {
      // -
    },
    handleCancel() {
      // this.$emit('cancel')
      this.$parent.distributionVisible = false
    },
    handleChildCancel() {
      this.dialogChildVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.distribution-dialog {
  .filter-container {
    margin-top: -10px;
  }
  .distribution-table {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
  }
}
</style>
