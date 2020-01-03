<template>
  <div class="setting-body">
    <el-dialog
      title="班次设置"
      :visible.sync="this.sySetting"
      width="40%"
      :before-close="handleClose"
      top="5vh"
    >
      <div class="Setting-center">
        <div class="Setting-top">
          <span>门店:</span>
          <el-autocomplete
            v-model="state"
            popper-class="my-autocomplete"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            size="mini"
            @select="handleSelect"
          >
            <i slot="suffix" class="el-icon-edit el-input__icon" @click="handleIconClick" />
            <template slot-scope="{ item }">
              <div class="name">{{ item.name }}</div>
            </template>
          </el-autocomplete>
          <!-- <el-button type="primary" size="mini" @click="querydata()">查询</el-button> -->
        </div>
        <div class="Setting-button">
          <el-button type="primary" size="mini" plain @click="settingAdd()">添加</el-button>
          <el-button type="primary" size="mini" plain @click="settingDelete()">删除</el-button>
        </div>
        <div class="Setting-table">
          <el-table
            ref="multipleTable"
            :data="settingData"
            tooltip-effect="dark"
            style="width: 100%; "
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="班次" width="140" align="center" prop="dic_classes" />
            <el-table-column prop="dic_period" label="段次" width="140" align="center" />
            <el-table-column label="时间段" align="center">
              <template slot-scope="scope">{{ scope.row.start_at + "-"+scope.row.end_at }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <el-dialog
          width="800px"
          title="新增"
          :visible.sync="innerVisible"
          append-to-body
          :close-on-click-modal="false"
        >
          <div class="setting-nei-Dialog">
            <el-form
              ref="settingForm"
              :model="settingForm"
              :rules="rules"
              label-width="1px"
              class="demo-ruleForm"
            >
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-form-item prop="dic_classes" style="margin:0px;">
                    <el-select v-model="settingForm.dic_classes" placeholder="请选择班次">
                      <el-option
                        v-for="item in setting_class"
                        :key="item.index"
                        :label="item.label"
                        :value="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="dic_period">
                    <el-select v-model="settingForm.dic_period" placeholder="请选择段次">
                      <el-option
                        v-for="item in setting_period"
                        :key="item.index"
                        :label="item.label"
                        :value="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item prop="start_at">
                    <el-time-select
                      v-model="settingForm.start_at"
                      placeholder="起始时间"
                      :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '23:45'
                      }"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item prop="end_at">
                    <el-time-select
                      v-model="settingForm.end_at"
                      placeholder="结束时间"
                      :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '23:45',
                      }"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0" type="flex" justify="end" style="display:none">
                <el-form-item>
                  <el-button ref="upload" @click="resetForm('settingForm')">取消</el-button>
                  <el-button ref="upload2" type="primary" @click="submitForm('settingForm')">提交</el-button>
                </el-form-item>
              </el-row>
              <!-- 隐藏 -->
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resetFormArr()">取 消</el-button>
            <el-button type="primary" @click="submitFormadd()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setClose()">取 消</el-button>
        <el-button type="primary" @click="settingAddpost()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { ShiftsStoreGet } from '@/api/ManageHr/Schedu.js'
import {
  ShiftsSettingGet,
  ShiftsSettingCreate,
  ShiftsSettingSetD
} from '@/api/ManageHr/Schedu.js'
export default {
  props: {
    sySetting: false
  },
  data() {
    return {
      // input 数据
      restaurants: [],
      state: '',
      dataId: {
        shop_ids: ''
      },
      AddId: null,
      //   table
      settingData: [],
      // 弹框
      innerVisible: false,
      // 新增
      settingForm: {
        schedule_code: 112233,
        dic_classes: '',
        dic_period: '',
        start_at: '',
        end_at: ''
      },
      //
      rules: {
        dic_classes: [
          {
            required: true,
            message: '请选择班次',
            trigger: 'change'
          }
        ],
        dic_period: [
          {
            required: true,
            message: '请选择段次',
            trigger: 'change'
          }
        ],
        start_at: [
          {
            required: true,
            message: '请选择起始时间',
            trigger: 'change'
          }
        ],
        end_at: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }
        ]
      },
      // 选择列表
      setting_class: [],
      setting_period: [],
      multipleSelection: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 数据渲染
    getData() {
      // 获取数据
      ShiftsStoreGet().then(res => {
        this.restaurants = res.data
      })
    },
    // el 事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.setClose()
        })
        .catch(_ => {})
    },
    // el -table
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 门店 input
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) !==
          -1
        )
      }
    },
    handleSelect(item) {
      this.state = item.name
      this.dataId.shop_ids = item.id
      this.querydata()
    },
    handleIconClick(ev) {
      this.state = ''
      this.dataId.shop_ids = ''
    },
    // 自定义事件
    // 查询
    querydata() {
      ShiftsSettingGet(this.dataId).then(res => {
        this.settingData = res.data.list
        if (res.code == 200) {
          this.AddId = this.dataId.shop_ids
          this.setting_class = res.data.dic.dic_schedule_classes
          this.setting_period = res.data.dic.dic_schedule_period
        }
      })
    },
    // 关闭
    setClose() {
      this.$emit('update:sySetting', false);
      // 数据初始化
      (this.state = ''), (this.dataId.shop_ids = ''), (this.AddId = null)
      this.settingData = []
    },
    // 添加
    settingAdd() {
      if (this.AddId) {
        this.innerVisible = true
      } else {
        this.$message({
          message: '请选择门店',
          type: 'warning'
        })
      }
    },
    // 新增
    submitFormadd() {
      this.$refs.upload2.$el.click()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.settingAddpost();
          const data = JSON.parse(JSON.stringify(this.settingForm))
          this.settingData.push(data)
          // console.log(this.settingData);
          this.resetFormArr()
        } else {
          this.$message({
            message: '请填写完整',
            type: 'warning'
          })
          return false
        }
      })
    },
    settingAddpost() {
      const data = this.settingDatezhuang()
      ShiftsSettingCreate(data).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '成功',
            type: 'success'
          })
          this.dataId.shop_ids = this.AddId
          this.querydata()
          this.setClose()
          this.$parent.querydata()
        }
      })
    },
    // 新增时间转换
    settingDatezhuang() {
      const data = JSON.parse(JSON.stringify(this.settingData))
      if (data.length > 0) {
        data.forEach(item => {
          item.start_at = Math.round(
            Date.parse('2019/2/15 ' + item.start_at + ':00') / 1000
          )
          item.end_at = Math.round(
            Date.parse('2019/2/15 ' + item.end_at + ':00') / 1000
          )
          item.schedule_code = 112233
          if (item.dic_classes == '早班') {
            item.dic_classes = 1
          } else if (item.dic_classes == '晚班') {
            item.dic_classes = 2
          } else if (item.dic_classes == '通班') {
            item.dic_classes = 3
          }
          if (item.dic_period == '上午') {
            item.dic_period = 1
          } else if (item.dic_period == '下午') {
            item.dic_period = 2
          } else if (item.dic_period == '晚上') {
            item.dic_period = 3
          }
        })
      }
      const list = {
        id: this.AddId,
        shop_id: this.AddId,
        detail: data
      }
      return list
    },
    // 删除
    settingDelete() {
      const val = this.multipleSelection
      val.forEach((val, index) => {
        this.settingData.forEach((v, i) => {
          if (val == v) {
            this.settingData.splice(i, 1)
          }
        })
      })
      this.$message({
        message: '成功',
        type: 'success'
      })
    },

    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    resetFormArr() {
      this.$refs.upload.$el.click()
      this.innerVisible = false
    },
    // 父组件事件
    handleEditTwo(id, name) {
      this.AddId = id
      this.dataId.shop_ids = id
      this.state = name
      this.querydata()
    }
  }
}
</script>
<style scoped>
.Setting-center {
  width: 100%;
}
.Setting-top {
  display: flex;
  height: 35px;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.Setting-top > span {
  padding-right: 15px;
}
.Setting-top > button {
  margin-left: 15px;
}
.Setting-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  margin: 15px 0 5px 0;
}
.Setting-table {
  width: 100%;
  height: 45vh;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
<style >
.setting-body .el-dialog__body {
  padding: 0 10px;
}
</style>
<style >
.setting-nei-Dialog element.style {
  margin-left: 0;
}
</style>
