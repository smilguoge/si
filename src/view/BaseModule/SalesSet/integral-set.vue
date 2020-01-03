<template>
  <!--功能测试 删除请告知 徐晓涛 -->
  <div>
    <table onselectstart="return false;" class="index-center">
      <thead class="index-thead">
        <tr>
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody id="tb" class="tb index-tbody">
        <tr v-for="item in tableData" :key="item.index">
          <td @contextmenu.prevent="dataTd()">{{ item.data }}</td>
          <td @contextmenu.prevent="dataTd()">{{ item.name }}</td>
          <td @contextmenu.prevent="dataTd()">{{ item.address }}</td>
          <td @contextmenu.prevent="dataTd()" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      tableData: [],
      data_arr: []
    }
  },
  mounted() {
    var _vm = this
    this.tableData = this.olladd()
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
        // console.log("444");
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
            console.log(_vm.data_arr)
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
  },
  methods: {
    dataTd(e) {
      console.log(e)
      console.log('444')
    },
    olladd() {
      return [
        {
          data: '123',
          name: '456',
          address: '789'
        },
        {
          data: '123',
          nmae: '456',
          address: '789'
        },
        {
          data: '123',
          nmae: '456',
          address: '789'
        },
        {},
        {}
      ]
    }
  }
}
// table 鼠标连续选中
</script>
<style scoped>
* {
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.tb {
  cellspacing: 0px;
  border-spacing: 0px;
  border: 1px solid #000;
  /* user-select: auto; */
}
.tb td {
  width: 100px;
  height: 50px;
  border: 1px solid #000;
}
th {
  width: 100px;
  height: 50px;
  border: 1px solid #ddd;
  background: #eee;
}
.td_bg {
  background: #ffaa00;
}
.index-center {
  display: flex;
}
.index-thead > tr {
  display: flex;
  flex-direction: column;
}
.index-tbody {
  display: flex;
}
.index-tbody > tr {
  display: flex;
  flex-direction: column;
}
</style>
<style >
.td_bg {
  background: #ffaa00 !important;
}
</style>
