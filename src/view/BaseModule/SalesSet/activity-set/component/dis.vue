<template>
  <div>
    <div class="h-content">
      <div class="t-header">
        <el-row>
          <span style="padding-left:10px">折扣设置:</span>
          <div class="header-btns">
            <el-button @click="disDialog('Add')">新建</el-button>
            <el-button @click="disDialog('Update')">修改</el-button>
            <el-button @click="disDialog('Delete')">删除</el-button>
          </div>
        </el-row>
      </div>
      <div class="t-table">
        <el-table
          :data="list"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="3%" align="center"></el-table-column>
          <el-table-column prop="min_num" label="起始数量" min-width="25%" align="center"></el-table-column>
          <el-table-column prop="max_num" label="结束数量" min-width="25%" align="center"></el-table-column>
          <el-table-column prop="discount" label="折扣数值" min-width="25%" align="center"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="h-content">
      <div class="t-header">
        <el-row>
          <span style="padding-left:10px">折扣方式:</span>
          <div class="header-btns">
            <el-button @click="disDialog('Add')">新建</el-button>
            <el-button @click="disDialog('Update')">修改</el-button>
            <el-button @click="disDialog('Delete')">删除</el-button>
          </div>
        </el-row>
      </div>
      <div class="t-table">
        <el-table
          :data="list"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="3%" align="center"></el-table-column>
          <el-table-column prop="min_num" label="起始数量" min-width="25%" align="center"></el-table-column>
          <el-table-column prop="max_num" label="结束数量" min-width="25%" align="center"></el-table-column>
          <el-table-column prop="discount" label="折扣数值" min-width="25%" align="center"></el-table-column>
        </el-table>
      </div>
    </div>

    <el-row type="flex" class="row-bg" justify="center">
      <el-button @click="resetForm('setmealForm')">取消</el-button>
      <el-button type="primary" @click="submitForm('setmealForm')">保存</el-button>
    </el-row>

    <!-- 折扣设置 -->
    <el-dialog title="折扣方式" :visible.sync="dis_dialog" width="30%" :append-to-body="true">
      <el-form :model="dis_form">
        <el-form-item label="起始数量" label-width="150px">
          <el-input v-model="dis_form.min_num" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>

        <el-form-item label="结束数量" label-width="150px">
          <el-input v-model="dis_form.max_num" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>

        <el-form-item label="折扣数值" label-width="150px">
          <el-input v-model="dis_form.discount" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dis_dialog = false">取 消</el-button>
        <el-button type="primary" @click="dis_dialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Dis",
  props: {
    list: Array
  },
  data() {
    return{
      multipleSelection:[],
      dis_dialog:false,
      dis_form:{
        min_num:'',
        max_num:'',
        discount:'',
      },
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
		},
    disDialog(type) {
      switch (type) {
        case "Add":
          this.dis_dialog = true;
          break;
        case "Update":
          this.dis_dialog = true;
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
			let data = {
				radiotype:'',
				isShow:true,
			}
			this.$emit('dis',data)
    },
  }
};
</script>
<style lang="scss" scoped>
.con-form{
  padding: 20px;
  .m-chk-input{
    width: 250px;
  }
  .h-content{
    padding: 10px 15px;
    .t-header{
      border-top: 1px solid #dfe6ec;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
      line-height: 60px;
    }
    .header-btns{
      float: right;
      padding-right: 10px;
    }
  }
}
.selectbox{
  width: 300px;
  height: 330px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 5px;
  .tit{
    line-height: 45px;
    padding-left: 15px;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
  .radio-group{
    padding: 20px;
  }
  .radio-block{
    display: block;
    padding: 10px;
    padding-left: 30px;
  }
  .btns{
    float: right;
    padding-right: 20px;
  }
}
.m-chk-input{
  width: 200px;
}
.t-header{
  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  line-height: 40px;
}
</style>