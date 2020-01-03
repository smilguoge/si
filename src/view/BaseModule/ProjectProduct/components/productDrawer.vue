<template>
  <el-drawer
    class="dialog-wrap-ly"
    direction="rtl"
    size="50%"
    close-on-press-escape
    :show-close="false"
    :wrapper-closable="false"
    :append-to-body="false"
    :modal="false"
    :visible.sync="drawerVisible"
    :before-close="handleCancel"
  >
    <el-scrollbar class="scroll-ly" style="height:calc(100% - 70px)">
      <div class="dw-wrap">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="dataSet">
            <el-form
              ref="changeData"
              label-position="right"
              class="store-dialog-ly"
              :rules="rules"
              :model="changeData"
              label-width="90px"
            >
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="产品名称" prop="name">
                    <el-input v-model="changeData.name" class="input-190" placeholder="请输入产品名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品条码" prop="bar_code">
                    <el-input v-model="changeData.bar_code" placeholder="请输入产品条码" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品简称" prop="short_name">
                    <el-input v-model="changeData.short_name" placeholder="请输入产品简称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品类别" prop="product_class_name">
                    <el-select
                      v-model="changeData.product_class_name"
                      class="w100"
                      placeholder="请选择产品类别"
                    >
                      <el-option value="" style="height:auto;padding:0">
                        <el-tree
                          ref="selectTree"
                          :data="treeData"
                          :props="props"
                          default-expand-all
                          @node-click="handleNodeClick"
                        />
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品品牌" prop="dir_product_brand_id">
                    <el-select
                      v-model="changeData.dir_product_brand_id"
                      class="w100"
                      filterable
                      clearable
                      placeholder="请选择产品品牌"
                    >
                      <el-option
                        v-for="item in brandOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value+''"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="单位" prop="dic_unit">
                    <el-select
                      v-model="changeData.dic_unit"
                      class="w100"
                      clearable
                      placeholder="请选择单位"
                    >
                      <el-option
                        v-for="item in unitOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value+''"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品规格" prop="specs">
                    <el-input v-model="changeData.specs" placeholder="请输入产品规格" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="销售价格" prop="sell_price">
                    <el-input v-model="changeData.sell_price" placeholder="请输入产品销售价（元）" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="员工价格" prop="staff_price">
                    <el-input v-model="changeData.staff_price" placeholder="请输入员工价格" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品类型" prop="type">
                    <el-select
                      v-model="changeData.type"
                      class="w100"
                      clearable
                      placeholder="请选择产品类型"
                    >
                      <el-option label="销售品" value="1" />
                      <el-option label="打样品" value="2" />
                      <el-option label="通用品" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="辅助单位" prop="dic_unit_auxiliary">
                    <el-select
                      v-model="changeData.dic_unit_auxiliary"
                      class="w100"
                      clearable
                      placeholder="请选择辅助单位"
                    >
                      <el-option
                        v-for="item in auxiliaryOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value+''"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="辅助用量" prop="auxiliary_count">
                    <el-input v-model="changeData.auxiliary_count" placeholder="请输入辅助用量" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="ERP编码" prop="erp_code">
                    <el-input v-model="changeData.erp_code" placeholder="请输入ERP编码" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="生效时间" prop="effect_time">
                    <el-date-picker
                      v-model="changeData.effect_time"
                      type="date"
                      style="width:100%"
                      value-format="timestamp"
                      clearable
                      placeholder="请选择生效时间"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="安全库存" prop="safe_stock">
                    <el-input v-model="changeData.safe_stock" placeholder="请输入安全库存数量" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="供货周期" prop="period">
                    <el-input v-model="changeData.period" placeholder="请输入供货周期" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否停用" prop="is_stop">
                    <el-switch
                      v-model="changeData.is_stop"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否替换" prop="is_exchange">
                    <el-switch
                      v-model="changeData.is_exchange"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="允许欠货" prop="is_shortage">
                    <el-switch
                      v-model="changeData.is_shortage"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="30"> -->
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item
                    label="是否积分兑换"
                    label-width="120px"
                    style="float:left"
                    prop="is_points"
                  >
                    <el-switch
                      v-model="changeData.is_points"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      @change="pointsChange('points')"
                    />
                  </el-form-item>
                  <el-form-item style="float:left" prop="points">
                    <el-input
                      v-show="changeData.is_points==1?true:false"
                      v-model="changeData.points"
                      style="width:120px;margin-left:-70px"
                      placeholder="请输入积分"
                      :disabled="changeData.is_points==1?false:true"
                    />
                  </el-form-item>
                </el-col>
                <!-- </el-row> -->
                <el-col :span="12">
                  <el-form-item
                    label="是否限制兑换"
                    label-width="120px"
                    style="float:left"
                    prop="is_points"
                  >
                    <el-switch
                      v-model="changeData.is_restri"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      @change="pointsChange('restri_num')"
                    />
                  </el-form-item>
                  <el-form-item style="float:left" prop="restri_num">
                    <el-input
                      v-show="changeData.is_restri==1?true:false"
                      v-model="changeData.restri_num"
                      style="width:120px;margin-left:-70px"
                      placeholder="请输入数量"
                      :disabled="changeData.is_restri==1?false:true"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="24">
                  <el-form-item label="备注" prop="mark">
                    <el-input v-model="changeData.mark" type="textarea" placeholder="请输入备注" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商城设置" name="shopSet" disabled>
            <span>商城设置</span>
          </el-tab-pane>
          <el-tab-pane label="地区价格设置" name="priceSet" disabled>
            <span>地区价格设置</span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
    <div class="drawer-footer">
      <el-button type="primary" @click="submitForm('changeData')">保 存</el-button>
      <el-button type="danger" @click="handleCancel">取 消</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { productData } from '@/api/BaseModule/ProjectProduct'
const dataApi = new productData()

export default {
  name: 'InlineEditTable',
  props: {
    value: {
      type: Boolean,
      required: true,
      default() {
        return false
      }
    },
    getData: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    income: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      drawerVisible: false,
      changeData: {},
      activeName: 'dataSet',
      unitOption: [],
      auxiliaryOption: [],
      brandOption: [],
      treeData: [],
      props: {
        children: 'child',
        label: 'name'
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入产品名称',
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
            message: '请输入产品简称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          }
        ],
        product_class_name: [
          {
            required: true,
            message: '请选择产品类别',
            trigger: 'blur'
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
            message: 'ERP编码由数字、小数点或字母组成',
            trigger: 'blur'
          }
        ],
        bar_code: [
          {
            required: true,
            message: '请输入产品条码',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '最多输入 20 个字符',
            trigger: 'blur'
          }
        ],
        specs: [
          {
            required: true,
            message: '请输入产品规格',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          }
        ],
        dir_product_brand_id: [
          {
            required: true,
            message: '请输选择产品品牌',
            trigger: 'change'
          }
        ],
        dic_unit_auxiliary: [
          // {
          //   required: true,
          //   message: '请输选择辅助用量单位',
          //   trigger: 'change'
          // }
        ],
        auxiliary_count: [
          // {
          //   required: true,
          //   message: '请输入辅助用量',
          //   trigger: 'blur'
          // },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '辅助用量只能是数字',
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
        staff_price: [
          {
            required: true,
            message: '请输入员工价格',
            trigger: 'blur'
          },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '员工价格只能是数字',
            trigger: 'blur'
          }
        ],
        dic_unit: [
          {
            required: true,
            message: '请输选择单位',
            trigger: 'change'
          }
        ],
        period: [
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '供货周期只能是数字',
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
        effect_time: [
          {
            required: true,
            message: '请选择生效时间',
            trigger: 'change'
          }
        ],
        is_stop: [
          {
            required: true,
            message: '请选择是否停用',
            trigger: 'change'
          }
        ],
        is_exchange: [
          {
            required: true,
            message: '请选择是否兑换',
            trigger: 'change'
          }
        ],
        is_shortage: [
          {
            required: true,
            message: '请选择是否欠货',
            trigger: 'change'
          }
        ],
        is_points: [
          {
            required: true,
            message: '请选择是否积分兑换',
            trigger: 'change'
          }
        ],
        points: [
          {
            pattern: /^[\d]{0,5}$/,
            message: '积分数由 0-5 个数字组成',
            trigger: 'blur'
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
    },
    getData(val) {
      this.changeData = val
    },
    income(data) {
      this.treeData = data
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
          if (
            this.changeData.is_points &&
            this.changeData.is_points == 1 &&
            (!this.changeData.points || this.changeData.points == 0)
          ) {
            this.$message.warning('请输入兑换产品所需的积分数！')
            return
          }

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
      // - 获取所有选项数据
      dataApi.gcreate().then(res => {
        const items = res.data
        this.unitOption = items.dic_unit
        this.auxiliaryOption = items.dic_unit_auxiliary
        this.brandOption = items.dir_product_brand_id
      })
    },
    pointsChange(val, type) {
      // 清除单个字段验证报错
      if (val === '0') {
        const checkField = this.$refs['changeData'].fields
        checkField.map(ele => {
          if (ele.prop === type) {
            ele.resetField()
            return false
          }
        })
        if (type === 'points') {
          delete this.changeData.points
        } else {
          delete this.changeData.restri_num
        }
      }
    },

    handleNodeClick(node) {
      // - Select-Tree 选择
      if (!node.hasOwnProperty('child')) {
        this.changeData.product_class_name = node.name
        this.changeData.product_class_id = node.id
      }
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
    height: calc(100% - 60px);
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
.el-scrollbar__wrap.scroll-ly
{
  overflow-x: hidden;
}
</style>
<style lang="css">
.store-dialog-ly .el-form-item__error {
  width: 210px;
}
</style>
