<template>
  <!-- 促销管理 活动套餐表单管理 -->
  <div class="drawer-box">
    <div class="close" @click="close()">
      <i class="iconfont icon-shouqi1" />
    </div>
    <div class="form-wrap">
      <el-tabs
        v-model="formactive"
        @tab-click="handleClick"
      >
        <el-tab-pane label="基础信息" name="first">
          <!--  -->

          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="st-form" inline>

            <el-form-item label="活动文件号" prop="activeFileName">
              <el-input v-model="ruleForm.activeFileName" placeholder="请输入活动文件名" />
            </el-form-item>

            <el-form-item label="促销活动" prop="saleSeason">
              <el-select v-model="ruleForm.saleSeason" placeholder="请选择">
                <el-option label="第一季度活动" value="1" />
                <el-option label="第二季度活动" value="2" />
                <el-option label="第三季度活动" value="3" />
                <el-option label="第四季度活动" value="3" />
              </el-select>
            </el-form-item>

            <el-form-item label="活动名称" prop="activeName">
              <el-input v-model="ruleForm.activeName" placeholder="请输入活动名称" />
            </el-form-item>

            <el-form-item label="活动编码" prop="activeCode">
              <el-input v-model="ruleForm.activeCode" placeholder="请输入活动编码" readonly />
            </el-form-item>

            <el-form-item label="开始日期" prop="startDate">
              <el-date-picker v-model="ruleForm.startDate" type="date" placeholder="选择开始日期" />
            </el-form-item>

            <el-form-item label="结束日期" prop="endDate">
              <el-date-picker v-model="ruleForm.endDate" type="date" placeholder="选择结束日期" />
            </el-form-item>

            <el-form-item label="赠送积分" prop="giveIntergral">
              <el-input v-model="ruleForm.giveIntergral" placeholder="请输入赠送积分" />
            </el-form-item>

            <el-form-item label="卡属性" prop="cardAttribute">
              <el-select v-model="ruleForm.cardAttribute" placeholder="请选择">
                <el-option label="新客卡" value="shanghai" />
                <el-option label="正常卡" value="beijing" />
              </el-select>
            </el-form-item>

            <el-form-item label="有效期" prop="validityDay">
              <el-input v-model="ruleForm.validityDay" placeholder="">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>

            <el-form-item label="是否延期">
              <el-switch v-model="ruleForm.isDelay" />
            </el-form-item>

            <el-form-item label="" prop="delayDay">
              <el-input v-model="ruleForm.delayDay" placeholder="延期天数" class="m-chk-input" />
            </el-form-item>

            <div class="item-block">
              <el-form-item label="适用折上折" prop="isDiscount">
                <el-radio-group v-model="ruleForm.isDiscount" class="m-group">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="折上折方式" prop="discountMode">
                <el-select v-model="ruleForm.discountMode" placeholder="请选择">
                  <el-option label="先打折后抵扣" value="1" />
                  <el-option label="先打折后兑换" value="2" />
                  <el-option label="先打折后抵扣+兑换" value="3" />
                  <el-option label="先抵扣后打折" value="4" />
                  <el-option label="先兑换后打折" value="5" />
                  <el-option label="先抵扣+兑换后打折" value="8" />
                </el-select>
              </el-form-item>
            </div>

            <div class="item-block">
              <el-form-item label="是否常用" prop="isUsed">
                <el-radio-group v-model="ruleForm.isUsed" class="m-group">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否单次活动">
                <el-radio-group v-model="ruleForm.isSingle" class="m-group">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>

            <div class="item-block">
              <el-form-item label="适用区域/门店">
                <el-radio-group v-model="ruleForm.storeType">
                  <el-radio :label="0">全部</el-radio>
                  <el-radio :label="1">指定</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="" prop="storeout">
                <el-input v-model="ruleForm.storeRange" placeholder="" />
              </el-form-item>
            </div>

            <el-form-item label="员工价格" prop="employePrice">
              <el-input v-model="ruleForm.employePrice" placeholder="请输入员工价格" maxlength="5" />
            </el-form-item>

            <el-form-item label="体验价格" prop="experiencePrice">
              <el-input v-model="ruleForm.experiencePrice" placeholder="请输入体验价格" maxlength="5" />
            </el-form-item>

            <div class="item-block">
              <el-form-item label="是否限用券" prop="isLimit">
                <el-switch v-model="ruleForm.isLimit" />
              </el-form-item>
              <el-form-item label="" prop="limitNum">
                <el-input
                  v-model="ruleForm.limitNum"
                  :disabled="!ruleForm.isLimit"
                  style="{widht: '100px'}"
                  placeholder="张数"
                  class="m-chk-input"
                />
              </el-form-item>

              <el-form-item label="是否积分兑换" prop="isExchange">
                <el-switch v-model="ruleForm.isExchange" />
              </el-form-item>
              <el-form-item label="" prop="exchangeNum">
                <el-input
                  v-model="ruleForm.exchangeNum"
                  :disabled="!ruleForm.isExchange"
                  style="{widht: '100px'}"
                  placeholder="所需积分"
                  class="m-chk-input"
                />
              </el-form-item>
            </div>

            <div class="item-block">
              <el-form-item label="显示终端" prop="terminal">
                <el-checkbox-group v-model="ruleForm.terminal">
                  <el-checkbox label="pc" name="pc">pc</el-checkbox>
                  <el-checkbox label="wechat" name="wechat">微信</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div class="item-block">
              <el-form-item label="活动介绍" prop="activeDesc">
                <el-input v-model="ruleForm.activeDesc" type="textarea" class="m-textarea" rows="4" />
              </el-form-item>
            </div>

            <el-row type="flex" class="row-bg" justify="center">
              <el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-row>
            <div class="item-block m-btns" />
          </el-form>
        </el-tab-pane>

        <el-tab-pane
          :disabled="false"
          label="套餐明细"
          name="second"
        >
          <SetmealDetail />
        </el-tab-pane>
        <el-tab-pane
          :disabled="false"
          label="购买条件设置"
          name="third"
        >
          <Condition />
        </el-tab-pane>
        <el-tab-pane
          :disabled="false"
          label="图片设置"
          name="fourth"
        >
          <PictureSet />
        </el-tab-pane>
        <el-tab-pane
          :disabled="false"
          label="特殊设置"
          name="five"
        >
          <SpecialSet />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import PictureSet from './picture-set'
import Condition from './condition'
import SpecialSet from './special-set'
import SetmealDetail from './setmeal-detail'

export default {
  // - 组织结构组件
  name: 'DrawerBox',
  components: {
    PictureSet,
    Condition,
    SpecialSet,
    SetmealDetail
  },
  props: {

  },
  data() {
    return {
      formactive: 'first',
      ruleForm: {
        activeFileName: '', // 活动文件名
        terminal: [], // 显示终端
        saleSeason: '', // 促销活动
        activeName: '', // 活动名称
        activeCode: '', // 活动编号

        startDate: '', // 开始日期
        endDate: '', // 结束日期
        giveIntergral: '', // 赠送积分

        cardAttribute: '', // 卡属性
        validityDay: '', // 有效期
        isDelay: false, // 是否延期
        delayDay: '', // 延期天数
        isDiscount: 0, // 是否折上折
        discountMode: '', // 折上折方式
        storeType: 0, // 适用区域门店
        storeRange: '', // 指定门店区域
        isUsed: 0, // 是否常用
        isSingle: 0, // 是否单次活动

        employePrice: '', // 员工价格
        experiencePrice: '', // 体验价格

        isLimit: false, // 是否限用券
        limitNum: '', // 限用张数

        isExchange: false, // 是否积分兑换
        exchangeNum: '', // 所需积分
        activeDesc: '' // 活动介绍
      },
      rules: {
        activeFileName: [
          { required: true, message: '请输入活动文件号', trigger: 'blur' },
          { min: 1, max: 15, message: '只能15个字符汉字或字母', trigger: 'blur' }
        ],
        terminal: [
          { required: true, message: '请选择显示终端', trigger: 'blur' }
        ],
        activeName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 15, message: '只能15个字符汉字或字母', trigger: 'blur' }
        ],
        activeCode: [
          { required: true, message: '请输入活动编码', trigger: 'blur' },
          { min: 1, max: 15, message: '只能15个字符汉字或字母', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择开始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', trigger: 'blur' }
        ],
        cardAttribute: [
          { required: true, message: '请选择卡属性', trigger: 'change' }
        ],
        experiencePrice: [
          { required: true, message: '请输入体验价格', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'ruleForm.isLimit': function(val) {
      if (!val) {
        this.ruleForm.limitNum = ''
      }
    },
    'ruleForm.isDelay': function(val) {
      this.ruleForm.delayDay = val ? 365 : ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
    }
  }
}
</script>

<style lang="scss">
.drawer-box {
  .el-tabs__header{
    margin: 0;
  }
}
</style>
<style lang="scss" scoped>
.drawer-box {
  position: relative;

  .form-wrap {
   padding: 10px 10px 0 26px;
  }

  .st-form {
    padding: 25px 15px 10px 15px;

    .item-block {
      display: block;
    }

    .el-input {
      width: 200px;
    }

    .m-group {
      width: 200px;
    }

    .m-chk-input {
      width: 144px;
    }

    .el-textarea {
      width: 600px;
    }
  }

  .close {
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 20px;
    float: left;
    background-color: #e4e7ed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
  }
}
</style>
