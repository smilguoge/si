<template>
  <el-container class="m-container">
    <div class="m-filter">
      <el-form :inline="true" :model="tableData" ref="tableData">
        <el-form-item label="姓名">
          <el-input v-model="tableData.name" style="width: 150px;" clearable placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="tableData.is_overdue"
            style="width: 130px"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="item in optionStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="赠送对象">
          <el-select
            v-model="tableData.dic_send_object"
            clearable
            style="width: 130px"
            placeholder="请选择赠送对象"
          >
            <el-option
              v-for="item in dic_send_object"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="赠送日期" prop="date">
          <el-date-picker
            v-model="tableData.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="daterangeChange($event)"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-header class="m-header">
      <el-row>
        <el-col :span="20">
          <el-button type="primary" icon="el-icon-plus" @click="openDialog('create')">新建</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="openDialog('detele')">删除</el-button>
          <el-button type="primary" icon="el-icon-search" @click="openDialog('search')">高级查询</el-button>
          <el-button type="primary" icon="el-icon-tickets" @click="openDialog('export')">导出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <div class="m-content">
      <div class="m-table">
        <el-table
          ref="mainTable"
          :data="tableData.list"
          highlight-current-row
          fit
          stripe
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column width="50" label="地址" type="selection"></el-table-column>
          <el-table-column width="140" label="编码">
            <template slot-scope="{row}">{{row.code}}</template>
          </el-table-column>
          <el-table-column width="140" label="名称">
            <template slot-scope="{row}">{{row.name}}</template>
          </el-table-column>
          <el-table-column width="150" label="赠送开始日期">
            <template slot-scope="{row}">{{row.send_start_at | formatDate}}</template>
          </el-table-column>
          <el-table-column width="150" label="赠送结束日期">
            <template slot-scope="{row}">{{row.send_end_at | formatDate}}</template>
          </el-table-column>
          <el-table-column width="120" label="是否自动赠送">
            <template slot-scope="{row}">{{row.is_auto==1?'是':'否'}}</template>
          </el-table-column>
          <el-table-column width="150" label="使用开始时间">
            <template slot-scope="{row}">{{row.use_start_at | formatDate}}</template>
          </el-table-column>
          <el-table-column width="150" label="使用结束时间">
            <template slot-scope="{row}">{{row.use_end_at | formatDate}}</template>
          </el-table-column>
          <el-table-column width="120" label="当天能否使用">
            <template slot-scope="{row}">{{row.is_same_day==1?'是':'否'}}</template>
          </el-table-column>
          <el-table-column width="140" label="赠送对象">
            <template slot-scope="{row}">{{row.dic_send_object | formatObject}}</template>
          </el-table-column>
          <el-table-column width="140" label="操作人">
            <template slot-scope="{row}">{{row.operator_name}}</template>
          </el-table-column>
          <el-table-column width="150" label="操作时间">
            <template slot-scope="{row}">{{row.updated_at | formatDate}}</template>
          </el-table-column>
          <el-table-column width="100" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="openDialog('edit', scope.row.id)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="m-footer">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[5,16]"
        :page-size="listQuery.page_size"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <dialogModule
      v-model="isDialogShow"
      :dialogModuleType="dialogModuleType"
      :rowId="rowId"
      :echoAllData="echoAllData"
      @on-set="dic_send_object = $event"
      @on-success="loadList"
      @on-close="close"
    />
  </el-container>
</template>

<script>
import { getSendSet, getGupdate, batchDelete } from "@/api/BaseModule/SalesSet";
import dialogModule from "./presenter-manage/index";
import dateFormat from "@/component/DateFilter/date";

export default {
  name: "PresenterManage",
  components: {
    dialogModule
  },
  filters: {
    // 时间
    formatDate(time) {
      const date = new Date(time);
      return dateFormat.formatDate(date, "yyyy-MM-dd");
    },
    formatObject(type) {
      switch(type) {
        case "1":
          return "员工"
          break;
        case "2":
          return "用户"
          break;
        default:
          break;
      }
    }
  },
  watch: {
    "tableData.list":{
      handler(val) {
        if (val && val.length > 0) {
          val.forEach(item => {
            item.send_end_at = item.send_end_at.length <= 10 ? item.send_end_at * 1000 : item.send_end_at;
            item.send_start_at = item.send_start_at.length <= 10 ? item.send_start_at * 1000 : item.send_start_at;
            item.updated_at = item.updated_at.length <= 10 ? item.updated_at * 1000 : item.updated_at;
            item.use_end_at = item.use_end_at.length <= 10 ? item.use_end_at * 1000 : item.use_end_at;
            item.use_start_at = item.use_start_at.length <= 10 ? item.use_start_at * 1000 : item.use_start_at;
          })
        }
      }
    }
  },
  data() {
    return {
      total: 1,
      isDialogShow: false, // dialog显示
      dialogModuleType: "", // dialog类型
      tableData: {
        page: 1,
        page_size: 20,
        name: "", // 名称
        is_overdue: "", // 是否过期[0未过期,1已过期]
        date: [],
        dic_send_object: "", // 赠送对象
        created_at_start: "", // 赠送起始时间
        created_at_end: "", // 赠送结束时间
        list: [] // 列表
      },
      listQuery: {
        page: 1,
        page_size: 5
      },
      optionStatus: [
        {
          value: 0,
          label: "未过期"
        },
        {
          value: 1,
          label: "已过期"
        }
      ],
      dic_send_object: [],
      multipleSelection: [], // 多选
      echoAllData: {}, // 获取编辑数据回显
      rowId: "" // 每一行id 
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    loadList() {
      let params = {
        name: this.tableData.name,
        is_overdue: this.tableData.is_overdue,
        dic_send_object: this.tableData.dic_send_object,
        created_at_start: this.tableData.created_at_start,
        created_at_end: this.tableData.created_at_end
      }
      getSendSet(params)
        .then(res => {
          console.log(res);
          this.tableData.list = res.data.list;
          this.total = res.data.count;
        })
        .catch(res => {});
    },

    // 弹窗集中调用
    openDialog(type, id) {
      switch (type) {
        case "create":
          this.isDialogShow = true;
          this.dialogModuleType = "create";
          break;
        case "edit":
          this.isDialogShow = true;
          this.dialogModuleType = "edit";
          this.rowId = id?id:"";
          this.getEchoData(id);
          break;
        case "detele":
          if (this.multipleSelection.length <= 0) {
            this.$message.warning('请至少选中一条');
            return false;
          }
          this.deleteBatch();
          break;
        case "search":
          break;
        case "export":
          break;
        default:
          break;
      }
    },

    onSearch() {
      this.loadList();
    },

    handleSizeChange(val) {
      this.listQuery.page_size = val
      // this.loadList(this.listQuery)
    },

    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.loadList(this.listQuery)
    },

    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },

    // 获取数据回显
    getEchoData(id) {
      getGupdate(id).then(res => {
        this.echoAllData = JSON.parse(JSON.stringify(res.data.detail));
      })
    },

    // 批量删除
    deleteBatch() {
      this.$confirm("此操作将删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let arr = [];
          this.multipleSelection.forEach(item => {
            arr.push(item.id);
          })
          batchDelete({id: arr}).then(res => {
            console.log(res);
            this.$message.success("删除成功!");
            this.loadList();
          });
        })
        .catch(() => {});
    },

    // 关闭弹窗
    close() {
      this.isDialogShow = false;
    },

    // 日期
    daterangeChange(daterange) {
      if (daterange[0]) {
        this.tableData.created_at_start = Math.floor(daterange[0] / 1000);
        this.tableData.created_at_end = Math.floor(daterange[1] / 1000);
      } else {
        this.tableData.created_at_start = "";
        this.tableData.created_at_end = "";
      }
    }
  }
};
</script>

<style lang="css" scoped>
.m-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.m-filter {
  padding: 12px 20px 11px;
  border-bottom: 1px solid #ebeef5;
}
.m-filter .el-form-item {
  margin-bottom: 0;
}
.m-header {
  line-height: 60px;
}
.m-content {
  width: 100%;
  padding: 0 20px;
  flex: 1;
  transition: 0.5s;
  -webkit-transition: 0.5s;
}
.m-table {
  height: calc(100vh - 290px);
  width: 100%;
}
.m-footer {
  padding: 19px 0;
}
</style>