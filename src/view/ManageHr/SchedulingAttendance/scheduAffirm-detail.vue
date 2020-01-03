<template>
  <div class="e-dialog">
    <el-dialog
      title="考勤修改明细"
      :visible.sync="dialogVisible"
      width="1035px"
      :before-close="handleClose"
    >
      <el-form ref="formData" v-model="formData" :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="formData.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="daterangeChange($event)"
          />
        </el-form-item>

        <el-form-item>
          <el-select v-model="formData.store" placeholder="请选择门店" suffix-icon="el-icon-search"></el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="formData.name" placeholder="请输入姓名"></el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="openDialog('search')" icon="el-icon-search">查询</el-button>
          <el-button type="primary" @click="openDialog('export')" icon="el-icon-download">导出</el-button>
        </el-form-item>
      </el-form>

      <div class="e-main">
        <el-table ref="mainTable" :data="formData.list" highlight-current-row fit stripe border>
          <el-table-column width="140" label="编码"></el-table-column>
          <el-table-column width="150" label="考勤日期"></el-table-column>
          <el-table-column width="120" label="段次"></el-table-column>
          <el-table-column width="140" label="所在门店"></el-table-column>
          <el-table-column width="120" label="姓名"></el-table-column>
          <el-table-column width="120" label="职务"></el-table-column>
          <el-table-column width="150" label="修改前考勤结果"></el-table-column>
          <el-table-column width="150" label="修改后考勤结果"></el-table-column>
          <el-table-column width="140" label="修改理由"></el-table-column>
          <el-table-column width="140" label="操作人"></el-table-column>
          <el-table-column width="150" label="操作时间"></el-table-column>
        </el-table>
      </div>

      <div class="e-page">
        <el-pagination
          :current-page="listQuery.page"
          :page-sizes="[5,16]"
          :page-size="listQuery.page_size"
          :total="listQuery.total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close('formData')">取 消</el-button>
        <el-button type="primary" @click="submit('formData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ScheduAffirmDetail",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      formData: {
        date: "",
        store: "",
        name: "",
        list: []
      },
      listQuery: {
        total: 1,
        page: 1,
        page_size: 5
      }
    };
  },
  methods: {
    openDialog(type) {
      switch (type) {
        case "search":
          break;
        default:
          break;
      }
    },

    submit() {
      this.resetForm("formData");
      this.$emit("on-close");
    },

    handleSizeChange(val) {
      this.listQuery.page_size = val;
    },

    handleCurrentChange(val) {
      this.listQuery.page = val;
    },

    handleClose() {
      this.resetForm("formData");
      this.$emit("on-close");
    },

    close(formName) {
      this.resetForm(formName);
      this.$emit("on-close");
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData = {};
    }
  }
};
</script>

<style lang="scss" scope>
.e-dialog {
  .e-main {
    margin-top: 10px;
  }
  .e-page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>