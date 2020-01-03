<template>
  <!-- 品项列表 -->
  <div class="sales-item-table">
    <div class="btnbar">
      <el-input
        v-model="listQuery.name"
        style="width: 210px;margin-right: 10px"
        size="small"
        placeholder="请输入品项名称"
        prefix-icon="el-icon-search"
        @dblclick.native="openDialog('itemselect')"
      />
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
      >添 加</el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
      >删 除</el-button>
      <el-button
        type="primary"
        size="small"
        @click="openDialog('deduction')"
      >抵 扣</el-button>
      <el-button
        type="primary"
        size="small"
        @click="openDialog('integral')"
      >积分兑换</el-button>
    </div>
    <el-table
      :data="itemData"
      height="100%"
      class="item-table"
      :span-method="SpanMethod"
      border
      fit
    >
      <el-table-column
        type="selection"
        width="50px"
        align="center"
      />
      <el-table-column
        align="center"
        label="所属套餐"
        fixed="left"
      >
        <template slot-scope="{row}">
          {{ row.name1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="品项名称"
      >
        <template slot-scope="{row}">
          {{ row.name2 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单价"
      >
        <template slot-scope="{row}">
          {{ row.name3 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="数量"
      >
        <template slot-scope="{row}">
          {{ row.name4 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="小计"
      >
        <template slot-scope="{row}">
          {{ row.name5 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="实收小计"
      >
        <template slot-scope="{row}">
          {{ row.name6 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="欠货数量"
      >
        <template slot-scope="{row}">
          {{ row.name7 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="套餐价格"
      >
        <template slot-scope="{row}">
          {{ row.name8 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="套餐数量"
      >
        <template slot-scope="{row}">
          {{ row.name9 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="套餐总计"
      >
        <template slot-scope="{row}">
          {{ row.name10 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="优惠方式"
      >
        <template slot-scope="{row}">
          {{ row.name11 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="折扣"
      >
        <template slot-scope="{row}">
          {{ row.name12 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="抵扣金额"
      >
        <template slot-scope="{row}">
          {{ row.name13 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="兑换金额"
      >
        <template slot-scope="{row}">
          {{ row.name14 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="积分兑换金额"
        min-width="120px"
      >
        <template slot-scope="{row}">
          {{ row.name15 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="套餐实收总计"
        min-width="120px"
      >
        <template slot-scope="{row}">
          {{ row.name16 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="套餐实付总计"
        min-width="120px"
      >
        <template slot-scope="{row}">
          {{ row.name17 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注"
      >
        <template slot-scope="{row}">
          {{ row.name18 }}
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
      // -
      itemData: [
        {
          name1: '1980',
          name2: '名称',
          name3: '100.00',
          name4: '80',
          name5: '100.00',
          name6: '100.00',
          name7: '0',
          name8: '1000.00',
          name9: '50',
          name10: '1000.00',
          name11: '优惠券',
          name12: '0',
          name13: '50.00',
          name14: '0',
          name15: '0',
          name16: '1000.00',
          name17: '1000.00',
          name18: ''
        },
        {
          name1: '1980',
          name2: '名称',
          name3: '100.00',
          name4: '80',
          name5: '100.00',
          name6: '100.00',
          name7: '0',
          name8: '1000.00',
          name9: '50',
          name10: '1000.00',
          name11: '优惠券',
          name12: '0',
          name13: '50.00',
          name14: '0',
          name15: '0',
          name16: '1000.00',
          name17: '1000.00',
          name18: ''
        }
      ],
      listQuery: {
        name: ''
      }
    }
  },
  created() {
    // -
  },
  methods: {
    handleSelect(ele) {
      console.log(ele)
    },
    SpanMethod({ row, column, rowIndex, columnIndex }) {
      // -
    },
    handleFilter() {
      // -
    },
    // - 打开品项选择/积分兑换
    openDialog(type) {
      this.$emit('open', type)
    }
  }
}
</script>
<style lang="scss" scoped>
.sales-item-table {
  width: 100%;
  height: 100%;
  min-height: 240px;
  .btnbar {
    border: 1px solid #ccc;
    border-radius: 5px 5px 0 0;
    padding: 10px;
  }
  .item-table {
    width: 100%;
    border: 1px solid #ccc;
    border-top: 0;
    border-radius: 0 0 5px 5px;
  }
}
</style>
