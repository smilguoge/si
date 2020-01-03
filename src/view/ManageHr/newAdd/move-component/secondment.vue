<template>
  <div class="app-container">
    <div class="box">
      <el-form :model="form">
        <el-form-item label="调出部门">
          <el-input v-model="form.department_id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="调入部门" required>
          <el-input v-model="form.new_department_id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否自动返部门：">
          <!-- <el-input v-model="" autocomplete="off" /> -->
          <el-switch
            v-model="is_auto"
            @change="change"
            active-color="#5677FC"
            inactive-color="#ccc"
          />
        </el-form-item>
        <el-form-item v-if="is_auto" label="返部门时间">
          <!-- <el-date-picker
            v-model="form.return_at"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            @change="formt"
          ></el-date-picker>-->
          <el-date-picker
            v-model="form.return_at"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            @change="formt"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束借调：">
          <el-button :type="type" @click="end">结束</el-button>
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
// import { newAdd } from "@/api/ManageHr/newAdd";
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
        id: this.$store.state.editId,
        type: "4",
        is_auto: 0,
        return_at: "",
        status: "1"
      },
      is_auto: false,
      type: "primary"
    };
  },
  created() {},

  methods: {
    sure() {
      EmployeeApi.add_m_info(this.form).then(res => {
        console.log(res);
        if (res.code == "200") {
          // this.$store.state.isComponent = false;
          this.$emit("isTanc");
        }
      });
    },
    cancle() {
      this.$emit("isTanc");
    },
    change(e) {
      console.log(e);
      this.form.is_auto = e == true ? "1" : "0";
    },
    end() {
      this.type = "";
      this.form.status = "0";
    },
    formt(e) {
      this.form.return_at = parseInt(e / 1000);
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

