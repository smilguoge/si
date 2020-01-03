<template>
  <!-- 支付 -->
  <el-dialog
    v-el-drag-dialog
    title="支付"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    top="30px"
    :fullscreen="false"
    class="payment-dialog"
    width="1100px"
  >
    <el-form
      :model="payData"
    >
      <el-row class="row-background h68" style="margin-top:-20px">
        <el-col :span="1" class="iconfont-bar">
          <i class="iconfont icon-qian2" style="color:#F4EA2A" />
        </el-col>
        <el-col :span="12">
          <el-form-item label="订金:" label-width="70px">
            <el-input
              v-model="payData.dingjin"
              class="pay-input"
              placeholder="请输入金额"
            />
            <span class="tit-font">剩余订金：</span>
            <span class="err-color">{{ num }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="活动订金:">
            <el-input
              v-model="payData.dingjin"
              class="pay-input"
              placeholder="请输入金额"
            />
            <span class="tit-font">剩余订金：</span>
            <span class="err-color">{{ num }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-background h68">
        <el-col :span="1" class="iconfont-bar">
          <i class="iconfont icon-weixinzhifu" style="color:#6BCC03" />
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信:" label-width="70px">
            <el-input
              v-model="payData.dingjin"
              class="pay-input"
              placeholder="请输入金额"
            />
            <el-popover
              placement="right"
              width="326"
              trigger="click"
            >
              <el-image
                style="width:300px; height:300px"
                :src="imgUrl"
                fit="fill"
              />
              <el-button
                slot="reference"
                type="primary"
                size="small"
                plain
              >扫码支付</el-button>
            </el-popover>
            <span class="err-color ispay-font">{{ '未支付' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="微信支付金额:">
            <span class="info-color ">{{ num }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-background h68">
        <el-col :span="1" class="iconfont-bar">
          <i class="iconfont icon-zhifubao" style="color:#06B4FD" />
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝:" label-width="70px">
            <el-input
              v-model="payData.dingjin"
              class="pay-input"
              placeholder="请输入金额"
            />
            <el-popover
              placement="right"
              width="326"
              trigger="click"
            >
              <el-image
                style="width:300px; height:300px"
                :src="imgUrl"
                fit="fill"
              />
              <el-button
                slot="reference"
                type="primary"
                size="small"
                plain
              >扫码支付</el-button>
            </el-popover>
            <span class="suc-color ispay-font">{{ '已支付' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="支付宝支付金额:">
            <span class="info-color ">{{ num }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-background h68">
        <el-col :span="1" class="iconfont-bar">
          <i class="iconfont icon-qianbao1" style="color:#F4EA2A" />
        </el-col>
        <el-col :span="22">
          <el-form-item label="现金:" label-width="70px">
            <el-input
              v-model="payData.dingjin"
              class="pay-input"
              placeholder="请输入金额"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-background h68">
        <el-col :span="1" class="iconfont-bar">
          <i class="iconfont icon-guanlian" style="color:#6666FE" />
        </el-col>
        <el-col :span="23">
          <el-form-item label="子产业:" label-width="70px">
            <el-select v-model="payData.com" class="pay-input" placeholder="请选择子产业">
              <el-option label="应收-暄妍" value="1" />
              <el-option label="应收-蓝光" value="2" />
              <el-option label="应收-婳妍" value="3" />
            </el-select>
            <el-input
              v-model="payData.commoney"
              style="width:320px"
              class="pay-input"
              placeholder="请输入金额"
            />
            <span class="tit-font">剩余子产业订金：</span>
            <span class="err-color">{{ num }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-background">
        <el-col :span="1" class="iconfont-bar">
          <i class="iconfont icon-cardb" style="color:#06B4FD" />
        </el-col>
        <el-col :span="22">
          <el-form-item label="POS单:" label-width="70px">
            <div class="pos-table">
              <div class="pos-table-head">
                <el-button
                  type="primary"
                  class="pos-tool-btn"
                  plain
                  size="small"
                  @click="openDialog"
                >新 增</el-button>
              </div>
              <el-table :data="posTable" height="200px" fit>
                <el-table-column label="POS机类型" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.name1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="POS单信息" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.name2 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="实际交易额" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.name3 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="{row}">
                    <el-button type="danger" size="mini">删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="pay-total-bar">
        <el-col :span="6" class="right-line pay-total-wrap">
          <span>总金额:</span>
          <span class="main-color num">{{ payData.totalnum }}</span>
        </el-col>
        <el-col :span="6" :offset="1" class="pay-total-wrap">
          <span>已付金额:</span>
          <span class="info-color num">{{ payData.totalnum }}</span>
        </el-col>
        <el-col :span="6" class="pay-total-wrap">
          <span>未付金额:</span>
          <span class="err-color num">{{ payData.totalnum }}</span>
        </el-col>
      </div>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCancel"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>

    <!-- 添加单据信息 -->
    <el-dialog
      v-el-drag-dialog
      title="添加单据信息"
      :visible.sync="dialogChildVisible"
      :before-close="handleChildCancel"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="400px"
    >
      <el-form
        :model="payChildData"
        label-width="90px"
      >
        <el-form-item label="POS机类型">
          <el-select v-model="payChildData.pos" class="w100" placeholder="请选择POS机">
            <el-option label="POS-嘉联" value="1" />
            <el-option label="POS-嘉联" value="2" />
            <el-option label="POS-嘉联" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="POS单详情">
          <el-select v-model="payChildData.posorder" class="w100" placeholder="请选择信息">
            <el-option label="2000元，编码321654987" value="1" />
            <el-option label="2000元，编码321654987" value="2" />
            <el-option label="2000元，编码321654987" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="实际交易额">
          <el-input
            v-model="payChildData.sjmoney"
            class="w100"
            placeholder="请输入金额"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-col :span="23">
          <el-button @click="handleChildCancel">取 消</el-button>
          <el-button
            type="primary"
            @click="handleChildCancel"
          >确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div></el-dialog>
  </el-dialog>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
export default {
  name: '',
  directives: { elDragDialog },
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      // -
      payData: { totalnum: '23999.00' },
      payChildData: {},
      posTable: [],
      num: '9999999',
      dialogVisible: false,
      dialogChildVisible: false,
      imgUrl: 'http://img4.imgtn.bdimg.com/it/u=302619714,1453174966&fm=26&gp=0.jpg'
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() {
    // -
  },
  methods: {
    // -
    openDialog() {
      this.dialogChildVisible = !this.dialogChildVisible
    },
    handleCancel() {
      // -
      this.$parent.paymentVisible = false
    },
    handleChildCancel() {
      // -
      this.dialogChildVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.payment-dialog {
  .pay-input {
    width: 180px;
    margin-right: 10px;
  }
  .ispay-font {
    margin-left: 10px;
  }
  .h68 {
    height: 68px;
  }
  .row-background {
    padding: 16px 0 0 8px;
    margin: 10px 20px ;
    border-radius: 4px;
    background-color: #F5F7FA;
    overflow: hidden;
  }
  .iconfont-bar {
    text-align: right;
    line-height: 38px;
    .iconfont {
      font-size: 30px;
    }
  }
  .pos-table {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
    .pos-table-head {
      width: 100%;
      border-bottom: 1px solid #DCDFE6;
      .pos-tool-btn {
        width: 80px;
        margin: 10px 16px;
      }
    }
  }
  .pay-total-bar {
    height: 70px;
    margin: 10px 20px;
    border-left: 4px solid #6666FE;
    border-radius: 4px;
    background-color: #F5F7FA;
    text-align: center;
    line-height: 70px;
    font-weight: 700;
    font-size: 16px;
    .right-line {
      border-right: 4px solid #fff;
    }
  }
  .num {
    font-weight: 400;
    font-size: 18px;
  }
}
</style>
