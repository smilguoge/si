<template>
  <el-dialog
    :title="dialogType == 'create' ? '新增条件' : '修改条件'"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="625px"
  >
    <el-form ref="formInline" :inline="true" :model="formInline" :rules="rules">
      <div class="e-box">
        <el-form-item label="条件组合">
          <el-checkbox v-model="is_num">老带新个数场景</el-checkbox>
          <el-checkbox v-model="is_sum">嘉宾消费金额场景</el-checkbox>
          <el-checkbox v-model="is_pro">嘉宾消费指定项目</el-checkbox>
        </el-form-item>

        <el-form-item label="购买日期" prop="time">
          <el-date-picker
            v-model="formInline.time"
            class="el-picker"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-M-dd"
            value-format="timestamp"
            @change="daterangeChange($event)"
          />
        </el-form-item>

        <el-form-item label="老带新人数" prop="old_new_num" :rules="validateFields('old_new_num')">
          <el-input
            v-model="formInline.old_new_num"
            placeholder="请输入人数"
            maxlength="5"
            show-word-limit
            :disabled="is_num?false:true"
          ></el-input>
        </el-form-item>

        <el-form-item label="嘉宾消费金额" prop="consume_amount" :rules="validateFields('consume_amount')">
          <el-input
            v-model="formInline.consume_amount"
            placeholder="请输入金额"
            maxlength="10"
            show-word-limit
            :disabled="is_sum?false:true"
          ></el-input>
        </el-form-item>

        <el-form-item label="返券计算方式" prop="calculate_type" :rules="validateFields('calculate_type')">
          <el-radio-group v-model="formInline.calculate_type" :disabled="is_sum?false:true">
            <el-radio :label="0">按身份</el-radio>
            <el-radio :label="1">按时间</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="返券比例(%)" prop="rate" :rules="validateFields('rate')">
          <el-input
            v-model="formInline.rate"
            placeholder="请输入数字"
            :disabled="is_sum?false:true"
          ></el-input>
        </el-form-item>

        <el-form-item label="消费指定项目" prop="goods_json" :rules="validateFields('goods_json')">
          <el-input
            v-model="formInline.goods_json"
            placeholder="请输入项目名称"
            suffix-icon="el-icon-search"
            :disabled="is_pro?false:true"
          ></el-input>
        </el-form-item>

        <div>
          <el-form-item label="老客等级">
            <el-checkbox-group v-model="formInline.dic_customer_grade">
              <el-checkbox :label="1">尊享</el-checkbox>
              <el-checkbox :label="2">非尊享</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <el-form-item label="是否加价购" prop="is_add_price">
          <el-radio-group v-model="formInline.is_add_price">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-if="formInline.is_add_price == 1">
          <el-form-item
            label="加价金额(元)"
            prop="add_price"
            :rules="formInline.is_add_price == 1 ? { required: true, message: '请输入加价金额', trigger: 'blur' } : {}"
          >
            <el-input
              v-model="formInline.add_price"
              maxlength="10"
              show-word-limit
              placeholder="请输入加价金额"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item
          v-if="formInline.is_add_price == 1"
          label="享受方式"
          prop="is_old_new"
          :rules="formInline.is_add_price == 1 ? { required: true, message: '请选择享受方式', trigger: 'change' } : {}"
        >
          <el-radio-group v-model="formInline.is_old_new">
            <el-radio :label="1">老客享受</el-radio>
            <el-radio :label="2">新客享受</el-radio>
            <el-radio :label="3">新老客都享受</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="formInline.is_old_new == 3 && formInline.is_add_price == 1"
          label="新客"
          prop="new_num"
          :rules="validateFields('new_num')"
        >
          <el-input v-model="formInline.new_num" placeholder="请输入次数"></el-input>
        </el-form-item>

        <el-form-item
          v-if="formInline.is_old_new == 3 && formInline.is_add_price == 1"
          label="老客"
          prop="old_num"
          :rules="validateFields('old_num')"
        >
          <el-input v-model="formInline.old_num" placeholder="请输入次数"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="submitForm('formInline')">保存</el-button>
      <el-button type="primary" @click="handleClose('formInline')">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dateFormat from "@/component/DateFilter/date";

export default {
  name: "ConsumeCondition",
  components: {},
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
    }
  },
  filters: {
    formatDate(time) {
      const date = new Date(parseInt(time));
      return dateFormat.formatDate(date, "yyyy.MM.dd");
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
      if (val) {
        if (this.echoTableData.sale_start_at) {
          console.log(this.echoTableData);
          this.is_num = this.echoTableData.is_new_number==1?true:false;
          this.is_sum = this.echoTableData.is_consume_amount==1?true:false;
          this.is_pro = this.echoTableData.is_assign_consume==1?true:false;
          this.formInline = this.echoTableData;
          this.formInline.time = [];
          this.formInline.sale_start_at = this.echoTableData.sale_start_at;
          this.formInline.sale_end_at = this.echoTableData.sale_end_at;
          this.formInline.time.push(this.formInline.sale_start_at,this.formInline.sale_end_at);
          this.formInline.old_new_num = this.echoTableData.old_new_num==0?"":this.echoTableData.old_new_num;
          this.formInline.consume_amount = this.echoTableData.consume_amount==0?"":this.echoTableData.consume_amount;
          this.formInline.calculate_type = this.echoTableData.calculate_type=="0"?"":parseInt(this.echoTableData.calculate_type);
          this.formInline.rate = this.echoTableData.rate=="0.00"?"":this.echoTableData.rate;
          this.formInline.goods_json = this.echoTableData.goods_json==JSON.stringify(" ")?"":this.echoTableData.goods_json;
          if (this.echoTableData.dic_customer_grade == "") {
            this.formInline.dic_customer_grade = [];
          } else {
            if (this.echoTableData.dic_customer_grade.length > 0) {
              this.formInline.dic_customer_grade = this.echoTableData.dic_customer_grade;
            } else {
              this.formInline.dic_customer_grade = this.echoTableData.dic_customer_grade.split(',').map(Number);
            }
          }
          this.formInline.is_add_price = parseInt(this.echoTableData.is_add_price);
          this.formInline.add_price = this.echoTableData.add_price==0?"":this.echoTableData.add_price;
          this.formInline.is_old_new = this.echoTableData.is_old_new=="0"?"":parseInt(this.echoTableData.is_old_new);
          this.formInline.new_num = this.echoTableData.new_num==0?"":this.echoTableData.new_num;
          this.formInline.old_num = this.echoTableData.old_num==0?"":this.echoTableData.old_num;
        } else {
          this.is_num = false;
          this.is_sum = false;
          this.is_pro = false;
          this.formInline = JSON.parse(JSON.stringify(this.default));
        }
      }
    },
  },
  data() {
    return {
      dialogVisible: this.value, // 当前组件是否显示
      is_num: false, // 老带新个数场景
      is_sum: false, // 嘉宾消费场景
      is_pro: false, // 嘉宾指定项目场景
      // form数据
      formInline: {
        is_new_number: "", // 是否开启老带新
        is_consume_amount: "", // 是否消费金额
        is_assign_consume: "", // 是否嘉宾消费指定项目
        time: [],
        sale_start_at: "", // 购买开始时间
        sale_end_at: "", // 购买结束时间
        old_new_num: "", // 老带新人数
        consume_amount: "", // 嘉宾消费金额
        calculate_type: "", // 返券计算方式[0按身份1按时间]
        rate: "", // 返券比例%
        goods_json: "", // 指定项目id
        dic_customer_grade: [], // 顾客等级
        is_add_price: "", // 是否加价
        add_price: "", // 加价金额
        is_old_new: "", // 是否老客新客[1老客享受2新客享受3新老客都享受]
        new_num: "", // 新客几次
        old_num: "" // 老客几次
      },
      data: {
        is_num: false, // 老带新个数场景
        is_sum: false, // 嘉宾消费场景
        is_pro: false, // 嘉宾指定项目场景
        checkList: [],
        time: [],
        num: "", // 老带新人数
        c_sum: "", // 消费金额
        c_radio: -1, // 返券
        ratio: "", // 比例
        project: "", // 项目
        checkbox: [], // 老客等级
        m_radio: -1, // 是否加价购
        m_sum: "", // 加价金额
        e_radio: -1, // 享受方式
        n_num: "", // 新客次数
        o_num: "", // 老客次数
        startTime: "", // 开始时间
        endTime: "" // 结束时间
      },
      default: {
        is_new_number: "", // 是否开启老带新
        is_consume_amount: "", // 是否消费金额
        is_assign_consume: "", // 是否嘉宾消费指定项目
        time: [],
        sale_start_at: "", // 购买开始时间
        sale_end_at: "", // 购买结束时间
        old_new_num: "", // 老带新人数
        consume_amount: "", // 嘉宾消费金额
        calculate_type: "", // 返券计算方式[0按身份1按时间]
        rate: "", // 返券比例%
        goods_json: "", // 指定项目id
        dic_customer_grade: [], // 顾客等级
        is_add_price: "", // 是否加价
        add_price: "", // 加价金额
        is_old_new: "", // 是否老客新客[1老客享受2新客享受3新老客都享受]
        new_num: "", // 新客几次
        old_num: "" // 老客几次
      },
      // 验证
      rules: {
        time: [{ required: true, message: "请选择日期", trigger: "change" }],
        is_add_price: [{ required: true, message: "请选择是否加价", trigger: "change" }]
      }
    };
  },
  methods: {
    // 验证
    validateFields(type) {
      switch (type) {
        case "old_new_num":
          const old_new_num = (rule, value, callback) => {
            if (this.is_num) {
              if (!value) {
                return callback(new Error('人数不能为空'));
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
          if (this.is_num) {
            return { validator: old_new_num, trigger: 'blur' }
          }
          break;
        case "consume_amount":
          const consume_amount = (rule, value, callback) => {
            if (this.is_sum) {
              if (!value) {
                return callback(new Error('金额不能为空'));
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
          if (this.is_sum) {
            return { validator: consume_amount, trigger: 'blur' }
          }
          break;
        case "calculate_type":
          const calculate_type = (rule, value, callback) => {
            if (this.is_sum) {
              if (value === "") {
                return callback(new Error('请选择计算方式'));
              } else {
                callback();
              }
            }
          };
          if (this.is_sum) {
            return { validator: calculate_type, trigger: 'blur' }
          }
          break;
        case "rate":
          const rate = (rule, value, callback) => {
            if (this.is_sum) {
              if (!value) {
                return callback(new Error('请输入返券比例'));
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
          if (this.is_sum) {
            return { validator: rate, trigger: 'blur' }
          }
          break;
        case "goods_json":
          const check_goods_json = (rule, value, callback) => {
            if (this.is_pro) {
              if (!value) {
                return callback(new Error('请输入指定项目'));
              } else {
                callback();
              }
            }
          };
          if (this.is_pro) {
            return { validator: check_goods_json, trigger: 'blur' }
          }
          break;
        case "old_num":
          const old_num = (rule, value, callback) => {
            if (this.formInline.is_old_new == 3) {
              if (!value) {
                return callback(new Error('请输入次数'));
              } else {
                callback();
              }
            }
          };
          const oldInteger = (rule, value, callback) => {
            let val = new RegExp("^[1-9][0-9]*$").test(value);
            if (this.formInline.is_old_new == 3) {
              if (!val) {
                return callback(new Error('请输入正整数'));
              } else {
                callback();
              }
            }
          };
          if (this.formInline.is_old_new == 3) {
            return [{ validator: old_num, trigger: 'blur' },
            { validator: oldInteger, trigger: 'blur' }]
          }
          break;
        case "new_num":
          const new_num = (rule, value, callback) => {
            if (this.formInline.is_old_new == 3) {
              if (!value) {
                return callback(new Error('请输入次数'));
              } else {
                callback();
              }
            }
          };
          const newInteger = (rule, value, callback) => {
            let val = new RegExp("^[1-9][0-9]*$").test(value);
            if (this.formInline.is_old_new == 3) {
              if (!val) {
                return callback(new Error('请输入正整数'));
              } else {
                callback();
              }
            }
          };
          if (this.formInline.is_old_new == 3) {
            return [{ validator: new_num, trigger: 'blur' },
            { validator: newInteger, trigger: 'blur' }]
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

    // 数据集中处理
    handleDone(type) {
      switch (type) {
        case "create":
          console.log(this.formInline);
          this.resetData();
          this.$emit("on-success", JSON.parse(JSON.stringify(this.formInline)));
          this.$emit("on-close");
          break;
        case "edit":
          console.log(this.formInline);
          this.resetData();
          this.$emit("on-success", JSON.parse(JSON.stringify(this.formInline)));
          this.$emit("on-close");
          break;
        default:
          break;
      }
    },

    // 重置数据
    resetData() {
      this.formInline.is_new_number = this.is_num?1:0;
      this.formInline.is_consume_amount = this.is_sum?1:0;
      this.formInline.is_assign_consume = this.is_pro?1:0;
      this.formInline.old_new_num = this.formInline.old_new_num==""?0:this.formInline.old_new_num;
      this.formInline.consume_amount = this.formInline.consume_amount==""?0:this.formInline.consume_amount;
      this.formInline.calculate_type = this.formInline.calculate_type==""?0:this.formInline.calculate_type;
      this.formInline.rate = this.formInline.rate==""?0:this.formInline.rate;
      this.formInline.goods_json = !this.formInline.goods_json?"":JSON.stringify(this.formInline.goods_json);
      this.formInline.add_price = this.formInline.add_price==""?0:this.formInline.add_price;
      this.formInline.is_old_new = this.formInline.is_old_new==""?0:this.formInline.is_old_new;
      this.formInline.new_num = this.formInline.new_num==""?0:this.formInline.new_num;
      this.formInline.old_num = this.formInline.old_num==""?0:this.formInline.old_num;
      delete this.formInline.time;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.is_num && !this.is_sum && !this.is_pro) {
          this.$message.warning("请至少选中一项");
          return false;
        } else {
          if (valid) {
            this.clearFields();
            this.handleDone(this.dialogType);
            this.resetForm("formInline");
          } else {
            console.log("error submit!!");
            return false;
          }
        }
      });
    },

    clearFields() {
      if (!this.is_num) {
        this.formInline.old_new_num = "";
      }
      if (!this.is_sum) {
        this.formInline.consume_amount = "";
        this.formInline.calculate_type = "";
        this.formInline.rate = "";
      }
      if (!this.is_pro) {
        this.formInline.goods_json = "";
      }
      if (this.formInline.is_add_price === 0) {
        this.formInline.add_price = "";
        this.formInline.is_old_new = "";
        this.formInline.new_num = "";
        this.formInline.old_num = "";
      }
    },

    // 取消
    handleClose(formName) {
      this.resetForm(formName);
      this.$emit("on-close");
    },

    // 弹窗按钮关闭
    beforeClose() {
      this.$refs["formInline"].resetFields();
      this.$emit("on-close");
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.is_num = false;
      this.is_sum = false;
      this.is_pro = false;
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
  padding: 10px 10px 20px 10px;
}
.e-clear {
  margin-bottom: 0px;
}
</style>