<template>
  <div class="special-set">
    <el-form :model="specialForm" ref="specialForm" label-width="150px" class="special-form">
      <div class="item-block">
        <el-form-item label="购买排斥设置:" prop="is_buyreject" class="item-inlineblock">
          <el-switch v-model="specialForm.is_buyreject" />
        </el-form-item>

        <div class="h-content">
          <div class="t-header">
            <el-row>
              <label class="header-lab">购买该活动,以下品项/套餐不能购买</label>
              <div class="header-btns">
                <el-button @click="openDialog('rejectAdd',1)">新建</el-button>
                <el-button @click="openDialog('rejectUpdate',1)">修改</el-button>
                <el-button @click="openDialog('rejectDel',1)">删除</el-button>
              </div>
            </el-row>
          </div>
          <div class="t-table">
            <el-table
              ref="multipleTable"
              :data="specialForm.pcom"
              tooltip-effect="dark"
              style="width: 100%"
              border
              fit
              highlight-current-row
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                min-width="5%"
                align="center">
              </el-table-column>
              <el-table-column
                label="类别"
                prop="dic_goods_type"
                min-width="25%"
                align="center">
              </el-table-column>
              <el-table-column
                prop="use_quantity"
                label="名称"
                min-width="70%"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="item-block">
        <el-form-item label="购买前提设置:" prop="is_buypremise" class="item-inlineblock">
          <el-switch v-model="specialForm.is_buypremise" />
        </el-form-item>
        <el-form-item label="时间段:" prop="start_at" class="item-inlineblock">
          <el-date-picker
            v-model="specialForm.start_at"
            type="date"
            placeholder="开始日期">
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            v-model="specialForm.end_at"
            type="date"
            placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <div class="h-content">
          <div class="t-header">
            <el-row>
              <label class="header-lab">购买该活动,以下品项/套餐不能购买</label>
              <div class="header-btns">
                <el-button @click="openDialog('rejectAdd',2)">新建</el-button>
                <el-button @click="openDialog('rejectUpdate',2)">修改</el-button>
                <el-button @click="openDialog('rejectDel',2)">删除</el-button>
              </div>
            </el-row>
          </div>
          <div class="t-table">
            <el-table
              ref="multipleTable"
              :data="specialForm.pcom"
              tooltip-effect="dark"
              style="width: 100%"
              border
              fit
              highlight-current-row
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                min-width="5%"
                align="center">
              </el-table-column>
              <el-table-column
                label="类别"
                prop="dic_goods_type"
                min-width="25%"
                align="center">
              </el-table-column>
              <el-table-column
                prop="use_quantity"
                label="名称"
                min-width="70%"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="item-block">
        <el-form-item label="消耗前提设置:" prop="is_csmpremise" class="item-inlineblock">
          <el-switch v-model="specialForm.is_csmpremise" />
        </el-form-item>

        <div class="h-content">
          <div class="t-header">
            <el-row>
              <label class="header-lab">购买该活动,以下品项/套餐不能购买</label>
              <div class="header-btns">
                <el-button @click="openDialog('rejectAdd',4)">新建</el-button>
                <el-button @click="openDialog('rejectUpdate',4)">修改</el-button>
                <el-button @click="openDialog('rejectDel',4)">删除</el-button>
              </div>
            </el-row>
          </div>
          <div class="t-table">
            <el-table
              ref="multipleTable"
              :data="specialForm.pcom"
              tooltip-effect="dark"
              style="width: 100%"
              border
              fit
              highlight-current-row
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                min-width="5%"
                align="center">
              </el-table-column>
              <el-table-column
                label="类别"
                prop="dic_goods_type"
                min-width="25%"
                align="center">
              </el-table-column>
              <el-table-column
                prop="use_quantity"
                label="名称"
                min-width="70%"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="item-block">
        <el-form-item label="消耗排斥设置:" prop="is_csmreject" class="item-inlineblock">
          <el-switch v-model="specialForm.is_csmreject" />
        </el-form-item>

        <div class="h-content">
          <div class="t-header">
            <el-row>
              <label class="header-lab">购买该活动,以下品项/套餐不能购买</label>
              <div class="header-btns">
                <el-button @click="openDialog('rejectAdd',5)">新建</el-button>
                <el-button @click="openDialog('rejectUpdate',5)">修改</el-button>
                <el-button @click="openDialog('rejectDel',5)">删除</el-button>
              </div>
            </el-row>
          </div>
          <div class="t-table">
            <el-table
              ref="multipleTable"
              :data="specialForm.pcom"
              tooltip-effect="dark"
              style="width: 100%"
              border
              fit
              highlight-current-row
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                min-width="5%"
                align="center">
              </el-table-column>
              <el-table-column
                label="类别"
                prop="dic_goods_type"
                min-width="25%"
                align="center">
              </el-table-column>
              <el-table-column
                prop="use_quantity"
                label="名称"
                min-width="70%"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <el-row type="flex" class="row-bg" justify="center">
        <el-button type="primary" @click="submitForm('specialForm')">保存</el-button>
        <el-button @click="resetForm('specialForm')">重置</el-button>
      </el-row>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body='true'>
      <el-form :model="specialform">
        <el-form-item label="类别" label-width="150px">
          <el-select v-model="specialform.dic_goods_type">
            <el-option label="项目" :value="1"></el-option>
            <el-option label="产品" :value="2"></el-option>
            <el-option label="套餐" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" label-width="150px">
          <el-input v-model="specialform.project_id" autocomplete="off" class="m-chk-input"></el-input>
        </el-form-item>
        <el-form-item v-if="specialform.type == 1" label="是否年度控制" label-width="150px">
          <el-switch v-model="specialform.is_annual" />
        </el-form-item>
        <el-form-item v-if="specialform.type == 1" label="护理完可购" label-width="150px">
          <el-switch v-model="specialform.is_nurse_over" />
        </el-form-item>
        <el-form-item v-if="specialform.type == 4" label="具体明细" label-width="150px">
          <el-select v-model="specialform.goods_id">
            <el-option label="1" :value="1"></el-option>
            <el-option label="2" :value="2"></el-option>
            <el-option label="3" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name:'SpecialSet',
    props:{

    },
    components: {
      
    },
    data(){
      return{
        specialForm:{
          card_package_id:'', //活动套餐主表id
          is_buyreject:0, //是否购买排斥设置
          is_buypremise:0, //是否购买前提设置
          is_csmpremise:0, //是否消耗前提设置
          is_csmreject:0, //是否消耗排斥设置

          start_at:'',//购买前提开始时间
          end_at:"",//购买前提结束时间

          pcom:[] //
        },
        dialogVisible:false, // 弹窗开关
        specialform:{
          dic_goods_type:'', // 商品类别(1=项目，2=产品，3=套餐)
          project_id:'', // 项目id
          goods_id:'', // 明细产品id
          is_annual:'', // 是否年度控制
          is_nurse_over:'', // 是否护理完可购
          type:'', // 所属类别（1=购买排斥，2=购买前提-购买，3=购买前提-拥有，4=消耗前提，5=消耗排斥）
        }
      }
    },
    methods:{
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      openDialog(type,num,data){
        switch(type){
          case 'rejectAdd':
            this.dialogVisible = true;
            this.specialform.type = num;
            break;
          case 'rejectUpdate':
            this.dialogVisible = true;
            this.specialform.type = num;
            break;
          case 'rejectDel':
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
        this.$refs[formName].resetFields()
        this.editorClear()
      },
    }
}
</script>

<style lang="scss" scoped>
  .special-form{
    padding: 20px 10px;
    .item-block{
      display: block;
    }

    .item-inlineblock{
      display: inline-block;
    }

    .h-content{
      padding: 10px 15px;
      margin-bottom: 30px;
      .t-header{
        border-top: 1px solid #dfe6ec;
        border-left: 1px solid #dfe6ec;
        border-right: 1px solid #dfe6ec;
        line-height: 60px;
      }
      .header-lab{
        padding-left: 10px;
      }
      .header-btns{
        float: right;
        display: inline-block;
        padding-right: 10px;
      }
    }
  }
  .m-chk-input{
    width: 200px;
  }
</style>
