<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="this.snycVmaddStruc.snycStore"
      width="35%"
      append-to-body
      :before-close="handleClosep"
      :close-on-click-modal="false"
    >
      <div class="structure-wrap">
        <div class="structure-body structure-main">
          <el-input v-model="filterText" placeholder="组织机构名称" prefix-icon="el-icon-search" />
          <div class="structure-button">
            <el-button size="mini" round @click="checkAll">全选</el-button>
            <el-button size="mini" round @click="inverse">反选</el-button>
          </div>
          <el-tree
            ref="tree"
            v-loading="listLoading"
            class="filter-tree"
            node-key="id"
            :data="structureData"
            :props="structureProps"
            :highlight-current="true"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :default-checked-keys="selectedData"
            :show-checkbox="activeShow"
            default-expand-all
            @node-click="nodeClick"
            @check-change="checkClick"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddStore()">取 消</el-button>
        <el-button type="primary" @click="AddStorepost()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { structureGet } from '@/api/BaseModule/SalesSet'
/**
 * FIXME: 该组件数据渲染不固定，会精确到门店或员工，用来适用于不同的组件。
 *
 * FIXME: 若有要添加新的需求请写好注释，以免误删！
 */
export default {
  name: 'Structure2',
  props: {
    checkData: {
      type: Array
    },
    snycVmaddStruc: {
      type: Object,
      default() {
        return {}
      }
    },
    snycpost: {
   
    }
  },
  data() {
    return {
      // 提交数据
      datapost: this.snycpost,
      filterText: '',
      currentArr: [],
      structureData: [],
      shop_id: [],

      // - 复选框是否展示
      activeShow: true,

      // - 已选中的项目
      selectedData: [],

      // - 渲染配置
      structureProps: {
        children: 'child',
        label: 'name'
      },
      listLoading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    checkData(val) {
      this.selectedData = val
      // console.log(this.selectedData)
    }
  },
  created() {
    // TODO: 请求组织结构数据
    // console.log(this.snycVmaddStruc)
    this.getData()
  },
  methods: {
    getData() {
      // 获取数据
      structureGet().then(res => {
        this.structureData = res.data
      })
    },
    triggerto(data) {
      if (data.length > 0) {
        const list = []
        data.forEach(item => {
          list.push(item.id)
        })
        // console.log(list)
        this.$refs.tree.setCheckedKeys(list)
      }
    },
    filterNode(value, data) {
      // - 筛选
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    nodeClick(data) {
      // - 获取被点击数据（并不是选中复选框）
      // console.log(data);
    },
    checkClick(data, checked, indeterminate) {
      // - 勾选时触发
      // console.log(data, checked, indeterminate)
    },

    // - FIXME: 权限配置功能/门店配置功能
    addCheck(type = 'auth') {
      const checkArr = this.$refs.tree.getCheckedNodes()
      // console.log(checkArr)
      const resArr = []
      const resArrId = []
      this.currentArr = []
      checkArr.forEach(item => {
        if (type == 'auth') {
          // - 发送选中部门的name id
          if (item.child.length <= 0) {
            resArr.push(item)
            resArrId.push(item.id)
            // console.log(resArr)
          }
        } else {
          // - 发送选中的门店id
          if (!item.hasOwnProperty('child')) {
            resArr.push(item.id)
            //  console.log(resArr)
          }
          /**
           *
           * TODO: 组织结构样式待修改，成员配置界面修复！！！
           *
           */
        }
        return resArr, resArrId
      })
      this.currentArr = resArr
      this.shop_id = resArrId
    },
    // 处理全选
    checkAll() {
      this.flag = true
      this.$refs.tree.setCheckedNodes(this.structureData)
    },
    // 全选处理方法
    batchSelect(nodes, refs, flag, seleteds) {
      if (typeof nodes !== 'undefined') {
        nodes.forEach(element => {
          refs.setChecked(element, flag, true)
        })
      }
      if (typeof seleteds !== 'undefined') {
        seleteds.forEach(node => {
          refs.setChecked(node, !flag, true)
        })
      }
    },
    // 反选
    inverse() {
      const res = this.$refs.tree
      const nodes = res.getCheckedNodes(true, true)
      this.batchSelect(this.structureData, res, true, nodes)
    },
    // 关闭
    AddStore() {
      const data = this.snycVmaddStruc
      data.snycStore = false
      this.$emit('update:snycVmaddStruc', data)
    },
    // 提交
    AddStorepost() {
      // 已选数据
      this.addCheck()
      console.log(this.checkArr)
      const checkArr = this.currentArr
      if (checkArr.length <= 0) {
        this.$message({
          message: '请选择',
          type: 'warning'
        })
        return false
      }
      // console.log(checkArr);
      const index = this.snycVmaddStruc.index
      const data = this.snycpost
      data[index].shop_id = checkArr
      // this.$emit("update:snycVmaddStruc", false);
      this.$emit('update:snycVmaddpost', data)
      this.AddStore()
    },
    handleClosep(done) {
      this.AddStore()
    }
  }
}
</script>

<style lang="scss" scoped>
.structure-body {
  // width: 300px;
  width: 100%;
  min-height: 400px;
  height: 100%;
  padding: 8px 8px 0;
  box-sizing: border-box;

  .el-tree {
    margin-top: 10px;
  }
  .structure-button {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
  }
  .structure-button > button {
    margin-right: 10px;
  }
}
</style>
