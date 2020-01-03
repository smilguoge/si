<template>
  <div class="make-appointment">
    <div class="make-app-left" style="display:none;">
      <structure />
    </div>
    <!-- 1 -->
    <div class="make-app-body">
      <div class="app-body-top">
        <div class="app-body-app-1">
          <span>门店</span>
          <el-autocomplete
            v-model="makeData.make_store"
            popper-class="my-autocomplete"
            :fetch-suggestions="querySearch"
            placeholder="请输入门店"
            size="mini"
            style="width:180px; margin:0 10px;"
            @select="handleSelect"
          >
            <i slot="suffix" class="el-icon-edit el-input__icon" @click="handleIconClick" />
            <template slot-scope="{ item }">
              <div class="name">{{ item.name }}</div>
            </template>
          </el-autocomplete>
          <span>时间</span>
          <el-date-picker
            v-model="makeData.make_date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            size="mini"
            style="width:180px; margin:0 10px;"
          />
          <el-button type="primary" size="mini">查询</el-button>
        </div>
        <div class="app-body-app-2">
          <svg-icon icon-class="xuexi" class-name="custom-class" />学习日:
          <span>星期一 (16:00-17:00)</span>
        </div>
        <div class="app-body-app-3">
          <span>床位状态:</span>
          <div>
            <svg-icon icon-class="chuang" class-name="custom-class" />
            <span>空闲(13)</span>
          </div>
          <div>
            <svg-icon icon-class="chuang" class-name="custom-class" />
            <span>占用(13)</span>
          </div>
        </div>
      </div>
      <div class="app-body-center">
        <div class="app-body-left">
          <div class="app-body-left-1">当班人员</div>
          <div class="app-body-left-2">
            <p>姓名</p>
            <p>状态</p>
          </div>
          <div class="app-body-left-3" />
        </div>
        <div class="app-body-centre">
          <div class="app-body-centre-1">预约明细</div>
          <div class="app-body-centre-2">
            <!-- 表格 -->
            <div class="app-body-centre-table">
              <table onselectstart="return false;" class="index-center">
                <thead class="index-thead">
                  <tr>
                    <th>
                      <span>时间</span>
                      <span>员工</span>
                    </th>
                    <th v-for="item in makeTabledate" :key="item.index">{{ item.time }}</th>
                  </tr>
                </thead>
                <tbody id="tb" v-menus class="tb index-tbody">
                  <tr v-for="item in this.makeTabledata" :key="item.index">
                    <td style="pointer-events:none;">
                      {{ item.staff_name }}
                      {{ item.position_name }}
                    </td>
                    <td :data-item="item.list[1]" :data-id="item.staff_id">
                      <span
                        v-if=" Object.keys(item.list[1]).length == 4"
                      >{{ item.list[1].booking[1].customer_name }}</span>
                      <span>{{ item.list[1].status_name }}</span>
                    </td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          v-show="menuShow"
          class="xuanze"
          :style="{'left': menuLeft, 'top': menuTop}"
          onselectstart="return false;"
        />
        <div class="app-body-right">
          <div class="app-body-right-1">待处理预约（20）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Structure from '@/view/BaseModule/SalesSet/component/vm-structure.vue'
import { makeAppGet } from '@/api/ManageSales/AppointmentAppraise'
// import { makeAppTableIn } from "./makeApp.js";
export default {
  name: 'MakeAppointment',
  components: {
    Structure
  },
  directives: {
    menus: {
      inserted: function(el, binding, vnode) {
        // 获取vue实例对象
        const vm = vnode.context
        let showFlag = true
        vnode = vnode.elm
        // 阻止默认浏览器的右键菜单
        el.oncontextmenu = event => {
          event.preventDefault()
        }
        el.onmouseup = event => {
          if (event.button === 2) {
            vm.menuShow = true
            showFlag = false
            const realTop = document.body.clientHeight
            let top = event.pageY + 5
            if (realTop - top < 200) {
              top = top - 200
            }
            const left = event.pageX + 5 + 'px'
            vm.menuLeft = left
            vm.menuTop = top + 'px'
          }
          // 判断
          if (showFlag) {
            vm.menuShow = false
          }
          showFlag = true
        }
        document.onmouseup = () => {}
        document.getElementById('tb').addEventListener('wheel', myFunction)
        function myFunction() {
          vm.menuShow = false
          showFlag = true
        }
      }
    }
  },
  data() {
    return {
      makeData: {
        make_date: '',
        make_store: ''
      },
      makeTabledata: [],
      makeTabledate: [],
      // 选中数据
      data_arr: [],
      // 自定义属性
      menuShow: false,
      menuLeft: 0,
      menuTop: 0
    }
  },
  created() {
    this.datainitGet()
  },
  mounted() {},
  methods: {
    datainitGet() {
      const data = {
        shop_id: 16,
        sdate: 1575043200
      }
      // 事件

      makeAppGet(data).then(res => {
        this.makeTabledata = res.data.list
        this.makeTabledate = res.data.time
        if (res.code == 200) {
          this.makeTableinit()
        }
      })
    },
    // el-事件
    // 门店 input
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // input suo
    handleSelect(item) {},
    // 取消
    handleIconClick(ev) {},
    // 自定义事件
    makeTableinit() {
      var _vm = this
      var mouse_begin = { x: 0, y: 0 }
      var mouse_end = { x: 0, y: 0 }
      $(function() {
        init()
        $('body').mousedown(function() {
          $('.tb td').removeClass('td_bg') // 点击表格之外的部分，清空所有选中
        })
      })

      function init() {
        mouseDown()
      }

      function mouseDown() {
        $('.tb td').mousedown(function(e) {
          if (e.which == 1) {
            mouseUp()
            e.stopPropagation() // 阻止继承父元素document的mousedown事件
            mouse_begin = {
              x: $(this)
                .parent()
                .parent()
                .find('tr')
                .index($(this).parent()[0]),
              y: $(this)
                .parent()
                .find('td')
                .index($(this)[0])
            }
            $('.tb td').removeClass('td_bg') // 清空所有选中
            $(this).addClass('td_bg')
            const data = $(this)
            _vm.data_arr = []
            _vm.data_arr.push(data)
            // console.log(_vm.data_arr);
            mouseMove()
          } else {
            return false
          }
        })
      }

      function mouseMove() {
        $('.tb td').mouseover(function() {
          $('.tb td').removeClass('td_bg') // 清空所有选中
          mouse_end = {
            x: $(this)
              .parent()
              .parent()
              .find('tr')
              .index($(this).parent()[0]),
            y: $(this)
              .parent()
              .find('td')
              .index($(this)[0])
          }
          var maxX = mouse_begin.x < mouse_end.x ? mouse_end.x : mouse_begin.x
          var minX = mouse_begin.x < mouse_end.x ? mouse_begin.x : mouse_end.x
          var maxY = mouse_begin.y < mouse_end.y ? mouse_end.y : mouse_begin.y
          var minY = mouse_begin.y < mouse_end.y ? mouse_begin.y : mouse_end.y
          _vm.data_arr = []
          for (var i = minX; i <= maxX; i++) {
            for (var j = minY; j <= maxY; j++) {
              $('.tb tr:eq(' + i + ') td:eq(' + j + ')').addClass('td_bg')
              const data = $('.tb tr:eq(' + i + ') td:eq(' + j + ')')
              // console.log(data)
              _vm.data_arr.push(data)
              // console.log(_vm.data_arr);
            }
          }
          // $(this).addClass('td_bg');
        })
      }
      //  清除已有的样式
      function mouseUp() {
        $('body').mouseup(function() {
          $('.tb td').unbind('mouseover')
        })
      }
    }
    // 自定义事件
  }
}
</script>

<style scoped>
.make-appointment {
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  background: #f5f5f5;
  display: flex;
}
.make-app-left {
  width: 25%;
  height: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  margin-right: 8px;
}
.make-app-body {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 3px;
}
.app-body-top {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
}
.app-body-app-1 {
  display: flex;
  align-items: center;
}
.app-body-app-1 > span {
  font-size: 14px;
}
.app-body-app-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 260px;
  border: #895dfe solid 1px;
  border-radius: 3px;
  background: rgba(137, 93, 254, 0.1);
  font-size: 14px;
  overflow: hidden;
}
.app-body-app-2 > svg {
  width: 20px;
  height: 16px;
  margin: 0 10px;
  filter: drop-shadow(#895dfe 80px 0);
  transform: translateX(-80px);

  /* background: rgb(137, 93, 254) !important; */
}
.app-body-app-2 > span {
  padding: 0 5px;
  font-size: 14px;
  color: #999;
}
.app-body-app-3 {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.app-body-app-3 > div:nth-of-type(1) {
  width: 120px;
  height: 28px;
  border: #6ee532 1px solid;
  border-radius: 3px;
  background: rgba(110, 229, 50, 0.1);
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.app-body-app-3 > div:nth-of-type(1) > svg {
  color: #6ee532;
  width: 20px;
  height: 16px;
  filter: drop-shadow(#6ee532 80px 0);
  transform: translateX(-80px);
}
.app-body-app-3 > div:nth-of-type(1) > span {
  color: #6ee532;
  font-size: 14px;
}
.app-body-app-3 > div:nth-of-type(2) {
  width: 120px;
  height: 28px;
  border: #ff4569 1px solid;
  border-radius: 3px;
  background: rgba(255, 69, 105, 0.1);
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.app-body-app-3 > div:nth-of-type(2) > svg {
  color: #ff4569;
  width: 20px;
  height: 16px;
  filter: drop-shadow(#ff4569 80px 0);
  transform: translateX(-80px);
}
.app-body-app-3 > div:nth-of-type(2) > span {
  color: #ff4569;
  font-size: 14px;
}
.app-body-center {
  width: 100%;
  height: calc(100% - 75px);
  margin-top: 15px;
  display: flex;
}
.app-body-left {
  width: 15%;
  height: calc(100% - 10px);
  margin-left: 10px;
}
.app-body-left-1 {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  background: #895dfe;
}
.app-body-left-2 {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-top: 0;
  border-bottom: 0;
}
.app-body-left-2 > p {
  font-size: 14px;
}
.app-body-left-3 {
  width: 100%;
  height: calc(100% - 90px);
  border-radius: 0 0 3px 3px;
  border: 1px solid #dcdfe6;
}
.app-body-centre {
  width: calc(65% - 40px);
  height: calc(100% - 10px);
  margin: 0 10px;
}
.app-body-centre-1 {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  background: #895dfe;
}
.app-body-right {
  width: 20%;
  margin-right: 10px;
  height: calc(100% - 10px);
}
.app-body-right-1 {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  background: #895dfe;
}
.app-body-centre-2 {
  width: 100%;
  height: calc(100% - 45px);
  border-radius: 0 0 3px 3px;
  border: 1px solid #dcdfe6;
  overflow: hidden;
  /* overflow-y: scroll; */
}
/* 表格 */
.td_bg {
  background: #ffaa00 !important;
}
.app-body-centre-table {
  width: calc(100% + 15px);
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}
.tb td {
  width: 120px;
  height: 50px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
}
.index-thead > tr {
  display: flex;
  flex-direction: column;
}
.index-thead > tr > th {
  width: 120px;
  height: 50px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-bottom: 0;
  font-weight: 100;
  font-size: 14px;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index-thead > tr > th:nth-last-of-type(1) {
  border-bottom: 1px solid #dcdfe6;
}
.index-center {
  display: flex;
}
.index-tbody {
  display: flex;
}
.index-tbody > tr {
  display: flex;
  flex-direction: column;
}
.xuanze {
  width: 100px;
  height: 200px;
  background: #895dfe;
  position: fixed;
  z-index: 1000;
}
</style>
