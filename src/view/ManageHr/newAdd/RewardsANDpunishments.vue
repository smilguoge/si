<template>
  <div class="app-container">
    <el-button type="primary" @click="add">新增</el-button>
    <el-button type="primary">导入</el-button>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="a" label="奖惩类型*"></el-table-column>
        <el-table-column prop="b" label="奖惩名称*"></el-table-column>
        <el-table-column prop="c" label="奖惩日期*"></el-table-column>
        <el-table-column prop="d" label="奖惩原因*"></el-table-column>
      </el-table>
    </div>
    <div class="tanc">
      <Popup v-if="isShow" @close='hid'/>
    </div>
  </div>
</template>

<script>
import Popup from "./popup";
export default {
  name: "RewardsANDpunishments",
  components: {
    Popup
  },
  data() {
    return {
      tableData: [],
      isShow: false
    };
  },
  created() {},
  methods: {
    add() {
      this.isShow = true;
    },
    hid(){
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang="scss">
.table {
  margin-top: 20px;
}
.tanc {
  z-index:2240 ;
  .app-container {
    z-index: 2242;
    .el-dialog__wrapper {
      z-index: 2210;
      .el-dialog__body {
        z-index: 2230;
      }
    }
  }
}
</style>

