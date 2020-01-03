<template>
  <!-- 满额开单 -->
  <el-dialog
    title="快捷开单"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="satisf-dialog"
    width="1200px"
  >
    <div class="satisf-total-bar">
      <el-col :span="5" :offset="1">
        <span>开单类型:</span>
        <!-- <span class="num">{{ packageData.name }}</span> -->
        <span class="num">{{ '满额开单' }}</span>
      </el-col>
      <el-col :span="5">
        <span>套餐名称:</span>
        <span class="main-color num">{{ packageData.name1 }}</span>
      </el-col>
      <el-col :span="4">
        <span>达标总金额:</span>
        <span class="num">{{ packageData.name2 }}</span>
      </el-col>
      <el-col :span="4">
        <span>项目总次数:</span>
        <span class="num">{{ packageData.name3 }}</span>
      </el-col>
      <el-col :span="4">
        <span>赠送项目:</span>
        <span class="num">{{ packageData.name4 }}</span>
      </el-col>
    </div>
    <div class="filter-container clearfix">
      <el-col :span="12">
        <span class="filter-item tit-font">品项查询：</span>
        <el-input
          v-model="packageData.name3"
          class="filter-item"
          style="width:190px"
          placeholder="请输入品项名称"
          @dblclick.native="openDialog('a')"
        />
        <el-input
          v-model="packageData.name3"
          class="filter-item"
          style="width:110px"
          placeholder="请输入次数"
        />
        <el-button
          class="filter-item"
          type="primary"
        >添 加</el-button>
      </el-col>
      <el-col :span="11" :offset="1">
        <span class="filter-item tit-font">赠送品项查询：</span>
        <el-input
          v-model="packageData.name3"
          class="filter-item"
          style="width:190px"
          placeholder="请输入品项名称"
          @dblclick.native="openDialog('dis')"
        />
        <el-input
          v-model="packageData.name3"
          class="filter-item"
          style="width:110px"
          placeholder="请输入次数"
        />
        <el-button
          class="filter-item"
          type="primary"
        >添 加</el-button>
      </el-col>

    </div>
    <div class="satisf-table">
      <div class="satisf-table-head">
        <el-col :span="2">
          <span class="tit-font">已选项目</span>
        </el-col>
        <el-col :span="8">
          <span class="tut-font err-color">已选择累计购买金额：</span>
          <span class="err-color">{{ packageData.num }}</span>
        </el-col>
      </div>
      <el-table
        :data="packageData.table1"
        height="240px"
        class="item-table"
        fit
      >
        <el-table-column
          align="center"
          label="组合"
        >
          <template slot-scope="{row}">
            {{ row.name1 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="类别"
        >
          <template slot-scope="{row}">
            {{ row.name2 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="名称"
        >
          <template slot-scope="{row}">
            {{ row.name3 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="单价格"
        >
          <template slot-scope="{row}">
            {{ row.name4 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="购买次数"
        >
          <template slot-scope="{row}">
            {{ row.name5 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="购买金额"
        >
          <template slot-scope="{row}">
            {{ row.name6 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="类型"
        >
          <template slot-scope="{row}">
            {{ row.name7 }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit()"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>

    <order-item-dialog v-model="itemVisible" :type="dialogType" @cancel="handleChildCancel" />
  </el-dialog>
</template>
<script>
import orderItemDialog from './orderItemDialog'
export default {
  name: '',
  components: { orderItemDialog },
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      // -
      packageData: {
        name1: '666.00',
        num: '666.00',
        table1: []
      },
      dialogVisible: false,
      itemVisible: false,
      dialogType: '',
      flagTime: 0
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() {
    // -
  },
  methods: {
    handleSubmit(formName) {
      const curr = new Date()
      if (curr - this.flagTime > 1000) {
        this.handleCancel()
        this.flagTime = curr
      }
    },
    handleCancel() {
      this.$parent.satisfOrderVisible = false
    },
    openDialog(str = '') {
      this.dialogType = str
      this.itemVisible = !this.itemVisible
    },
    handleChildCancel() {
      this.itemVisible = !this.itemVisible
    }
  }
}
</script>
<style lang="scss" scoped>
.satisf-dialog{
  .satisf-total-bar {
    height: 50px;
    margin: -10px 20px 0;
    border-left: 4px solid #6666FE;
    border-radius: 4px;
    background-color: #F5F7FA;
    line-height: 50px;
    font-weight: 700;
    font-size: 14px;
    .num {
      font-weight: 400;
      font-size: 16px;
      margin-left: 6px;
    }
  }

  .filter-container {
    margin: 0 20px 0;
    margin-top: 16px;
    padding: 16px 24px 8px;
    border: 1px solid #DCDFE6;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
  }

  .satisf-table {
    margin: 0 20px;
    border: 1px solid #DCDFE6;
    border-radius: 0 0 4px 4px;
    overflow: hidden;
    .satisf-table-head {
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 10px;
    border-bottom: 1px solid #dcdfe6;
  }
  }
}

</style>
