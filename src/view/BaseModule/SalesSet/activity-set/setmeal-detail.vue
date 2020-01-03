<template>
  <div class="setmeal-detail">
    <el-form ref="setmealForm" :model="setmealForm" label-width="150px" class="con-form">
      <div v-show="isShow" class="selectbox">
        <div class="tit">活动类型选择</div>
        <div class="radio-group">
          <el-radio v-model="radios" label="1" class="radio-block">几选几</el-radio>
          <el-radio v-model="radios" label="2" class="radio-block">满额活动</el-radio>
          <el-radio v-model="radios" label="3" class="radio-block">期限卡</el-radio>
          <el-radio v-model="radios" label="4" class="radio-block">折扣设置</el-radio>
          <el-radio v-model="radios" label="5" class="radio-block">充值活动</el-radio>
        </div>
        <div class="btns">
          <el-button @click="radioType()">确定</el-button>
        </div>
      </div>
      <div v-if="this.radiotype == '1'">
        <Severaloptions :list="setmealForm.pcom" @options="getType" />
      </div>
      <div v-if="this.radiotype == '2'">
        <Fullamount :list="setmealForm.pcom" @options="getType" />
      </div>
      <div v-if="this.radiotype == '3'">
        <Term :list="setmealForm.pcom" @options="getType" />
      </div>
      <div v-if="this.radiotype == '4'">
        <Dis :list="setmealForm.dis" @dis="getType" />
      </div>
      <div v-if="this.radiotype == '5'">
        <Recharge :list="setmealForm.recharge" @recharge="getType" />
      </div>
    </el-form>
  </div>
</template>

<script>
import Recharge from './component/recharge'
import Dis from './component/dis'
import Term from './component/term'
import Fullamount from './component/fullamount'
import Severaloptions from './component/severaloptions'

export default {
  name: 'SetmealDetail',
  components: {
    Recharge,
    Dis,
    Term,
    Fullamount,
    Severaloptions
  },
  data() {
    return {
      setmealForm: {
        recharge: [{
          activity_number: 'HDD20190101001',
          activity_name: '充值5000送1000',
          recharge_money: 5000,
          send_money: 1000,
          status: 1
        }],
        dis: [{
          min_num: 1,
          max_num: 4,
          discount: 8
        }],
        pcom: [
          {
            checked: true,
            name: '组合1',
            total_num: '6',
            select_num: '3',
            is_combination_type: 0,

            detail: [
              {
                goods_id: '',
                gtype: '',
                goods_name: '',
                least_num: '',
                atmost_num: '',
                is_select: '',
                send_num: '' // 赠送组合特有
              },
              {
                goods_id: '',
                gtype: '',
                goods_name: '',
                least_num: '',
                atmost_num: '',
                is_select: '',
                send_num: '' // 赠送组合特有
              }
            ]
          },
          {
            checked: true,
            name: '组合1',
            total_num: '6',
            select_num: '3',
            is_combination_type: 0,

            detail: [
              {
                goods_id: '',
                gtype: '',
                goods_name: '',
                least_num: '',
                atmost_num: '',
                is_select: ''
              },
              {
                goods_id: '',
                gtype: '',
                goods_name: '',
                least_num: '',
                atmost_num: '',
                is_select: ''
              }
            ]
          }
        ]
      },
      radios: '',
      radiotype: '',
      isShow: true,

      multipleSelection: []
    }
  },
  methods: {
    radioType() {
      if (this.radios == '') {
        this.$message('不能为空')
      } else {
        this.radiotype = this.radios
        this.isShow = false
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
      // this.editorClear()
      this.radiotype = ''
      this.isShow = true
    },
    getType(data) {
      this.isShow = data.isShow
      this.radiotype = data.radiotype
    }
  }
}
</script>

<style lang="scss" scoped>
.con-form{
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
  margin: 20px;
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
