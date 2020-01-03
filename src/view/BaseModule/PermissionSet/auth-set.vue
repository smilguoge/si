<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        class="search-form"
      >
        <el-form-item>
          <el-input
            v-model="listQuery.name"
            style="width: 160px;"
            placeholder="请输入权限组名称"
            prefix-icon="el-icon-search"
            class="filter-item"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listQuery.is_special"
            style="width: 160px;"
            class="filter-item"
            placeholder="请选择是否特殊"
            clearable
          >
            <el-option
              v-for="item in optionState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="submitSearch(listQuery.is_special)"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="openDialog('create')"
      >添加</el-button>
    </div>

    <!-- Table -->
    <div class="table-wrap-ly">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        height="100%"
        class="table-body-ly"
        stripe
        border
      >
        <el-table-column
          label="序号"
          align="center"
        >
          <template slot-scope="{row}">{{ row.id }}</template>
        </el-table-column>
        <el-table-column
          label="是否特殊"
          align="center"
        >
          <template slot-scope="{row}">{{ row.is_special==1?'是':'否' }}</template>
        </el-table-column>
        <el-table-column
          label="名称"
          align="center"
        >
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag
              :type="row.status ==1 ? 'success' : 'danger'"
              close-transition
            >{{ row.status ==1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作人"
          align="center"
        >
          <template slot-scope="{row}">{{ row.operator }}</template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="center"
        >
          <template slot-scope="{row}">{{ row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="230"
          fixed="right"
          align="center"
        >
          <template slot-scope="{row}">
            <el-button
              :size="miniSize"
              type="warning"
              @click="openOptionDialog(row.id, row.is_special)"
            >配置</el-button>
            <el-button
              :size="miniSize"
              type="primary"
              @click="openDialog('edit',row.id)"
            >编辑</el-button>
            <el-button
              :size="miniSize"
              type="danger"
              @click="deleteSubmit(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="m-footer main-page">
        <el-pagination
          v-show="total>0"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30]"
          :page-size="listQuery.page_size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      title="新建权限"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form
        ref="changeData"
        label-position="left"
        :rules="rules"
        :model="changeData"
        :label-width="formLabelWidth"
      >
        <el-col :span="23">
          <el-form-item label="是否特殊">
            <el-radio-group
              v-model="changeData.is_special"
              @change="specialChange"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="岗位名称"
            prop="name"
          >
            <!-- 特殊 -->
            <el-input
              v-if="changeData.is_special==1"
              v-model="changeData.name"
              placeholder="请输入名称"
            />
            <!-- 非特殊 -->
            <el-select
              v-if="changeData.is_special==0"
              v-model="changeData.name"
              class="w100"
              filterable
              clearable
              placeholder="请输入岗位名称"
            >
              <el-option
                v-for="item in optionDepart"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="状态"
            prop="status"
          >
            <el-radio-group v-model="changeData.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        :span="23"
      >
        <el-col :span="23">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button
            type="primary"
            @click="submitForm('changeData')"
          >确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>

    <!-- 权限配置表 -->
    <el-dialog
      title="权限配置"
      :visible.sync="optionDialogVisible"
      :before-close="handleOptionClose"
      :width="optionDialogWidth"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName">
        <!-- 成员配置 -->
        <el-tab-pane
          label="成员配置"
          name="member"
          :disabled="is_special==1?false:true"
        >
          <div class="clearfix">
            <!-- 组织结构 -->
            <div class="left-b">
              <el-scrollbar style="height:100%">
                <structure
                  ref="tree"
                  :structure-data="departTree"
                  :is-select="true"
                  @getCheck="getCheck($event)"
                />
              </el-scrollbar>
            </div>
            <div class="center-b">
              <el-button
                type="primary"
                :size="miniSize"
                @click="addCheck"
              >添加</el-button>
              <el-button
                type="primary"
                :size="miniSize"
                @click="delCheck"
              >移除</el-button>
            </div>
            <!-- 员工列表 -->
            <div class="right-b">
              <el-table
                v-loading="memberLoading"
                :data="memberData"
                height="500"
                class="main-table"
                stripe
                border
                @selection-change="multipleChange"
              >
                <el-table-column
                  type="selection"
                  width="50"
                  align="center"
                />
                <el-table-column
                  prop="name"
                  label="员工姓名"
                  align="center"
                />
                <el-table-column
                  prop="account"
                  label="登陆账号"
                  align="center"
                />
                <el-table-column
                  prop="shop"
                  label="所属门店"
                  align="center"
                />
                <el-table-column
                  prop="position"
                  label="任职岗位"
                  align="center"
                />
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <!-- 功能权限配置 -->
        <el-tab-pane
          label="功能权限配置"
          name="auth"
        >
          <auth-config
            ref="authConfig"
            :get-gid="groupId"
            :option-data="optionData"
            :option-label="optionLabel"
          />
        </el-tab-pane>
      </el-tabs>

      <div
        slot="footer"
        class="dialog-footer"
        :span="23"
      >
        <el-col :span="23">
          <el-button @click="handleOptionClose">取 消</el-button>
          <el-button
            type="primary"
            @click="throttleSubmit"
          >确 认</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Structure from '@/component/Structure/index'
import authConfig from './component/authConfig'
import { getDepartTree, positionList } from '@/api/BaseModule/SetManage'
import { authGroup, authGroupDetail } from '@/api/BaseModule/PermissionSet'
const authApi = new authGroup()
const authDetailApi = new authGroupDetail()

export default {
  name: 'AuthSet',
  components: {
    Structure,
    authConfig
  },
  data() {
    return {
      tableData: [],

      changeData: { is_special: 0 },

      // - 权限配置表
      optionLabel: [],
      optionData: [],
      optionLabel1: [
        { name: '功能名称', prop: 'name' },
        { name: '添加', prop: 'is_add' },
        { name: '修改', prop: 'is_edit' },
        { name: '删除', prop: 'is_del' },
        { name: '审核', prop: 'is_audit' },
        { name: '打印', prop: 'is_print' },
        { name: '导入', prop: 'is_import' },
        { name: '导出', prop: 'is_export' }
      ],
      optionData1: [
        {
          id: 1,
          name: '基础模块',
          child: [
            {
              id: 3,
              name: '设置管理',
              child: [
                {
                  id: 5,
                  name: '辞典设置',
                  is_add: 1,
                  is_edit: 1,
                  is_del: 1,
                  is_audit: 1,
                  is_print: 1,
                  is_import: 1,
                  is_export: 1
                },
                {
                  id: 7,
                  name: '门店设置',
                  is_add: 1,
                  is_edit: 1,
                  is_del: 1,
                  is_audit: 1,
                  is_print: 1,
                  is_import: 1,
                  is_export: 1
                },
                {
                  id: 8,
                  name: '公司设置',
                  is_add: 1,
                  is_edit: 1,
                  is_del: 1,
                  is_audit: 1,
                  is_print: 1,
                  is_import: 1,
                  is_export: 1
                }
              ]
            }
          ]
        }
      ],

      departTree: [],

      // - 成员配置表
      memberData: [],
      selectData: [], // 默认选中的员工id
      memberMultipleData: [], // 人员配置复选

      // - 选项
      optionState: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
      optionDepart: [],

      resultData: {}, // 组装数据
      deepArr: [], // copy staffId

      // - 验证规则
      rules: {
        name: [
          {
            required: true,
            message: '权限组名称不能为空！',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入 15 个字符',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }
        ]
      },

      // - 选项卡默认项
      activeName: '',

      // - 弹框配置
      dialogType: '',
      dialogVisible: false,
      optionDialogVisible: false,

      total: null,
      listQuery: {
        page: 1,
        page_size: 10,
        name: '',
        is_special: '',
        is_check: ''
      },

      groupId: 0,
      is_special: null,
      // - 参数配置
      listLoading: false,
      memberLoading: false,
      flagTime: 0,
      miniSize: 'mini',
      dialogWidth: '430px',
      optionDialogWidth: '1100px',
      formLabelWidth: '90px'
    }
  },
  created() {
    this.getTable(this.listQuery)
    this.getPositionList()
  },
  methods: {
    // - 弹框调用
    openDialog(type, id) {
      if (type === 'create') {
        this.dialogType = type
        this.dialogVisible = true
      } else {
        // - request
        this.listLoading = true
        authApi
          .gupdate({ id })
          .then(res => {
            const data = res.data
            this.changeData = data
            console.log(data)
            this.dialogType = type
            this.listLoading = false
            this.dialogVisible = true
          })
          .catch(res => {
            this.$message.warning('数据请求失败')
            return
          })
      }
    },

    getPositionList() {
      positionList().then(res => {
        this.optionDepart = res.data
      })
    },

    // - 权限配置弹框 1:特殊/0:非特殊
    openOptionDialog(id, state) {
      this.listLoading = true
      authDetailApi.gupdate({ id }).then(res => {
        const items = res.data
        this.resultData.group_id = id
        this.groupId = id
        this.is_special = items.is_special
        this.optionLabel = items.optionLabel
        this.optionData = items.optionData
        this.memberData = items.arrStaff

        if (items.arrStaff && items.arrStaff.length > 0) {
          items.arrStaff.forEach(ele => {
            this.selectData.push(ele.id)
          })
        }
        if (state === 1) {
          getDepartTree().then(res => {
            const items = res.data
            if (items.length) {
              this.departTree = items
            } else {
              this.departTree = []
              this.$message.warning('没有更多数据')
            }
          })
          this.activeName = 'member'
          this.optionDialogVisible = true
          this.listLoading = false
        } else {
          this.activeName = 'auth'
          this.optionDialogVisible = true
          this.listLoading = false
        }
        return
      })
    },

    // - 提交验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const curr = new Date()
          if (curr - this.flagTime > 1000) {
            this.handleDone(this.dialogType)
            this.flagTime = curr
          }
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },

    // - 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = { is_special: 0 }
    },

    // - 创建/修改主表数据
    handleDone(type) {
      if (type == 'create') {
        // - request
        authApi
          .create(this.changeData)
          .then(res => {
            this.getTable(this.listQuery)
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            this.$message.warning('数据创建失败')
            return
          })
      } else {
        // - request
        console.log(this.changeData)
        authApi
          .update(this.changeData)
          .then(res => {
            this.getTable(this.listQuery)
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            this.$message.warning('数据更新失败')
            return
          })
      }
    },

    // - 新建切换是否特殊
    specialChange(val) {
      const checkField = this.$refs['changeData'].fields
      checkField.map(ele => {
        if (ele.prop === 'name') {
          ele.resetField()
          return false
        }
      })
      delete this.changeData.name
    },

    // - 节流提交
    throttleSubmit() {
      const curr = new Date()
      if (curr - this.flagTime > 2000) {
        this.submitOptionTable()
        this.flagTime = curr
        return
      }
    },
    // - 配置表格提交
    submitOptionTable() {
      const buttonData = this.$refs.authConfig.optionData // button data
      const fieldData = this.$refs.authConfig.fieldArr // field data
      const staffData = this.memberData // staff data
      if (!buttonData.length) {
        return console.log('权限功能按钮数据不能为空')
      }
      this.deepQuery(buttonData) // deepQuery button data
      this.resultData.button_id = this.deepArr // button data
      if (fieldData.length) {
        this.resultData.field_id = fieldData // field data
      }
      if (staffData && staffData.length) {
        this.resultData.staff = []
        staffData.forEach(ele => {
          this.resultData.staff.push(ele.id) // staff data
        })
      }
      // - request
      // console.log(this.resultData)
      authDetailApi.update(this.resultData).then(res => {
        this.handleOptionClose() // clear
      })
    },

    deepQuery(arr) {
      arr.forEach(item => {
        if (item.hasOwnProperty('child')) {
          this.deepQuery(item.child)
        } else {
          delete item.name
          this.deepArr[item.id] = item
          delete this.deepArr[item.id].id
        }
      })
      return this.deepArr
    },

    // - filter
    submitSearch(val) {
      if (this.listQuery.is_special === 0 || this.listQuery.is_special === 1) {
        this.listQuery.is_check = 1
        this.getTable(this.listQuery)
        return
      }
      this.listQuery.is_check = ''
      this.getTable(this.listQuery)
    },

    // - delete
    deleteSubmit(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // - request
          authApi.delete({ id }).then(res => {
            this.getTable(this.listQuery)
          })
        })
        .catch(() => { })
    },

    // - 关闭Dialog
    handleClose() {
      this.dialogVisible = false
      this.resetForm('changeData')
      this.dialogType = ''
    },
    handleOptionClose() {
      this.$refs.authConfig.clearData()
      this.optionDialogVisible = false
      this.optionLabel = []
      this.optionData = []
      this.selectData = []
      this.resultData = {}
      this.deepArr = []
      this.is_special = null
      this.groupId = 0
    },

    // - 请求数据
    getTable(params) {
      this.listLoading = true
      authApi.list(params).then(res => {
        const items = res.data
        if (items.list.lenght !== 0) {
          this.tableData = items.list
          this.total = parseInt(items.count)
          this.listLoading = false
        } else {
          this.tableData = []
          this.$message.warning('没有更多数据')
          this.listLoading = false
        }
      })
    },

    // - Pagination
    handleSizeChange(val) {
      this.listQuery.page_size = val
      this.getTable(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getTable(this.listQuery)
    },

    // - 成员配置穿梭框
    addCheck() {
      this.$refs['tree'].addCheck()
    },
    delCheck() {
      // - 移除表格中选中的数据
      if (!this.memberMultipleData.length) {
        this.$message.warning('请先选中记录')
        return
      }
      let arrData = JSON.parse(JSON.stringify(this.memberData))
      const selData = []
      this.memberMultipleData.forEach(item => {
        arrData = arrData.filter(val => val.id !== item.id)
      })
      arrData.forEach(val => selData.push(val.id))
      // this.$refs.tree.selectedData = selData
      this.selectData = selData
      this.memberData = arrData
      console.log('成员配置列表', this.memberData)
    },
    getCheck(arr) {
      console.log(arr, 'add')
      // console.log(this.selectData, 'sel')
      let reqArr = arr.filter(ele => !this.selectData.includes(ele * 1))
      console.log(reqArr)
      if (!reqArr.length) {
        this.$message.warning('选中信息已被添加或未选中数据，请核对后再操作')
        return
      }
      if (!this.memberData) this.memberData = []
      for (let i = 0; i < reqArr.length; i++) {
        this.memberLoading = true
        this.selectData.push(reqArr[i] * 1)
        // - request - Save to this.memberData
        authDetailApi.view(reqArr[i]).then(res => {
          this.memberData.push(res.data)
          setTimeout(() => {
            this.memberLoading = false
          }, 1000)
        })
      }
      reqArr = []
    },
    multipleChange(arr) {
      // 保存选中数据用于删除
      this.memberMultipleData = arr
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.left-b {
  width: 300px;
  height: 500px;
  float: left;
}

.center-b {
  width: 60px;
  height: 500px;
  margin-left: 10px;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    margin: 0;
    margin-top: 10px;
  }
}

.left-b {
  border: 1px solid #dfe6ec;
  width: 300px;
  height: 500px;
}

.right-b {
  width: 680px;
  height: 500px;
  float: right;
}

.table-wrap-ly {
  width: 100%;
  height: calc(100vh - 260px);
  flex: 1;
  transition: 0.2s;
  -webkit-transition: 0.2s;
}
.table-body-ly {
  max-height: calc(100% - 40px);
}
.el-scrollbar__wrap
{
  overflow-x: hidden;
}
</style>
