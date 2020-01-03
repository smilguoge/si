<template>
  <el-drawer
    class="customer-tree-dialog"
    title="选择门店"
    direction="ltr"
    size="90%"
    close-on-press-escape
    :show-close="false"
    :wrapper-closable="false"
    :append-to-body="false"
    :modal="false"
    :visible.sync="drawerVisible"
    :before-close="handleCancel"
  >
    <el-scrollbar style="height:100%">
      <structure
        ref="tree"
        :structure-data="treeData"
        @getCheck="getCheck($event)"
      />
    </el-scrollbar>
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
      required: true
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
      drawerVisible: false
    }
  },
  watch: {
    value(val) {
      // - 控制抽屉状态
      this.drawerVisible = val
    }
  },
  created() { },
  methods: {
    handleCancel() {
      this.$emit('close')
    },
    getCheck(arr) {
      this.$emit('getShop', arr)
    }
  }
}
</script>

<style lang="scss" scope>
.customer-tree-dialog {
  position: absolute;
  height: 100%;
  width: 300px;

  .el-drawer__header {
    margin-bottom: 10px;
  }

  .structure-wrap {
    width: 100%;
    height: 100%;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
 }
}

</style>
