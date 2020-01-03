<template>
  <el-drawer
    class="dialog-wrap-ly"
    title="选择门店"
    direction="rtl"
    size="30%"
    close-on-press-escape
    :show-close="false"
    :wrapper-closable="false"
    :append-to-body="false"
    :modal="false"
    :visible.sync="drawerVisible"
    :before-close="handleCancel"
  >
    <el-scrollbar class="scroll-ly" style="height:calc(100% - 70px)">
      <structure
        ref="tree"
        :structure-data="treeData"
        :check-data="selectedData"
        :is-select="true"
        @getCheck="getCheck($event)"
      />
    </el-scrollbar>
    <div class="drawer-footer">
      <el-button
        type="primary"
        @click="handleSave"
      >保 存</el-button>
      <el-button
        type="danger"
        @click="handleCancel"
      >取 消</el-button>
    </div>
  </el-drawer>
</template>

<script>
import Structure from '@/component/Structure/index'

export default {
  name: 'InlineEditTable',
  components: {
    Structure
  },
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    },
    selectArr: {
      type: Array,
      default() {
        return []
      }
    },
    treeData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      drawerVisible: false,
      selectedData: this.selectArr
    }
  },
  watch: {
    value(val) {
      // - 控制抽屉与遮罩状态
      this.drawerVisible = val
      this.$emit('mark', val)
    },
    selectArr(val) {
      // - 传递已选中项目数组
      this.selectedData = val
    }
  },
  created() { },
  methods: {
    handleSave() {
      this.$refs.tree.addCheck('shop')
    },
    handleCancel() {
      this.$emit('clear')
      this.selectedData = [] // 关闭时清空选中数据
    },
    getCheck(arr) {
      this.$emit('getShop', arr)
    }
  }
}
</script>

<style lang="scss" scope>
.dialog-wrap-ly {
  position: absolute;
  height: 100%;

  .el-drawer__body{
    height: calc(100% - 60px);
  }
  .drawer-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    background-color: #fff;
    .el-button {
      width: 44%;
    }
  }
}

.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
