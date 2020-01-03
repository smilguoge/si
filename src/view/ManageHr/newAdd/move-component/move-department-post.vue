<template>
  <div class="app-container">
    <div class="box">
      <el-form :model="form">
        <el-form-item label="原职务：">
          <el-input v-model="form.position_id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="现职务" required>
          <el-input v-model="form.new_position_id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="调出部门">
          <el-input v-model="form.department_id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="调入部门" required>
          <el-input v-model="form.new_department_id" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sure">确 认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { newAdd } from '@/api/ManageHr/newAdd'
import EmployeeApi from "@/api/ManageHr/EmployeeFiles";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      // 表单
      form: {
        department_id: "",
        new_department_id: "",
        position_id: "",
        new_position_id: "",
        id: this.$store.state.editId,
        type: "3"
      }
    };
  },
  created() {},

  methods: {
    sure() {
      EmployeeApi.add_m_info(this.form).then(res => {
        console.log(res);
        if (res.code == "200") {
          // this.$store.state.isComponent = false;
           this.$emit('isTanc')
        }
      });
    },
     cancle(){
      this.$emit('isTanc')
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  .el-form-item {
    &:nth-child(n + 2) {
      margin-top: 20px;
    }
    .el-input {
      width: 80% !important;
      margin-left: 20px;
    }
  }
  .dialog-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

