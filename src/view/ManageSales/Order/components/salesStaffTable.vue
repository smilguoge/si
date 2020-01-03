<template>
  <!-- 技师列表 -->
  <div class="m-staff-body">
    <el-table
      :data="staffData"
      style="width:100%"
      class="staff-table"
      height="100%"
    >
      <el-table-column label="职务名称" align="center">
        <template slot-scope="{row}">
          <span class="info-color">{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span class="info-color">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="{row}">
          <span class="info-color">{{ row.price }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      staffData: [
        { position: '技师', name: '张三', price: '300.00' },
        { position: '特岗技师', name: '李四', price: '100.00' }
      ]
    }
  },
  created() {
    // -
  },
  methods: {
    // -
  }
}
</script>
<style lang="css" scoped>
.m-staff-body {
  padding: 0 24px;
  height: 220px;
}
.staff-table{
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
