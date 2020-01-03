<template>
  <el-dialog
    :title="dialogType == 'create' ? '新增购买条件' : '修改购买条件'"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="730px"
  >
    <el-form ref="formInline" :inline="true" :model="formInline" :rules="rules">
      <div class="e-box">
        <el-form-item label="条件组合">
          <el-checkbox v-model="is_startDate">周期</el-checkbox>
        </el-form-item>

        <el-form-item label="购买之日起" prop="period_day" :rules="validateFields('period_day')">
          <el-input
            v-model="formInline.period_day"
            placeholder="请输入正整数"
            :disabled="is_startDate?false:true"
          ></el-input>
        </el-form-item>
        
        <el-form-item prop="period" :rules="validateFields('period')">
          <el-select
            v-model="formInline.period"
            placeholder="请选择周期"
            :disabled="is_startDate?false:true"
          >
            <el-option
              v-for="item in cperiod"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <div>
          <el-form-item class="e-mar-left" style="margin-left:70px;">
            <el-checkbox v-model="is_startSum">购买金额</el-checkbox>
          </el-form-item>

          <el-form-item prop="money" :rules="validateFields('money')">
            <el-input
              v-model="formInline.money"
              maxlength="10"
              show-word-limit
              placeholder="请输入金额"
              clearable
              :disabled="is_startSum?false:true"
            ></el-input>
          </el-form-item>
        </div>

        <div>
          <el-form-item class="e-mar-left" style="margin-left:70px;">
            <el-checkbox v-model="is_startNum">购买次数</el-checkbox>
          </el-form-item>

          <el-form-item prop="times" :rules="validateFields('times')">
            <el-input
              v-model="formInline.times"
              maxlength="5"
              show-word-limit
              placeholder="请输入次数"
              clearable
              :disabled="is_startNum?false:true"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item class="e-block e-mar-left" style="margin-left:70px;">
          <el-checkbox v-model="is_startDetail">不限购买明细</el-checkbox>
        </el-form-item>

        <div>
          <el-form-item label="购买日期" prop="time">
            <el-date-picker
              v-model="formInline.time"
              class="el-picker"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change="daterangeChange($event)"
            />
          </el-form-item>
        </div>

        <div class="e-tabel-title" v-if="!is_startDetail">
          <el-form-item label="购买明细" style="margin-bottom:0px;" prop="and_or" :rules="validateFields('and_or')">
            <el-radio-group v-model="formInline.and_or">
              <el-radio :label="1">且</el-radio>
              <el-radio :label="0">或</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item style="margin:0;float:right;">
            <el-button type="primary" size="mini" class="e-pad-top" @click="openDialog('add')">新增</el-button>
            <el-button type="primary" size="mini" class="e-pad-top" @click="openDialog('del')">删除</el-button>
          </el-form-item>
        </div>

        <el-table
          v-if="!is_startDetail"
          ref="saleData"
          :data="saleData"
          style="width: 100%"
          border
          max-height="260px"
          highlight-current-row
          stripe
          @selection-change="handleSelection"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">{{parseInt(scope.row.gtype) | formatType}}</template>
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="openDialog('redact', scope.row, scope.$index)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="submitForm('formInline')">保存</el-button>
      <el-button type="primary" @click="handleClose('formInline')">取消</el-button>
    </span>

    <childrenDialog
      v-model="childrenDialogVisible"
      :childrenDialogType="childrenDialogType"
      :saleType="saleType"
      :categoryData="categoryData"
      :echoSaleData="echoSaleData"
      @on-success="getSale($event)"
      @on-childrenClose="childrenClose"
    />
  </el-dialog>
</template>

<script>
import childrenDialog from "./children-dialog";
import dateFormat from "@/component/DateFilter/date";

export default {
  name: "ShopCondition",
  components: {
    childrenDialog
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    dialogType: {
      type: String,
      required: true
    },
    echoTableData: {
      type: Object
    },
    saleType: {
      type: Array
    },
    cperiod: {
      type: Array
    },
    categoryData: {
      type: Object
    }
  },
  filters: {
    formatType(type) {
      switch (type) {
        case 1:
          return "产品";
          break;
        case 2:
          return "套餐";
          break;
        case 3:
          return "代金券";
          break;
        default:
          break;
      }
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
      if (val) {
        if (this.echoTableData.sale_start_at) {
          console.log(this.echoTableData);
          this.is_startSum = this.echoTableData.is_money == 1 ? true : false;
          this.is_startNum = this.echoTableData.is_times == 1 ? true : false;
          this.is_startDate = this.echoTableData.is_period == 1 ? true : false;
          this.is_startDetail = this.echoTableData.is_unlimited == 1 ? true : false;
          this.formInline = this.echoTableData;
          this.formInline.period_day = this.echoTableData.period_day==0?"":this.echoTableData.period_day;
          this.formInline.period = this.echoTableData.period==0?"":parseInt(this.echoTableData.period);
          this.formInline.money = this.echoTableData.money==0?"":this.echoTableData.money;
          this.formInline.times = this.echoTableData.times==0?"":this.echoTableData.times;
          this.formInline.and_or = this.echoTableData.and_or==""?0:parseInt(this.echoTableData.and_or);
          this.formInline.time = [];
          this.formInline.sale_start_at = this.echoTableData.sale_start_at;
          this.formInline.sale_end_at = this.echoTableData.sale_end_at;
          this.formInline.time.push(this.formInline.sale_start_at, this.formInline.sale_end_at);
          this.saleData = this.echoTableData.saleSetdtl && this.echoTableData.saleSetdtl.length > 0 ? this.echoTableData.saleSetdtl : [];
        } else {
          this.is_startSum = false;
          this.is_startNum = false;
          this.is_startDate = false;
          this.is_startDetail = false;
          this.saleData = [];
          this.formInline = JSON.parse(JSON.stringify(this.default));
        }
      }
    },
  },
  data() {
    return {
      dialogVisible: this.value, // 当前组件是否显示
      childrenDialogVisible: false, // 子组件是否显示
      childrenDialogType: "", // 子组件类型
      // 复选框
      is_startDate: false,
      is_startSum: false,
      is_startNum: false,
      is_startDetail: false,
      // form数据
      formInline: {
        is_period: "", // 是否开启周期
        period_day: "", // 周期
        period: "", // 周期类型
        is_money: "", // 是否开启金额
        money: "", // 金额
        is_times: "", // 是否开启次数
        times: "", // 次数
        is_unlimited: "", // 不限购买明细[0限购1不限购]
        time: [], // 购买时间
        sale_start_at: "", // 购买开始时间
        sale_end_at: "", // 购买结束时间
        and_or: "", // 且或
        saleSetdtl: [] // 限购明细
      },
      default: {
        is_period: "", // 是否开启周期
        period_day: "", // 周期
        period: "", // 周期类型
        is_money: "", // 是否开启金额
        money: "", // 金额
        is_times: "", // 是否开启次数
        times: "", // 次数
        is_unlimited: "", // 不限购买明细[0限购1不限购]
        time: [], // 购买时间
        sale_start_at: "", // 购买开始时间
        sale_end_at: "", // 购买结束时间
        and_or: "", // 且或
        saleSetdtl: [] // 限购明细
      },
      // 下拉框
      options: [
        {
          value: "1",
          label: "日"
        },
        {
          value: "2",
          label: "周"
        },
        {
          value: "3",
          label: "月"
        },
        {
          value: "4",
          label: "季"
        },
        {
          value: "5",
          label: "年"
        }
      ],
      saleData: [], // 购买明细
      echoSaleData: {}, // 购买明细回显
      saleIndex: "", // 购买明细下标
      multipleSelection: [], // 购买明细多选
      // 验证
      rules: {
        time: [{ required: true,  message: "请选择日期", trigger: "change" }]
      }
    };
  },
  methods: {
    // 自定义验证
    validateFields(type) {
      switch (type) {
        case "period_day":
          const checkPeriod_day = (rule, value, callback) => {
            if (this.is_startDate) {
              if (!value) {
                return callback(new Error('不能为空'));
              }
              setTimeout(() => {
                if (!Number.isInteger(parseInt(value))) {
                  callback(new Error('请输入数字值'));
                } else {
                  callback();
                }
              }, 1000);
            }
          };
          if (this.is_startDate) {
            return { validator: checkPeriod_day, trigger: 'blur' }
          }
          break;
        case "period":
          const checkPeriod = (rule, value, callback) => {
            if (this.is_startDate) {
              if (!value) {
                return callback(new Error('请选择周期'));
              } else {
                callback();
              }
            }
          };
          if (this.is_startDate) {
            return { validator: checkPeriod, trigger: 'blur' }
          }
          break;
        case "money":
          const checkMoney = (rule, value, callback) => {
            if (this.is_startSum) {
              if (!value) {
                return callback(new Error('请输入金额'));
              }
              setTimeout(() => {
                if (!Number.isInteger(parseInt(value))) {
                  callback(new Error('请输入数字值'));
                } else {
                  callback();
                }
              }, 1000);
            }
          };
          if (this.is_startSum) {
            return { validator: checkMoney, trigger: 'blur' }
          }
          break;
        case "times":
         const checkTimes = (rule, value, callback) => {
            if (this.is_startNum) {
              if (!value) {
                return callback(new Error('请输入次数'));
              }
              setTimeout(() => {
                if (!Number.isInteger(parseInt(value))) {
                  callback(new Error('请输入数字值'));
                } else {
                  callback();
                }
              }, 1000);
            }
          };
          if (this.is_startNum) {
            return { validator: checkTimes, trigger: 'blur' }
          }
          break;
        case "and_or":
          const checkAnd_or = (rule, value, callback) => {
            if (!this.is_startDetail) {
              if (value === "") {
                return callback(new Error('请选择明细'));
              } else {
                callback();
              }
            }
          };
          if (!this.is_startDetail) {
            return [{ validator: checkAnd_or, trigger: 'blur' }]
          }
          break;
        default:
          break;
      }
    },

    // 日期
    daterangeChange(daterange) {
      if (daterange[0]) {
        this.formInline.sale_start_at = daterange[0];
        this.formInline.sale_end_at = daterange[1];
      } else {
        this.formInline.sale_start_at = "";
        this.formInline.sale_end_at = "";
      }
    },

    // 子列表关闭
    childrenClose() {
      this.childrenDialogVisible = false;
    },

    handleSelection(val) {
      this.multipleSelection = val;
    },

    // 弹窗集中处理
    openDialog(type, data, index) {
      switch (type) {
        case "add":
          this.childrenDialogVisible = true;
          this.childrenDialogType = type;
          this.echoSaleData = {};
          break;
        case "redact":
          this.childrenDialogVisible = true;
          this.childrenDialogType = type;
          this.echoSaleData = JSON.parse(JSON.stringify(data));
          this.saleIndex = index;
          break;
        case "del":
          if (!this.multipleSelection.length) {
            this.$message.warning("请先选中记录");
            return;
          }
          this.deteleSale(this.multipleSelection);
          break;
        default:
          break;
      }
    },

    // 数据集中处理
    handleDone(type) {
      switch (type) {
        case "create":
          this.resetData();
          console.log(this.formInline);
          this.$emit("on-success", JSON.parse(JSON.stringify(this.formInline)));
          this.$emit("on-close");
          break;
        case "edit":
          this.resetData();
          console.log(this.formInline);
          this.$emit("on-success", JSON.parse(JSON.stringify(this.formInline)));
          this.$emit("on-close");
          break;
        default:
          break;
      }
    },

    // 重置数据
    resetData() {
      this.formInline.is_money = this.is_startSum ? 1 : 0;
      this.formInline.is_times = this.is_startNum ? 1 : 0;
      this.formInline.is_period = this.is_startDate ? 1 : 0;
      this.formInline.is_unlimited = this.is_startDetail ? 1 : 0;
      this.formInline.period = this.formInline.period === "" ? 0 : this.formInline.period;
      this.formInline.period_day = this.formInline.period_day === "" ? 0 : this.formInline.period_day;
      this.formInline.money = this.formInline.money === "" ? 0 : this.formInline.money;
      this.formInline.times = this.formInline.times === "" ? 0 : this.formInline.times;
      this.formInline.and_or = this.formInline.and_or === "" ? 0 : this.formInline.and_or;
      delete this.formInline.time
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.is_startDetail && !this.is_startDate && !this.is_startSum && !this.is_startNum) {
          this.$message.warning('请至少选中一项');
          return false;
        } else {
          if (valid) {
            if (!this.is_startDetail) {
              if (this.formInline.saleSetdtl.length <= 0) {
                this.$message.warning('请在购买明细从表至少添加一条记录');
                return false;
              }
            }
            this.clearFields();
            this.handleDone(this.dialogType);
            this.resetForm('formInline');
          } else {
            console.log("error submit!!");
            return false;
          }
        }
      });
    },

    clearFields() {
      if (!this.is_startDate) {
        this.formInline.period_day = "";
        this.formInline.period = "";
      }
      if (!this.is_startSum) {
        this.formInline.money = "";
      }
      if (!this.is_startNum) {
        this.formInline.times = "";
      }
      if (this.is_startDetail) {
        this.formInline.and_or = "";
        this.saleData = [];
        this.formInline.saleSetdtl = [];
      }
    },

    // 获取购买明细数据添加/编辑
    getSale(data) {
      console.log(data);
      let arr = [];
      if (this.childrenDialogType == "redact") {
        this.saleData.splice(this.saleIndex, 1, data);
        this.$message.success("编辑成功!");
      } else {
        this.saleData.push(data);
        this.$message.success("新增成功!");
      }
      this.saleData.forEach(item => {
        let obj = {};
        obj.gtype = item.gtype;
        obj.goods_id = item.goods_id;
        arr.push(obj);
      });
      this.formInline.saleSetdtl = arr
    },

    // 购买明细删除
    deteleSale(selection) {
      let arr = [];
      if (selection) {
        selection.forEach((i, eIndex) => {
          this.saleData.forEach((j, cIndex) => {
            if (i == j) {
              this.saleData.splice(cIndex, 1);
            }
          });
        });
        this.$message.success("删除成功!");
      }
      if (this.saleData.length > 0) {
        this.saleData.forEach(item => {
          let obj = {};
          obj.gtype = item.gtype;
          obj.goods_id = item.goods_id;
          arr.push(obj);
        });
        this.formInline.saleSetdtl = arr
      } else {
        this.formInline.saleSetdtl = [];
      }
      this.$refs.saleData.clearSelection();
    },

    // 取消
    handleClose(formName) {
      this.resetForm(formName);
      this.$emit("on-close");
    },

    // 弹窗按钮关闭
    beforeClose() {
      // this.$refs["formInline"].resetFields();
      this.resetForm("formInline");
      this.$emit("on-close");
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.is_startSum = false;
      this.is_startNum = false;
      this.is_startDate = false;
      this.is_startDetail = false;
      this.saleData = [];
      this.formInline.saleSetdtl = [];
      this.formInline = JSON.parse(JSON.stringify(this.default));
    }
  }
};
</script>

<style lang="scss" scoped>
.e-box {
  padding: 0 20px 0 20px;
}
.e-block {
  display: block;
}
.e-mar-left {
  margin-left: 70px;
}
.e-tabel-title {
  // background-color: darkgray;
  padding: 10px 10px 10px 10px;
}
.e-clear {
  margin-bottom: 0px;
}
</style>