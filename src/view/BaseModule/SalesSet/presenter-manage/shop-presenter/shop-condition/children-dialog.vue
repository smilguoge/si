<template>
  <el-dialog
    :title="childrenDialogType=='add'?'新增':'修改'"
    :visible.sync="childrenDialogVisible"
    :before-close="beforeClose"
    width="300px"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <el-form
      ref="childrenData"
      label-position="left"
      :model="childrenData"
      :rules="rulesChildren"
      label-width="80px"
    >
      <el-col :span="23">
        <el-form-item label="类型" prop="gtype">
          <el-select v-model="childrenData.gtype" placeholder="请选择状态">
            <el-option
              v-for="item in saleType"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="名称" prop="name">
          <el-autocomplete
            class="inline-input"
            v-model="childrenData.name"
            :fetch-suggestions="querySearch"
            placeholder="请输入选项名称"
            suffix-icon="el-icon-search"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-col :span="23">
        <el-button @click="handleChildrenClose('childrenData')">取 消</el-button>
        <el-button type="primary" @click="submitForm('childrenData')">确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "childrenDialog",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    childrenDialogType: {
      type: String,
      required: true
    },
    saleType: {
      type: Array
    },
    categoryData: {
      type: Object
    },
    echoSaleData: {
      type: Object
    }
  },
  watch: {
    value(val) {
      this.childrenDialogVisible = val;
      if (val) {
        if (this.echoSaleData && this.echoSaleData.goods_id) {
          this.childrenData.name = this.echoSaleData.name;
          this.childrenData.gtype = this.echoSaleData.gtype;
        } else {
          this.childrenData.name = "";
          this.childrenData = {};
        }
      }
    },
    "childrenData.gtype": {
      handler(val) {
        if (val) {
          if (val == 1) {
            this.restaurants = this.cardPackge;
          } else if (val == 2) {
            this.restaurants = this.coupon;
          } else {
            this.restaurants = this.product;
          }
        }
      }
    }
  },
  data() {
    return {
      childrenDialogVisible: this.value,
      childrenData: {
        gtype: "",
        goods_id: "",
        name: ""
      },
      cardPackge: [], // 产品
      coupon: [], // 套餐
      product: [], // 劵
      restaurants: [],
      rulesChildren: {
        gtype: [{ required: true, message: "请选择类型", trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: ["blur, change"] }]
      }
    };
  },
  created() {
    this.resetCardPackge();
  },
  methods: {
    beforeClose() {
      this.resetForm("childrenData");
      this.$emit("on-childrenClose");
    },

    handleChildrenClose(childrenData) {
      this.resetForm(childrenData);
      this.$emit("on-childrenClose");
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.childrenData = {};
    },

    submitForm(childrenData) {
      this.$refs[childrenData].validate(valid => {
        if (valid) {
          this.$emit(
            "on-success",
            JSON.parse(JSON.stringify(this.childrenData))
          );
          this.$emit("on-childrenClose");
          this.resetForm("childrenData");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      this.childrenData.goods_id = item.id;
      this.childrenData.name = item.value;
    }
  }
};
</script>

<style>
</style>