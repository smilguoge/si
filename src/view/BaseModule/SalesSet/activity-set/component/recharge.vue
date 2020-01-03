<template>
  <div class="recharge">
    <div class="h-content">
      <div class="t-header">
        <el-row>
          <span style="padding-left:10px">活动名称:</span>
          <el-input placeholder="请输入内容" class="m-chk-input">
            <el-button slot="append">查询</el-button>
          </el-input>
          <div class="header-btns">
            <el-button @click="rechargeDialog('Add')">新建</el-button>
            <el-button @click="rechargeDialog('Update')">修改</el-button>
            <el-button @click="rechargeDialog('Delete')">删除</el-button>
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
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="activity_number" label="活动编号" width="180" align="center"></el-table-column>
          <el-table-column prop="activity_name" label="活动名称" width="180" align="center"></el-table-column>
          <el-table-column prop="recharge_money" label="充值金额" align="center"></el-table-column>
          <el-table-column prop="send_money" label="赠送金额" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
          <el-table-column prop="operation_time" label="操作时间" align="center"></el-table-column>
        </el-table>
      </div>
    </div>

    <el-row type="flex" class="row-bg" justify="center">
      <el-button @click="resetForm('setmealForm')">取消</el-button>
      <el-button type="primary" @click="submitForm('setmealForm')">保存</el-button>
    </el-row>

    <!-- 充值方式 -->
    <el-dialog title="新增充值" :visible.sync="recharge_dialog" width="30%" :append-to-body="true">
      <el-form :model="recharge_form">
        <el-form-item label="活动编号" label-width="150px">
          <el-input v-model="recharge_form.activity_number" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>

        <el-form-item label="活动名称" label-width="150px">
          <el-input v-model="recharge_form.activity_name" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>

        <el-form-item label="充值金额" label-width="150px">
          <el-input v-model="recharge_form.recharge_money" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>

        <el-form-item label="赠送金额" label-width="150px">
          <el-input v-model="recharge_form.send_money" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-select v-model="recharge_form.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
            <el-option label="删除" :value="-1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recharge_dialog = false">取 消</el-button>
        <el-button type="primary" @click="recharge_dialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
	name:'Recharge',
	props:{
		list: Array
	},
	data(){
		return{
			multipleSelection: [],

      recharge_dialog: false,
      recharge_form:{
        activity_number:'',
        activity_name:'',
        recharge_money:'',
        send_money:'',
        status:'',
      },
		}
	},
	methods:{
		handleSelectionChange(val) {
      this.multipleSelection = val;
		},
		rechargeDialog(type){
      switch(type){
        case 'Add':
          this.recharge_dialog = true
        break;
        case 'Update':
          this.recharge_dialog = true
          if(this.multipleSelection.length = 1){
            this.recharge_form = this.multipleSelection[0]
          }
        break;
        case 'Delete':
          this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {

          })
        break;
        default:
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
			this.$emit('recharge',data)
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