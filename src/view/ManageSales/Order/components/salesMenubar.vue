<template>
  <!-- 功能菜单 -->
  <div class="m-menu-body">
    <el-button type="text">
      <div class="menu-btn">
        <div class="font-wrap">
          <i class="iconfont icon-gift" />
        </div>
        <span class="order-menu-tit">临时赠送</span>
      </div>
    </el-button>
    <el-button type="text" @click="openDialog('voucherSelect')">
      <div class="menu-btn">
        <div class="font-wrap">
          <i class="iconfont icon-qian3" />
        </div>
        <span class="order-menu-tit">代金券</span>
      </div>
    </el-button>
    <el-button type="text">
      <div class="menu-btn">
        <div class="font-wrap">
          <i class="iconfont icon-tuihuo-kuai" />
        </div>
        <span class="order-menu-tit">退货</span>
      </div>
    </el-button>
    <el-button type="text">
      <div class="menu-btn">
        <div class="font-wrap">
          <i class="iconfont icon-qian" />
        </div>
        <span class="order-menu-tit">订金</span>
      </div>
    </el-button>
    <el-button type="text">
      <div class="menu-btn">
        <div class="font-wrap">
          <i class="iconfont icon-tuikuanguanli" />
        </div>
        <span class="order-menu-tit">退定金</span>
      </div>
    </el-button>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      // -
    }
  },
  created() {
    // -
  },
  methods: {
    // -
    openDialog(type) {
      this.$emit('open', type)
    }
  }
}
</script>
<style lang="scss" scoped>
.m-menu-body {
  height: 80px;
  margin-top: -4px;
  padding: 0 36px;
  display: flex;
  justify-content: space-between;
  .menu-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    cursor: pointer;
  }
  .font-wrap {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #895dfe;
    margin-bottom: 6px;
    text-align: center;
  }
  .font-wrap > i {
    color: #fff;
    line-height: 44px;
    font-size: 24px;
  }
  .order-menu-tit {
    font-size: 14px;
  }
}
</style>
