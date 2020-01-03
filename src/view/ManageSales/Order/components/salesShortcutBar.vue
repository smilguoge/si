<template>
  <!-- 快捷选项 -->
  <div class="m-menu-body">
    <el-scrollbar class="btnbar-scroll">
      <el-button
        v-for="item in btnData"
        :key="item.value"
        class="menu-btn"
        type="primary"
        size="medium"
        plain
        @change="handleSelect(item)"
      >{{ item.name }}</el-button>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      // -
      btnData: [
        { name: '1980', value: 1 },
        { name: '2980', value: 2 },
        { name: '5490', value: 3 },
        { name: '测试套餐1', value: 4 },
        { name: '万一有个套餐名字就这么长咋个办', value: 5 },
        { name: '测试套餐3', value: 6 }
      ]
    }
  },
  created() {
    // -
  },
  methods: {
    handleSelect(ele) {
      console.log(ele)
    }
  }
}
</script>
<style lang="css" scoped>
.m-menu-body {
  width: 100%;
  padding-right: 24px;
  overflow: hidden;
}
.btnbar-scroll{
  white-space: nowrap;
}
.menu-btn {
  margin-left: 20px;
  /* height: 36px; */
}
</style>
