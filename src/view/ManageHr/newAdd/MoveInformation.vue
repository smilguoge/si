<template>
  <div class="app-container">
    <div class="add">
      <el-button type="primary" @click="add">新建</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="type" label="异动类型" />
      <el-table-column label="原职务">
        <template slot-scope="scope">
          <span v-if="scope.row.oldPosition">{{ scope.row.oldPosition.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现职务">
        <template slot-scope="scope">
          <span v-if="scope.row.position">{{ scope.row.position.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调出部门">
        <template slot-scope="scope">
          <span v-if="scope.row.oldDepartment">{{ scope.row.oldDepartment.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调入部门">
        <template slot-scope="scope">
          <span v-if="scope.row.department">{{ scope.row.department.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="异动日期" />
      <el-table-column prop="return_at" label="返回部门时间" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="end(scope.row)">结束借调</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog append-to-body :visible.sync="dialogFormVisible" width="630px">
      <div class="tanc">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="调部门" name="1">
            <moveDepartment @isTanc="show" />
          </el-tab-pane>
          <el-tab-pane label="调岗" name="2">
            <movePost @isTanc="show" />
          </el-tab-pane>
          <el-tab-pane label="调部门、调岗" name="3">
            <moveDepartmentPost @isTanc="show" />
          </el-tab-pane>
          <el-tab-pane label="借调" name="4">
            <Secondment @isTanc="show" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moveDepartment from "./move-component/move-department";
import movePost from "./move-component/move-post";
import moveDepartmentPost from "./move-component/move-department-post";
import Secondment from "./move-component/secondment";

import EmployeeApi from "@/api/ManageHr/EmployeeFiles";
// import Pagination from "@/component/Pagination/index";
// import Structure from "@/component/Structure/index";

export default {
  name: "MoveInformation",
  components: { moveDepartment, movePost, moveDepartmentPost, Secondment },
  data() {
    return {
      activeName: "1",
      // 表格
      tableData: [],
      type: "",
      // 弹窗
      dialogFormVisible: false
      // 单选
    };
  },
  created() {
    EmployeeApi.moveList().then(res => {
      // console.log(res)
      this.tableData = res;
    });
  },
  methods: {
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },

    sure() {
      EmployeeApi.add_m_info(this.form).then(res => {
        console.log(res);
      });
    },
    // 关闭弹窗
    show() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    end(data) {
      console.log(data);
      const msg = {
        status: "1"
      };
      EmployeeApi.end(data.id, msg).then(res => {
        EmployeeApi.moveList().then(res => {
          console.log(res,22)
          this.tableData = res;
        });
      });
    },
    handleClick(event) {
      console.log(this.activeName);
    }
  }
};
</script>

<style scoped lang="scss">
.add {
  margin-bottom: 10px;
}
.btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.tanc {
  padding: 30px 0;
  .el-form-item {
    display: flex !important;
    width: 90%;
    margin-left: 30px;
    margin-top: 20px;
  }
}
</style>
<style>
.tanc .el-form-item__content {
  width: 85% !important;
  /* margin-left: 20px; */
}
</style>

