<template>
  <div class="app-container ">
    <div class="customer_box">
      <el-dialog :visible.sync="dialogTableVisible" @close="close" width="70%">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="1">
          <basicInfo @hid="close" />
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="2">消费记录</el-tab-pane>
        <el-tab-pane label="代金券" name="3">代金券</el-tab-pane>
        <el-tab-pane label="账户余额" name="4">账户余额</el-tab-pane>
        <el-tab-pane label="订金明细" name="5">订金明细</el-tab-pane>
        <el-tab-pane label="积分明细" name="6">积分明细</el-tab-pane>
        <el-tab-pane label="磁卡信息" name="7">磁卡信息</el-tab-pane>
        <el-tab-pane label="转院记录" name="8">转院记录</el-tab-pane>
        <el-tab-pane label="顾客画像" name="9">顾客画像</el-tab-pane>
        <el-tab-pane label="顾客图片" name="10">顾客图片</el-tab-pane>
        <el-tab-pane label="欠款明细" name="11">欠款明细</el-tab-pane>
      </el-tabs>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import basicInfo from "@/view/ManageCustomer/ManageCustomer/newAdd/basic_information";
export default {
  name: "tab",
  components: {
    basicInfo
  },
  data() {
    return {
      dialogTableVisible: true,
      activeName: "1"
    };
  },
  created() {},
  methods: {
    // 关闭弹窗
    close() {
      this.$emit("hid");
      this.dialogTableVisible = false;
    },
    handleClick() {}
  }
};
</script>

<style>
.customer_box .el-dialog {
  height: calc(100% - 22vh) !important;
  overflow:auto;
}
.customer_box .el-dialog .el-tabs__content{
  height: 560px !important;
  overflow:auto;
}
</style>



