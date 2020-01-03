<template>
  <div>
    <el-dialog
      width="70%"
      title="选择项目"
      :visible.sync="snycProject"
      append-to-body
      :before-close="handleClosep"
      :close-on-click-modal="false"
    >
      <div class="vmaddS-top">
        <el-button type="primary" size="mini" @click="addrow()">添加</el-button>
        <el-button type="primary" size="mini" @click="deleteRow()">删除</el-button>
      </div>
      <div class="vmaddS-body">
        <div class="vmaddS-left">
          <el-table
            ref="multipleTable"
            border
            :data="tablestore"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="选择项目">
              <template slot-scope="scope">
                <!-- <el-input
                  v-model="scope.row.data[0].depart_name"
                  class="edit-input"
                  size="small"
                  placeholder="支持检查,多选"
                  @dblclick.native="storenone(scope.$index,scope)"
                />-->
                <div>
                  <el-autocomplete
                    v-model="vmaddStoreInput"
                    class="inline-input"
                    :fetch-suggestions="querySearch"
                    placeholder="支持检查,多选"
                    @select="handleSelect"
                    @focus="storeindex(scope.$index)"
                    @dblclick.native="storenone(scope.$index,scope)"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                  <el-tag
                    v-for="tag in scope.row.goods_id"
                    :key="tag.index"
                    :disable-transitions="true"
                    :closable="true"
                    @close="handleClose(tag,scope.$index)"
                  >
                    <span>{{ tag.name }}</span>
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="使用条件" width="80" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.is_using" active-value="0" inactive-value="1" />
              </template>
            </el-table-column>
            <el-table-column label="方式" width="180">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.using_type">
                  <el-radio :label="0">张数</el-radio>
                  <el-radio :label="1">全额</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column label="到达张数/到达金额" width="180">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.quantity"
                  class="edit-input"
                  size="small"
                  placeholder="长度5 数字"
                />
              </template>
            </el-table-column>
            <el-table-column label="可使用数(张)" width="180">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.amount"
                  class="edit-input"
                  size="small"
                  placeholder="长度5 数字"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="vmaddS-right">
          <structure ref="pro" :snyc-vmadd-struc.sync="vmaddlist" :snycpost.sync="tablestore" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddStore()">取消</el-button>
        <el-button type="primary" @click="AddStorepost()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Structure from '@/view/BaseModule/SalesSet/component/vmadd-project-structure.vue'
import { projectStructureGet } from '@/api/BaseModule/SalesSet'
export default {
  name: 'VmaddStore',
  components: {
    Structure
  },
  props: {
    snycProject: false,
    snycApplyProject: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 联想
      restaurants: [],
      vmaddStoreInput: '',
      // 子组件传值
      vmaddlist: {
        snycStore: false,
        index: Number
      },
      vmaddStruc3: [],
      // 表单
      tablestore: [
        {
          goods_id: [],
          is_using: 0,
          quantity: '',
          amount: '',
          amount: '',
          goods_type: 1,
          using_type: 0
        }
      ],
      clickTimer: null,
      // 索引
      multipleSelection: [],
      // 选中
      Stlist: [],
      Stlist1: []
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    // 数据
    getData() {
      // 获取数据
      projectStructureGet().then(res => {
        this.Stlist1 = res.data
        if (res.code == 200) {
          this.loadAll()
        }
      })
    },
    Projectindex(e) {
      this.Stlist = e
    },
    tableInit(index) {
      this.tablestore = index
    },
    handleClosep(done) {
      this.AddStore()
    },
    AddStore() {
      this.$emit('update:snycProject', false)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    storenone(index, scope) {
      this.vmaddlist.snycStore = true
      this.vmaddlist.index = index
      this.$refs.pro.triggerto(scope.row.goods_id)
      // console.log(scope)
    },
    // 添加
    addrow() {
      var list = {
        goods_id: [],
        is_using: 0,
        quantity: '',
        amount: '',
        amount: '',
        goods_type: 1,
        using_type: 0
      }
      this.tablestore.unshift(list)
    },
    // 删除
    deleteRow() {
      const val = this.multipleSelection
      if (val) {
        val.forEach((va, index) => {
          this.tablestore.forEach((v, i) => {
            if (va.goods_id === v.goods_id) {
              this.tablestore.splice(i, 1)
            }
          })
        })
      }
      this.$refs.multipleTable.clearSelection()
    },
    // 模糊 联想 搜素
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
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // 数据引入
    loadAll() {
      this.loadAllfor(this.Stlist1)
    },
    loadAllfor(data) {
      var result = null
      const v = 0
      data.forEach((item, index) => {
        if (item.child.length <= 0) {
          this.restaurants.push(item)
        }
        if (item.child && item.child.length > 0) {
          result = this.loadAllfor(item.child)
          if (result) return result
        }
      })
    },
    // 点击传值
    handleSelect(item) {
      const index = this.vmaddlist.index
      this.tablestore[index].goods_id.push(item)
    },
    // 多选栏中的删除
    handleClose(tag, index) {
      const item = this.tablestore[index].goods_id.indexOf(tag)
      this.tablestore[index].goods_id.splice(item, 1)
    },
    storeindex(index) {
      this.vmaddlist.index = index
    },
    fordata() {
      if (this.tablestore) {
        for (let x = 0; x < this.tablestore.length; x++) {
          if (this.tablestore[x].goods_id.length <= 0) {
            this.$message({
              message: '请填写完整',
              type: 'warning'
            })
            return false
          }
          if (this.tablestore[x].amount == '') {
            this.$message({
              message: '请填写完整',
              type: 'warning'
            })
            return false
          }
          if (this.tablestore[x].quantity == '') {
            this.$message({
              message: '请填写完整',
              type: 'warning'
            })
            return false
          }
        }
      }
      var i = 0
      const list = JSON.parse(JSON.stringify(this.tablestore))
      for (i = 0; i < this.tablestore.length; i++) {
        const data = []
        list[i].goods_id.forEach((item, index) => {
          data.push(item.id)
          return data
        })
        list[i].goods_id = data
      }
      this.$emit('update:snycApplyProject', list)
      this.AddStore()
    },
    // xu-xiugai
    projectData(e) {
      const data = e
      let i = 0
      const cuerr = []
      for (i = 0; i < data.length; i++) {
        data[i].goods_id = data[i].goods_id.split(',')
      }
      for (i = 0; i < data.length; i++) {
        data[i].goods_id.forEach(item => {
          const oo = this.recursion(this.Stlist, item)
          cuerr.push(oo)
          data[i].goods_id = cuerr
        })
      }
      this.tablestore = data
    },
    recursion(data, current) {
      if (!data) {
        return
      }
      var result = null
      let v = 0
      for (v = 0; v < data.length; v++) {
        var item = data[v]
        if (item.id == current) {
          result = item
          return result
        }
        if (item.child && item.child.length > 0) {
          result = this.recursion(item.child, current)
          if (result) return result
        }
      }
    },
    AddStorepost() {
      this.fordata()
    }
  }
}
</script>
<style scoped>
.vmaddS-body {
  width: 100%;
  /* display: flex; */
  margin-top: 15px;
}
.vmaddS-top {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}
.vmaddS-top > button {
  margin-left: 10px;
}
.vmaddS-left {
  width: 100%;
  margin-top: 10px;
}
/* .vmaddS-right {
  width: 30%;
  margin: 20px;
  border: 1px solid #dfe6ec;
} */
</style>
