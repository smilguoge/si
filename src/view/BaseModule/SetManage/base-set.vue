<template>
  <div class="app-container">
    <!-- 数据字典 -->
    <div class="table-wrap-ly">
      <el-table
        v-loading="listLoading"
        :data="listData"
        style="width:100%"
        class="table-body-ly"
        height="100%"
        stripe
        border
      >
        <el-table-column label="字典代码" align="center">
          <template slot-scope="{row}">{{ row.code }}</template>
        </el-table-column>
        <el-table-column label="字典名称" align="center">
          <template slot-scope="{row}">{{ row.name }}</template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="{row}">{{ row.username }}</template>
        </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template slot-scope="{row}">{{ row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="{row}">
            <el-button :size="miniSize" type="primary" @click="openDialog('edit',row)">编辑</el-button>
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
    <!-- 字典编辑、新建 -->
    <el-dialog
      :title="dialogType=='create'?'字典新增':'字典选项编辑'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form label-position="left" :model="changeData" :label-width="formLabelWidth">
        <el-col :span="23">
          <el-form-item label="字典代码">
            <el-input v-model="changeData.code" placeholder="请输入字典代码" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="字典名称">
            <el-input v-model="changeData.name" placeholder="请输入字典名称" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="选项值">
            <div class="border-customize">
              <div class="option-tool-bar tool-bar">
                <div class="btn-wrap">
                  <el-button
                    type="primary"
                    :size="miniSize"
                    @click="openDialog('childrenCreate')"
                  >新增</el-button>
                  <el-button type="danger" :size="miniSize" @click="openDialog('childrenDelete')">删除</el-button>
                  <el-button type="success" :size="miniSize" @click="stateChange(1)">启用</el-button>
                  <el-button type="warning" :size="miniSize" @click="stateChange(0)">停用</el-button>
                </div>
              </div>
              <el-table
                ref="optionTable"
                v-loading="optionLoading"
                :data="changeData.listOption"
                class="option-table"
                max-height="260px"
                stripe
                :default-sort="sortOption"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="50" />
                <el-table-column label="选项代码" align="center">
                  <template slot-scope="{row}">{{ row.code }}</template>
                </el-table-column>
                <el-table-column label="选项名称" align="center">
                  <template slot-scope="{row}">{{ row.name }}</template>
                </el-table-column>
                <el-table-column label="排序号" align="center">
                  <template slot-scope="{row}">{{ row.sort }}</template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                  <template slot-scope="{row}">
                    <el-tag
                      :type="row.status== 1?'success':'danger'"
                      close-transition
                    >{{ row.status==1?'启用':'停用' }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80">
                  <template slot-scope="{row}">
                    <el-button
                      :size="miniSize"
                      type="primary"
                      @click="openDialog('childrenEdit',row)"
                    >编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-col :span="23">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="submitOption(changeData)">确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>

    <!-- 字典选项值列表 -->
    <el-dialog
      :title="childrenDialogType=='childrenCreate'?'选项值新增':'选项值修改'"
      :visible.sync="childrenDialogVisible"
      :before-close="handleChildrenClose"
      width="20%"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form
        ref="childrenOptionData"
        label-position="left"
        :model="childrenOptionData"
        :rules="rulesChildren"
        :label-width="formLabelWidth"
      >
        <el-col :span="23">
          <el-form-item label="选项代码" prop="code">
            <el-input
              v-model="childrenOptionData.code"
              placeholder="请输入选项代码"
              :disabled="childrenDialogType == 'childrenEdit' ? true : false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="选项名称" prop="name">
            <el-input v-model="childrenOptionData.name" placeholder="请输入选项名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="排序号" prop="sort">
            <el-input v-model="childrenOptionData.sort" placeholder="请输入排序号" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="childrenOptionData.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-col :span="23">
          <el-button @click="handleChildrenClose('childrenOptionData')">取 消</el-button>
          <el-button type="primary" @click="submitForm('childrenOptionData')">确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDictionary,
  getGupdate,
  dictionaryUpdate
} from '@/api/BaseModule/SetManage'
export default {
  /**
   *
   * 模块进度：
   *
   * 1. 基本功能、展示开发完毕；
   *
   * 2. TODO: 请求未设置，需要请求方法，需要后台提供接口；
   *
   * 3. FIXME: 更改子表与选项表内容时，在未点击确定的情况下会变更页面数据，考虑再创建一个对象来作为媒介，点击确认时才替换数据，取消时直接丢弃；
   *
   * 4. FIXME: 删除逻辑未完成，没有判定记录是否被引用，还需要确定在哪个环节调用方法；
   *
   * 5. FIXME: 子表和选项表中未添加验证必填字段；
   *
   * 6. FIXME: 分页功能未实现，
   *
   */
  name: 'Dictionary',
  data() {
    return {
      page: 0,
      page_size: 10,
      listData: [],
      changeData: {
        listOption: []
      },
      childrenOptionData: {},
      multipleSelection: [],

      // - 分页
      total: null,
      listQuery: {
        page: 1,
        page_size: 10
      },

      // - Dialog类型
      dialogType: '',
      childrenDialogType: '',

      // - 验证规则
      rulesChildren: {
        code: [
          {
            required: true,
            message: '请输入选项代码',
            trigger: 'blur'
          },
          {
            max: 4,
            message: '最多输入 4 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入选项名称',
            trigger: 'blur'
          },
          {
            max: 5,
            message: '最多输入 5 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\u2E80-\u9FFF]+$/,
            message: '选项名称只能是汉字',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            max: 3,
            message: '最多输入 3 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[\d]+$/,
            message: '排序号只能是数字',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择选项状态',
            trigger: 'change'
          }
        ]
      },

      // - 排序配置
      sortOption: {
        prop: 'sort',
        order: 'ascending'
      },

      // - 页面参数配置
      listLoading: false,
      optionLoading: false,
      flagTime: 0,
      dialogVisible: false,
      childrenDialogVisible: false,
      miniSize: 'mini',
      dialogWidth: '720px',
      formLabelWidth: '80px'
    }
  },
  created() {
    this.loadList(this.listQuery)
  },
  methods: {
    // 加载基础字典列表
    loadList(params) {
      this.listLoading = true
      getDictionary(params)
        .then(res => {
          const items = res.data
          console.log(res)
          if (items.lenght != 0) {
            this.listData = items.list
            this.total = parseInt(items.count)
            this.listLoading = false
          } else {
            this.tableData = []
            this.$message.warning('没有更多数据')
          }

          // console.log(res);
          // this.listData = res.data;
          // this.listLoading = false;
        })
        .catch(res => {})
    },

    // 通过id获取选项数据
    loadOption(ids) {
      getGupdate(ids)
        .then(res => {
          this.changeData.listOption = res.data.detail
          // console.log(this.changeData.listOption)
          this.$set(this.changeData, res.data.detail)
          this.optionLoading = false
        })
        .catch(res => {})
    },

    // 选项提交
    submitOption(changeData) {
      const data = {
        id: changeData.id,
        code: changeData.code,
        name: changeData.name,
        detail: JSON.parse(JSON.stringify(changeData.listOption))
      }
      const curr = new Date()
      if (curr - this.flagTime > 1000) {
        dictionaryUpdate(data)
          .then(res => {
            console.log(res)
            this.loadList(this.listQuery)
            this.$message.success('操作成功!')
            this.dialogVisible = false
          })
          .catch(res => {})
        this.flagTime = curr
      }
    },

    // - 收集选中数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // - 弹框集中处理
    openDialog(type, data) {
      switch (type) {
        case 'edit':
          this.optionLoading = true
          this.changeData = data
          this.loadOption(data.id)
          this.dialogVisible = true
          break

        case 'childrenCreate':
          this.childrenDialogType = type
          this.childrenDialogVisible = true
          break

        case 'childrenEdit':
          this.childrenOptionData = JSON.parse(JSON.stringify(data))
          this.childrenDialogType = type
          this.childrenDialogVisible = true
          break

        case 'childrenDelete':
          if (!this.multipleSelection.length) {
            this.$message.warning('请先选中记录')
            return
          }
          this.deleteSubmit(this.multipleSelection)
          break

        default:
          this.$message.error('操作失败！')
          break
      }
    },

    // - 提交/验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleDone(this.childrenDialogType)
        } else {
          this.$message.warning('请正确填写必填项！')
          return false
        }
      })
    },

    // - 提交集中处理
    handleDone(type) {
      switch (type) {
        case 'childrenCreate':
          // - request
          if (
            this.changeData.listOption.every(
              item => item.code !== this.childrenOptionData.code
            )
          ) {
            const dIndex = this.changeData.listOption.length
            const deepCopyData = JSON.parse(
              JSON.stringify(this.childrenOptionData)
            )
            // - 更新dialog视图
            this.$set(this.changeData.listOption, dIndex, deepCopyData)
            // - 更新主表数据
            this.childrenDialogVisible = false
            this.resetForm('childrenOptionData')
          } else {
            this.$message.warning('选项代码不能重复填写!')
            return
          }

          break

        case 'childrenEdit':
          // - request
          let cIndex
          for (let i = 0; i < this.changeData.listOption.length; i++) {
            if (
              this.changeData.listOption[i].code == this.childrenOptionData.code
            ) {
              cIndex = i
            }
          }
          // if (this.changeData.listOption.every(item => item.code !== this.childrenOptionData.code)) {
          const optionData = JSON.parse(
            JSON.stringify(this.childrenOptionData)
          )
          // - 更新dialog视图
          this.$set(this.changeData.listOption, cIndex, optionData)
          this.childrenDialogVisible = false
          this.resetForm('childrenOptionData')
          // } else {
          //   console.log('重复选项代码')
          //   this.$message.warning('选项代码不能重复填写!')
          //   return
          // }

          break

        default:
          this.$message.error('操作失败！')
          break
      }
    },

    // - 删除
    deleteSubmit(delDataArr) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // - request
          let listOption = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            listOption = this.changeData.listOption.filter(
              el => el.code !== this.multipleSelection[i].code
            )
            console.log(listOption)
          }
          this.changeData.listOption = listOption
          this.$forceUpdate() // vue强制刷新
        })
        .catch(() => {})
    },

    // - 更改状态
    stateChange(code) {
      if (!this.multipleSelection.length) {
        this.$message.warning('至少选中一条数据再更改状态！')
        return
      } else {
        if (
          this.multipleSelection.every(el => {
            return el.status === code
          })
        ) {
          this.$message.warning('请勿重复更改选中项状态！')
          return
        }
      }
      this.$confirm(code ? '确认启用选中项？' : '确认停用选中项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (code === 1) {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.multipleSelection[i].status = 1
            }
          } else {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.multipleSelection[i].status = 0
            }
          }
          this.$refs.optionTable.clearSelection() // 清空用户的选择
          console.log(this.multipleSelection, '检查')
        })
        .catch(() => {})
    },

    // - 关闭Dialog
    handleClose() {
      this.changeData.listOption = []
      this.dialogVisible = false
    },
    handleChildrenClose() {
      this.childrenDialogVisible = false
      this.resetForm('childrenOptionData')
      this.childrenDialogType = ''
    },

    // - 清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.childrenOptionData = {}
    },

    handleSizeChange(val) {
      this.listQuery.page_size = val
      this.loadList(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.loadList(this.listQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
.option-table {
  width: 100%;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
  border: 1px solid #dcdfe6;
}
.option-tool-bar {
  height: 50px;
  width: 100%;
  position: relative;

  .btn-wrap {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.border-customize {
  border-radius: 3px;
}
.tool-bar {
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
}
.table-wrap-ly {
  width: 100%;
  height: calc(100vh - 180px);
  flex: 1;
  transition: 0.2s;
  -webkit-transition: 0.2s;
}
.table-body-ly {
  max-height: calc(100% - 40px);
}
</style>
<style lang="scss">
</style>
