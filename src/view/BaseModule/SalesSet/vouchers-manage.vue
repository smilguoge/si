<template>
  <div class="manage-center">
    <div class="manage-body">
      <transition name="bounce">
        <div v-if="show" class="manage-left">
          <structure :snyc-get.sync="getList" />
        </div>
      </transition>
      <div class="manahe-button">
        <el-button
          class="manage-button-1"
          :class="show==true ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
          @click="show = !show"
        />
      </div>
      <!-- lefe -->
      <div class="manage-right">
        <div class="manage-right-top">
          <el-container>
            <div class="m-right-1">
              <el-form ref="filterForm" :model="getList" :inline="true">
                <el-form-item label="券名称">
                  <el-input
                    v-model="listQuery.title"
                    placeholder="请输入"
                    style="width: 100px;"
                    size="mini"
                  />
                </el-form-item>
                <el-form-item label="券来源" prop="status">
                  <el-select v-model="getList.source" clearable style="width: 100px" size="mini">
                    <el-option
                      v-for="item in stautsOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="券种类" prop="status">
                  <el-select
                    v-model="getList.dic_coupon_class"
                    clearable
                    style="width: 100px"
                    class="filter-item"
                    size="mini"
                  >
                    <el-option
                      v-for="item in CouponType"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-select
                    v-model="getList.is_overdue"
                    clearable
                    style="width: 100px"
                    class="filter-item"
                    size="mini"
                  >
                    <el-option
                      v-for="item in CouponState"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="创建日期" prop="date">
                  <el-date-picker
                    v-model="listQuery.date"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:250px;"
                    size="mini"
                    format="yyyy - MM - dd "
                    value-format="timestamp"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button class="filter-item" type="primary" size="mini" @click="vmGet()">查询</el-button>
                  <el-button class="filter-item" size="mini">批量修改</el-button>
                  <el-button class="filter-item" size="mini">高级查询</el-button>
                  <el-button type="button" icon="el-icon-plus" size="mini" @click="VouManAdd()">新建</el-button>
                  <el-button type="primary" icon="el-icon-download" size="mini">导入</el-button>
                  <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-container>
        </div>
        <div class="manage-right-table">
          <div class="manage-right-table-center">
            <el-table
              ref="multipleTable"
              border
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="券编码" width="120" prop="code" />
              <el-table-column prop="name" label="券名称" width="120" />
              <el-table-column label="券来源" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.source==0">礼券</span>
                  <span v-if="scope.row.source==1">活动赠送</span>
                </template>
              </el-table-column>
              <el-table-column prop="dic_coupon_class" label="券种类" width="120" />
              <el-table-column label="抵扣方式" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.deduction_method==0">少补多不退</span>
                  <span v-if="scope.row.deduction_method==1">累计使用</span>
                </template>
              </el-table-column>
              <el-table-column prop="activity_file_num" label="活动文件号" />
              <el-table-column prop="total_num" label="总张数" />
              <el-table-column prop="strat_send_at" label="赠送开始日期" />
              <el-table-column prop="end_send_at" label="赠送结束日期" />
              <el-table-column label="失效方式">
                <template slot-scope="scope">
                  <span v-if="scope.row.failure_mode==0">周期</span>
                  <span v-if="scope.row.failure_mode==1">时间段</span>
                </template>
              </el-table-column>
              <el-table-column prop="effective_day" label="有效天数" />
              <el-table-column prop="strat_use_at" label="使用开始时间" />
              <el-table-column prop="end_use_at" label="使用截止时间" />
              <el-table-column prop="amount" label="面额" />
              <el-table-column prop="operator" label="操作人" />
              <el-table-column prop="created_at" label="操作时间" />

              <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index,scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="manage-right-table-pag">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :page-size="pagesize"
            background
            @current-change="current_change"
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="Introduce">
      <!-- 新增 修改-->
      <vmadd ref="alter" :snyc-test.sync="dialogVisible" />
    </div>
  </div>
</template>
<script>
import Structure from "@/view/BaseModule/SalesSet/component/vm-structure.vue";
import Pagination from "@/component/Pagination/index";
import { CouponData, vmDelete } from "@/api/BaseModule/SalesSet";
import Vmadd from "@/view/BaseModule/SalesSet/component/vouchers-manage-add.vue";

export default {
  name: "VouchersManage",
  components: {
    Structure,
    Pagination,
    Vmadd
  },
  data() {
    return {
      show: true,
      dialogVisible: false,
      getList: {
        is_overdue: 0,
        shop_id_arr: [],
        name: "",
        source: "",
        dic_coupon_class: "",
        is_overdue: "",
        created_at_start: "",
        created_at_end: "",
        page: 1,
        page_size: 10
      },
      listQuery: {
        date: ""
      },
      stautsOptions: [
        { name: "礼券", value: 0 },
        { name: "活动赠券", value: 1 }
      ],
      CouponType: [
        { name: "全部", value: 0 },
        { name: "项目券", value: 1 },
        { name: "通用券", value: 2 },
        { name: "现金卷", value: 3 },
        { name: "嘉宾卷", value: 4 },
        { name: "蝶变券", value: 5 }
      ],
      CouponState: [{ name: "未过期", value: 0 }, { name: "已过期", value: 1 }],
      tableData: [],
      multipleSelection: [],
      total: 1,
      pagesize: 10, // 每页的数据条数
      currentPage: 1 // 默认开始页面
    };
  },
  created() {
    this.vmGet();
  },
  methods: {
    vmGet() {
      if (this.listQuery.date.length > 0) {
        const dataS = JSON.parse(JSON.stringify(this.listQuery.date));
        this.getList.created_at_start = Math.round(dataS[0] / 1000);
        this.getList.created_at_end = Math.round(dataS[0] / 1000);
      }
      if (this.getList.shop_id_arr.length == 0) {
        this.tableData = [];
        return false;
      } else {
        CouponData(this.getList).then(res => {
          this.tableData = res.data.list;
          // console.log(res.data.list);
          this.total = Number(res.data.count);
          this.currentPage = 1;
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    VouManAdd() {
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(_ => {
          const data = { id: row.id };
          // console.log(55)
          vmDelete(data).then(res => {
            const code = res.code;
            console.log(code);
            if (code == 200) {
              this.tableData.forEach((item, i) => {
                if (item.id === row.id) {
                  this.tableData.splice(i, 1);
                  this.$message({
                    message: "成功",
                    type: "success"
                  });
                }
              });
            }
          });
        })
        .catch(_ => {});
    },
    handleEdit(index, row) {
      const indexs = index;
      const rows = row;
      this.$refs.alter.datainits(indexs, rows);
      this.VouManAdd();
    },
    // 分页
    current_change(currentPage) {
      this.getList.page = currentPage;
      this.vmGet();
      // console.log(currentPage);
    }
  }
};
</script>
<style scoped lang="scss">
.manage-center {
  height: 100%;
  box-sizing: border-box;
  .manage-body {
    height: 97%;
    display: flex;
    .manage-left {
      height: 100%;
      width: 292px;
      // padding: 10px;
      box-align: border-box;
      border: 1px solid #dcdfe6;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0 10px 10px;
      overflow: hidden;
      .structure-wrap {
        height: 100%;
      }
    }
    .manahe-button {
      height: 100%;
      position: relative;
      width: 15px;
      .manage-button-1 {
        width: 15px;
        font-size: 12px;
        position: absolute;
        top: 50%;
        border-left: 0;
        border-radius: 0 5px 5px 0;
        margin: 0;
        padding: 0;
        height: 40px;
        background: #f8f7fa;
      }
    }
    .manage-right {
      height: 100%;
      width: 100%;
      margin: 10px;
      padding: 10px;
      padding-left: 0;
      box-sizing: border-box;
      border: 1px solid #dcdfe6;
      padding: 10px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      .m-right-1 {
        border-bottom: 1px solid #dfe6ec;
      }
      .manage-right-table {
        height: 62vh;
        position: relative;
        overflow: auto;
        padding-bottom: 30px;
        .manage-right-table-center {
          height: calc(100%-30px);
        }
      }
      .manage-right-table-pag {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        background: #fff;
        height: 35px;
        z-index: 100;
      }
    }
  }
}
// 动画
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    width: 0px;
  }

  100% {
    width: 290px;
  }
}
</style>
<style>
#app .main-container,
.app-main {
  height: 100%;
}
#app .manage-center .structure-body {
  width: 100% !important;
}
</style>
