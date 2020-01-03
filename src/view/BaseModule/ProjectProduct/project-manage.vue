<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="pro-tab">
      <el-tab-pane label="项目资料设置" name="dataSet">
        <project-table class="pro-table" :income="treeData" />
      </el-tab-pane>
      <el-tab-pane label="项目类别设置" name="categorySet">
        <project-tree class="pro-tree" @send="getProjectTree($event)" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import projectTree from './components/projectTree'
import projectTable from './components/projectTable'

export default {
  name: 'InlineEditTable',
  components: { projectTree, projectTable },
  data() {
    return {
      activeName: 'dataSet',
      treeData: []
    }
  },
  created() {},
  methods: {
    getProjectTree(data) {
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
