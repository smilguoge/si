<template>
  <div class="common-container">
    <div class="wrap-box">
      <div class="box-title">
        <span>常用功能</span>
        <!-- <el-pagination
                background
                layout=" pager"
                :total="functionData.length"
                :page-size="8">
        </el-pagination>-->
      </div>
      <div class="box-content">
        <div v-for="(item,index) in functionData" :key="index" class="box-item">
          <router-link :to="resolvePath(item.path)">
            <div class="item-bg" :class="[item.bg]"><i class="iconfont" :class="[item.i]" /></div>
            <p>{{ item.tit }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import path from "path";
export default {
  name: "CommonFunctions",
  data() {
    return {
      functionData: [
        {
          tit: "销售开单",
          bg: "bg1",
          i: "icon-qian1",
          path: "/ManageSales/Order/projectmanage0"
        },
        {
          tit: "会员档案",
          bg: "bg2",
          i: "icon-kehu2",
          path: "/ManageSales/Order/projectmanage"
        },
        {
          tit: "人事管理",
          bg: "bg3",
          i: "icon-hrrenshirenshiguanli380",
          path: "/ManageSales/Order/projectmanage"
        },
        {
          tit: "消耗开单",
          bg: "bg4",
          i: "icon-dingdan",
          path: "/ManageSales/Order/projectmanage"
        },
        {
          tit: "预约管理",
          bg: "bg2",
          i: "icon-leijiyuyue",
          path: "/ManageSales/Order/projectmanage"
        },
        {
          tit: "通讯录",
          bg: "bg4",
          i: "icon-tongxunlu",
          path: "/ManageSales/Order/projectmanage"
        },
        {
          tit: "排班管理",
          bg: "bg1",
          i: "icon-paiban",
          path: "/ManageSales/Order/projectmanage"
        },
        {
          tit: "添加功能",
          bg: "bg5",
          i: "icon-jiahao",
          path: "/ManageSales/Order/projectmanage"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
<style lang="scss" scoped>
.common-container {
  background: #fff;
  height: 320px;
  border-radius: 4px;

  .box-title {
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0 25px;
    font-size: 16px;
    border-bottom: 1px solid #E5E5E5;
  }

  .box-content {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    height: 270px;

    .item-bg {
      width: 70px;
      height: 70px;
      line-height: 70px;
      display: inline-block;
      border-radius: 50%;

      i {
        font-size: 32px;
        color: #fff;
      }

      &.bg1 {background:linear-gradient(0deg,rgba(255,144,132,1),rgba(255,187,107,1));}
      &.bg2 {background:linear-gradient(0deg,rgba(125,123,255,1),rgba(170,145,253,1));}
      &.bg3 {background:linear-gradient(0deg,rgba(249,152,158,1),rgba(252,119,191,1));}
      &.bg4 {background:linear-gradient(0deg,rgba(99,155,255,1),rgba(94,198,255,1));}
      &.bg5 {
        background:#F8F8F8;
        border:1px solid #E0E0E0;

        i {color:#ddd}
      }

      
    }

    .box-item {
      width: 25%;
      text-align: center;
      padding: 10px 0;
      a {
        display: inline-block;
      }
      
      p {
        font-size: 15px;
        color: #666;
        margin-top: 10px;
      }
    }
  }
}
</style>
