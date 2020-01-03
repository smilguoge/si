<template>
  <div class="message-container">
    <div class="wrap-box">
      <div class="box-title">消息提醒</div>
      <div class="box-content">
        <div v-for="(item,index) in messageData" :key="index" class="box-item">
          <div class="item-inner">
            <div class="item-title">{{ item.tit }}</div>
            <div class="item-num">{{ item.num }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageReminder",
  data() {
    return {
      messageData: [
        {
          tit: "库存预警",
          num: "10"
        },
        {
          tit: "生日提醒",
          num: "10"
        },
        {
          tit: "客诉",
          num: "10"
        },
        {
          tit: "调拨未确认",
          num: "10"
        },
        {
          tit: "预流失客",
          num: "10"
        },
        {
          tit: "会员消费间隔预警",
          num: "10"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped >
.message-container {
  background: #fff;
  height: 320px;
  box-sizing: border-box;
  border-radius: 4px;

  .box-title {
    height: 50px;
    line-height: 50px;
    padding: 0 25px;
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
  }
  .box-content {
    height: 270px;
    padding: 6px;

    .box-item {
      width: 33.3333333%;
      float: left;
      text-align: left;
      padding: 6px;
    }

    .item-inner {
      width: 100%;
      height: 116px;
      background: #fafafa;
      font-size: 12px;
      color: #666;
      padding: 20px;

      .item-title {
        color: rgba(0, 0, 0, 0.7);
        font-size: 16px;
        height: 32px;
      }
      .item-num {
        color: #f33131;
        font-size: 36px;
      }
    }
  }
}
</style>
