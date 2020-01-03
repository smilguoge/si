<template>
  <div class="container">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column align='center' prop="dj" label="单据号" sortable width="180"></el-table-column>
      <el-table-column align='center' prop="md" label="入库门店" ></el-table-column>
      <el-table-column align='center' prop="dw" label="对方单位" ></el-table-column>
      <el-table-column align='center' prop="lx" label="入库类型" ></el-table-column>
      <el-table-column align='center' prop="czr" label="操作人" ></el-table-column>
      <el-table-column align='center' prop="sj" label="操作时间" sortable ></el-table-column>
      <el-table-column align='center' prop="zt" label="状态" ></el-table-column>
      <el-table-column align='center' prop="bz" label="备注" :formatter="formatter"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "unfinished",
  filters: {},
  data() {
    return {
      tableData: [
        {
          dj: "RK190829000006",
          md: "万达店",
          dw: "湖里店",
          lx:'调拨入库',
          czr:'王春燕3',
          sj:'2019-09-30  15:25',
          zt:'已完成',
          bz:'11222'
        },
        {
          dj: "RK190829000003",
          md: "万达店",
          dw: "湖里店",
          lx:'调拨入库',
          czr:'王春燕1',
          sj:'2019-09-30  15:23',
          zt:'已完成',
          bz:'11222'
        },
        {
          dj: "RK190829000004",
          md: "万达店",
          dw: "湖里店",
          lx:'调拨入库',
          czr:'王春燕2',
          sj:'2019-09-30  15:22',
          zt:'已完成',
          bz:''
        }
      ]
    };
  },
  created() {
    // this.getList()
  },
  methods: {
    formatter(row, column) {
     
      return 222222
    }
  }
};
</script>

<style  lang='scss' scoped>
</style>
<style>
.container .el-table--border td:first-child .cell{
  color: #5ccbff !important;
}
</style>