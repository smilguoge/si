<template>
  <div class="panel-group">
    <!-- 今日收入 -->
    <div class="card-box">
      <div class="card-panel">
        <div class="panel-box bg1">
          <div class="box-left">
            <el-progress
              class="card-progress"
              :percentage="45"
              :width="85"
              :stroke-width="8"
              color="#fff"
              type="circle"
            />
          </div>
          <div class="box-right">
            <p class="title">本月收入</p>
            <p class="total">
              <span>￥</span>
              {{ chartData.price }}
            </p>
            <p class="info">距月目标：-￥{{ chartData.prices }}</p>
          </div>
        </div>
        <div class="panel-info">
          <span>今日业绩</span>
          <span class="color1">￥{{ chartData.price }}</span>
        </div>
      </div>
    </div>

    <!-- 本月消耗 -->
    <div class="card-box">
      <div class="card-panel">
        <div class="panel-box bg2">
          <div class="box-left">
            <el-progress
              class="card-progress"
              :percentage="45"
              :width="85"
              :stroke-width="8"
              color="#fff"
              type="circle"
            />
          </div>
          <div class="box-right">
            <p class="title">本月消耗</p>
            <p class="total">
              <span>￥</span>
              {{ chartData.price }}
            </p>
            <p class="info">距月目标：-￥{{ chartData.prices }}</p>
          </div>
        </div>
        <div class="panel-info">
          <span>今日消耗</span>
          <span class="color2">￥{{ chartData.price }}</span>
        </div>
      </div>
    </div>

    <!-- 本月客流 -->
    <div class="card-box">
      <div class="card-panel">
        <div class="panel-box bg3">
          <div class="box-left">
            <el-progress
              class="card-progress"
              :percentage="45"
              :width="85"
              :stroke-width="8"
              color="#fff"
              type="circle"
            />
          </div>
          <div class="box-right">
            <p class="title">本月客流</p>
            <p class="total">{{ chartData.price }}</p>
            <p class="info">距月目标：-{{ chartData.prices }}人</p>
          </div>
        </div>
        <div class="panel-info">
          <span>今日客流</span>
          <span class="color3">{{ chartData.price }}人</span>
        </div>
      </div>
    </div>

    <!-- 本月预约 -->
    <div class="card-box">
      <div class="card-panel">
        <div class="panel-box bg4">
          <div class="box-left">
            <el-progress
              class="card-progress"
              :percentage="0"
              :width="85"
              :stroke-width="8"
              color="#fff"
              type="circle"
              :show-text="false"
            />
            <i class="iconfont icon-leijiyuyue" />
          </div>
          <div class="box-right">
            <p class="title">本月预约</p>
            <p class="total">
              {{ chartData.price }}
              <span>人</span>
            </p>
            <p class="info"></p>
          </div>
        </div>
        <div class="panel-info">
          <span>今日预约</span>
          <span class="color4">{{ chartData.price }}人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  // 用来接收父组件传给子组件的数据
  props: {
    chartData: {}
  },
  mounted() {
    // this.drawLine()
  },
  methods: {}
};
</script>

<style lang="scss">
.card-progress {
  .el-progress-circle__track {
    stroke: rgba(255, 255, 255, 0.4);
  }

  .el-progress__text {
    font-size: 16px !important;
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
p {
  margin: 0;
}
.card-box {
  padding: 12px;
  width: 25%;
}
.panel-group {
  display: flex;
}
.card-panel {
  // height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #fff;
  box-shadow: 0px 4px 10px 0px rgba(41, 30, 68, 0.05);
  border-radius: 4px;

  .panel-box {
    display: flex;
    padding: 24px 0;
    height: 160px;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    &.bg1 {
      background-color: linear-gradient(
        90deg,
        rgba(136, 128, 255, 1),
        rgba(159, 140, 253, 1)
      );
      background-image: url("~@/assets/home/bg1.png");
    }

    &.bg2 {
      background-color: linear-gradient(
        90deg,
        rgba(255, 144, 132, 1),
        rgba(255, 187, 107, 1)
      );
      background-image: url("~@/assets/home/bg2.png");
    }

    &.bg3 {
      background-color: linear-gradient(
        90deg,
        rgba(96, 142, 253, 1),
        rgba(104, 211, 253, 1)
      );
      background-image: url("~@/assets/home/bg3.png");
    }

    &.bg4 {
      background-color: linear-gradient(
        -90deg,
        rgba(249, 152, 158, 1),
        rgba(252, 119, 191, 1)
      );
      background-image: url("~@/assets/home/bg4.png");
    }

    .box-left {
      height: 85px;
      line-height: 85px;
      margin: 8px 0;
      width: 45%;
      max-width: 160px;
      text-align: center;
      position: relative;

      i {
        position: absolute;
        left: 50%;
        margin-left: -20px;
        color: #fff;
        font-size: 40px;
      }
    }

    .box-right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 14px;

      .title {
        font-size: 18px;
      }
      .total {
        font-size: 34px;
        font-family: "DIN-Medium";

        span {
          font-size: 24px;
        }
      }
    }
  }
  .panel-info {
    padding: 0 32px;
    line-height: 55px;
    color: #999;
    font-size: 16px;
    background-color: #fff;

    span {
      padding-right: 4px;
    }

    .color1 {
      color: #8c82ff;
    }
    .color2 {
      color: #ff9681;
    }
    .color3 {
      color: #6197fd;
    }
    .color4 {
      color: #fc7bbb;
    }
  }
}

// @media (max-width:550px) {
//   .card-panel-description {
//     display: none;
//   }

//   .card-panel-icon-wrapper {
//     float: none !important;
//     width: 100%;
//     height: 100%;
//     margin: 0 !important;

//     .svg-icon {
//       display: block;
//       margin: 14px auto !important;
//       float: none !important;
//     }
//   }
// }
</style>
