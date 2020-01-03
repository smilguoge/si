<template>
  <div>
    <div class="how-options">
      <el-form
        :model="optionsForm"
        ref="optionsForm"
        label-width="100px"
        class="con-form"
        :inline="true"
      >
        <div style="display:inline-block">
          <el-form-item label="项目总次数：" prop="total_num">
            <el-input v-model="optionsForm.total_num" />
          </el-form-item>

          <el-form-item label="总金额：" prop="total_amount">
            <el-input v-model="optionsForm.total_amount" />
          </el-form-item>
        </div>

        <div class="pcom_type">
          <div class="tit">
            <el-row>
              <span style="padding:0 10px">项目明细表</span>
              <el-button>新增</el-button>
              <el-button>修改</el-button>
              <el-button>删除</el-button>
            </el-row>
          </div>
          <div class="tables">
            <el-table
              :data="optionsForm.pcom.detail"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" min-width="3%" align="center"></el-table-column>
              <el-table-column prop="goods_name" label="品项名称" min-width="50%" align="center"></el-table-column>
              <el-table-column prop="send_num" label="项目次数" min-width="25%" align="center"></el-table-column>
              <el-table-column prop="is_select" label="是否必选" min-width="25%" align="center"></el-table-column>
            </el-table>
          </div>
        </div>

        <div class="pcom_type">
          <div class="tit">
            <el-row>
              <span style="padding:0 10px">赠送项目</span>
              <el-button>新增组合</el-button>
              <el-button>删除</el-button>
            </el-row>
          </div>
          <div class="tables">
            <div class="m-table" v-for="(item,i) in optionsForm.pcom" :key="i">
              <el-form ref="filterForm" :model="optionsForm.pcom[item]" :inline="true">
                <div class="m-header">
                  <el-form-item>
                    <el-checkbox v-model="item.checked" style="padding:0 5px"></el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="item.total_num" style="width:50px"></el-input>选择
                    <el-input v-model="item.select_num" style="width:50px"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-radio-group v-model="item.is_combination_type">
                      <el-radio :label="0">是否以内</el-radio>
                      <el-radio :label="1">是否固定</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <div style="float:right">
                      <el-button @click="openDialog('Add')">新增</el-button>
                      <el-button @click="openDialog('Update')">修改</el-button>
                      <el-button @click="openDialog('Delete')">删除</el-button>
                    </div>
                  </el-form-item>
                </div>
                <div class="m-content">
                  <el-table
                    :data="item.detail"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" min-width="3%" align="center"></el-table-column>
                    <el-table-column prop="goods_name" label="品项名称" min-width="50%" align="center"></el-table-column>
                    <el-table-column prop="send_num" label="赠送次数" min-width="25%" align="center"></el-table-column>
                    <el-table-column prop="is_select" label="是否必选" min-width="25%" align="center"></el-table-column>
                  </el-table>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </el-form>

      <el-row type="flex" class="row-bg" justify="center">
        <el-button @click="resetForm('setmealForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('setmealForm')">保存</el-button>
      </el-row>

      <!-- 选择品项 -->
      <el-dialog title="选择品项" :visible.sync="pcom_dialog" width="50%" :append-to-body="true">
        <el-form :model="pcom_form">
          <div style="width:48%;display:inline-block;margin-right:20px">
            <el-form-item>
              <el-radio-group v-model="pcom_form.gtype">
                <el-radio :label="1">产品</el-radio>
                <el-radio :label="2">项目</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="pcom_search"></el-input>
            </el-form-item>

            <el-form-item>
              <el-table
                ref="pcom_multipleSelection"
                :data="pcom_tabdata"
                tooltip-effect="dark"
                style="width: 100%"
                border
                height="400"
                @selection-change="pcom_handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="名称" width="120"></el-table-column>
                <el-table-column prop="address" label="编码"></el-table-column>
                <el-table-column prop="address" label="金额(元)"></el-table-column>
              </el-table>
            </el-form-item>
          </div>
          <div style="width:48%;display:inline-block">
            <el-form-item>
              <div class="t-header">
                <span style="margin-left: 10px;">已选择</span>
              </div>
              <el-table
                :data="pcom_multipleSelection"
                tooltip-effect="dark"
                style="width: 100%"
                border
                height="480"
              >
                <el-table-column prop="name" label="名称" width="120"></el-table-column>
                <el-table-column prop="address" label="编码"></el-table-column>
                <el-table-column prop="address" label="金额(元)"></el-table-column>
              </el-table>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="pcom_dialog = false">取 消</el-button>
          <el-button type="primary" @click="pcom_dialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "severaloptions",
  props: {
    list: Array
  },
  data() {
    return {
      optionsForm: {
        total_num: "", //-项目总次数
        total_amount: "", //-总金额

        multipleSelection: [],
        pcom: []
      },

      pcom_dialog: false,
      pcom_form: {
        goods_id: "",
        gtype: "",
        goods_name: "",
        least_num: "",
        atmost_num: "",
        is_select: "",
        send_num: "",
        consume_money: ""
      },

      pcom_dialog: false,
      pcom_search: "",
      pcom_multipleSelection: [],
      pcom_tabdata: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    getData() {
      this.optionsForm.pcom = this.list;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pcom_handleSelectionChange(val) {
      this.pcom_multipleSelection = val;
    },
    openDialog(type) {
      switch (type) {
        case "Add":
          this.pcom_dialog = true;
          break;
        case "Update":
          this.pcom_dialog = true;
          break;
        case "Delete":
          this.$confirm("是否确认删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(() => {});
          break;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      let data = {
        radiotype: "",
        isShow: true
      };
      this.$emit("options", data);
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss">
.m-header {
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
<style lang="scss" scoped>
.con-form {
  padding: 20px;
  .pcom_type {
    margin-bottom: 10px;
  }
  .m-chk-input {
    width: 250px;
  }
  .tit {
    border-top: 1px solid #dfe6ec;
    border-left: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
    line-height: 60px;
    background-color: #e4e7ed;
  }
  .tables {
    border: 1px solid #dfe6ec;
    padding: 10px;
  }
  .m-table {
    margin-bottom: 10px;
    .m-header {
      padding: 10px;
      border-top: 1px solid #dfe6ec;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
    }
  }
  .h-content {
    padding: 10px 15px;
    .t-header {
      border-top: 1px solid #dfe6ec;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
      line-height: 60px;
    }
    .header-btns {
      float: right;
      padding-right: 10px;
    }
  }
}
.selectbox {
  width: 300px;
  height: 330px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 5px;
  .tit {
    line-height: 45px;
    padding-left: 15px;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
  .radio-group {
    padding: 20px;
  }
  .radio-block {
    display: block;
    padding: 10px;
    padding-left: 30px;
  }
  .btns {
    float: right;
    padding-right: 20px;
  }
}
.m-chk-input {
  width: 200px;
}
.t-header {
  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  line-height: 40px;
}
</style>