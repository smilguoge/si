<template>
  <div class="app-container">
    <div class="employeeBox">
      <el-dialog :visible.sync="dialogTableVisible" width="92%" @close="gb">
        <el-tabs v-model="activeName">
          <el-tab-pane label="新建员工档案" name="1">
            <div class="newEmployee">
              <EmployeeFiles @close="gb" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同信息" name="2">
            <div class="newEmployee">
              <contractInformation />
            </div>
          </el-tab-pane>
          <el-tab-pane label="奖惩信息" name="3">
            <div class="newEmployee">
              <RewardsANDpunishments />
            </div>
          </el-tab-pane>
          <el-tab-pane label="异动信息" name="4">
            <div class="newEmployee">
              <MoveInformation />
            </div>
          </el-tab-pane>
          <el-tab-pane label="培训信息" name="5">
            <div class="newEmployee">
              <RewardsANDpunishments />
            </div>
          </el-tab-pane>
          <el-tab-pane label="账户余额" name="6">
            <div class="newEmployee">
              <accountBalance />
            </div>
          </el-tab-pane>
          <el-tab-pane label="消费记录" name="7">
            <div class="newEmployee">
              <RecordsConsumption />
            </div>
          </el-tab-pane>
          <el-tab-pane label="代金券" name="8">
            <div class="newEmployee">
              <vouchers />
            </div>
          </el-tab-pane>
          <el-tab-pane label="订金明细" name="9">
            <div class="newEmployee">
              <depositDetails />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "@/component/Pagination/index";
import Structure from "@/component/Structure/index";
import EmployeeApi from "@/api/ManageHr/EmployeeFiles";
import EmployeeFiles from "@/view/ManageHr/newAdd/EmployeeFiles";
import RewardsANDpunishments from "@/view/ManageHr/newAdd/RewardsANDpunishments";
import contractInformation from "@/view/ManageHr/newAdd/contractInformation";
import MoveInformation from "@/view/ManageHr/newAdd/MoveInformation";
import RecordsConsumption from "@/view/ManageHr/newAdd/RecordsConsumption";
import accountBalance from "@/view/ManageHr/newAdd/accountBalance";
import vouchers from "@/view/ManageHr/newAdd/vouchers";
import depositDetails from "@/view/ManageHr/newAdd/depositDetails";
export default {
  name: "EmployeeData",
  components: {
    Pagination,
    Structure,
    EmployeeFiles,
    contractInformation,
    RewardsANDpunishments,
    MoveInformation,
    accountBalance,
    RecordsConsumption,
    vouchers,
    depositDetails
  },
  data() {
    return {
      dialogTableVisible: this.$store.state.isTanc,
      activeName: "1"
    };
  },
  created() {},
  methods: {
    // 关闭弹窗
    gb() {
      this.$emit("hid");
      console.log(11111111)
    }
  }
};
</script>

<style scoped lang="scss">
.employeeBox {
  .newEmployee {
    height: 500px;
    overflow: auto;
  }
}
</style>
<style>
.employeeBox .el-dialog {
  height: calc(100% - 25vh) !important;
  overflow: auto;
}
</style>

