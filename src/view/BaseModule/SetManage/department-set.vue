<template>
  <div class="app-container">
    <div class="filter-container clearfix">
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="filter-item"
        @click="openDialog('create')"
      >新增下级部门</el-button>
      <el-button
        type="primary"
        icon="el-icon-edit-outline"
        class="filter-item"
        @click="openDialog('edit')"
      >修 改</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        class="filter-item"
        @click="openDialog('delete')"
      >删 除</el-button>
    </div>
    <div class="department-main">
      <el-tree
        ref="departmentTree"
        v-loading="listLoading"
        class="filter-tree"
        :data="departmentData"
        :props="departmentProps"
        :highlight-current="true"
        :expand-on-click-node="false"
        default-expand-all
        :indent="30"
        @node-click="department"
      />
    </div>

    <el-dialog
      :title="dialogType=='create'?'新增子部门':'部门信息修改'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="dialogWidth"
      class="main-dialog"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
    >
      <el-form ref="changeData" :rules="rules" :model="changeData" label-width="110px">
        <el-col :span="23">
          <el-form-item label="部门编号" prop="depart_num">
            <el-input
              v-model="changeData.depart_num"
              placeholder="请输入部门编号"
              :disabled="dialogType=='edit'"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="部门名称" prop="depart_name">
            <el-input v-model=" changeData.depart_name" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="部门描述" prop="describe">
            <el-input v-model="changeData.describe" placeholder="请输入部门描述" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="所属上级部门" prop="section">
            <el-input v-model="changeData.parent_name" placeholder="所属上级部门" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="部门负责人" prop="depart_admin">
            <el-select
              v-model="changeData.depart_admin"
              class="w100"
              filterable
              placeholder="请输入部门负责人"
            >
              <el-option
                v-for="item in principalList"
                :key="item.value"
                :label="item.label"
                :value="item.value+''"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="部门状态" prop="status">
            <el-radio-group v-model="changeData.status" @change="storeStateChange">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <div v-show="changeData.status!=1? true:false" class="changeDisplay">
          <el-col :span="23">
            <el-form-item label="停用原因" prop="stop_reason">
              <el-input v-model="changeData.stop_reason" placeholder="请输入停用原因" type="textarea" />
            </el-form-item>
          </el-col>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-col :span="23">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="submitForm('changeData')">确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDepart,
  createDepart,
  updateDepart,
  deleteDepart,
  viewDepart
} from '@/api/BaseModule/SetManage'

export default {
  depart_name: 'Department',
  data() {
    var checkPrincipal = (rule, value, callback) => {
      const result = this.principalList.filter(v => {
        return v.value == value
      })
      if (!result.length) {
        callback(new Error('该职员不存在'))
      }
      callback()
    }

    return {
      /**
       *
       * FIXME: 判断节点是否展示门店状态（节点为门店显示，节点为区域/部门则不显示）
       *
       */

      departmentData: [],

      changeData: {
        status: '1'
      },

      currentRow: null,

      // - 部门负责人列表
      principalList: [
        {
          label: '张建军',
          value: 1
        },
        {
          label: '格萨尔',
          value: 2
        },
        {
          label: '郭泽',
          value: 3
        },
        {
          label: '歌华',
          value: 4
        },
        {
          label: '叶哈',
          value: 5
        },
        {
          label: '科科',
          value: 6
        }
      ],

      // - Dialog类型
      dialogType: '',

      // - Dialog状态
      dialogVisible: false,

      departmentProps: {
        children: 'child',
        label: 'depart_name'
      },

      // - 验证规则
      rules: {
        depart_num: [
          {
            required: true,
            message: '请输入部门编号',
            trigger: 'blur'
          },
          {
            max: 10,
            message: '最多可以输入 10 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z\d]+$/,
            message: '部门编号由数字或字母组成',
            trigger: 'blur'
          }
        ],
        depart_name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多可以输入 15 个字符',
            trigger: 'blur'
          }
        ],
        describe: [
          {
            max: 15,
            message: '最多可以输入15个字符',
            trigger: 'blur'
          }
        ],
        depart_admin: [
          {
            required: true,
            validator: checkPrincipal,
            trigger: 'change'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择门店状态',
            trigger: 'change'
          }
        ],
        stop_reason: [
          {
            max: 100,
            message: '最多可以输入100个字符',
            trigger: 'blur'
          }
        ]
      },

      // - 参数配置
      listLoading: false,
      flagTime: 0,
      getData: 1,
      smallSize: 'small',
      dialogWidth: '500px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    department(data) {
      // console.log("click item", data);
      this.currentRow = JSON.parse(JSON.stringify(data))
    },

    // - 弹框集中调用
    openDialog(type) {
      if (this.currentRow == null) {
        this.$message.warning('请先选中记录')
        return
      }
      if (type === 'create') {
        this.changeData.parent_id = this.currentRow.id
        this.changeData.parent_name = this.currentRow.depart_name
        this.dialogType = type
        this.dialogVisible = true
      } else {
        if (this.currentRow.id == 1) {
          this.$message.warning('该记录禁止修改和删除')
          return
        }
        if (type === 'edit') {
          viewDepart(this.currentRow.id)
            .then(res => {
              const items = res.data
              console.log(items.detail)
              this.dialogType = type
              this.changeData = JSON.parse(JSON.stringify(items.detail))
              this.dialogVisible = true
            })
            .catch(res => {
              this.$message.warning(res.message)
              return
            })
        } else {
          this.deleteSubmit(this.currentRow.id)
        }
      }
    },

    // - 验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // - 提交请求
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

    // - 处理确定Dialog
    handleDone(type) {
      if (type == 'create') {
        // - request 创建
        createDepart(this.changeData)
          .then(res => {
            // console.log(res);
            this.getList()
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            this.$message.warning(res.message)
            return
          })
      } else {
        // - request 更新
        updateDepart(this.changeData, this.currentRow.id)
          .then(res => {
            // console.log(res);
            this.getList()
            this.dialogVisible = false
            this.resetForm('changeData')
          })
          .catch(res => {
            this.$message.warning(res.message)
            return
          })
      }
    },

    // - 处理关闭Dialog
    handleClose() {
      this.dialogVisible = false
      this.resetForm('changeData')
      this.dialogType = ''
    },

    // - 删除操作
    deleteSubmit(id) {
      // this.currentRow
      if (this.currentRow.child) {
        this.$message.warning('请先删除子部门再进行操作')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDepart(id).then(res => {
            this.getList()
          })
        })
        .catch(res => {
          this.$message.warning(res.message)
          return
        })
    },

    // - 重置验证
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeData = {
        status: '1'
      }
    },

    // - 门店状态
    storeStateChange(val) {
      // console.log(val)
    },

    getList() {
      this.listLoading = true
      getDepart(this.getData)
        .then(res => {
          const items = res.data
          if (items.length != 0) {
            this.departmentData = items
          } else {
            this.departmentData = []
            this.$message.warning('没有更多数据')
          }
          this.listLoading = false
        })
        .catch(res => {
          this.$message.warning('数据请求失败')
          this.listLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.department-main {
  width: 100%;
  padding: 8px 8px 0;
  height: calc(100vh - 260px);
  flex: 1;
  transition: 0.2s;
  -webkit-transition: 0.2s;

  .filter-tree {
    max-height: calc(100% - 40px);
    margin-top: 10px;
    padding: 0 19px;
  }
}
</style>

<style lang="scss">
</style>
