// The author MYT-bure_bai

import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
const formApi = {
  /**
   * 必填/必选
   * el填入的值
   * msg提示内容可填自己的内容
   * @param {el,msg} 
   */
  mandatory(el,msg) {
    if (el == null || el == '') {
      ElementUI.Message(msg||'带*号必须填写')
      return 
    }
  },
 
  /**
   * 银行卡验证 6222021001116245702
   * el填入的值
   * msg提示内容可填自己的内容
   * @param { el,msg }
   */
  check_card(el,msg) {
    if (el.length < 16 || el.length > 19) {
      ElementUI.Message(msg||'银行卡号长度必须在16到19之间')
      return 
    }
    var num = /^\d*$/;  //全数字
    if (!num.exec(el)) {
      ElementUI.Message(msg||'银行卡号必须全为数字')
      return 
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(el.substring(0, 2)) == -1) {
      ElementUI.Message(msg||'银行卡号开头6位不符合规范')
      return 
    }
    var lastNum = el.substr(el.length - 1, 1);//取出最后一位（与luhm进行比较）
    var first15Num = el.substr(0, el.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
      newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9
    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 == 1) {//奇数位
        if (parseInt(newArr[j]) * 2 < 9)
          arrJiShu.push(parseInt(newArr[j]) * 2);
        else
          arrJiShu2.push(parseInt(newArr[j]) * 2);
      }
      else //偶数位
        arrOuShu.push(newArr[j]);
    }
    var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {

      jishu_child1.push(parseInt(arrJiShu2[h]) % 10);

      jishu_child2.push(parseInt(arrJiShu2[h]) / 10);

    }
    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }
    for (var n = 0; n < arrOuShu.length; n++) {
      sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }
    for (var p = 0; p < jishu_child1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;
    if (lastNum == luhm) {
      return true;
    }
    else {
      return
    }
  },

  /**
   * 身份证验证 511502199103223189
   * el填入的值
   * msg提示内容可填自己的内容
   * @param {el}  
   */
  check_validateId(el) {
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(el)) {
      if (el.length == 18) {
        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
        for (var i = 0; i < 17; i++) {
          idCardWiSum += el.substring(i, i + 1) * idCardWi[i];
        }
        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
        var idCardLast = el.substring(17);//得到最后一位身份证号码
        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
          if (idCardLast == "X" || idCardLast == "x") {
            // alert("恭喜通过验证啦！");
            return 'false'
          } else {
            // alert("身份证号码错误！");
            // ElementUI.Message('身份证号码错误！')
            return 'true'
          }
        } else {
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (idCardLast == idCardY[idCardMod]) {
            // alert("恭喜通过验证啦！");
            return 'false'
          } else {
            // alert("身份证号码错误！");
            // ElementUI.Message('身份证号码错误！')
            return 'true'
          }
        }
      }
    } else{
      return 'true'
    }
  },

  /**
   * 手机号验证
   * el填入的值
   * msg提示内容可填自己的内容
   * @param {el,msg} 
   */
  check_phone(el,msg) {
    if (!/^1[3456789]\d{9}$/.test(el)) {
      // alert("手机号码有误，请重填");
      // ElementUI.Message(msg||"手机号码有误，请重填")
      // ElementUI.Message.error(msg||"手机号码有误，请重填")
    
      return 'true'
    }
  }
}
export default formApi
