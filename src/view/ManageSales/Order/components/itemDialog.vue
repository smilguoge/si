<template>
  <!-- 选择品项 -->
  <el-dialog
    title="选择品项"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="sales-item-dialog"
    width="700px"
  >
    <el-col :span="22" :offset="1">
      <div class="filter-container">
        <el-input
          v-model="listQuery.name"
          style="width: 210px;"
          placeholder="请输入品项名称"
          class="filter-item"
          prefix-icon="el-icon-search"
        />
        <el-select
          v-model="listQuery.class"
          class="filter-item"
          placeholder="请选择类型"
        >
          <el-option label="全部" value="" />
          <el-option label="产品" value="1" />
          <el-option label="套餐" value="2" />
        </el-select>
        <el-button
          type="primary"
          class="filter-item"
          style="margin-left: 10px"
          icon="el-icon-search"
          @click="handleFilter"
        >查 询</el-button>
      </div>
    </el-col>
    <el-col :span="22" :offset="1">
      <div class="item-selection-table">
        <el-table
          :data="itemData"
          style="width:100%"
          height="300px"
        >
          <el-table-column
            type="selection"
            width="50px"
            align="center"
          />
          <el-table-column
            label="类型"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.class }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="编码"
            align="center"
          >
            <template slot-scope="{row}">
              <span class="info-color">{{ row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="品项名称"
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
      dialogVisible: false,
      listQuery: {},
      itemData: [
        { class: '测试类别1', code: 'ABC1234561', name: '测试名称1' },
        { class: '测试类别2', code: 'ABC1234562', name: '测试名称2' },
        { class: '测试类别3', code: 'ABC1234563', name: '测试名称3' }
      ]
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
    handleCancel() {
      // -
      this.$parent.itemVisible = false
    },
    handleFilter() {
      console.log(this.listQuery)
    }
  }
}
</script>
<style lang="scss" scoped>
.sales-item-dialog{
  .item-selection-table {
    margin-bottom: 20px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>
