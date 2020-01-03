<template>
  <el-dialog
    :title="dialogType == 'create' ? '新增护理条件' : '修改护理条件'"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="625px"
  >
    <el-form ref="formInline" :inline="true" :model="formInline" :rules="rules">
      <div class="e-box">
        <el-form-item label="条件组合">
          <el-checkbox v-model="is_cnum">护理次数</el-checkbox>
          <el-checkbox v-model="is_num">护理个数(项目)</el-checkbox>
          <el-checkbox v-model="is_wea">护理财耗</el-checkbox>
        </el-form-item>

        <el-form-item label="护理周期" prop="period">
          <el-radio-group v-model="formInline.period">
            <el-radio :label="1">时间段</el-radio>
            <el-radio :label="2">连续达到</el-radio>
            <el-radio :label="3">每月</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="时间段"
          prop="time"
          :rules="formInline.period==1?{ required: true, message: '请选择日期', trigger: 'change' }:''"
        >
          <el-date-picker
            width="300px"
            v-model="formInline.time"
            class="el-picker"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-M-dd"
            value-format="timestamp"
            @change="daterangeChange($event)"
            :disabled="formInline.period==1?false:true"
          />
        </el-form-item>

        <el-form-item
          label="连续"
          prop="continuous"
          :rules="formInline.period==2?{ required: true, message: '请输入天数', trigger: 'blur' }:{}"
        >
          <el-input
            v-model="formInline.continuous"
            placeholder="请输入天数"
            :disabled="formInline.period==2?false:true"
          ></el-input>
        </el-form-item>

        <el-col>
          <el-form-item
            label="每月"
            prop="monthly"
            :rules="formInline.period==3?{ required: true, message: '请输入次数', trigger: 'blur' }:{}"
          >
            <el-input
              v-model="formInline.monthly"
              placeholder="请输入日期"
              :disabled="formInline.period==3?false:true"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-form-item label="护理次数" prop="nursing_frequency" :rules="validateFields('nursing_frequency')">
          <el-col :span="23" style="display:flex">
            <el-input
              v-model="formInline.nursing_frequency"
              placeholder="请输入次数"
              maxlength="5"
              show-word-limit
              :disabled="is_cnum?false:true"
            ></el-input>
            <el-checkbox v-model="num_up" style="margin-left:20px;" :disabled="is_cnum?false:true">及以上</el-checkbox>
          </el-col>
        </el-form-item>

        <el-form-item label="护理个数" prop="nursing_num" :rules="validateFields('nursing_num')">
          <el-col :span="23" style="display:flex">
            <el-input
              v-model="formInline.nursing_num"
              placeholder="请输入个数"
              maxlength="5"
              show-word-limit
              :disabled="is_num?false:true"
            ></el-input>
            <el-checkbox v-model="count_up" style="margin-left:20px;" :disabled="is_num?false:true">及以上</el-checkbox>
          </el-col>
        </el-form-item>

        <el-form-item label="护理名称">
          <el-col :span="23" style="display:flex">
            <!-- project_id -->
            <!-- <el-input v-model="nursingName" suffix-icon="el-icon-search" placeholder="请输入护理名称"></el-input> -->
            <el-autocomplete
            class="inline-input"
            v-model="nursingName"
            :fetch-suggestions="querySearch"
            placeholder="请输入护理名称"
            suffix-icon="el-icon-search"
            @select="handleSelect"
          ></el-autocomplete>
            <el-checkbox v-model="limitPro" style="margin-left:20px;">不限护理项目</el-checkbox>
          </el-col>
        </el-form-item>

        <el-form-item label="是否套餐内项目" prop="is_cardproject">
          <el-radio-group v-model="formInline.is_cardproject">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- relate_project_id -->
        <el-col v-if="formInline.is_cardproject == 1"> 
          <el-form-item
            label="关联销售项"
            :rules="formInline.is_cardproject==1?{required: true, message: '请输入销售项', trigger: 'blur'}:{}"
          >
            <el-input v-model="formInline.SalesTtem" suffix-icon="el-icon-search" placeholder="支持输入名称检索 (开单时候的项目)"></el-input>
          </el-form-item>
        </el-col>

        <el-form-item label="护理财耗">
          <el-checkbox v-model="is_check1" :disabled="is_wea?false:true">累计达到</el-checkbox>
          <el-checkbox v-model="is_check2" :disabled="is_wea?false:true">单次最高</el-checkbox>
          <el-checkbox v-model="is_check3" :disabled="is_wea?false:true">连续</el-checkbox>
        </el-form-item>

        <el-col>
          <el-form-item
            v-if="is_check1 && is_wea"
            label="累计达到"
            prop="consume_add"
            :rules="validateFields('consume_add')"
          >
            <el-input v-model="formInline.consume_add" placeholder="请输入金额"></el-input>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item
            v-if="is_check2 && is_wea"
            label="单次最高"
            prop="consume_max"
            :rules="validateFields('consume_max')"
          >
            <el-input v-model="formInline.consume_max" placeholder="请输入金额"></el-input>
          </el-form-item>
        </el-col>

        <el-form-item
          v-if="is_check3 && is_wea"
          label="连续"
          prop="consume_continuousday"
          :rules="validateFields('consume_continuousday')"
        >
          <el-input v-model="formInline.consume_continuousday" placeholder="请输入天数"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item
          v-if="is_check3 && is_wea"
          label="达到"
          prop="consume_continuous"
          :rules="validateFields('consume_continuous')"
        >
          <el-input v-model="formInline.consume_continuous" placeholder="请输入金额"></el-input>
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
    },
    projectData: {
      type: Array
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
          this.is_cnum = this.echoTableData.is_nursing_count==1?true:false;
          this.is_num = this.echoTableData.is_nursing_num==1?true:false;
          this.is_wea = this.echoTableData.is_nursing_consume==1?true:false;
          this.num_up = this.echoTableData.nursing_num_up==1?true:false;
          this.count_up = this.echoTableData.nursing_count_up==1?true:false;
          this.limitPro = this.echoTableData.is_unlimited==1?true:false;
          this.formInline = this.echoTableData;
          this.formInline.time = [];
          this.formInline.period = parseInt(this.echoTableData.period);
          this.formInline.sale_start_at = this.echoTableData.sale_start_at;
          this.formInline.sale_end_at = this.echoTableData.sale_end_at;
          this.formInline.time.push(this.formInline.sale_start_at,this.formInline.sale_end_at);
          this.formInline.continuous = this.echoTableData.continuous==0?"":this.echoTableData.continuous;
          this.formInline.monthly = this.echoTableData.monthly==0?"":this.echoTableData.monthly;
          this.formInline.nursing_frequency = this.echoTableData.nursing_frequency==0?"":this.echoTableData.nursing_frequency;
          this.formInline.nursing_num = this.echoTableData.nursing_num==0?"":this.echoTableData.nursing_num;
          this.formInline.project_id = this.echoTableData.project_id;
          this.formInline.is_cardproject = parseInt(this.echoTableData.is_cardproject);
          this.formInline.relate_project_id = this.echoTableData.relate_project_id;
          this.is_check1 = this.echoTableData.is_consume_add==1?true:false;
          this.formInline.consume_add = this.echoTableData.consume_add==0?"":this.echoTableData.consume_add;
          this.is_check2 = this.echoTableData.is_consume_max==1?true:false;
          this.formInline.consume_max = this.echoTableData.consume_max==0?"":this.echoTableData.consume_max;
          this.is_check3 = this.echoTableData.is_consume_continuous==1?true:false;
          this.formInline.consume_continuousday = this.echoTableData.consume_continuousday==0?"":this.echoTableData.consume_continuousday;
          this.formInline.consume_continuous = this.echoTableData.consume_continuous==0?"":this.echoTableData.consume_continuous;
        } else {
          this.nursingName = "";
          this.SalesTtem = "";
          this.is_cnum = false;
          this.is_num = false;
          this.is_wea = false;
          this.num_up = false;
          this.count_up = false;
          this.limitPro = false;
          this.is_check1 = false;
          this.is_check2 = false;
          this.is_check3 = false;
          this.formInline = JSON.parse(JSON.stringify(this.default));
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: this.value, // 当前组件是否显示
      // form数据
      is_cnum: false, // 护理次数
      is_num: false, // 护理个数
      is_wea: false, // 护理财耗
      nursingName: "", // 护理名称
      SalesTtem: "", // 关联销售项名称
      num_up: false, // 护理个数及以上
      count_up: false, // 护理次数及以上
      limitPro: false, // 不限护理项目
      is_check1: false, // 是否累计达到(耗财)
      is_check2: false, // 是否单次最高(耗财)
      is_check3: false, // 是否连续
      // 
      formInline: {
        is_nursing_count: "", // 是否开启护理次数
        is_nursing_num: "", // 是否开启护理个数
        is_nursing_consume: "", // 是否开启护理耗财
        period: "", // 护理周期类型[1时间段2连续3每月]
        time: [], // 时间段
        sale_start_at: "", // 购买开始时间
        sale_end_at: "", // 购买结束时间
        continuous: "", // 连续天数
        monthly: "", // 每月次数
        nursing_frequency: "", // 护理次数
        nursing_num_up: "", // 护理个数及以上，值为1打勾
        nursing_num: "", // 护理个数
        nursing_count_up: "", // 护理次数及以上，值为1打勾
        is_unlimited: "",  // 不限护理项目
        project_id: "", // 护理项目id
        is_cardproject: "", // 是否套餐内的项目
        relate_project_id: "", // 关联销售项目id
        is_consume_add: "", // 是否累计达到(耗财)
        consume_add: "", // 累计达到耗财
        is_consume_max: "", // 是否单次最高(耗财)
        consume_max: "", // 单次最高耗财
        is_consume_continuous: "", // 是否连续
        consume_continuousday: "", // 连续几天达到
        consume_continuous: "" // 连续几天达到多少耗财
      },
      default: {
        is_nursing_count: "", // 是否开启护理次数
        is_nursing_num: "", // 是否开启护理个数
        is_nursing_consume: "", // 是否开启护理耗财
        period: "", // 护理周期类型[1时间段2连续3每月]
        time: [], // 时间段
        sale_start_at: "", // 购买开始时间
        sale_end_at: "", // 购买结束时间
        continuous: "", // 连续天数
        monthly: "", // 每月次数
        nursing_frequency: "", // 护理次数
        nursing_num_up: "", // 护理个数及以上，值为1打勾
        nursing_num: "", // 护理个数
        nursing_count_up: "", // 护理次数及以上，值为1打勾
        is_unlimited: "",  // 不限护理项目
        project_id: "", // 护理项目id
        is_cardproject: "", // 是否套餐内的项目
        relate_project_id: "", // 关联销售项目id
        is_consume_add: "", // 是否累计达到(耗财)
        consume_add: "", // 累计达到耗财
        is_consume_max: "", // 是否单次最高(耗财)
        consume_max: "", // 单次最高耗财
        is_consume_continuous: "", // 是否连续
        consume_continuousday: "", // 连续几天达到
        consume_continuous: "" // 连续几天达到多少耗财
      },
      // 验证
      rules: {
        period: [{ required: true, message: "请选择周期", trigger: "change" }],
        is_cardproject: [{ required: true, message: "是否套餐内的项目", trigger: "change" }]
      },
      restaurants: []
    };
  },
  created() {
    this.resetCardPackge();
  },
  methods: {
    // 验证
    validateFields(type) {
      switch (type) {
        case "nursing_frequency":
          const nursing_frequency = (rule, value, callback) => {
            if (this.is_cnum) {
              if (!value) {
                return callback(new Error('次数不能为空'));
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
          if (this.is_cnum) {
            return { validator: nursing_frequency, trigger: 'blur' }
          }
          break;
        case "nursing_num":
          const nursing_num = (rule, value, callback) => {
            if (this.is_num) {
              if (!value) {
                return callback(new Error('个数不能为空'));
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
            return { validator: nursing_num, trigger: 'blur' }
          }
          break;
        case "consume_add":
          const consume_add = (rule, value, callback) => {
            if (this.is_check1 && this.is_wea) {
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
          if (this.is_check1 && this.is_wea) {
            return { validator: consume_add, trigger: 'blur' }
          }
          break;
        case "consume_max":
          const consume_max = (rule, value, callback) => {
            if (this.is_check2 && this.is_wea) {
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
          if (this.is_check2 && this.is_wea) {
            return { validator: consume_max, trigger: 'blur' }
          }
          break;
        case "consume_continuousday":
          const consume_continuousday = (rule, value, callback) => {
            if (this.is_check3 && this.is_wea) {
              if (!value) {
                return callback(new Error('天数不能为空'));
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
          if (this.is_check3 && this.is_wea) {
            return { validator: consume_continuousday, trigger: 'blur' }
          }
          break;
        case "consume_continuous":
          const consume_continuous = (rule, value, callback) => {
            if (this.is_check3 && this.is_wea) {
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
          if (this.is_check3 && this.is_wea) {
            return { validator: consume_continuous, trigger: 'blur' }
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

    // 数据处理
    resetData() {
      this.formInline.is_nursing_count = this.is_cnum?1:0;
      this.formInline.is_nursing_num = this.is_num?1:0;
      this.formInline.is_nursing_consume = this.is_wea?1:0;
      this.formInline.nursing_num_up = this.num_up?1:0;
      this.formInline.nursing_count_up = this.count_up?1:0;
      this.formInline.is_unlimited = this.limitPro?1:0;
      this.formInline.is_consume_add = this.is_check1?1:0;
      this.formInline.is_consume_max = this.is_check2?1:0;
      this.formInline.is_consume_continuous = this.is_check3?1:0;
      //
      this.formInline.sale_start_at = this.formInline.sale_start_at==""?0:this.formInline.sale_start_at;
      this.formInline.sale_end_at = this.formInline.sale_end_at==""?0:this.formInline.sale_end_at;
      this.formInline.continuous = this.formInline.continuous==""?0:this.formInline.continuous;
      this.formInline.monthly = this.formInline.monthly==""?0:this.formInline.monthly;
      this.formInline.nursing_frequency = this.formInline.nursing_frequency==""?0:this.formInline.nursing_frequency;
      this.formInline.nursing_num = this.formInline.nursing_num==""?0:this.formInline.nursing_num;
      this.formInline.project_id = this.formInline.project_id==""?0:this.formInline.project_id;
      this.formInline.relate_project_id = this.formInline.relate_project_id==""?0:this.formInline.relate_project_id;
      this.formInline.consume_add = this.formInline.consume_add==""?0:this.formInline.consume_add;
      this.formInline.consume_max = this.formInline.consume_max==""?0:this.formInline.consume_max;
      this.formInline.consume_continuousday = this.formInline.consume_continuousday==""?0:this.formInline.consume_continuousday;
      this.formInline.consume_continuous = this.formInline.consume_continuous==""?0:this.formInline.consume_continuous;
      delete this.formInline.time;
    },

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.is_cnum && !this.is_num && !this.is_wea) {
          this.$message.warning("请至少选中一项");
          return false;
        } else if (this.is_wea) {
          if (!this.is_check1 && !this.is_check2 && !this.is_check3) {
            this.$message.warning('请选择护理财耗');
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
        } else {
        }
      });
    },

    clearFields() {
      if (!this.is_cnum) {
        this.formInline.nursing_frequency = "";
        this.num_up = false;
      }
      if (!this.is_num) {
        this.formInline.nursing_num = "";
        this.count_up = false;
      }
      if (!this.is_wea) {
        this.formInline.consume_add = "";
        this.formInline.consume_max = "";
        this.formInline.consume_continuousday = "";
        this.formInline.consume_continuous = "";
        this.is_check1 = false;
        this.is_check2 = false;
        this.is_check3 = false;
      }
    },

    // 取消
    handleClose(formName) {
      this.resetForm(formName);
      this.$emit("on-close");
    },

    // 弹窗按钮关闭
    beforeClose() {
      this.resetForm("formInline");
      this.$emit("on-close");
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.nursingName = "";
      this.SalesTtem = "";
      this.is_cnum = false;
      this.is_num = false;
      this.is_wea = false;
      this.num_up = false;
      this.count_up = false;
      this.limitPro = false;
      this.is_check1 = false;
      this.is_check2 = false;
      this.is_check3 = false;
      this.formInline = JSON.parse(JSON.stringify(this.default));
    },

    // 重装检索数据
    resetCardPackge() {
      this.projectData.forEach(item => {
        let obj = {};
        obj.id = item.id;
        obj.value = item.name;
        obj.code = item.code;
        this.restaurants.push(obj);
      });
    },

    // 检索
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    handleSelect(item) {
      console.log(item);
      this.formInline.project_id = item.id;
      this.nursingName = item.value;
      // this.childrenData.name = item.code;
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