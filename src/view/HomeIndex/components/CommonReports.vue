<template>
  <div class="report-container">
    <div class="wrap-box">
      <p class="box-title">常用报表</p>
      <div class="box-content">
        <div v-for="(item,index) in reportsData" :key="index" class="box-item">
          <div class="item-inner">
            <i class="iconfont icon-dingdan" />
            <span>{{ item.tit }}</span>
          </div>
        </div>
        <div class="box-item">
          <div class="item-inner center">
            <span class="">＋ 添加报表</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonReports",
  data() {
    return {
      reportsData: [
        { tit: "货品出入库明细表" },
        { tit: "项目销售明细表" },
        { tit: "宣传员业绩汇总表" },
        { tit: "预约评价汇总表" },
        { tit: "商学院学习汇总" },
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
.report-container {
  background: #fff;
  border-radius: 4px;
  height: 340px;

  .box-title {
    height: 50px;
    line-height: 50px;
    padding: 0 25px;
    font-size: 16px;
    border-bottom: 1px solid #E5E5E5;
  }

  .box-content {
    display: flex;
    flex-wrap: wrap;
    padding: 6px;
    height: 290px;
  }

  .box-item {
    width: 50%;
    padding: 6px;
    cursor: pointer;

    i {
      display: inline-block;
      font-size: 20px;
      color: #895dfe;
      margin-right: 8px;
    }
  }

  .item-inner {
    display: flex;
    align-items: center;
    background: #fafafa;
    color: #666;
    font-size: 16px;
    border-radius: 4px;
    height: 80px;
    width: 100%;
    padding-left: 20px;

    &.center {
      text-align: center;
    }
  }
}
</style>
