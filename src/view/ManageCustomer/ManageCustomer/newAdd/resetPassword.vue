<template>
  <div class="app-container">
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码：" prop="original_pwd">
          <el-input type="password" v-model="ruleForm.original_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="new_pwd">
          <el-input type="password" v-model="ruleForm.new_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <div class="strong">
          <span>密码强度:</span>
          <div>
            <ul>
              <li :class="poor?'active':''"></li>
              <li :class="good?'active':''"></li>
              <li :class="strong?'active':''"></li>
            </ul>
            <div v-if="show">为了提升您的密码安全性，建议使用英文字母加数字或符号的混合密码.</div>
          </div>
        </div>
        <el-form-item label="确认密码：" prop="new_verify_pwd">
          <el-input type="password" v-model="ruleForm.new_verify_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verify_code">
          <el-input v-model.number="ruleForm.verify_code"></el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button @click="cancel">取消</el-button>
            <el-button @click="sure('ruleForm')" type="primary">确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import API from "@/api/ManageCustomer/customerManagementApi";
export default {
  name: "resetPassword",
  components: {},
  data() {
    var newPasw = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error("请输入密码"));
      // } else {
      //   if (this.ruleForm.mm1 !== "") {
      //     this.$refs.ruleForm.validateField("checkPass");
      //   }
      //   callback();
      // }
      let RES = /^([A-Za-z]{6,16})|([0-9]{6,16})$/;
      let RES2 = /^[0-9A-Za-z]{6,16}$/;
      let RES3 = /^.{6,16}$/;
      if (RES.test(value)) {
        this.show = true;
        this.poor = true;
        this.good = false;
        callback();
      } else if (RES2.test(value)) {
        this.show = true;
        this.poor = true;
        this.good = true;
        this.strong = false;
      } else if (RES3.test(value)) {
        this.poor = true;
        this.good = true;
        this.strong = true;
        this.show = false;
      }
    };
    var surePasw = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.new_pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        action: "reset",
        id: this.$store.state.isCustomerId,
        original_pwd: "",
        new_pwd: "",
        new_verify_pwd: "",
        verify_code: ""
      },
      rules: {
        original_pwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码由6-16位字符组成，可数字、字母、特殊符号",
            trigger: "blur"
          }
        ],
        new_pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "新密码由6-16位字符组成，可数字、字母、特殊符号",
            trigger: "blur"
          },
          { validator: newPasw, trigger: "blur" }
        ],
        new_verify_pwd: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "新密码由6-16位字符组成，可数字、字母、特殊符号",
            trigger: "blur"
          },
          { validator: surePasw, trigger: "blur" }
        ],
        verify_code: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      // 密码强度
      poor: false,
      good: false,
      strong: false,
      show: false
    };
  },
  created() {},
  methods: {
    sure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          API.reset(this.ruleForm).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message("密码重置成功");
              this.$emit("hid");
            } else {
              this.$message("密码重置失败");
              this.$emit("hid");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$emit("hid");
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  border-top: 1px solid #bbbbbb;
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
    .el-form-item {
      width: 70%;
      div {
        display: flex;
        justify-content: flex-end;
      }
    }
    .strong {
      display: flex;
      width: 70%;
      span {
        width: 20%;
        margin-right: 5%;
        text-align: right;
        font-size: 14px;
        font-weight: 700;
        color: #606266;
      }
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        margin-bottom: 11px;
        li {
          width: 25%;
          height: 15px;
          border-radius: 5px;
          background: rgba(187, 187, 187, 0.16);
          margin-right: 8px;
          &.active {
            background: #70ea50;
          }
        }
      }
      & > div {
        width: calc(100% - 100px);
        div {
          color: #e51c23;
          line-height: 1.5rem;
        }
      }
    }
  }
}
</style>



