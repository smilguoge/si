<template>
  <div class="manage-center">
    <!-- <div
      class="sbar-ly"
      :style="{width:drawerVisible==false?'calc(100% - 40px)':'calc(100% - 310px)'}"
    >-->

    <div class="manage-body">
      <transition name="bounce">
        <div v-if="show" class="manage-left">
          <!-- <structure :snyc-get.sync="getList" /> -->
          <Structure :structureData="departTree" />
        </div>
      </transition>
      <div class="manahe-button">
        <el-button
          class="manage-button-1"
          :class="show==true ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
          @click="show = !show"
        />
      </div>
      <!--  -->
      <div class="manage-right">
        <div class="manage-right-top">
          <el-form ref="tableData" v-model="tableData" :inline="true">
            <el-form-item>
              <el-date-picker
                v-model="tableData.date"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                @change="daterangeChange($event)"
              />
            </el-form-item>

            <el-form-item>
              <el-select v-model="tableData.store" placeholder="请选择门店"></el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="openDialog('search')" icon="el-icon-search">查询</el-button>
              <el-button type="primary" @click="openDialog('export')" icon="el-icon-download">导出</el-button>
              <el-button type="primary" @click="openDialog('submit')">考勤确认</el-button>
              <el-button type="primary" @click="openDialog('detail')">考勤修改明细</el-button>
            </el-form-item>

            <el-form-item>
              <el-radio-group v-model="tableData.radio" @change="handleRadioChange">
                <el-radio-button :label="1">周</el-radio-button>
                <el-radio-button :label="2">月</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <div class="manage-right-table">
          <el-table
            :data="tableData1"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
            @cell-click="cellClick"
            @row-contextmenu="cellRight"
          >
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="station" label="岗位名称"></el-table-column>
            <el-table-column prop="amount1" label="上班时间"></el-table-column>
            <el-table-column :label="date.head" :key="key" v-for="(date, key) in tableHeader">
              <template scope="{row}">
                <span
                  v-if="row.state === 1"
                  style="display:block"
                  @contextmenu.prevent="rightKey"
                  @mousemove="updateXY"
                >
                  <i class="icon-gou iconfont" />
                </span>
                <span
                  v-else
                  style="display:block"
                  @contextmenu.prevent="rightKey"
                >{{ changeStatus( row.state ) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="manage-right-table-pag">
          <el-pagination
            v-show="total>0"
            :current-page="listQuery.page"
            :page-sizes="[10,20,30]"
            :page-size="listQuery.page_size"
            :total="total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <!-- <div
          class="openbtn"
          :style="{'left':(drawerVisible?'270px':'0'), 'z-index':(dialogVisible?'2000':'3000')}"
          @click="openDrawer(drawerVisible)"
        >
          <i :class="drawerVisible==true?'el-icon-caret-left icon':'el-icon-caret-right icon'" />
        </div>
        <tree-drawer v-model="drawerVisible" :tree-data="departTree" />-->

        <el-dialog
          title="考勤修改"
          :visible.sync="dialogEditVisible"
          width="300px"
          :before-close="beforeClose"
        >
          <el-form ref="form" v-model="form" :rules="rules">
            <el-form-item label="修改理由" prop="textarea">
              <el-input
                type="textarea"
                placeholder="请输入汉字，字母，数字，符号"
                v-model="form.textarea"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer">
            <el-button @click="close('form')">取 消</el-button>
            <el-button type="primary" @click="affirm('form')">确 定</el-button>
          </span>
        </el-dialog>

        <dialogDetail v-model="dialogVisible" @on-close="dialogVisible = false" />
      </div>
    </div>
  </div>
</template>

<script>
import treeDrawer from "../../ManageCustomer/ManageCustomer/components/treeDrawer";
import Structure from "@/component/Structure/index";
import dialogDetail from "./scheduAffirm-detail";
import { CouponData, vmDelete } from "@/api/BaseModule/SalesSet";
import { customerTransfer } from "@/api/ManageCustomer/CustomerManage";
const transferApi = new customerTransfer();

export default {
  name: "ScheduAffirm",
  components: {
    treeDrawer,
    Structure,
    dialogDetail
  },
  data() {
    return {
      total: null,
      show: false,
      dialogVisible: false,
      drawerVisible: false,
      dialogEditVisible: false,
      departTree: [],
      form: {
        textarea: ""
      },
      tableData: {
        date: "",
        store: "",
        radio: 1
      },
      tableData1: [
        {
          station: "服务技师1",
          name: "张三",
          amount1: "上午",
          amount3: 10,
          state: 1,
          id: 1
        },
        {
          station: "服务技师1",
          name: "张三",
          amount1: "下午",
          amount3: 10,
          state: 1,
          id: 1
        },
        {
          station: "服务技师2",
          name: "李四",
          amount1: "上午",
          amount3: 12,
          state: 2,
          id: 2
        },
        {
          station: "服务技师2",
          name: "李四",
          amount1: "下午",
          amount3: 12,
          state: 2,
          id: 2
        },
        {
          station: "服务技师3",
          name: "王五",
          amount1: "上午",
          amount3: 9,
          state: 3,
          id: 3
        },
        {
          station: "服务技师3",
          name: "王五",
          amount1: "下午",
          amount3: 9,
          state: 3,
          id: 3
        },
        {
          station: "服务技师4",
          name: "赵六",
          amount1: "上午",
          amount3: 17,
          state: 4,
          id: 4
        },
        {
          station: "服务技师4",
          name: "赵六",
          amount1: "下午",
          amount3: 17,
          state: 4,
          id: 4
        }
        // {
        //   station: "服务技师5",
        //   name: "洪七",
        //   amount1: "上午",
        //   amount3: 15
        // },
        // {
        //   station: "服务技师6",
        //   name: "刘八",
        //   amount1: "下午",
        //   amount3: 14
        // },
        // {
        //   id: "12987128",
        //   name: "陈九",
        //   amount1: "539",
        //   amount2: "4.1",
        //   amount3: 15
        // },
        // {
        //   id: "12987129",
        //   name: "叶十",
        //   amount1: "539",
        //   amount3: 16
        // }
      ],
      weekOption: [
        {
          value: 0,
          label: "星期日"
        },
        {
          value: 1,
          label: "星期一"
        },
        {
          value: 2,
          label: "星期二"
        },
        {
          value: 3,
          label: "星期三"
        },
        {
          value: 4,
          label: "星期四"
        },
        {
          value: 5,
          label: "星期五"
        },
        {
          value: 6,
          label: "星期六"
        }
      ],
      tableHeader: [],
      listQuery: {
        page: 1,
        page_size: 10,
        name: "",
        customer_no: "",
        start_at: "",
        end_at: ""
      },
      multipleSelection: [],
      rules: {
        textarea: [{ required: true, message: '请输入修改理由', trigger: 'blur' }]
      },
      x: "",
      y: ""
    };
  },
  created() {
    this.loadTableHeader();
    this.getList(this.listQuery);
  },
  methods: {
    getList(params) {
      transferApi.shopView().then(res => {
        this.departTree = res.data;
      });
    },

    // openDrawer(val) {
    //   this.drawerVisible = !val;
    // },

    // 弹窗集中调用
    openDialog(type) {
      switch (type) {
        case "submit":
          this.dialogEditVisible = true;
          break;
        case "detail":
          this.dialogVisible = true;
          break;
        default:
          break;
      }
    },

    beforeClose() {
      this.dialogEditVisible = false;
      this.$refs['form'].resetFields();
    },

    close(form) {
      this.dialogEditVisible = false;
      this.$refs[form].resetFields();
    },

    affirm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.dialogEditVisible = false;
          this.$refs[form].resetFields();
        } else {
          return false;
        }
      });
    },

    cellClick(row, column, cell, event) {
      // console.log(row);
      // console.log(column);
      // console.log(cell);
      // console.log(event);
    },

    cellRight(row, column, event) {
      console.log(row);
      console.log(column);
      console.log(event);
    },

    //
    rightKey() {
      // console.log(123)
    },

    updateXY(event) {
      // this.x = event.offsetX;
      // this.y = event.offsetY;
    },

    //
    changeStatus(val) {
      if (val === 0) {
        return `<i class="icon-gou iconfont" />`;
      } else if (val === 2) {
        return "迟到";
      }
    },

    // 月/周表头数据
    loadTableHeader() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let dayNum = this.mGetDate();
      this.tableHeader = [];

      if (this.tableData.radio == 1) {
        let week = this.mGetDates(year, month, day);
        week.map(res => {
          let day1 = new Date(year, month, res);
          let val1 = day1.getDay();
          let obj = {};
          obj.id = res;
          obj.head = String(res) + this.weekBack(val1);
          this.tableHeader.push(obj);
        });
        console.log(this.tableHeader);
      } else {
        for (let i = 0; i < dayNum; i++) {
          let day2 = new Date(year, month, i + 1);
          let val2 = day2.getDay();
          let obj = {};
          obj.id = i + 1;
          obj.head = String(i + 1) + this.weekBack(val2);
          this.tableHeader.push(obj);
        }
      }
    },

    // 星期回显
    weekBack(val) {
      let atr = this.weekOption.filter(item => item.value == val);
      return atr.map(res => res.label).join(",");
    },

    // JS获取当前周从星期一到星期天的日期
    mGetDates(year, month, day) {
      var currentDate = new Date(year, month, day);
      var timesStamp = currentDate.getTime();
      var currenDay = currentDate.getDay();
      var dates = [];
      for (var i = 0; i < 7; i++) {
        // dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
        dates.push(
          new Date(
            timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))
          ).getDate()
        );
      }
      return dates;
    },

    // 获取当前月天数
    mGetDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var days = new Date(year, month, 0);
      return days.getDate();
    },

    load() {
      //昨天的时间
      var day1 = new Date();
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
      var s1 =
        day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
      console.log(s1);
      //今天的时间
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 =
        day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
      console.log(s2);
    },

    // 切换周/月
    handleRadioChange(val) {
      console.log(val);
      this.loadTableHeader();
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if ([0, 1].includes(columnIndex)) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    // 日期
    daterangeChange(daterange) {
      if (daterange[0]) {
        this.tableData.created_at_start = Math.floor(daterange[0] / 1000);
        this.tableData.created_at_end = Math.floor(daterange[1] / 1000);
      } else {
        this.tableData.created_at_start = "";
        this.tableData.created_at_end = "";
      }
    },

    // - 分页
    handleSizeChange(val) {
      this.listQuery.page_size = val;
      this.getList(this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList(this.listQuery);
    }
  }
};
</script>

<style lang="scss" scoped>
.manage-center {
  height: 100%;
  box-sizing: border-box;

  .manage-body {
    height: 97%;
    display: flex;

    .manage-left {
      height: 100%;
      width: 292px;
      box-align: border-box;
      border: 1px solid #dcdfe6;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0 10px 10px;
      overflow: hidden;
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

    // .sbar-ly {
    //   position: absolute;
    //   top: 20px;
    //   right: 20px;
    //   bottom: 20px;
    //   transition: 0.2s ease all;
    // }
    // .openbtn {
    //   position: absolute;
    //   top: 50%;
    //   left: 0;
    //   width: 0;
    //   height: 80px;
    //   padding: 20px;
    //   transform: translateY(-50%);
    //   z-index: 3000;
    //   border-left: 18px solid rgb(100, 100, 100);
    //   border-top: 10px solid transparent;
    //   border-bottom: 10px solid transparent;
    //   opacity: 0.4;
    //   transition: 0.2s ease all;
    //   .icon {
    //     position: absolute;
    //     left: -21px;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     color: #fff;
    //     font-size: 24px;
    //   }
    // }

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

      .manage-right-table {
        // height: 62vh;
        position: relative;
        overflow: auto;
        padding-bottom: 30px;
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
