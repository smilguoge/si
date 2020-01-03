<template>
  <div class="search-container">
    <div class="wrap-box">
      <div class="box-title">快捷操作</div>
      <div class="box-content">
        <el-input
          placeholder="请输入顾客姓名"
          clearable
          prefix-icon="el-icon-search"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cetrieval",
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.search-container {
  background: #fff;
  border-radius: 4px;
  height: 150px;
}
.box-title {
  height: 50px;
  line-height: 50px;
  padding: 0 25px;
  font-size: 16px;
  border-bottom: 1px solid #E5E5E5;
}

.box-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding: 0 24px;

  
}
</style>

<style lang="scss">
.search-container {
  .el-input input{
    border-radius: 20px;
    background: #F5F5F5;
    color: #999;
  }
}
</style>
