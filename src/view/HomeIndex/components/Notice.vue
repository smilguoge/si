<template>
  <div class="notice-container">
    <div class="wrap-box">
      <div class="box-title">通知公告</div>
      <div class="box-content">
        <div class="nodata">
          <img src="@/assets/home/notice.png" />
          <p>暂无任何通知公告~</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Notice",
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.notice-container {
  background: #fff;
  border-radius: 4px;
  height: 510px;
}
.box-title {
  height: 50px;
  line-height: 50px;
  padding: 0 25px;
  font-size: 16px;
  border-bottom: 1px solid #E5E5E5;
}

.box-content {
  height: 460px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.nodata p {
  color: #666;
  font-size: 16px;
  margin-top: 20px;
}
</style>
