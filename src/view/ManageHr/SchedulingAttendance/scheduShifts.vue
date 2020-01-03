<template>
  <div class="Shifts-body">
    <div class="Shifts-top">
      <div class="Shifts-top-left">
        <span>门店:</span>
        <el-autocomplete
          v-model="state"
          popper-class="my-autocomplete"
          :fetch-suggestions="querySearch"
          placeholder="请输入门店"
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
      <!-- 1 -->
      <div class="Shifts-top-right">
        <el-button type="primary" size="mini" @click="Settingone()">班次设置</el-button>
        <el-button type="primary" size="mini">高级查询</el-button>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>
    <!-- 2 -->
    <div class="Shifts-bottom">
      <div class="Shifts-table">
        <el-table
          ref="multipleTable"
          :data="dataArr"
          tooltip-effect="dark"
          style="width: 100%; "
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="编码" width="120" align="center" prop="id" />
          <el-table-column prop="name" label="门店" width="120" align="center" />
          <el-table-column label="班次" align="center">
            <template slot-scope="scope">
              <span
                v-for="item in scope.row.schedule_set "
                :key="item.index"
              >{{ item.dic_classes }}:{{ item.start_at }}-{{ item.end_at }};</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 3 -->
      <div class="Shifts-pag">
        <el-pagination background layout="prev, pager, next" :total="10" />
      </div>
    </div>
    <!-- 子组件 -->
    <div class="Shifts-none">
      <ScheduleSetting ref="setting" :sy-setting.sync="SettingNone" />
    </div>
  </div>
</template>
<script>
import {
  ShiftsGet,
  ShiftsStoreDelete,
  ShiftsStoreGet
} from '@/api/ManageHr/Schedu.js'
import ScheduleSetting from '@/view/ManageHr/component/ScheduleSetting'
export default {
  name: 'ScheduShifts',
  components: {
    ScheduleSetting
  },
  data() {
    return {
      tableData: [],
      restaurants: [],
      state: '',
      dataId: {
        shop_ids: ''
      },
      dataArr: [],
      // 子组件数据
      SettingNone: false
    }
  },
  created() {
    this.getData()
    //  console.log(this.$store.state)
  },
  methods: {
    // 数据渲染
    getData() {
      // 获取数据
      ShiftsStoreGet().then(res => {
        this.restaurants = res.data
      })
      ShiftsGet(this.dataId).then(res => {
        this.dataArr = res.data.list
      })
    },
    // 数据引入

    // el-事件
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
      this.dataId.id = ''
    },
    // 自定义事件
    // 查询
    querydata() {
      ShiftsGet(this.dataId).then(res => {
        this.dataArr = res.data.list
      })
    },
    // 删除
    handleDelete(index, row) {
      const data = {
        shop_ids: row.id
      }
      // console.log(row.id)
      ShiftsStoreDelete(data).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.dataArr.forEach((item, index) => {
            if (item.id === row.id) {
              this.dataArr.splice(index, 1)
            }
          })
        } else {
          this.$message({
            message: '删除失败',
            type: 'warning'
          })
        }
      })
    },
    // 修改
    handleEdit(index, row) {
      const id = row.id
      const name = row.name
      this.$refs.setting.handleEditTwo(id, name)
      this.SettingNone = true
    },
    // 子组件
    Settingone() {
      this.SettingNone = true
    }
  }
}
</script>
<style scoped>
.Shifts-body {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.Shifts-top {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.Shifts-top-left {
  display: flex;
  align-items: center;
  width: 30%;
}
.Shifts-top-left > span {
  padding-right: 10px;
}
.Shifts-top-left > button {
  margin-left: 10px;
}
.Shifts-bottom {
  width: 100%;
  height: calc(100vh - 190px);
  min-height: 500px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  position: relative;
}
.Shifts-table {
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;
  overflow-y: scroll;
  /* border: 1px solid #dcdfe6; */
  border-left: 0;
  border-right: 0;
}
.Shifts-pag {
  width: 100%;
  height: 32px;
  background: #fff;
  text-align: center;
  position: absolute;
  bottom: 0;
}
</style>
