<template>
  <div class="app-container">
    <div class="employee-body minw mheigt">
      <div class="left-body">
        <structure
          ref="tree"
          :structure-data="treeData"
          @getCheck="getCheck($event)"
        />
      </div>
      <div class="center-body">
        <div class="tool-bar">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="登陆账号：">
              <el-input v-model="formInline.account" placeholder="单行输入" />
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="formInline.name" placeholder="单行输入" />
            </el-form-item>
            <el-form-item label="离职日期：">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handelLZDJ">离职登记</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handelFZ">复职</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">高级查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--  -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="NO." />z
          <el-table-column prop="name" label="登录账号" />
          <el-table-column prop="province" label="员工姓名" />
          <el-table-column prop="city" label="职务" />
          <el-table-column prop="address" label="身份证号" />
          <el-table-column prop="zip" label="手机号码" />
          <el-table-column prop="zip" label="出生日期" />
          <el-table-column prop="zip" label="年龄" />
          <el-table-column prop="zip" label="入职日期" />
          <el-table-column prop="zip" label="工龄" />
          <el-table-column prop="zip" label="岗龄" />
          <el-table-column prop="zip" label="补工龄" />
          <el-table-column prop="zip" label="所在部门" />
          <el-table-column prop="zip" label="预计离职日期" />
          <el-table-column prop="zip" label="实际离职日期" />
          <el-table-column prop="zip" label="离职原因大类" />
          <el-table-column prop="zip" label="离职原因明细" />
          <el-table-column prop="zip" label="经办人" />
          <el-table-column prop="zip" label="经办日期" />
          <el-table-column label="操作" width="120">
            <template>
              <el-button type="text" size="small" @click="handelLZQR">离职确认</el-button>
              <el-button type="text" size="small">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 FIXME: 分页配置 -->
        <pagination :pager="pager" class="main-page" @change="getItemData" />
      </div>
    </div>
    <!-- 复职操作 -->
    <el-dialog
      v-if="type==1"
      title="复职操作"
      width="380px"
      top="30vh"
      center
      :visible.sync="dialogFormVisible"
    >
      <div class="box1">
        <div class="age">
          是否重新计算工龄（月）？
          <div>
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </div>
        </div>
        <div>
          补工龄*
          <input type="number">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 离职确认 -->
    <el-dialog
      v-else-if="type==2"
      title="离职确认"
      width="380px"
      top="30vh"
      center
      :visible.sync="dialogFormVisible"
    >
      <div class="box2">
        <h3>确认该员工已离职？</h3>
        <div>
          实际离职日期*
          <el-date-picker v-model="lxsj" type="date" placeholder="选择日期" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 认</el-button>
      </div>
    </el-dialog>
    <!--离职登记 -->
    <el-dialog
      v-if="type==3"
      title="离职登记"
      width="500px"
      top="8vh"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="LZform"
        :model="LZform"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="登陆账号" prop="LZform.pasw">
          <el-input v-model="LZform.name" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="姓名*" prop="LZform.name">
          <el-input v-model="LZform.name" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="职务" prop="LZform.position">
          <el-input v-model="LZform.position" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="所在部门" prop="LZform.department">
          <el-input v-model="LZform.department" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="身份证号" prop="LZform.Idcard">
          <el-input v-model="LZform.Idcard" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="手机号码" prop="LZform.phone">
          <el-input v-model="LZform.phone" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="出生日期" prop="LZform.birth">
          <el-input v-model="LZform.birth" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="年龄" prop="LZform.age">
          <el-input v-model="LZform.age" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="入职日期" prop="LZform.induction">
          <el-input v-model="LZform.induction" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="工龄" prop="LZform.Gongage">
          <el-input v-model="LZform.Gongage" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="岗龄" prop="LZform.Gangage">
          <el-input v-model="LZform.Gangage" disabled placeholder="只读" />
        </el-form-item>
        <el-form-item label="离职原因">
          <el-cascader :options="options" clearable />
        </el-form-item>
        <el-form-item label="预计离职日期" required prop="LZform.expect">
          <el-date-picker v-model="LZform.expect" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="实际离职日期" prop="LZform.actual">
          <el-date-picker v-model="LZform.actual" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="备注" prop="LZform.note">
          <el-input v-model="LZform.note" type="textarea" />
        </el-form-item>
        <el-form-item label="离职报告" prop="LZform.report" />
        <el-form-item>
          <el-button type="primary" @click="submitForm('LZform')">提交</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/article'
import Pagination from '@/component/Pagination/index'
import Structure from '@/component/Structure/index'
import { customerTransfer } from '@/api/ManageCustomer/CustomerManage'
const transferApi = new customerTransfer()

export default {
  name: 'EmployeeData',
  components: {
    Pagination,
    Structure
  },
  data() {
    return {
      // 离职登记
      LZform: {
        pasw: '',
        name: '',
        position: '',
        department: '',
        Idcard: '',
        phone: '',
        birth: '',
        age: '',
        induction: '',
        Gongage: '',
        Gangage: '',
        why: '',
        why2: '',
        expect: '',
        actual: '',
        note: '',
        report: ''
      },
      // 离职原因
      options: [
        {
          value: 'gr',
          label: '个人原因',
          children: [
            {
              value: 'hy',
              label: '怀孕离职'
            },
            {
              value: 'sb',
              label: '生病离职'
            },
            {
              value: 'fz',
              label: '另求发展'
            },
            {
              value: 'qt',
              label: '其他'
            }
          ]
        },
        {
          value: 'jt',
          label: '家庭原因',
          children: [
            {
              value: 'jr',
              label: '照顾家人'
            },
            {
              value: 'xh',
              label: '带小孩'
            },
            {
              value: 'lj',
              label: '离家太远'
            },
            {
              value: 'tq',
              label: '其他'
            }
          ]
        },
        {
          value: 'gl',
          label: '管理原因',
          children: [
            {
              value: 'gz',
              label: '工资低'
            },
            {
              value: 'yl',
              label: '压力大'
            },
            {
              value: 'fw',
              label: '工作氛围'
            },
            {
              value: 'ld',
              label: '领导管理方式'
            },
            {
              value: 'qt',
              label: '其他'
            }
          ]
        },
        {
          value: 'zp',
          label: '招聘原因',
          children: [
            {
              value: 'bsy',
              label: '不适应工作'
            },
            {
              value: 'qt',
              label: '其他'
            }
          ]
        },
        {
          value: 'lz',
          label: '自动离职'
        },
        {
          value: 'ct',
          label: '辞退'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ],
      a: false,
      q: true,
      lxsj: '',
      type: null,
      radio: '1',
      value1: '',
      changeData: null,
      createData: null,
      currentRow: null,
      searchForm: {
        name: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      formInline: {
        name: '',
        account: ''
      },
      // - 默认数据格式
      defaultData: {
        name: '', // 职务名称
        code: '', // 职务编码
        desc: '', // 职务描述
        state: 1, // 职务状态
        sort: '', // 排序号
        operator: '', // 操作人
        time: '' // 操作时间
      },
      // listLoading: true,
      // - Dialog类型
      dialogType: '',
      // - Dialog状态
      dialogVisible: false,
      // - Page数据
      pager: {
        page: 1,
        limit: 10
      },
      treeData: [],
      // - 参数配置
      smallSize: 'small',
      dialogWidth: '500px',
      formLabelWidth: '90px'
    }
  },
  created() {
    this.getTree()
    // this.getList()
  },
  methods: {
    // 获取组织结构数据
    getTree() {
      transferApi.shopView().then(res => {
        this.treeData = res.data
      })
    },

    onSubmit() {
      console.log('submit!')
    },
    rules() {},
    // 复职弹窗
    handelFZ() {
      this.dialogFormVisible = true
      this.type = 2
    },
    // 离职确认弹窗
    handelLZQR() {
      this.dialogFormVisible = true
      this.type = 1
    },
    // 离职登记弹窗
    handelLZDJ() {
      this.dialogFormVisible = true
      this.type = 3
    },
    // 离职登记提交
    submitForm() {},
    reinstatement() {
      const h = this.$createElement
      this.$msgbox({
        title: '复职操作',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      })
    },
    querySearch() {},
    handleSelect() {},
    state() {},
    handleIconClick() {},
    handleSelectionChange() {},
    // - 收集选中数据
    selectedRow(val) {
      this.currentRow = val
      console.log(this.currentRow)
    },

    // - 提交搜索
    submitSearch() {
      console.log(this.searchForm)
    },

    // - 弹框集中调用
    openDialog(type) {
      if (type === 'create') {
        console.log('create Dialog')
        this.changeData = this.createData
        this.dialogType = type
        this.dialogVisible = true
      } else {
        if (this.currentRow === null) {
          this.$message.warning('请先选中记录')
          return
        }
        if (type === 'edit') {
          console.log('edit Dialog')
          /**
           *
           * FIXME: 根据id提交，提交完重新请求页面数据
           *
           */
          this.changeData = this.currentRow
          this.dialogType = type
          this.dialogVisible = true
        } else {
          console.log('delete Dialog')
          // - FIXME: 需要先判定该职务是否被调用
          this.deleteSubmit()
        }
      }
    },

    // - 关闭Dialog
    handleClose() {
      this.$confirm('确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.dialogVisible = false
          this.resetForm('changeData') // 第一节点代调用：确认关闭dialog后清空表单
          this.initData()
          this.dialogType = ''
        })
        .catch(() => {})
    },

    // - 处理确定Dialog
    handleDone(type) {
      if (type == 'create') {
        // - request 创建请求
        console.log('create data')
      } else {
        // - request 更新请求
        console.log('edit data')
      }
    },

    // - 删除操作
    deleteSubmit() {
      // this.currentRow
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('Delete Submit')
          // - request
        })
        .catch(() => {})
    },

    // - 初始化
    initData() {
      this.changeData = JSON.parse(JSON.stringify(this.defaultData))
      this.createData = JSON.parse(JSON.stringify(this.defaultData))
    },

    // getList() {
    //   this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     const items = response.data.items
    //     this.list = items.map(v => {
    //       this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
    //       v.originalTitle = v.title //  will be used when user click the cancel botton
    //       return v
    //     })
    //     this.listLoading = false
    //   })
    // },
    // cancelEdit(row) {
    //   row.title = row.originalTitle
    //   row.edit = false
    //   this.$message({
    //     message: 'The title has been restored to the original value',
    //     type: 'warning'
    //   })
    // }

    // - FIXME: 处理分页
    getItemData() {
      // - request => queryPageList()
      // 把查到的列表数据的数量信息，赋给pager对象，实现动态传参
      // queryPageList().then(res => {
      // const data = res.data;
      // this.tableData = data.recordList;
      // this.pager.total = data.totalCount;
      // this.pager.page = data.beginPageIndex;
      // });
    },

    // 从组织结构获取数据
    getCheck(arr) {
      console.log(arr)
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  height: 100%;
  box-sizing: border-box;
  .employee-body {
    display: flex;
    height: 100%;
    .left-body {
      width: 292px;
      height: 100%;
      .structure-wrap {
        height: 100%;
      }
    }
    .center-body {
      width: calc(100% - 302px);
      margin-left: 10px;
      font-size: 14px;
      color: #101010;
      background-color: #fff;
      border: 1px solid #bbb;
      .main-page {
        position: absolute;
        right: 10px;
        margin-top: 44px;
      }
      .banner {
        height: 58px;
        display: flex;
        align-items: center;
        background: #bbb;
        color: #fff;
        font-size: 20px;
        padding-left: 17px;
      }
    }
  }
  .age {
    div {
      margin: 10px 0 20px;
    }
  }
  .box2 div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
<style>
#app .main-container,
.app-main {
  height: 100%;
}
.line {
  text-align: center;
}
.el-table th > .cell {
  text-align: center;
}
.structure-body {
  width: 100% !important;
}
.el-form-item {
  margin-bottom: 0;
  margin-right: 5px !important;
}
.el-form-item__label {
  padding: 0;
}
.wd input {
  width: 155px;
}
.el-popper {
  top: 300px !important;
  left: 800px !important;
}
</style>
