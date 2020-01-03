<template>
  <div class="app-container">
    <el-dialog @close="close" append-to-body :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="form">
          <el-form-item label="奖惩类型" required>
            <div class="box">
              <el-radio v-model="form.type" label="1">奖励</el-radio>
              <el-radio v-model="form.type" label="2">惩处</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="奖惩名称" required>
            <div class="box">
              <el-select v-model="form.option" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="奖惩日期" required>
            <div class="box">
              <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="奖惩原因" required>
            <div class="box">
              <el-input v-model="form.content" maxlength="200" placeholder="请输入内容"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="cancle">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Popup",
  components: {},
  data() {
    return {
      dialogTableVisible: true,
      form: {
        type: "1",
        option: "",
        time: "",
        content: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ]
    };
  },
  created() {},
  methods: {
    close() {
      this.$emit("close");
    },
    onSubmit() {
      console.log("submit!");
      this.dialogTableVisible= false
    },
    cancle(){
       this.dialogTableVisible= false
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  .el-form-item {
    margin-bottom: 20px;
    .box {
      margin-left: 20px;
    }
  }
}
</style>

