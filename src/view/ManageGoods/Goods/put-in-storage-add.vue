<template>
  <!-- 入库 -->
  <div class="app-container">
    <!-- 左侧 -->
    <div
      v-show="addflag"
      class="left "
    >
      <div class="sub-navbar">入库
        <el-button
          v-waves
          type="primary"
        >新增</el-button>

        <el-button
          v-waves
          type="primary"
        >删除</el-button>
      </div>
      <div>6666</div>
      <el-table
        v-loading="listLoading"
        :data="datalist"
        element-loading-text="拼命加载中"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          align="center"
          label="单据号"
          width="95"
        >
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="入库门店">
          <template slot-scope="scope">
            {{ scope.row.storename }}
          </template>
        </el-table-column>
        <el-table-column
          label="对方单位"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag>{{ scope.row.unit }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="入库类型"
          width="115"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.stoerstyle }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作人"
          width="220"
        >
          <template slot-scope="scope">
            <i class="username" />
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作时间"
          width="220"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>kk{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="状态"
          width="220"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="备注"
          width="220"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>kk{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 右侧 -->
    <div
      v-show="!addflag"
      class="ri"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/article'

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false, // true,
      listQuery: {
        page: 1,
        limit: 10
      },
      addflag: false,
      datalist: [
        {
          // title: '测试001',
          // pageviews: '类型001',
          storename: 'aa店',
          unit: '厦门湖里店',
          stoerstyle: '采购入库',
          username: '叶叶叶',
          timestamp: '2019-11-11',
          status: '已发货',
          notes: ''
        },
        {
          storename: 'bb店',
          unit: '厦门思明店',
          stoerstyle: '调拨入库',
          username: '何何何',
          timestamp: '2019-11-11',
          status: '未发货',
          notes: ''
        }
      ]
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.left {
  border: solid 1px #dedede;
}
.sub-navbar {
  text-align: left;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
