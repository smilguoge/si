<template>
  <div class="e-container">
    <el-table :data="tableList" style="width: 100%" height="300px" max-height="350px">
      <!-- 明细表格 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.senddtl"
            class="option-table"
            height="200px"
            highlight-current-row
            stripe
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="类别" width="120">
              <template slot-scope="{row}">
                <span>{{parseInt(row.gtype) | formatType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="名称" width="120">
              <template slot-scope="{row}">
                <span>{{row.goods_id}}</span>
              </template>
            </el-table-column>
            <el-table-column label="指定优先级" width="120">
              <template slot-scope="{row}">
                <span>{{parseInt(row.every_date) | formatPriority}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单次赠送数量" width="120">
              <template slot-scope="{row}">
                <span>{{row.quantity}}次</span>
              </template>
            </el-table-column>
            <el-table-column label="最高享受次数" width="120">
              <template slot-scope="{row}">
                <span>{{row.max_quantity}}次</span>
              </template>
            </el-table-column>
            <el-table-column label="有效期" width="180">
              <template slot-scope="{row}">
                <template
                  v-if="row.validity == 1"
                >{{row.validity_start_at | formatDate}}~{{row.validity_start_at | formatDate}}</template>
                <template v-if="row.validity == 2">{{row.period}}</template>
                <template v-if="row.validity == 3">现场做</template>
              </template>
            </el-table-column>
            <el-table-column label="顾客等级" width="150">
              <template slot-scope="{row}">
                <span>{{ gradeBack(dic_customer_grade, row.dic_customer_grade) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="顾客星级" width="150">
              <template slot-scope="{row}">
                <span>{{ gradeBack(dic_customer_star, row.dic_customer_star) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="openDialog('childrenEdit',scope.row, scope.$index, props.$index)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  @click="openDialog('childrenDelete',scope.row, scope.$index, props.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column>
        <!-- 父级表头 -->
        <template slot="header">
          <span>赠送明细</span>
          <el-button style="float:right;" size="mini" @click="openDialog('create')">新增</el-button>
        </template>
        <!-- 父级数据 -->
        <template slot-scope="scope">
          ({{scope.row.sale_start_at | formatDate}}~{{scope.row.sale_end_at | formatDate}})
          {{scope.row.is_new_number==1?'老带新'+scope.row.old_new_num+'人,':''}}
          {{scope.row.is_consume_amount==1?'嘉宾消费金额'+scope.row.consume_amount+'元,':''}}
          {{scope.row.is_assign_consume==1?'嘉宾消费护理项目'+scope.row.goods_json+',':''}}
          {{scope.row.is_add_price == 1?'加价'+scope.row.add_price+'元':''}}
          <div style="display:inline-block;float:right">
            <el-button size="mini" @click="openDialog('childrenCreate', {}, scope.$index)">添加明细</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="openDialog('edit', scope.row, scope.$index)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="openDialog('delete', scope.row, scope.$index)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 老带新弹窗 -->
    <consumeCondition
      v-model="dialogVisible"
      :dialogType="dialogType"
      :echoTableData="echoTableData"
      @on-close="close"
      @on-success="getTableList($event)"
    />

    <!-- 明细弹窗 -->
    <presentDetail
      v-model="presentDetailVisible"
      :presentDetailType="presentDetailType"
      :echoDetailData="echoDetailData"
      :cgtype="gtype"
      :assignDateType="assignDateType"
      :dic_customer_grade="dic_customer_grade"
      :dic_customer_star="dic_customer_star"
      :categoryData="categoryData"
      @on-presentDetailClose="presentDetailClose"
      @on-success="getChildrenList($event)"
    />
  </div>
</template>
<script>
import consumeCondition from "./consume-condition/index";
import dateFormat from "@/component/DateFilter/date";
import presentDetail from "./present-detail/index";

export default {
  name: "ConsumePresenter",
  components: {
    consumeCondition,
    presentDetail
  },
  props: {
    gtype: {
      type: Array
    },
    assignDateType: {
      type: Array
    },
    dic_customer_grade: {
      type: Array
    },
    dic_customer_star: {
      type: Array
    },
    echoConsumeData: {
      type: Array
    },
    categoryData: {
      type: Object
    },
    empty: {
      type: Boolean
    }
  },
  filters: {
    // 时间
    formatDate(time) {
      const date = new Date(parseInt(time));
      return dateFormat.formatDate(date, "yyyy-MM-dd");
    },
    // 过滤周期
    formatPeriod(date) {
      switch (date) {
        case "1":
          return "日";
          break;
        case "2":
          return "周";
          break;
        case "3":
          return "月";
          break;
        case "4":
          return "季";
          break;
        case "5":
          return "年";
          break;
        default:
          break;
      }
    },
    // 过滤优先级
    formatPriority(data) {
      switch (data) {
        case 5:
          return "每天";
          break;
        case 4:
          return "每周";
          break;
        case 3:
          return "每月";
          break;
        case 2:
          return "每季";
          break;
        case 1:
          return "每年";
          break;
        default:
          break;
      }
    },
    // 过滤类型
    formatType(data) {
      switch (data) {
        case 1:
          return "产品";
          break;
        case 2:
          return "套餐";
          break;
        case 3:
          return "代金券";
          break;
        case 4:
          return "积分";
          break;
        default:
          break;
      }
    },
    formatClass(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i] == 1) return "普通";
        if (data[i] == 2) return "尊享卡";
      }
    },
    formatStar(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i] == 1) return "普通";
        if (data[i] == 2) return "一星";
      }
    }
  },
  watch: {
    empty(val) {
      if (val) {
        this.tableList = [];
      }
    },
    tableList(val) {
      if (val && val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].senddtl && val[i].senddtl.length > 0) {
          } else {
            val[i].senddtl = [];
          }
        }
      }
    },
    // 处理编辑回显数据
    echoConsumeData(val) {
      if (val && val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          val[i].sale_start_at = val[i].sale_start_at.length <= 10 ? val[i].sale_start_at * 1000 : val[i].sale_start_at;
          val[i].sale_end_at = val[i].sale_end_at.length <= 10 ? val[i].sale_end_at * 1000 : val[i].sale_end_at;
          if (val[i].senddtl && val[i].senddtl.length > 0) {
            for(let j = 0; j < val[i].senddtl.length; j++) {
              val[i].senddtl[j].validity_start_at = val[i].senddtl[j].validity_start_at.length <= 10 ? val[i].senddtl[j].validity_start_at * 1000 : val[i].senddtl[j].validity_start_at;
              val[i].senddtl[j].validity_end_at = val[i].senddtl[j].validity_end_at.length <= 10 ? val[i].senddtl[j].validity_end_at * 1000 : val[i].senddtl[j].validity_end_at;
              val[i].senddtl[j].dic_customer_grade = val[i].senddtl[j].dic_customer_grade.split(',').map(Number);
              val[i].senddtl[j].dic_customer_star = val[i].senddtl[j].dic_customer_star.split(',').map(Number)
            }
          }
        }
        this.tableList = val;
        this.$emit("on-shopList", JSON.parse(JSON.stringify(this.tableList)));
      }
    }
  },
  data() {
    return {
      dialogType: "", // 老带新条件弹窗类型
      dialogVisible: false, // 老带新条件弹窗显示
      presentDetailVisible: false, // 赠送明细显示
      presentDetailType: "", // 赠送明细类型
      echoTableData: {}, // 老带新条件回显数据
      echoDetailData: {}, // 赠送明细回显数据
      tableIndex: "", // 老带新条件列表下标
      detailIndex: "", // 赠送明细列表下标
      multipleSelection: [], // 赠送明细多选
      // 老带新条件数据
      tableList: []
    };
  },
  created() {},
  methods: {
    // - 回显
    gradeBack(optionArr, dicArr) {
      const getData = optionArr.filter(item => dicArr.includes(item.value));
      return getData.map(item => item.label).join(',')
    },

    // 弹框集中处理
    openDialog(type, data, index, pid) {
      switch (type) {
        case "create":
          this.dialogVisible = true;
          this.dialogType = "create";
          this.echoTableData = {};
          break;
        case "edit":
          this.dialogVisible = true;
          this.dialogType = "edit";
          this.tableIndex = index;
          this.echoTableData = JSON.parse(JSON.stringify(data));
          break;
        case "delete":
          this.deleteTable(index);
          break;
        case "childrenCreate":
          this.presentDetailVisible = true;
          this.presentDetailType = "childrenCreate";
          this.echoDetailData = {};
          this.tableIndex = index;
          break;
        case "childrenEdit":
          this.presentDetailVisible = true;
          this.presentDetailType = "childrenEdit";
          this.tableIndex = pid;
          this.detailIndex = index;
          this.echoDetailData = JSON.parse(JSON.stringify(data));
          break;
        case "childrenDelete":
          this.tableIndex = pid;
          this.deleteSubmit(index);
          break;
        default:
          break;
      }
    },

    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          }
        ]);
      }, 1000);
    },

    // 关闭弹窗
    close() {
      this.dialogVisible = false;
    },

    // 赠送明细关闭
    presentDetailClose() {
      this.presentDetailVisible = false;
    },

    // 获取老带新条件数据添加/编辑
    getTableList(data) {
      console.log(data);
      if (this.dialogType == "edit") {
        this.tableList.splice(this.tableIndex, 1, data);
        this.$message.success("编辑成功!");
      } else {
        this.tableList.push(data);
        this.$message.success("新增成功!");
      }
      this.$emit("on-consumeList", JSON.parse(JSON.stringify(this.tableList)));
    },

    // 获取明细数据添加/编辑
    getChildrenList(data) {
      console.log(data);
      if (this.presentDetailType == "childrenEdit") {
        for (let i = 0; i < this.tableList.length; i++) {
          if (i == this.tableIndex) {
            for (let j = 0; j < this.tableList[i].senddtl.length; j++) {
              if (j == this.detailIndex) {
                this.tableList[i].senddtl.splice(this.detailIndex, 1, data);
                this.$message.success("编辑成功!");
              }
            }
          }
        }
      } else {
        for (let k = 0; k < this.tableList.length; k++) {
          if (k == this.tableIndex) {
            this.tableList[k].senddtl.push(data);
            this.$message.success("添加成功!");
          }
        }
      }
      this.$emit("on-consumeList", JSON.parse(JSON.stringify(this.tableList)));
    },

    // 收集选中数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 删除老带新条件
    deleteTable(index) {
      this.$confirm("此操作将删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableList.splice(index, 1);
          this.$message.success("删除成功!");
          this.$emit("on-consumeList", JSON.parse(JSON.stringify(this.tableList)));
        })
        .catch(() => {});
    },

    //  删除明细
    deleteSubmit(index) {
      this.$confirm("此操作将删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < this.tableList.length; i++) {
            if (i == this.tableIndex) {
              for (let j = 0; j < this.tableList[i].senddtl.length; j++) {
                if (j == index) {
                  this.tableList[i].senddtl.splice(index, 1);
                  this.$message.success("删除成功!");
                }
              }
            }
          }
          this.$emit("on-consumeList", JSON.parse(JSON.stringify(this.tableList)));
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.e-container {
  border: 1px solid gainsboro;
  border-radius: 3px;
}
</style>