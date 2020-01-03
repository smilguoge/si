<template>
  <!-- 销售开单审批 -->
  <el-dialog
    title="销售开单审批"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    top="8px"
    class="order-approval-dialog"
    width="960px"
  >
    <el-row class="info-row" style="margin-top:-16px">
      <el-col :span="7" :offset="1">
        <span class="tit-font">会员编号：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
      <el-col :span="8">
        <span class="tit-font">会员姓名：</span>
        <span class="num info-color">{{ approvalData.name }}</span>
      </el-col>
      <el-col :span="7">
        <span class="tit-font">顾客属性：</span>
        <span class="num info-color">{{ approvalData.attr }}</span>
      </el-col>
    </el-row>
    <el-row class="info-row">
      <el-col :span="7" :offset="1">
        <span class="tit-font">顾客等级：</span>
        <span class="num info-color">{{ approvalData.level }}</span>
      </el-col>
      <el-col :span="8">
        <span class="tit-font">手机号码：</span>
        <span class="num info-color">{{ approvalData.phone }}</span>
      </el-col>
      <el-col :span="7">
        <span class="tit-font">出生日期：</span>
        <span class="num info-color">{{ approvalData.day | parseTime( '{y}-{m}-{d}' ) }}</span>
      </el-col>
    </el-row>
    <el-row class="info-row">
      <el-col :span="7" :offset="1">
        <span class="tit-font">积分：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
      <el-col :span="8">
        <span class="tit-font">订金：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
      <el-col :span="7">
        <span class="tit-font">欠货：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
    </el-row>
    <el-row class="info-row">
      <el-col :span="7" :offset="1">
        <span class="tit-font">星级：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
      <el-col :span="15">
        <span class="tit-font">有效业绩：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
        <el-button type="text" class="text-btn">查看业绩分摊明细</el-button>
      </el-col>
    </el-row>
    <el-row class="info-row">
      <el-col :span="7" :offset="1">
        <span class="tit-font">合计：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
      <el-col :span="8">
        <span class="tit-font">实收金额：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
      <el-col :span="7">
        <span class="tit-font">实付金额：</span>
        <span class="num info-color">{{ approvalData.code }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="approval-table">
          <el-table
            :data="approvalData.table1"
            height="240px"
            class="item-table"
            fit
          >
            <el-table-column
              align="center"
              label="NO."
              fixed="left"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="所属套餐"
            >
              <template slot-scope="{row}">
                {{ row.name2 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="项目名称"
            >
              <template slot-scope="{row}">
                {{ row.name3 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="单价"
            >
              <template slot-scope="{row}">
                {{ row.name4 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="数量"
            >
              <template slot-scope="{row}">
                {{ row.name5 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="小计"
            >
              <template slot-scope="{row}">
                {{ row.name6 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="实收小计"
            >
              <template slot-scope="{row}">
                {{ row.name7 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="欠货数量"
            >
              <template slot-scope="{row}">
                {{ row.name8 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="套餐价格"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="套餐数量"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="套餐总计"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="优惠方式"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="折扣"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="抵扣金额"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="兑换金额"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="积分兑换金额"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="套餐实收总计"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="套餐实付总计"
            >
              <template slot-scope="{row}">
                {{ row.name9 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="备注"
            >
              <template slot-scope="{row}">
                {{ row.mask }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row class="clearfix">
      <el-col :span="2" :offset="1">
        <span class="tit-font">审批意见：</span>
      </el-col>
      <el-col :span="20">
        <el-input v-model="approvalData.mask" type="textarea" />
      </el-col>
    </el-row>
    <el-row class="approvalLine">
      <el-col :span="23">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in approvalData.sort"
            :key="index"
            :timestamp="handleTime(item.time)"
            :type="handleStatus(item.status)"
            placement="top"
          >
            <el-card class="line-card">
              <el-col :span="4">
                <el-avatar :size="62" class="name-wrap">
                  {{ item.name }}
                </el-avatar>
              </el-col>
              <el-col :span="20">
                <h4>{{ item.name+'-'+item.position }}</h4>
                <p>{{ item.content }}</p>
              </el-col>
              <div style="clear:both" />
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card class="line-card">
              <el-col :span="4">
                <el-avatar :size="62" class="name-wrap">
                  <span>归档</span>
                </el-avatar>
              </el-col>
              <el-col :span="20">
                <h4>
                  <span>{{ approvalData.cname.length + '人抄送' }}</span>
                </h4>
                <p>
                  <span v-for="(item, index) in approvalData.cname" :key="index">{{ item + '；' }}</span>
                </p>
              </el-col>
              <div style="clear:both" />
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
    <div style="clear:both" />
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleCancel">退 回</el-button>
        <el-button type="primary" @click="handleCancel">转 办</el-button>
        <el-button type="primary" @click="handleCancel">转 发</el-button>
        <el-button type="primary" @click="handleCancel">审批通过</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: '',
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
      approvalData: {
        code: '123',
        name: 'TestName',
        attr: '售后',
        level: '99',
        phone: '15998745621',
        day: 1346546547789,
        // ...
        table: [],
        sort: [
          { time: 1596547895125, name: '张飒飒', position: '门店顾问', content: '发起申请', status: '1' },
          { time: 1596547999999, name: '李四嘿嘿', position: '业务经理', content: '同意申请', status: '3' },
          { time: 1596559874521, name: '王五', position: '财务主管', content: '审批中', status: '2' }
        ], // 审批过程
        cname: ['路人甲', '路人乙', '路人丁'] // 抄送
      },
      dialogVisible: false,
      flagTime: 0
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
    handleSubmit(formName) {
      const curr = new Date()
      if (curr - this.flagTime > 1000) {
        this.handleCancel()
        this.flagTime = curr
      }
    },
    handleCancel() {
      this.$parent.approvalVisible = false
      this.dialogVisible = false
    },
    handleStatus(val) {
      // - 审批信息前面的颜色
      if (val == 1) {
        return 'primary'
      } else if (val == 2) {
        return 'warning'
      } else {
        return 'success'
      }
    },
    handleTime(timer) {
      // - 处理时间戳
      let newTime = null
      if ((timer + '').length < 13) {
        newTime = new Date(Math.floor(timer * 1000))
      } else {
        newTime = new Date(parseInt(timer))
      }

      const time = new Date(newTime)
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hours = time.getHours()
      let minute = time.getMinutes()

      if (month < 10) { month = '0' + month }
      if (date < 10) { date = '0' + date }
      if (hours < 10) { hours = '0' + hours }
      if (minute < 10) { minute = '0' + minute }

      return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
    }
  }
}
</script>
<style lang="scss" scoped>
.order-approval-dialog{
  .el-dialog__body {
    height: 900px;
  }
  .num {
    font-size: 16px;
  }
  .approval-table {
    margin: 20px 0;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    overflow: hidden;
  }
  .info-row {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    .text-btn {
      padding: 0;
      margin-left: 20px;
    }
  }
  .approvalLine {
    margin-top: 24px;
    .line-card {
      .name-wrap {
        font-size: 14px;
      }
      h4,p {
        margin: 10px 0
      }
    }
  }
}
</style>
<style lang="scss">
</style>
