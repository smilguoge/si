<template>
  <div class="todo-container">
    <div class="wrap-box">
      <div class="box-title">
        <span>待办事项</span>
        <router-link to="/" class="subtitle">
          查看更多>>
        </router-link>
      </div>
      <div class="box-content">
        <div v-for="(item,index) in listData" :key="index" class="box-item">
          <div class="item-inner">
            <div class="item-info">
              <div class="info-title">{{ item.tit }}</div>
              <div class="info-date">{{ item.time }}</div>
            </div>
            <span class="item-link">查看</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TodoList",
  data() {
    return {
      listData: [
        {
          tit: "[盘亏流程处理] 由成都青阳四店_陶丽红店长发起",
          time: "2019-09-06 12:36:30"
        },
        {
          tit: "[盘亏流程处理] 由成都青阳四店_陶丽红店长发起",
          time: "2019-09-06 12:36:30"
        },
        {
          tit: "[盘亏流程处理] 由成都青阳四店_陶丽红店长发起",
          time: "2019-09-06 12:36:30"
        },
        {
          tit: "[盘亏流程处理] 由成都青阳四店_陶丽红店长发起",
          time: "2019-09-06 12:36:30"
        }
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
  padding: 0;
}
.todo-container {
  background: #fff;
  border-radius: 4px;
  height: 340px;
}

.box-title {
  height: 50px;
  line-height: 50px;
  padding: 0 25px;
  font-size: 16px;
  border-bottom: 1px solid #E5E5E5;

  .subtitle{
    float:right;
    font-size:14px;
    color:#999;
  }
}

.item-inner {
  overflow: hidden;
  padding: 12px 16px 12px 30px;
}

.box-item {
  width: 100%;
  text-align: left;
  font-size: 16px;
}

.item-info {
  float: left;
  color: #666;
  width: 90%;
  position: relative;

  &:before {
    content:'';
    display: inline-block;
    width:8px;
    height:8px;
    background:#F45050;
    border-radius:50%;
    position: absolute;
    top: 3px;
    left: -15px;
  }

  .info-title {
    height:20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width:100%;

  }

  .info-date {
    color: #999;
    font-size: 14px;
    margin-top: 10px;
  }
}

.item-link {
  color: #999;
  height: 40px;
  line-height: 40px;
  float: right;
}
</style>
