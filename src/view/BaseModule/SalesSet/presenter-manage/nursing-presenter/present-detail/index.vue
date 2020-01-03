<template>
  <el-dialog
    :title="presentDetailType=='childrenCreate'?'新增赠送明细':'修改赠送明细'"
    :visible.sync="presentDetailVisible"
    :before-close="beforeClose"
    width="500px"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <el-form
      ref="presentDetailData"
      label-position="left"
      :model="presentDetailData"
      :rules="rules"
      label-width="110px"
    >
      <el-col :span="23">
        <el-form-item label="类别" prop="gtype">
          <el-select v-model="presentDetailData.gtype" placeholder="请选择类别">
            <el-option
              v-for="item in cgtype"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="23">
        <el-form-item label="名称"
          prop="name"
          :rules="[1,2,3].indexOf(presentDetailData.gtype) !== -1?{ required: true, message: '请输入名称', trigger: 'blur' }:{}"
        >
          <el-autocomplete
            class="inline-input"
            v-model="presentDetailData.name"
            :fetch-suggestions="querySearch"
            placeholder="请输入选项名称"
            suffix-icon="el-icon-search"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-col>

      <el-col :span="23">
        <el-form-item label="指定(优先级高)">
          <el-select v-model="presentDetailData.every_date" placeholder="请选择优先级">
            <el-option
              v-for="item in assignDateType"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="23">
        <el-form-item label="单次赠送数量" prop="quantity">
          <el-input v-model="presentDetailData.quantity" controls-position="right"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="23">
        <el-form-item label="最高享受次数" prop="max_quantity">
          <el-input v-model="presentDetailData.max_quantity" controls-position="right"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="23">
        <el-form-item label="有效期" prop="validity">
          <el-radio-group v-model="presentDetailData.validity">
            <el-radio :label="1">时间段</el-radio>
            <el-radio :label="2">周期</el-radio>
            <el-radio :label="3">现场做</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="23" v-if="presentDetailData.validity == 1">
        <el-form-item prop="time">
          <el-date-picker
            v-model="presentDetailData.time"
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
      </el-col>

      <el-col :span="23" v-if="presentDetailData.validity == 2">
        <el-form-item prop="period">
          <el-input v-model="presentDetailData.period" placeholder="请输入周期" />
        </el-form-item>
      </el-col>

      <el-col :span="23">
        <el-form-item label="顾客条件">
          <el-form-item label="顾客等级">
            <el-checkbox-group v-model="presentDetailData.dic_customer_grade">
              <el-checkbox
                v-for="item in dic_customer_grade"
                :key="item.value"
                :label="item.value"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="顾客星级">
            <el-checkbox-group v-model="presentDetailData.dic_customer_star">
              <el-checkbox
                v-for="item in dic_customer_star"
                :key="item.value"
                :label="item.value"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form-item>
      </el-col>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-col :span="23">
        <el-button type="primary" @click="submitForm('presentDetailData')">保存</el-button>
        <el-button @click="handleChildrenClose('presentDetailData')">取消</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "presentDetail",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    presentDetailType: {
      type: String,
      required: true
    },
    echoDetailData: {
      type: Object
    },
    cgtype: {
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
    categoryData: {
      type: Object
    }
  },
  watch: {
    value(val) {
      this.presentDetailVisible = val;
      if (val) {
        if (this.echoDetailData.gtype) {
          console.log(this.echoDetailData);
          this.presentDetailData = this.echoDetailData;
          // this.presentDetailData.name = this.echoDetailData.name;
          this.presentDetailData.gtype = parseInt(this.echoDetailData.gtype);
          this.presentDetailData.every_date = this.echoDetailData.every_date==0?"":parseInt(this.echoDetailData.every_date);
          this.presentDetailData.validity =  parseInt(this.echoDetailData.validity);
          this.presentDetailData.period = this.echoDetailData.period === 0 ? "" : this.echoDetailData.period;
          this.presentDetailData.validity_start_at = this.echoDetailData.validity_start_at === 0 ? "" : this.echoDetailData.validity_start_at;
          this.presentDetailData.validity_end_at = this.echoDetailData.validity_end_at === 0 ? "" : this.echoDetailData.validity_end_at;
          this.presentDetailData.time = [];
          if (this.presentDetailData.validity_start_at !== "" && this.presentDetailData.validity_end_at !== "") {
            this.presentDetailData.time.push(this.presentDetailData.validity_start_at,this.presentDetailData.validity_end_at);
          }
          this.presentDetailData.dic_customer_grade = this.echoDetailData.dic_customer_grade
          this.presentDetailData.dic_customer_star = this.echoDetailData.dic_customer_star;
        } else {
          this.presentDetailData = JSON.parse(JSON.stringify(this.defaultData));
        }
      }
    },
    "presentDetailData.gtype": {
      handler(val) {
        if (val) {
          if (val == 1) {
            this.restaurants = this.cardPackge;
          } else if (val == 2) {
            this.restaurants = this.coupon;
          } else if (val == 3) {
            this.restaurants = this.product;
          } else {}
        }
      }
    }
  },
  data() {
     const isNum = (rule, value, callback) => {
      const age= /^[0-9]*$/
      if (!age.test(value)) {
        callback(new Error('请输入数字类型'))
      }else{
        callback()
      }
    }
    return {
      presentDetailVisible: this.value, // dialog显示
      // form数据
      presentDetailData: {
        gtype: "", // 商品类别
        name: "",
        goods_id: "", // 商品id
        every_date: "", // 指定（优先级最高）
        quantity: "", // 赠送数量
        max_quantity: "", // 最高享受数量
        time: [],
        validity_start_at: "", // 有效期开始时间
        validity_end_at: "", // 有效期结束时间
        validity: "", // 有效期
        period: "", // 周期
        dic_customer_grade: [], // 顾客等级
        dic_customer_star: [] // 顾客星级
      },
      defaultData: {
        gtype: "", // 商品类别
        name: "",
        goods_id: "", // 商品id
        every_date: "", // 指定（优先级最高）
        quantity: "", // 赠送数量
        max_quantity: "", // 最高享受数量
        time: [],
        validity_start_at: "", // 有效期开始时间
        validity_end_at: "", // 有效期结束时间
        validity: "", // 有效期
        period: "", // 周期
        dic_customer_grade: [], // 顾客等级
        dic_customer_star: [] // 顾客星级
      },
      cardPackge: [], // 产品
      coupon: [], // 套餐
      product: [], // 劵
      restaurants: [],
      // 验证
      rules: {
        gtype: [{ required: true, message: "请选择类型", trigger: "change" }],
        quantity: [{ required: true, message: "请输入数量", trigger: "blur" },
        {validator: isNum, trigger: "blur"}],
        max_quantity: [{ required: true, message: "请输入次数", trigger: "blur" },
        {validator: isNum, trigger: "blur"}],
        validity: [{ required: true, message: "请选择有效期", trigger: "change" }],
        time: [{ required: true, message: "请选择时间", trigger: "change" }],
        period: [{ required: true, message: "请输入周期", trigger: "blur" }]
      }
    };
  },
  created() {
    this.resetCardPackge();
  },
  methods: {
    beforeClose() {
      this.resetForm("presentDetailData");
      this.$emit("on-presentDetailClose");
    },
    
    // 取消
    handleChildrenClose(formName) {
      this.resetForm(formName);
      this.$emit("on-presentDetailClose");
    },

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.clearFields();
          this.resetData();
          this.$emit("on-success",JSON.parse(JSON.stringify(this.presentDetailData)));
          this.resetForm("presentDetailData");
          this.$emit("on-presentDetailClose");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    clearFields() {
      if (this.presentDetailData.validity === 1) {
        this.presentDetailData.period = "";
      } else if (this.presentDetailData.validity === 2) {
        this.presentDetailData.time = [];
        this.presentDetailData.validity_start_at = "";
        this.presentDetailData.validity_end_at = "";
      } else {
        this.presentDetailData.period = "";
        this.presentDetailData.time = [];
        this.presentDetailData.validity_start_at = "";
        this.presentDetailData.validity_end_at = "";
      }
    },

    // 数据处理
    resetData() {
      this.presentDetailData.goods_id = this.presentDetailData.goods_id==""?0:this.presentDetailData.goods_id;
      this.presentDetailData.every_date = this.presentDetailData.every_date==""?0:this.presentDetailData.every_date;
      this.presentDetailData.validity_start_at = this.presentDetailData.validity_start_at==""?0:this.presentDetailData.validity_start_at;
      this.presentDetailData.validity_end_at = this.presentDetailData.validity_end_at==""?0:this.presentDetailData.validity_end_at;
      this.presentDetailData.period = this.presentDetailData.period==""?0:this.presentDetailData.period;
      this.presentDetailData.dic_customer_grade = this.presentDetailData.dic_customer_grade==[]?"":this.presentDetailData.dic_customer_grade;
      this.presentDetailData.dic_customer_star = this.presentDetailData.dic_customer_star==[]?"":this.presentDetailData.dic_customer_star;
      delete this.presentDetailData.time;
      delete this.presentDetailData.name;
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.presentDetailData = JSON.parse(JSON.stringify(this.defaultData));
    },

    // 重装检索数据
    resetCardPackge() {
      this.categoryData.cardPackge.forEach(item => {
        let obj = {};
        obj.value = item.name;
        obj.id = item.id;
        this.cardPackge.push(obj);
      });
      this.categoryData.coupon.forEach(item => {
        let obj = {};
        obj.value = item.name;
        obj.id = item.id;
        this.coupon.push(obj);
      });
      this.categoryData.product.forEach(item => {
        let obj = {};
        obj.value = item.name;
        obj.id = item.id;
        this.product.push(obj);
      });
    },

    // 检索
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    handleSelect(item) {
      console.log(item);
      this.presentDetailData.goods_id = item.id;
      this.presentDetailData.name = item.value;
    },

    // 日期
    daterangeChange(daterange) {
      if (daterange[0]) {
        this.presentDetailData.validity_start_at = daterange[0];
        this.presentDetailData.validity_end_at = daterange[1];
      } else {
        this.presentDetailData.validity_start_at = "";
        this.presentDetailData.validity_end_at = "";
      }
    }
  }
};
</script>

<style>
</style>