<template>
  <div class="el-container">
    <el-dialog
      :title="dialogModuleType == 'create' ? '新建页面' : '修改页面'"
      :visible.sync="isDialogShow"
      :before-close="beforeCancel"
      :width="dialogWidth"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form
        ref="dialogData"
        label-position="left"
        :model="dialogData"
        :rules="rules"
        inline
        class="el-form"
      >
        <!-- <el-col :span="12"> -->
        <el-form-item label="名字" prop="name">
          <el-input v-model="dialogData.name" placeholder="请输入名字" class="el-d-input"></el-input>
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="12"> -->
        <el-form-item label="编码" class="el-margin-left">
          <el-input v-model="dialogData.code" placeholder="自动生成,只读" class="el-d-input" disabled></el-input>
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="12"> -->
        <el-form-item label="关联出生日期" prop="check">
          <el-checkbox v-model="dialogData.check"></el-checkbox>
        </el-form-item>

        <el-form-item prop="birthday_type">
          <el-select v-model="dialogData.birthday_type" placeholder="请选择日期" class="el-d-select">
            <el-option
              v-for="item in birthdayType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="12"> presentRadio -->
        <el-form-item label="是否自动赠送" class="el-margin-left" prop="is_auto">
          <el-radio-group v-model="dialogData.is_auto ">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="12"> -->
        <el-form-item label="赠送日期" prop="presentDate">
          <el-date-picker
            v-model="dialogData.presentDate"
            class="el-picker"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="daterangeChange($event, 'send_start_at', 'send_end_at')"
          />
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="12"> -->
        <el-form-item label="指定日期" class="el-margin-left" prop="assign_date_type">
          <el-select
            v-model="dialogData.assign_date_type"
            placeholder="请选择指定日期"
            class="el-s-select"
          >
            <el-option
              v-for="item in assignDateType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>-</el-form-item>

        <el-form-item prop="assign_day">
          <el-input
            v-model="dialogData.assign_day"
            maxlength="5"
            show-word-limit
            placeholder="5位数"
            class="el-s-input"
          ></el-input>
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="12"> -->
        <el-form-item label="使用日期" prop="useDate">
          <el-date-picker
            v-model="dialogData.useDate"
            class="el-picker"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="daterangeChange($event, 'use_start_at', 'use_end_at')"
          />
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="12"> -->
        <el-form-item label="当天能否使用" class="el-margin-left" prop="is_same_day">
          <el-radio-group v-model="dialogData.is_same_day">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- </el-col> -->

        <div class="el-title">顾客条件</div>

        <el-form-item label="赠送对象" style="margin-bottom:10px;" prop="dic_send_object">
          <el-checkbox-group v-model="dialogData.dic_send_object">
            <el-checkbox
              v-for="item in dic_send_object"
              :key="item.value"
              :label="item.value"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="适合顾客" class="el-block">
          <el-checkbox-group v-model="dialogData.dic_customer_attr">
            <el-checkbox
              v-for="item in dic_customer_attr"
              :key="item.value"
              :label="item.value"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="顾客状态" class="el-block">
          <el-checkbox-group v-model="dialogData.dic_customer_manage_cate">
            <el-checkbox
              v-for="item in dic_customer_manage_cate"
              :key="item.value"
              :label="item.value"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="顾客等级" class="el-block">
          <el-checkbox-group v-model="dialogData.dic_customer_grade">
            <el-checkbox
              v-for="item in dic_customer_grade"
              :key="item.value"
              :label="item.value"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="顾客星级" class="el-block">
          <el-checkbox-group v-model="dialogData.dic_customer_star">
            <el-checkbox
              v-for="item in dic_customer_star"
              :key="item.value"
              :label="item.value"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div class="el-title">购买条件</div>

        <!-- 购买条件赠送明细 -->
        <shopPresenter
          :gtype="gtype"
          :saleType="saleType"
          :period="period"
          :assignDateType="assignDateType"
          :dic_customer_grade="dic_customer_grade"
          :dic_customer_star="dic_customer_star"
          :categoryData="categoryData"
          :echoShopData="echoShopData"
          :empty="empty"
          @on-shopList="getShopList($event)"
        />

        <div class="el-title">老带新&嘉宾消费送</div>

        <!-- 老带新"&"嘉宾消费送 -->
        <consumePresenter
          :gtype="gtype"
          :assignDateType="assignDateType"
          :dic_customer_grade="dic_customer_grade"
          :dic_customer_star="dic_customer_star"
          :echoConsumeData="echoConsumeData"
          :categoryData="categoryData"
          :empty="empty"
          @on-consumeList="getConsumeList($event)"
        />

        <div class="el-title">护理条件</div>

        <!-- 护理条件 -->
        <el-form-item label="护理类别" prop="is_nurse_over">
          <el-radio-group v-model="dialogData.is_nurse_over">
            <el-radio :label="0">护理送</el-radio>
            <el-radio :label="1">护理完送</el-radio>
          </el-radio-group>
        </el-form-item>

        <nursingPresenter
          :gtype="gtype"
          :assignDateType="assignDateType"
          :dic_customer_grade="dic_customer_grade"
          :dic_customer_star="dic_customer_star"
          :echoNursingData="echoNursingData"
          :categoryData="categoryData"
          :projectData="projectData"
          :empty="empty"
          @on-nursingList="getNursingList($event)"
        />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-col :span="23">
          <el-button type="primary" @click="submitForm('dialogData')">保存</el-button>
          <el-button @click="cancel('dialogData')">取消</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import shopPresenter from "./shop-presenter/index";
import consumePresenter from "./consume-presenter/index";
import nursingPresenter from "./nursing-presenter/index";
import { getGcreate, addCreate, getCategory, getGupdate, editUpdate, projectSearch } from "@/api/BaseModule/SalesSet";

export default {
  name: "CreateDialog",
  components: {
    shopPresenter,
    consumePresenter,
    nursingPresenter
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    dialogModuleType: {
      type: String,
      required: true
    },
    rowId: {
      type: [String, Number]
    },
    echoAllData: {
      type: Object
    }
  },
  watch: {
    value(val) {
      this.isDialogShow = val;
      if (val) {
        this.empty = false;
      }
    },
    echoAllData(val) {
      if (val) {
        this.editEchoData(val);
      }
    }
  },
  data() {
    return {
      isDialogShow: this.value,
      dialogData: {
        name: "", // 名称
        code: "",
        check: true, // 是否关联生日
        birthday_type: "", // 出生日期类型
        is_auto: "", // 是否自动赠送
        presentDate: [], // 赠送时间
        send_start_at: "", // 赠送开始时间
        send_end_at: "", // 赠送结束时间
        assign_date_type: "", // 指定日期类型
        assign_day: "", // 指定日期长度
        useDate: [], // 使用时间
        use_start_at: "", // 使用开始时间
        use_end_at: "", // 使用结束时间
        is_same_day: "", // 当天能否使用
        dic_send_object: [], // 赠送对象
        dic_customer_attr: [], // 适合顾客
        dic_customer_manage_cate: [], // 顾客状态
        dic_customer_grade: [], // 顾客等级
        dic_customer_star: [], // 顾客星级
        is_nurse_over: "", // 护理类别
        saleSet: [], // 购买条件
        guestSet: [], // 老带新条件
        consumeSet: [] // 护理条件
      },
      defaultData: {
        name: "", // 名称
        check: true, // 是否关联生日
        birthday_type: "", // 出生日期类型
        is_auto: "", // 是否自动赠送
        presentDate: [], // 赠送时间
        send_start_at: "", // 赠送开始时间
        send_end_at: "", // 赠送结束时间
        assign_date_type: "", // 指定日期类型
        assign_day: "", // 指定日期长度
        useDate: [], // 使用时间
        use_start_at: "", // 使用开始时间
        use_end_at: "", // 使用结束时间
        is_same_day: "", // 当天能否使用
        dic_send_object: [], // 赠送对象
        dic_customer_attr: [], // 适合顾客
        dic_customer_manage_cate: [], // 顾客状态
        dic_customer_grade: [], // 顾客等级
        dic_customer_star: [], // 顾客星级
        is_nurse_over: "", // 护理类别
        saleSet: [], // 购买条件
        guestSet: [], // 老带新条件
        consumeSet: [] // 护理条件
      },
      // - 验证规则
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        check: [{ required: true, message: "请勾选", trigger: "change" }],
        birthday_type: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        is_auto: [
          { required: true, message: "是否自动赠送", trigger: "change" }
        ],
        presentDate: [
          { required: true, message: "请选择赠送时间", trigger: "change" }
        ],
        assign_date_type: [
          { required: true, message: "请选择指定日期", trigger: "change" }
        ],
        assign_day: [
          { required: true, message: "请输入指定日期", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个数字", trigger: "blur" }
        ],
        useDate: [
          { required: true, message: "请选择使用时间", trigger: "change" }
        ],
        is_same_day: [
          { required: true, message: "当天能否使用", trigger: "change" }
        ],
        dic_send_object: [
          { required: true, message: "请选择赠送对象", trigger: "change" }
        ],
        is_nurse_over: [
          { required: true, message: "请选择护理类别", trigger: "change" }
        ]
      },
      // - 页面参数配置
      miniSize: "mini",
      dialogWidth: "1000px",
      gtype: [], // 类型下拉框
      saleType: [], // 购买明细下拉框
      period: [], // 周期下拉框
      birthdayType: [], // 出生日期
      assignDateType: [], // 指定日期
      dic_send_object: [], // 赠送对象
      dic_customer_attr: [], // 适合顾客
      dic_customer_manage_cate: [], // 顾客状态
      dic_customer_grade: [], // 顾客等级
      dic_customer_star: [], // 顾客星级
      categoryData: {}, // 类型检索数据
      projectData: [], // 项目检索数据
      code: "", // 编码
      echoShopData: [], // 编辑回显购买数据
      echoConsumeData: [], // 编辑回显老带新数据
      echoNursingData: [], // 编辑回显护理数据
      empty: false
    };
  },
  created() {
    this.getSet();
    this.category();
    this.searchProject();
  },
  methods: {
    // 获取赠送配置项
    getSet() {
      getGcreate().then(res => {
        console.log(res);
        this.gtype = res.data.gtype;
        this.saleType = res.data.saleType;
        this.period = res.data.period;
        this.birthdayType = res.data.birthdayType;
        this.assignDateType = res.data.assignDateType;
        this.dic_send_object = res.data.dic_send_object;
        this.dic_customer_attr = res.data.dic_customer_attr;
        this.dic_customer_manage_cate = res.data.dic_customer_manage_cate;
        this.dic_customer_grade = res.data.dic_customer_grade;
        this.dic_customer_star = res.data.dic_customer_star;
        this.$emit('on-set',this.dic_send_object);
      });
    },

    // 类型检索数据
    category() {
      getCategory().then(res => {
        console.log(res);
        this.categoryData = res.data;
      })
    },

    // 项目检索数据
    searchProject() {
      projectSearch().then(res => {
        console.log(res);
        this.projectData = res.data;
      })
    },

    // 获取数据回显
    editEchoData(obj) {
      this.dialogData.name = obj.name;
      this.dialogData.code = obj.code;
      this.dialogData.birthday_type = parseInt(obj.birthday_type);
      this.dialogData.is_auto = parseInt(obj.is_auto);
      this.dialogData.send_start_at = obj.send_start_at.length <= 11 ? obj.send_start_at * 1000 : obj.send_start_at;
      this.dialogData.send_end_at = obj.send_end_at.length <= 11? obj.send_end_at * 1000 : obj.send_end_at;
      this.dialogData.presentDate.push(this.dialogData.send_start_at, this.dialogData.send_end_at);
      this.dialogData.assign_date_type = parseInt(obj.assign_date_type);
      this.dialogData.assign_day = obj.assign_day;
      this.dialogData.use_start_at = obj.use_start_at.length <= 11 ? obj.use_start_at * 1000 : obj.use_start_at;
      this.dialogData.use_end_at = obj.use_end_at.length <= 11 ? obj.use_end_at * 1000 : obj.use_end_at;
      this.dialogData.useDate.push(this.dialogData.use_start_at, this.dialogData.use_end_at);
      this.dialogData.is_same_day = parseInt(obj.is_same_day);
      obj.dic_send_object==""?[]:this.dialogData.dic_send_object.push(parseInt(obj.dic_send_object));
      obj.dic_customer_attr==""?[]:this.dialogData.dic_customer_attr.push(parseInt(obj.dic_customer_attr));
      obj.dic_customer_manage_cate==""?[]:this.dialogData.dic_customer_manage_cate.push(parseInt(obj.dic_customer_manage_cate));
      obj.dic_customer_grade==""?[]:this.dialogData.dic_customer_grade.push(parseInt(obj.dic_customer_grade));
      obj.dic_customer_star==""?[]:this.dialogData.dic_customer_star.push(parseInt(obj.dic_customer_star));
      this.dialogData.is_nurse_over = parseInt(obj.is_nurse_over);
      this.echoShopData = obj.saleSet;
      this.echoConsumeData = obj.guestSet;
      this.echoNursingData = obj.consumeSet;
    },

    // 验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveForm(this.dialogModuleType);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 购买条件
    getShopList(data) {
      if (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          data[i].sale_start_at = Math.floor(data[i].sale_start_at / 1000);
          data[i].sale_end_at = Math.floor(data[i].sale_end_at / 1000);
          if (data[i].senddtl && data[i].senddtl.length > 0) {
            for(let j = 0; j < data[i].senddtl.length; j++) {
              data[i].senddtl[j].validity_start_at = data[i].senddtl[j].validity_start_at + ''.length > 10?Math.floor(data[i].senddtl[j].validity_start_at / 1000):data[i].senddtl[j].validity_start_at;
              data[i].senddtl[j].validity_end_at = data[i].senddtl[j].validity_end_at + ''.length > 10?Math.floor(data[i].senddtl[j].validity_end_at / 1000):data[i].senddtl[j].validity_end_at;
            }
          }
        }
        this.dialogData.saleSet = data;
        console.log(this.dialogData.saleSet);
      }
    },

    // 老带新条件
    getConsumeList(data) {
      if (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          data[i].sale_start_at = Math.floor(data[i].sale_start_at / 1000);
          data[i].sale_end_at = Math.floor(data[i].sale_end_at / 1000);
          if (data[i].senddtl && data[i].senddtl.length > 0) {
            for(let j = 0; j < data[i].senddtl.length; j++) {
              data[i].senddtl[j].validity_start_at = data[i].senddtl[j].validity_start_at + ''.length > 10?Math.floor(data[i].senddtl[j].validity_start_at / 1000):data[i].senddtl[j].validity_start_at;
              data[i].senddtl[j].validity_end_at = data[i].senddtl[j].validity_end_at + ''.length > 10?Math.floor(data[i].senddtl[j].validity_end_at / 1000):data[i].senddtl[j].validity_end_at;
            }
          }
        }
        this.dialogData.guestSet = data;
        console.log(this.dialogData.guestSet);
      }
    },

    // 护理条件
    getNursingList(data) {
      if (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          data[i].sale_start_at = Math.floor(data[i].sale_start_at / 1000);
          data[i].sale_end_at = Math.floor(data[i].sale_end_at / 1000);
          if (data[i].senddtl && data[i].senddtl.length > 0) {
            for(let j = 0; j < data[i].senddtl.length; j++) {
              data[i].senddtl[j].validity_start_at = data[i].senddtl[j].validity_start_at + ''.length > 10?Math.floor(data[i].senddtl[j].validity_start_at / 1000):data[i].senddtl[j].validity_start_at;
              data[i].senddtl[j].validity_end_at = data[i].senddtl[j].validity_end_at + ''.length > 10?Math.floor(data[i].senddtl[j].validity_end_at / 1000):data[i].senddtl[j].validity_end_at;
            }
          }
        }
        this.dialogData.consumeSet = data;
        console.log(this.dialogData.consumeSet);
      }
    },

    // 提交新建/编辑
    saveForm(type) {
      let data = {
        name: this.dialogData.name,
        source: this.dialogData.check ? 1 : 0,
        birthday_type: this.dialogData.birthday_type,
        is_auto: this.dialogData.is_auto,
        send_start_at: Math.floor(this.dialogData.send_start_at / 1000),
        send_end_at: Math.floor(this.dialogData.send_end_at / 1000),
        assign_date_type: this.dialogData.assign_date_type,
        assign_day: this.dialogData.assign_day,
        use_start_at: Math.floor(this.dialogData.use_start_at / 1000),
        use_end_at: Math.floor(this.dialogData.use_end_at / 1000),
        is_same_day: this.dialogData.is_same_day,
        dic_send_object: this.dialogData.dic_send_object,
        dic_customer_attr: this.dialogData.dic_customer_attr,
        dic_customer_manage_cate: this.dialogData.dic_customer_manage_cate,
        dic_customer_grade: this.dialogData.dic_customer_grade,
        dic_customer_star: this.dialogData.dic_customer_star,
        is_nurse_over: this.dialogData.is_nurse_over,
        saleSet: this.dialogData.saleSet,
        guestSet: this.dialogData.guestSet,
        consumeSet: this.dialogData.consumeSet
      };
      if (type == 'create') {
        addCreate(data).then(res => {
          console.log(res);
          this.$emit('on-success');
          this.$emit('on-close');
          this.resetForm('dialogData');
          this.$message.success('新建成功!');
        });
      } else {
        editUpdate(this.rowId, data).then(res => {
          console.log(res);
          this.$emit('on-success');
          this.$emit('on-close');
          this.resetForm('dialogData');
          this.$message.success('修改成功!');
        });
      }
    },

    // 弹窗关闭
    beforeCancel() {
      this.resetForm('dialogData');
      this.$emit("on-close");
    },

    // 弹窗关闭
    cancel(formName) {
      this.resetForm(formName);
      this.$emit("on-close");
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogData = JSON.parse(JSON.stringify(this.defaultData));
      this.echoShopData = [];
      this.echoConsumeData = [];
      this.echoNursingData = [];
      this.empty = true;
    },

    // 日期
    daterangeChange(daterange, start, end) {
      if (daterange[0]) {
        this.dialogData[start] = daterange[0];
        this.dialogData[end] = daterange[1];
      } else {
        this.dialogData[start] = "";
        this.dialogData[end] = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  .el-dialog {
    margin-bottom:15vh;
  }

  .dialogBox {
    margin-bottom:15vh;
  }

  .el-dialog__header {
    background-color: #b3c0d1;
  }
}
.el-title {
  color: dodgerblue;
  padding: 10px 0 10px 0;
}
.el-form {
  .el-margin-left {
    margin-left: 100px;
    margin-right: 0px;
  }
  .el-margin-right {
    margin-right: 10px;
  }
  .el-d-input {
    width: 320px;
  }
  .el-s-input {
    width: 100px;
  }
  .el-d-select {
    width: 290px;
  }
  .el-s-select {
    width: 175px;
  }
  .el-picker {
    width: 320px;
  }
  .el-block {
    display: block;
    margin: 0 0 0 10px;
  }
  // .el-box {
  //   display:inline;
  //   float: right;

  //   label {
  //     width:0px!important;
  //   }
  // }
  // .el-box .el-form-item .el-form-item--medium label {
  //   width:0px!important;
  // }
  // .el-box .el-form-item .el-form-item--medium .el-form-item__label {
  //   width:0px!important;
  // }
}
</style>