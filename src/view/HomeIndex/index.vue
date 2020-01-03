<template>
  <div class="home-container">
    <panel-group :chart-data="chartData" />
    <div class="home-left">
      <div class="left-box">
        <common-functions />
      </div>
      <div class="left-box">
        <message-reminder />
      </div>
      <div class="left-box">
        <common-reports />
      </div>
      <div class="left-box">
        <todo-List />
      </div>
    </div>
    <div class="home-right">
      <div class="right-box">
        <cetrieval />
      </div>
      <div class="right-box">
        <notice />
      </div>
    </div>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import CommonFunctions from "./components/CommonFunctions";
import MessageReminder from "./components/MessageReminder";
import CommonReports from "./components/CommonReports";
import Cetrieval from "./components/Cetrieval";
import TodoList from "./components/TodoList";
import Notice from "./components/Notice";
export default {
  name: "HomeIndex",
  components: {
    PanelGroup,
    CommonFunctions,
    MessageReminder,
    CommonReports,
    Cetrieval,
    TodoList,
    Notice
  },
  data() {
    return {
      chartData: {
        price: 6000,
        prices: 9000
      }
    };
  },
  watch: {},
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },

  methods: {}
};
</script>
<style lang="scss" scoped>
.home-container {
  padding: 12px;
  background-color:#f5f5f5;
  overflow: hidden;
}
.home-left {
  width: 75%;
  float: left;
  overflow: hidden;

  .left-box {
    width: 50%;
    padding: 12px;
    float: left;
  }
}
.home-right {
  width: 25%;
  float: left;

  .right-box {
    width: 100%;
    padding: 12px;
  }
}
</style>
