<template>
  <el-drawer
    class="dialog-wrap-ly"
    direction="rtl"
    size="70%"
    close-on-press-escape
    :show-close="false"
    :wrapper-closable="false"
    :append-to-body="false"
    :modal="false"
    :visible.sync="drawerVisible"
    :before-close="handleCancel"
  >

    <el-scrollbar class="scroll-ly" style="height:calc(100% - 70px)">
      <div class="psty1">
      <el-button
        class="filter-item"
        type="primary"
      >打印</el-button>
      <el-button
        class="filter-item"
        type="primary"
      >导出</el-button>
    </div>
      <div class="dw-wrap">
            <el-form
              ref="changeData"
              label-position="right"
              class="store-dialog-ly"
              :rules="rules"
              :model="changeData"
              label-width="80px"
            >
              <el-row :gutter="30">
                <el-col :span="7">
                  单据号：RK19444444444{{}}
                </el-col>
                <el-col :span="4">
                  门店：万达店{{}}
                </el-col>
                <el-col :span="5">
                  操作人：王春燕{{}}
                </el-col>
               <el-col :span="8" >
                  操作时间：2019-10-15 12：20：30{{}}
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="入库类型" prop="stock_type">
                    <el-select
                      v-model="tempdata.stock_type"
                      filterable
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in stocklist"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="对方单位" prop="stock_type">
                    <el-select
                      v-model="tempdata.stock_type"
                      filterable
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in shoplist"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>


              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注" prop="mark">
                    <el-input v-model="changeData.mark" type="textarea" placeholder="请输入备注" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
      </div>

    </el-scrollbar>
    <div class="drawer-footer">
      <el-button type="danger" @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('changeData')">保 存</el-button>
    </div>

  </el-drawer>
</template>

<script>
import { projectData } from '@/api/BaseModule/ProjectProduct'
const dataApi = new projectData()

export default {
  name: 'EditTable',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    getData: {
      type: Object,
      required: true
    },
    stocklist: {
      type: Array,
      // default: function () { return [] }
      default: () => []
    }

  },
  data() {
    return {
      tempdata:{
        stock_type:1,
        out_stock:0,
        purchase_order:'',
        supplier_id:0,
        remark:'',
        detail:{}
      },
      shoplist:[
        {code:1,
        name:"万达"},
        {code:2,
        name:"瑞景"}
      ],
      drawerVisible: false,
      changeData: {},
      activeName: 'dataSet',
      optionProperty: [],
      optionPortrait: [],
      optionClass: [{ id: 1, name: '类别1' }],
      rules: {
        name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          }
        ],
        short_name: [
          {
            required: true,
            message: '请输入项目简称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          }
        ],
        project_class_id: [
          {
            required: true,
            message: '请选择项目类别',
            trigger: 'change'
          }
        ],
        erp_code: [
          {
            required: true,
            message: '请输入ERP编码',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9\.]+$/,
            message: 'ERP编码由数字、小数点以及字母组成',
            trigger: 'blur'
          }
        ],
        valid_day: [
          {
            required: true,
            message: '请输入有效天数',
            trigger: 'blur'
          },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '有效天数只能是数字',
            trigger: 'blur'
          }
        ],
        hand_price: [
          {
            required: true,
            message: '请输入项目工耗',
            trigger: 'blur'
          },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '项目工耗只能是数字',
            trigger: 'blur'
          }
        ],
        sell_price: [
          {
            required: true,
            message: '请输入销售价格',
            trigger: 'blur'
          },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '销售价格只能是数字',
            trigger: 'blur'
          }
        ],
        spen_time: [
          // {
          //   required: true,
          //   message: "请输入项目用时",
          //   trigger: "blur"
          // },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '项目用时只能是数字',
            trigger: 'blur'
          }
        ],

        card_count: [
          // {
          //   required: true,
          //   message: "请输入存卡数量",
          //   trigger: "blur"
          // },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '存卡数量只能是数字',
            trigger: 'blur'
          }
        ],
        safe_stock: [
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '安全库存只能是数字',
            trigger: 'blur'
          }
        ],
        property: [
          {
            required: true,
            message: '请选择关联资产',
            trigger: 'change'
          }
        ],
        effect_time: [
          {
            required: true,
            message: '请选择生效时间',
            trigger: 'change'
          }
        ],
        portrait: [
          {
            required: true,
            message: '请选择关联画像',
            trigger: 'change'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择项目状态',
            trigger: 'change'
          }
        ],
        mark: [
          {
            max: 50,
            message: '最多输入 50 个字符',
            trigger: 'blur'
          }
        ]
      },
      flagTime: 0
    }
  },
  watch: {
    value(val) {
      this.drawerVisible = val
      this.$emit('mark', val)
    },
    getData(val) {
      this.changeData = val
    }
  },
  created() {
    this.getOption()
  },
  methods: {
    handleCancel() {
      this.$emit('clear')
      this.resetForm('changeData')
    },
    // - 提交验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // - 提交请求
          const curr = new Date()
          if (curr - this.flagTime > 1000) {
            this.$emit('save', this.changeData)
            this.flagTime = curr
          }
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = {}
    },
    getOption() {
      // - get option
      dataApi.gcreate().then(res => {
        const items = res.data
        this.optionPortrait = items.dir_product_brand_id
        this.optionProperty = items.dir_product_brand_id
      })
    }
  }
}
</script>

<style lang="scss" scope>
.dialog-wrap-ly {
  position: absolute;
  height: 100%;

  .el-drawer__header {
    display: none;
  }
  .el-drawer__body{
    height: calc(100% - 70px);
  }
  .drawer-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    background-color: #fff;
    .el-button {
      width: 44%;
    }
  }
  .dw-wrap {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
<style lang="css">
.store-dialog-ly .el-form-item__error {
  width: 210px;
}
</style>
