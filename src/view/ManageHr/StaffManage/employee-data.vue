<template>
  <div class="app-container">
    <div class="employee-body minw mheigt">
      <div class="left-body">
        <structure />
      </div>
      <div class="center-body">
        <div class="tool-bar">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div class="box">
              <el-form-item>
                <el-button type @click="newAdd">新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type @click="delte">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type @click="stop">停用账号</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type @click="open">启用账号</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type @click="expor">导出</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type @click="impor">导入</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type @click="reset">重置密码</el-button>
              </el-form-item>
              <el-form-item >
                <div class="min">
                  姓名：
                  <el-input v-model="formInline.name" placeholder="单行输入" />
                </div>
              </el-form-item>
              <el-form-item  >
                  <div class="min">
                    状态：
                    <el-select v-model="formInline.status" placeholder="全部">
                    <el-option label="正常" value="1" />
                    <el-option label="停用" value="0" />
                    <el-option label="全部" value />
                  </el-select>
                  </div>
              </el-form-item>
              <el-form-item>
                <el-button type @click="query">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type @click="VIP_query">高级查询</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" fixed="left" />
          <el-table-column prop="account" label="登陆账号" show-overflow-tooltip />
          <el-table-column prop="name" label="姓名" show-overflow-tooltip />
          <el-table-column prop="sex" label="性别" show-overflow-tooltip />
          <el-table-column prop="birthday" label="出生日期" show-overflow-tooltip />
          <el-table-column prop="identity_num" label="身份证" show-overflow-tooltip />
          <el-table-column prop="phone" label="手机号码" show-overflow-tooltip />
          <el-table-column prop="address" label="年龄" show-overflow-tooltip />
          <el-table-column prop="dic_recruitment_channel" label="招聘渠道" show-overflow-tooltip />
          <el-table-column prop="created_at" label="建档日期" show-overflow-tooltip />
          <el-table-column prop="entry_at" label="入职日期" show-overflow-tooltip />
          <el-table-column prop="turn_positive_at" label="转正日期" show-overflow-tooltip />
          <el-table-column prop="address" label="工龄" show-overflow-tooltip />
          <el-table-column prop="position_id" label="职务" show-overflow-tooltip />
          <el-table-column prop="address" label="岗龄" show-overflow-tooltip />
          <el-table-column prop="shop_id" label="所属部门" show-overflow-tooltip />
          <el-table-column prop="dic_staff_status" label="员工状态" show-overflow-tooltip />
          <!-- <el-table-column label="操作" show-overflow-tooltip>
            <el-button @click="edit(id)">修改</el-button>
          </el-table-column>-->
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <tancTab v-if="$store.state.isComponent" @hid="close" />
        <!-- 分页 FIXME: 分页配置 -->
        <pagination :pager="pager" class="main-page" @change="getItemData" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/component/Pagination/index";
import Structure from "@/component/Structure/index";
import EmployeeApi from "@/api/ManageHr/EmployeeFiles";
import tancTab from "@/view/ManageHr/newAdd/tanc_tab";

export default {
  name: "EmployeeData",
  components: {
    Pagination,
    Structure,
    tancTab
  },
  data() {
    return {
      // 表单列表
      tableData: this.$store.state.tableData || [],

      // 多选
      multipleSelection: [],
      // id组
      deltId: [],

      // 头部查询
      formInline: {
        name: "",
        phone: "",
        status: "",
        merchant_id: 1,
        shop_ids: "1"
      },

      // 分页
      pager: {
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    // 列表请求
    EmployeeApi.getList().then(res => {
      this.tableData = res.data.list;
    });
    console.log(this.$store.state.tableData,'vuex')
  },

  methods: {
    // 单选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.deltId = this.multipleSelection;
    },

    // 分页配置
    getItemData() {},

    // 关闭弹窗儿子隐藏
    close() {
      this.$store.state.isComponent = false;
      EmployeeApi.getList().then(res => {
        this.tableData = res.data.list;
        console.log('关闭',this.tableData);
      });
    },

    // 新增
    newAdd() {
      // 儿子显示
      this.$store.state.isComponent = true;
      // 弹窗显示
      this.$store.state.isTanc = true;
      // 是否是修改
      this.$store.state.isEdit = false;
    },

    // 修改
    edit(row) {
      // 儿子显示
      this.$store.state.isComponent = true;
      // 弹窗显示
      this.$store.state.isTanc = true;
      // 是否是修改
      this.$store.state.isEdit = true;
      // 修改id
      this.$store.state.editId = row.id;
    },

    // 删除
    delte() {
      if (this.deltId.length > 0) {
        let id = "";
        for (let i = 0; i < this.deltId.length; i++) {
          id += this.deltId[i].id + ",";
        }
        id = id.substr(0, id.length - 1);
        console.log(id);
        EmployeeApi.delt(id).then(res => {
          if (res.code == "200") {
            EmployeeApi.getList().then(res => {
              this.tableData = res.data.list;
              this.$message("删除成功");
            });
          } else {
            this.$message("删除失败");
          }
        });
      } else {
        this.$message("请选择要删除的内容");
      }
    },

    // 查询
    query() {
      EmployeeApi.query(this.formInline).then(res => {
        console.log(res);
        this.tableData = res.data.list;
      });
    },

    // 停用账号
    stop() {
      this.$message("功能待开发");
    },

    //启用账号
    open() {
      this.$message("功能待开发");
    },

    // 导出
    expor() {
      this.$message("功能待开发");
    },

    // 导入
    impor() {
      this.$message("功能待开发");
    },

    // 密码重置
    reset() {
      this.$message("功能待开发");
    },

    // 高级查询
    VIP_query() {
      this.$message("功能待开发");
    }
  }
};
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
      .el-form-item{
        margin-right: 10px;
      }
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
      .min {
        width: 100%;
        display: flex;
        .el-input--medium,.el-select {
          width: 70%;
        }
      }
      .box {
        display: flex;
        .el-form-item{
          margin: 0;
        }
      }
    }
  }
}
</style>
