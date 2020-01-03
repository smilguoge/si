<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="产品资料设置" name="dataSet">
        <product-table class="pro-table" :income="treeData" />
      </el-tab-pane>
      <el-tab-pane label="产品类别设置" name="categorySet">
        <product-tree class="pro-tree" @send="getProductTree($event)" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import productTree from './components/productTree'
import productTable from './components/productTable'

export default {
  name: 'InlineEditTable',
  components: { productTree, productTable },
  data() {
    return {
      activeName: 'dataSet',
      treeData: []
    }
  },
  created() {},
  methods: {
    getProductTree(data) {
      this.treeData = data
    }
  }
}
</script>

<style lang="css" scope>
.pro-table,
pro-tree {
  width: 100%;
  height: calc(100vh-200px);
}
</style>
<style lang="scss">
.pro-tab {
  height: 100% !important;
  position: relative;
  & > .el-tabs__content {
    position: absolute;
    top: 55px;
    left: 0;
    right: 0;
    bottom: 20px;
    & > .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
