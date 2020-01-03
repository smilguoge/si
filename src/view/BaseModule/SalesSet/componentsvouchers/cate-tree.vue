<template>
  <div class="structure-wrap">
    <div class="structure-body">
      <div class="structure-main">
        <el-tree
          ref="structureTree"
          :data="structureData"
          :props="structureProps"
          :highlight-current="true"
          :expand-on-click-node="false"
          class="filter-tree"
          node-key="id"
          default-expand-all
          @node-click="structureNodeClick"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // - 组织结构组件
  name: 'Structure',
  data() {
    return {
      // filterText: "",
      structureData: [
        {
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2'
              // disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            // disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2'
              // disabled: true
            }]
          }]
        }
      ],
      // - 树形结构数据配置：children为子节点对象；label为节点标签
      structureProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    // filterText(val) {
    //   this.$refs.structureTree.filter(val);
    // }
  },
  created() { },
  mounted() {
    // TODO: 请求组织结构数据
    this.getStructureDada()
  },
  methods: {
    // filterNode(value, data) {
    //   if (!value) return trueoperation;
    //   return data.label.indexOf(value) !== -1;
    // },
    structureNodeClick(data) {
      console.log(data.id)
      // TODO: 反馈当前选中项至父组件，让父组件请求当前选中项的内容
      this.$emit('operation', data.id)
      console.log('向父组件通信')
    },
    getStructureDada() {
      // TODO: 获取组织结构数据
      console.log('获取数据')
    }
  }
}
</script>

<style lang="scss" scoped>
.structure-body {
  // width: 300px;
  min-height: 500px;
  height: 100%;
  // border: 1px solid #bbb;

  // .structure-title {
  //   width: 100%;
  //   height: 58px;
  //   font-size: 20px;
  //   line-height: 58px;
  //   text-align: center;
  //   color: #fff;
  //   background-color: #bbb;
  // }

  .structure-main {
    width: 100%;
    padding: 8px 8px 0;

    // TODO: 输入框蓝色高亮边框待解决；
    .el-input {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24);
      border-radius: 2px;
      outline: 0;
      border: 0;
    }

    .el-tree {
      margin-top: 10px;
    }
  }
}
</style>

<style lang="scss">
</style>
