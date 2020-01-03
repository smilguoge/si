import $ from 'jquery'
export function makeAppTableIn() {
  // var _vm = this;
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
        // let data = $(this);
        // _vm.data_arr = [];
        // _vm.data_arr.push(data);
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
      // _vm.data_arr = [];
      for (var i = minX; i <= maxX; i++) {
        for (var j = minY; j <= maxY; j++) {
          $('.tb tr:eq(' + i + ') td:eq(' + j + ')').addClass('td_bg')
          const data = $('.tb tr:eq(' + i + ') td:eq(' + j + ')')
          // console.log(data)
          // _vm.data_arr.push(data);
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
