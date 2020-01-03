<template>
  <!-- 出库 -->
  <div class="app-container">
    <!-- 左侧 -->
    <div class="left ">
      <!-- <div style="width:auto"> -->
      <div class="sub-navbar minw">出库
        <el-button type="primary">新增</el-button>
        <el-button type="primary">修改</el-button>
        <el-button type="primary">删除</el-button>
      </div>
      <div>
        <div class="block minw">
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
          >

            <span class="demonstration">日期</span>
            <el-date-picker
              v-model="datevalue"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              default-value="2018-10-01"
            />
            <el-form-item
              label="入库类型"
              label-width="80px"
            >
              <el-select
                v-model="form.categary"
                placeholder="调拨入库"
              >
                <el-option
                  label="采购入库"
                  value="1"
                />
                <el-option
                  label="其他入库"
                  value="2"
                />
              </el-select>
            </el-form-item>

            <el-button
              type="primary"
              icon="el-icon-search"
              @click="_search"
            >查询</el-button>

            <el-form-item label="">
              <el-radio-group v-model="form.complete">
                <el-radio label="未完成" />
                <el-radio label="已完成" />
              </el-radio-group>
            </el-form-item>

          </el-form>

        </div>

      </div>

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
            <i class="status" />
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="备注"
          width="220"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>kk{{ scope.row.notes }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->
    </div>
    <div>中间</div>
    <!-- 右侧 -->
    <div class="ri" />
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
        },
        {
          storename: 'bb店',
          unit: '厦门思明店',
          stoerstyle: '调拨入库',
          username: '何何何',
          timestamp: '2019-11-11',
          status: '未发货',
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
        },
        {
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
        },
        {
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
      ],
      datevalue: '',
      form: {
        categary: '',
        complete: ''
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    _search() { },
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

<style  lang='scss' scoped>
.edit-input {
  padding-right: 100px;
}
.left {
  border: solid 1px #dedede;
  .sub-navbar {
    padding: 0 10px;
  }
}
.block {
  padding: 10px;
}
.sub-navbar {
  text-align: left;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.el-form-item {
  display: inline-block;
  margin-bottom: 0;
}
.minw {
  min-width: 1040px;
}
.mheigt {
  min-height: 500px;
}
</style>
