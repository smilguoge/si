<template>
  <!-- 促销管理 活动套餐表单管理 -->
  <div class>
    <div class="close" @click="close()">
      <i class="iconfont icon-jiantou iconjiantou_you" />
    </div>
    <div style="width:98%;float:left">
      <el-tabs v-model="formactive" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <!--  -->
          <el-form
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="活动文件号" prop="activefileid">
                    <el-input v-model="ruleForm.activefileid" placeholder />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="促销活动" prop="salesactive">
                    <el-select v-model="ruleForm.salesactive" placeholder>
                      <el-option label="活动一" value="shanghai" />
                      <el-option label="活动二" value="beijing" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="显示终端" prop="terminal">
                    <el-checkbox-group v-model="ruleForm.terminal">
                      <el-checkbox label="pc" name="type">pc</el-checkbox>
                      <el-checkbox label name="wechat">微信</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="活动名称" prop="activename">
                    <el-input v-model="ruleForm.activename" placeholder />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="活动编码" prop="activecode">
                    <el-input v-model="ruleForm.activecode" placeholder />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="开始时间" prop="starttime">
                    <el-date-picker v-model="ruleForm.starttime" type="date" placeholder="选择开始时间" />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="结束时间" prop="endtime">
                    <el-date-picker v-model="ruleForm.endtime" type="date" placeholder="选择结束时间" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="赠送积分" prop="jifen">
                    <el-input v-model="ruleForm.jifen" placeholder />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="卡属性" prop="cardcate">
                    <el-select v-model="ruleForm.cardcate" placeholder>
                      <el-option label="卡类1" value="shanghai" />
                      <el-option label="卡类2" value="beijing" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="有效期" prop="validitytime">
                    <el-input v-model="ruleForm.validitytime" placeholder />天
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否可以延期 ">
                    <el-switch v-model="ruleForm.ifdelaydays" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="延期天数" prop="delaydays">
                    <el-input v-model="ruleForm.delaydays" placeholder />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <el-form-item label="适用折上折" prop="dazhe">
                    <el-radio-group v-model="ruleForm.dazhe">
                      <el-radio label="是" />
                      <el-radio label="否" />
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="是扣完券/积分/再折扣" label-width="200px" prop="num">
                    <el-input v-model="ruleForm.num" placeholder />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <el-form-item label="适用区域/门店">
                    <el-radio-group v-model="ruleForm.store">
                      <el-radio label="全部" />
                      <el-radio label="指定" />
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label label-width="0px" prop="storeout">
                    <el-input v-model="ruleForm.textinput" placeholder />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否常用">
                    <el-radio-group v-model="ruleForm.often">
                      <el-radio label="是" />
                      <el-radio label="否" />
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="员工价格" prop="employeprice">
                    <el-input v-model="ruleForm.employeprice" placeholder />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="体验价格" prop="experienceprice">
                    <el-input v-model="ruleForm.experienceprice" placeholder />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="15">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否限用券" prop="limitflag">
                    <el-radio-group v-model="ruleForm.limitflag">
                      <el-radio label="是" />
                      <input
                        v-model="ruleForm.limitnum"
                        class="quantext"
                        type="text"
                        placeholder="张数"
                      />
                      <el-radio label="否" />
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-form-item label="活动介绍" prop="desc">
              <el-input v-model="ruleForm.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane :disabled="false" label="套餐明细" name="second">套餐明细</el-tab-pane>
        <el-tab-pane :disabled="false" label="购买条件设置" name="third">购买条件设置</el-tab-pane>
        <el-tab-pane :disabled="false" label="图片设置" name="fourth">图片设置</el-tab-pane>
        <el-tab-pane :disabled="false" label="特殊设置" name="fourth">特殊设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  // - 组织结构组件
  name: 'Projecttable',
  props: {
    datalist: []
    // dateLimit: {
    //   type: Boolean,
    //   default: true
    // },

  },
  data() {
    return {
      formactive: 'first',
      ruleForm: {
        activefileid: '',
        terminal: [],
        salesactive: '',
        activename: '',
        activecode: '',

        starttime: '',
        endtime: '',
        jifen: '', //

        cardcate: '',
        validitytime: '', //
        ifdelaydays: '', //
        delaydays: '',
        dazhe: '',
        num: '', // 扣完积分再折扣
        store: '', // 门店区域  全部与否
        textinput: '', // 门店区域
        often: '',

        employeprice: '', // 员工价格
        experienceprice: '', // 体验价格

        limitflag: '', // 是否限用券
        imitflag: '', // 用券 张数
        desc: ''
      },
      rules: {
        activefileid: [
          { required: true, message: '请选择活动文件号', trigger: 'blur' },
          { min: 1, max: 15, message: '只能15个字符汉子或字母', trigger: 'blur' }
        ],
        salesactive: [
          { required: false, message: '请选择促销活动', trigger: 'blur' }
        ],
        terminal: [
          { required: true, message: '请选择条形码', trigger: 'blur' }
        ],

        activename: [
          { required: true, message: '请选择活动名称', trigger: 'blur' },
          { min: 1, max: 15, message: '只能15个字符汉子或字母', trigger: 'blur' }
        ],

        activecode: [
          { required: true, message: '请选择活动编码', trigger: 'blur' },
          { min: 1, max: 15, message: '只能15个字符汉子或字母', trigger: 'blur' }
        ],

        starttime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        endtime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],

        // jifen:[
        //    { required: true, message: '请选择结束时间', trigger: 'blur' }
        // ],
        cardcate: [
          { required: true, message: '请选择卡属性', trigger: 'change' }
        ],

        // validitytime: [
        //   { required: true, message: '有效期天数', trigger: 'change' }
        // ],
        // delaydays: [
        //   { required: true, message: '延期天数', trigger: 'change' }
        // ],

        dazhe: [
          { required: true, message: '选择是否折上折', trigger: 'change' }

        ],

        // store: [
        //   { required: true, message: '适用区域/门店"', trigger: 'change' }
        // ],

        often: [
          { required: true, message: '是否常用', trigger: 'blur' }
        ],

        employeprice: [
          { required: true, message: '请选择员工价格', trigger: 'blur' }
        ],
        experienceprice: [
          { required: true, message: '请选择体验价格', trigger: 'blur' }
        ],

        limitflag: [
          { required: true, message: '是否限制张数', trigger: 'blur' }
        ],
        limitnum: [
          { required: false, message: '限制张数', trigger: 'blur' }
        ]

      }
    }
  },
  watch: {
    // filterText(val) {
    //   this.$refs.structureTree.filter(val);
    // }
  },
  created() { },
  mounted() {

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

<style lang="scss" scoped>
.jiantou {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg);
}
.close {
  width: 2%;
  float: left;
  border-right: 2px solid #ddd;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  i {
    padding: 0 5px;
  }
}
.quantext {
  -webkit-appearance: none;
  background-color: rgb(255, 255, 255);
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(220, 223, 230);
  box-sizing: border-box;
  color: rgb(96, 98, 102);
  display: inline-block;
  font-size: inherit;
  height: 36px;
  line-height: 36px;
  outline: 0px;
  padding: 0px 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  width: 100px;
  margin: 0 20px 0 5px;
}
// .warpper {
//   position: absolute;
//   width: 80%;
//   right: 0;
//   top: 0;
//   z-index: 1;
//   height: 100%;
//   overflow-y: scroll;
// }
</style>

<style lang="scss">
</style>
