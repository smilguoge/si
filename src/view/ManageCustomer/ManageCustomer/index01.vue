<template>
  <div class="app-container">
    <div class="box">
      <div class="left-body">
        <div :class="isShrinkage ==true? 'tree hide': 'tree show'">
          <structure
            ref="tree"
            :structure-data="treeData"
            @getCheck="getCheck($event)"
          />
        </div>
        <div class="shrinkage" @click="isShow">
          <span :class="isShrinkage ==true? 'arrow arrow_right':'arrow arrow_left'" />
        </div>
      </div>
      <div class="center-body">
        <div class="tool-bar">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div class="line">
              <el-form-item>
                <el-input v-model="formInline.customer_no" placeholder="请输入会员编号" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.customer_name" placeholder="请输入会员姓名" />
              </el-form-item>
              <el-form-item>
                <div class="down">
                  <el-select v-model="formInline.customer_attr" clearable placeholder="请选择顾客属性">
                    <el-option
                      v-for="item in options.dic_customer_attr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="down">
                  <el-select v-model="formInline.manage_cate" clearable placeholder="请选择管理类别">
                    <el-option
                      v-for="item in options.dic_customer_manage_cate"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </el-form-item>
              <div class="time">
                <el-form-item>
                  <el-date-picker
                    v-model="formInline.admission_at_start"
                    type="date"
                    placeholder="选择入会时间段"
                    format="yyyy/MM/dd"
                    value-format="timestamp"
                  />
                </el-form-item>
                <b>-</b>
                <el-form-item>
                  <el-date-picker
                    v-model="formInline.admission_at_end"
                    type="date"
                    placeholder="选择入会时间段"
                    format="yyyy/MM/dd"
                    value-format="timestamp"
                  />
                </el-form-item>
              </div>
              <el-form-item>
                <el-button type="primary" @click="query">查询</el-button>
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item>
                <el-button type="primary" @click="add">新建</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="delt">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">旧档案导入</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">批量转院</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">顾客转让</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">补录卡</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">公海休眠客</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">回收站</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="resetPasw">重置密码</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">高级查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">导出</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="table"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" fixed />
            <el-table-column prop="customer_no" label="会员编号" />
            <el-table-column prop="name" label="会员名称" />
            <el-table-column prop="card_id" label="磁卡编号" />
            <el-table-column prop="dic_customer_attr" label="顾客属性" />
            <el-table-column prop="dic_customer_grade" label="顾客等级" />
            <el-table-column prop="dic_customer_star" label="星级等级" />
            <el-table-column prop="dic_comeshop_channel" label="进店渠道" />
            <el-table-column prop="phone" label="手机号码" />
            <el-table-column prop="shop_id" label="所属美容院" />
            <el-table-column prop="dic_manage_cate" label="管理类别" />
            <el-table-column prop="admission_at" label="入会日期" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <Tab v-if="flag" @hid="close" />
        <!-- 分页 FIXME: 分页配置 -->
        <div class="pager">
          <pagination :pager="pager" class="main-page" />
        </div>
      </div>
    </div>
    <!-- 重置支付密码 -->
    <div class="tanc">
      <el-dialog title="重置支付密码" width="30%" :visible.sync="resetPassword">
        <ResetPassword v-if="show" @hid="hide" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from '@/component/Pagination/index'
import Structure from '@/component/Structure/index'
import getList from '@/api/ManageCustomer/index'
import Tab from '@/view/ManageCustomer/ManageCustomer/newAdd/tab'
import ResetPassword from '@/view/ManageCustomer/ManageCustomer/newAdd/resetPassword'
import Api from '@/api/ManageCustomer/customerManagementApi'
import { customerTransfer } from '@/api/ManageCustomer/CustomerManage'
const transferApi = new customerTransfer()
export default {
  name: 'EmployeeData',
  components: {
    Pagination,
    Structure,
    Tab,
    ResetPassword
  },
  data() {
    return {
      // 左侧收缩/数据
      isShrinkage: true,
      treeData: [],

      // 头部form
      formInline: {
        page: 1,
        page_size: 10,
        shop_ids: '',
        customer_no: '',
        customer_name: '',
        manage_cate: '',
        customer_attr: '',
        admission_at_start: '',
        admission_at_end: ''
      },

      // 表格列表
      table: [],

      // 下拉选项
      options: [],

      // 多选
      multipleSelection: [],

      // 是否显示儿子
      flag: false,

      // 重置密码
      resetPassword: false,
      show: false,

      // 分页
      pager: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getTree()
    getList.get(this.formInline).then(res => {
      // console.log(res);
      this.options = res.data.dic
      this.table = res.data.list
    })
  },
  methods: {
    // 获取组织结构数据
    getTree() {
      transferApi.shopView().then(res => {
        this.treeData = res.data
      })
    },

    // 时间戳处理
    format(e) {
      for (const key in e) {
        e[key] = parseInt(e[key] / 1000)
      }
      console.log(e, this.formInline.time)
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 左侧收缩
    isShow() {
      this.isShrinkage = !this.isShrinkage
    },

    // 新增
    add() {
      this.flag = true
    },
    // 隐藏儿子
    close() {
      this.flag = false
      this.$store.state.isCustomer = false
      getList.get(this.formInline).then(res => {
        // console.log(res);
        this.options = res.data.dic
        this.table = res.data.list
      })
    },
    // 修改
    edit(row) {
      this.flag = true
      this.$store.state.isCustomerId = row.id
      this.$store.state.isCustomer = true
      console.log(row.id)
    },
    // 查询
    query() {
      const data = this.formInline
      Api.query(data).then(res => {
        console.log(res)
        this.table = res
      })
    },
    // 删除
    delt() {
      const arr = this.multipleSelection
      const idArr = []
      for (const item of arr) {
        idArr.push(item.id)
      }
      if (arr.length > 0) {
        // console.log(idArr)
        Api.delt(idArr.join(',')).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            getList.get(this.formInline).then(res => {
              // console.log(res);
              this.options = res.data.dic
              this.table = res.data.list
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'warning'
            })
          }
        })
      } else {
        this.$message('请选择要删除的内容')
      }
      console.log(idArr.join(','))
    },
    // 重置密码
    resetPasw() {
      const arr = this.multipleSelection
      if (arr.length > 0 && arr.length < 2) {
        this.resetPassword = true
        this.show = true
        this.$store.state.isCustomerId = arr[0].id
      } else if (arr.length > 1) {
        this.$message('最多只能选择1个')
      } else {
        this.$message('请选择要修改的内容')
      }
    },
    hide() {
      this.resetPassword = false
      this.show = false
      this.$refs.multipleTable.clearSelection()
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
  padding: 0;
  .box {
    margin-top: 20px;
    display: flex;
    height: 100%;
    * {
      box-sizing: border-box;
    }
    .left-body {
      position: relative;

      .tree {
        border: 1px solid #e6e6e6;
        width: 100%;
        height: 100%;
        .el-input--medium {
          width: inherit !important;
        }
      }
      .show {
        display: block;
      }
      .hide {
        display: none;
      }
      .shrinkage {
        position: absolute;
        right: -60px;
        height: 30px;
        width: 0;
        top: 50%;
        padding: 20px;
        border-left: 20px solid rgb(241, 241, 241);
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        .arrow {
          border-top: 1px solid #999;
          border-right: 1px solid #999;
          position: absolute;

          width: 10px;
          height: 10px;
          top: 50%;
          margin-top: -5px;
        }
        .arrow_left {
          left: -12px;
          transform: rotate(-145deg);
          -ms-transform: rotate(-145deg); /* IE 9 */
          -moz-transform: rotate(-145deg); /* Firefox */
          -webkit-transform: rotate(-145deg); /* Safari 和 Chrome */
          -o-transform: rotate(-145deg);
        }
        .arrow_right {
          left: -20px;
          transform: rotate(45deg);
          -ms-transform: rotate(45deg); /* IE 9 */
          -moz-transform: rotate(45deg); /* Firefox */
          -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
          -o-transform: rotate(45deg);
        }
      }
    }
    .center-body {
      border: solid 1px #e6e6e6;
      margin-left: 2%;
      .tool-bar {
        padding: 20px 20px 0;
        border: none;
        border-bottom: 1px solid #e5e5e5;
        .line {
          display: flex;
          .el-form-item {
            margin-bottom: 20px;
          }
          .el-form-item__label {
            width: 100% !important;
            text-align: center;
          }
          .time {
            width: 23%;
            display: flex;
            margin-right: 10px;
            b {
              line-height: 36px;
            }
            justify-content: space-between;
            .el-form-item {
              width: 260px;
              margin: 0;
              .el-form-item__content {
                .el-date-editor {
                  width: 100%;
                }
              }
            }
          }
        }
      }
      .pager {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
<style>
.table .el-table .cell {
  text-align: center !important;
}
.tanc .el-dialog__body {
  padding: 0 !important;
}
</style>

