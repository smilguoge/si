<template>
  <!-- 临时赠送审批 -->
  <el-dialog
    title="流程详情"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    top="10px"
    class="approval-dialog"
    width="1000px"
  >
    <!-- <div class="vh65"> -->
    <el-form
      :model="detailData"
    >
      <el-col :span="5" :offset="1">
        <el-form-item label="流程名称:">
          <span>{{ detailData.name }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="发起人:">
          <span>{{ detailData.name1 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="发起门店:">
          <span>{{ detailData.name2 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="发起时间:">
          <span>{{ detailData.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="22" :offset="1">
        <div class="temporary-table">
          <!-- <div class="temporary-head">
            <el-button
              type="primary"
              size="mini"
              @click="openDialog('create')"
            >新 增</el-button>
          </div> -->
          <el-table
            :data="detailData.table1"
            height="160px"
            fit
          >
            <el-table-column
              align="center"
              label="门店"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="会员姓名"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="会员编号"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="赠送内容"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="数量"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="赠送日期"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="失效日期"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="赠送人"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="赠送类型"
            >
              <template slot-scope="{row}">
                {{ row.name1 }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="22" :offset="1" style="margin-top:16px">
        <el-form-item label="申请原因:">
          <el-input v-model="detailData.mask1" type="textarea" style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="22" :offset="1">
        <el-form-item label="审批意见:">
          <el-input v-model="detailData.mask2" type="textarea" style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="23" :offset="0" class="approvalLine">
        <!-- 审批组件 -->
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in detailData.sort"
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
                  <span>{{ detailData.cname.length + '人抄送' }}</span>
                </h4>
                <p>
                  <span v-for="(item, index) in detailData.cname" :key="index">{{ item + '；' }}</span>
                </p>
              </el-col>
              <div style="clear:both" />
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-form>

    <!-- </div> -->
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button type="primary" @click="handleCancel">同 意</el-button>
        <el-button type="primary" @click="handleCancel">转 交</el-button>
        <el-button type="danger" @click="handleCancel">拒 绝</el-button>
        <el-button @click="handleCancel">取 消</el-button>
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
      detailData: {
        name: '套餐赠送',
        name1: '刘哈哈',
        name2: '春熙路店',
        time: 1599874563212,
        mask1: '无原因',
        mask2: '无意见',
        table1: [],
        sort: [
          { time: 1596547895125, name: '张飒飒', position: '门店顾问', content: '发起申请', status: '1' },
          { time: 1596547999999, name: '李四嘿嘿', position: '业务经理', content: '同意申请', status: '3' },
          { time: 1596559874521, name: '王五', position: '财务主管', content: '审批中', status: '2' }
        ], // 审批过程
        cname: ['路人甲', '路人乙', '路人丁'] // 抄送
      },
      dialogType: '',
      dialogVisible: false,
      dialogChildVisible: false,
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
    openDialog(type, data) {
      if (type === 'create') {
        // -
        this.childData = {}
        this.dialogChildVisible = true
      } else {
        // -
        this.childData = JSON.parse(JSON.stringify(data))
        this.dialogChildVisible = true
      }
    },
    handleChildCancel() {
      this.childData = {}
      this.dialogChildVisible = false
    },
    handleCancel() {
      this.$parent.dialogApprovalVisible = false
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
.approval-dialog {
  .temporary-table {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    overflow: hidden;
    .temporary-head {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid #dcdfe6;
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
