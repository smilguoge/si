<template>
  <div class="structure-wrap">
    <div class="structure-body-l structure-main">
      <el-input v-model="filterText" placeholder="输入部门名称" prefix-icon="el-icon-search" />
      <div v-show="isSelectAll" class="structure-button">
        <el-button size="mini" round plain @click="checkAll">全选</el-button>
        <el-button size="mini" round plain @click="inverse">反选</el-button>
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
        :show-checkbox="isSelect"
        default-expand-all
        @node-click="nodeClick"
        @check-change="checkClick"
      />
    </div>
  </div>
</template>
<script>
/**
 * FIXME: 若有要添加新的需求请写好注释，以免误删！
 *
 * 参数说明：
 *
 * 1. structureData 【必传】 组件数据（name 作为展示，child 作为子级）
 *
 * 2. checkData 【非必传】 默认选中的数据，默认为空，isSelect 值为 true 才可以用
 *
 * 3. isSelect 【非必填】 是否显示复选框，默认为 false
 *
 * 4. isSelectAll 【非必填】 是否显示全选/反选按钮，默认为 false
 */
export default {
  name: 'Structure',
  props: {
    structureData: {
      // tree data
      type: Array,
      default() {
        return []
      }
    },
    checkData: {
      // selected data
      type: Array,
      default() {
        return []
      }
    },
    isSelect: {
      // checkbox show
      type: Boolean,
      default() {
        return false
      }
    },
    isSelectAll: {
      // select all
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      filterText: '',

      // - 已选中的项目
      selectedData: this.checkData,

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
    selectedData(val) {
      this.selectedData = val
    }
  },
  created() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    nodeClick(data) {
      // - 获取被点击数据（不是选中复选框）
      // console.log(data);
    },
    checkClick(data, checked, indeterminate) {
      // - 勾选时触发
      // console.log(data, checked, indeterminate)
    },

    // - FIXME: 权限配置功能/门店配置功能
    addCheck(type = 'auth') {
      const checkArr = this.$refs.tree.getCheckedNodes()
      const resArr = []
      checkArr.forEach(item => {
        if (type === 'auth') {
          // - 发送选中部门的员工id
          if (!item.hasOwnProperty('children')) {
            resArr.push(item.id)
          }
        } else {
          // - 发送选中的门店名称以及id
          if (!item.hasOwnProperty('children')) {
            resArr.push(item)
          }
        }
        return resArr
      })
      this.$emit('getCheck', resArr)
    },
    checkAll() {
      // 处理全选
      this.flag = true
      this.$refs.tree.setCheckedNodes(this.structureData)
      this.AddStorepost()
    },
    batchSelect(nodes, refs, flag, seleteds) {
      // 全选处理方法
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
    inverse() {
      // 反选
      const res = this.$refs.tree
      const nodes = res.getCheckedNodes(true, true)
      this.batchSelect(this.structureData, res, true, nodes)
      this.AddStorepost()
    },
    AddStorepost() {
      // 提交
      this.addCheck()
      // 已选数据
      const set_data = {
        is_overdue: 0,
        shop_id_arr: this.currentArr
      }
      this.$emit('update:snycGet', set_data)
      this.$parent.vmGet()
    }
  }
}
</script>

<style lang="scss" scoped>
.structure-body-l {
  width: 100%;
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
