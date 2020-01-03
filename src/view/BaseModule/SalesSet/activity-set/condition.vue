<template>
  <div class="condition">
  <el-form :model="conditionForm" ref="conditionForm" label-width="150px" class="con-form">
    <div class="tit">
      <label class="lab">顾客类型设置</label>
    </div>

    <el-form-item label="购买对象:">
      <el-checkbox-group v-model="conditionForm.buy_obj">
        <el-checkbox label="1">顾客</el-checkbox>
        <el-checkbox label="2">员工</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="适用顾客属性:">
      <el-checkbox-group v-model="conditionForm.customer_attr">
        <el-checkbox label="1">售前</el-checkbox>
        <el-checkbox label="2">嘉宾</el-checkbox>
        <el-checkbox label="3">售后</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="管理类别:">
      <el-checkbox-group v-model="conditionForm.manage_cate">
        <el-checkbox label="1">常态</el-checkbox>
        <el-checkbox label="2">非常态</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="顾客等级:">
      <el-checkbox-group v-model="conditionForm.customer_grad">
        <el-checkbox label="1">尊享</el-checkbox>
        <el-checkbox label="2">非尊享</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="顾客星级:">
      <el-checkbox-group v-model="conditionForm.customer_star">
        <el-checkbox label="1">普通</el-checkbox>
        <el-checkbox label="2">一星</el-checkbox>
        <el-checkbox label="3">二星</el-checkbox>
        <el-checkbox label="4">三星</el-checkbox>
        <el-checkbox label="5">四星</el-checkbox>
        <el-checkbox label="6">五星</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="进店渠道:">
      <el-checkbox-group v-model="conditionForm.inshop_channel">
        <el-checkbox label="1">专职渠道</el-checkbox>
        <el-checkbox label="2">非专职渠道</el-checkbox>
        <el-checkbox label="3">兼职渠道</el-checkbox>
        <el-checkbox label="4">嘉宾渠道</el-checkbox>
        <el-checkbox label="5">线上渠道</el-checkbox>
        <el-checkbox label="6">异业渠道</el-checkbox>
        <el-checkbox label="7">品牌渠道</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <div class="tit">
      <label class="lab">购买限制</label>
    </div>

    <div class="item-block">
      <el-form-item label="活动限购套数:" prop="is_limitnum" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_limitnum" />
      </el-form-item>
      <el-form-item label="" prop="limit_num" class="item-inlineblock">
        <el-input
          v-model="conditionForm.limit_num"
          :disabled="!conditionForm.is_limitnum"
          class="m-chk-input"
          style="{width: '100px'}"
        />
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="入会时间限制:" prop="is_membershiptime" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_membershiptime" />
      </el-form-item>
      <el-form-item label="" prop="membership_time" class="item-inlineblock">
        <el-date-picker 
          v-model="conditionForm.membership_time" 
          type="date" 
          :disabled="!conditionForm.is_membershiptime"
          class="m-chk-input"
        />
        <span>前可购买</span>
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="购买时间段限制:" prop="is_buytime" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_buytime" />
      </el-form-item>
      <el-form-item label="" class="item-inlineblock">
        <el-input
          v-model="conditionForm.bt_daylen" 
          :disabled="!conditionForm.is_buytime"
          class="m-chk-input"
        >
          <el-select v-model="conditionForm.bt_daytype" slot="append" placeholder="请选择">
            <el-option label="日" value="日">日</el-option>
            <el-option label="周" value="周">周</el-option>
            <el-option label="月" value="月">月</el-option>
            <el-option label="年" value="年">年</el-option>
          </el-select>
        </el-input>
        <span>前可购买</span>
        <el-input
          v-model="conditionForm.buy_num" 
          :disabled="!conditionForm.is_buytime"
          class="m-chk-input"
        />
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="指定日期购买:" prop="is_assignbuy" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_assignbuy" />
      </el-form-item>
      <el-form-item label="" class="item-inlineblock">
        <el-date-picker
          v-model="conditionForm.at_stime"
          type="daterange"
          range-separator="-"
          :disabled="!conditionForm.is_assignbuy"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="指定具体日期:" class="item-inlineblock">
        <el-date-picker 
          v-model="conditionForm.specific_time" 
          type="date" 
          :disabled="!conditionForm.is_assignbuy"
          class="m-chk-input"
        />
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="指定日期分享:" prop="is_assignshare" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_assignshare" />
      </el-form-item>
      <el-form-item label="" class="item-inlineblock">
        <el-date-picker
          v-model="conditionForm.as_stime"
          type="daterange"
          range-separator="-"
          :disabled="!conditionForm.is_assignshare"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="服务频率：" class="item-inlineblock">
        <el-input
          v-model="conditionForm.sfre_daylen" 
          :disabled="!conditionForm.is_assignshare"
          class="m-chk-input"
        >
          <el-select v-model="conditionForm.sfre_daytype" slot="append" placeholder="请选择">
            <el-option label="日" value="日">日</el-option>
            <el-option label="周" value="周">周</el-option>
            <el-option label="月" value="月">月</el-option>
            <el-option label="年" value="年">年</el-option>
          </el-select>
        </el-input>
        <span>服务</span>
        <el-input
          v-model="conditionForm.service_num" 
          :disabled="!conditionForm.is_assignshare"
          class="m-chk-small-input"
        />
        <span>次</span>
      </el-form-item>

      <el-form-item label="最多分享使用次数:" class="item-inlineblock">
        <el-input
          v-model="conditionForm.share_maximum" 
          :disabled="!conditionForm.is_assignshare"
          class="m-chk-small-input"
        />
      </el-form-item>
    </div>

    <div class="tit">
      <label class="lab">消费余额限制</label>
    </div>

    <div class="item-block">
      <el-form-item label="收现最低比例:" prop="is_paygminrate" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_paygminrate" />
      </el-form-item>
      <el-form-item label="" prop="payg_minrate" class="item-inlineblock">
        <el-input
          v-model="conditionForm.payg_minrate"
          :disabled="!conditionForm.is_paygminrate"
          class="m-chk-input"
        />
      </el-form-item>

      <el-form-item label="积分使用最高比例:" prop="is_integral_maxrate" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_integral_maxrate" />
      </el-form-item>
      <el-form-item label="" prop="integral_maxrate" class="item-inlineblock">
        <el-input
          v-model="conditionForm.integral_maxrate"
          :disabled="!conditionForm.is_integral_maxrate"
          class="m-chk-input"
        />
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="消费总额达到:" prop="is_consum_total" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_consum_total" />
      </el-form-item>
      <el-form-item label="" prop="consum_total" class="item-inlineblock">
        <el-input
          v-model="conditionForm.consum_total"
          :disabled="!conditionForm.is_consum_total"
          class="m-chk-input"
        />
      </el-form-item>

      <el-form-item label="单次最低消费达到:" prop="is_single_min" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_single_min" />
      </el-form-item>
      <el-form-item label="" prop="single_min" class="item-inlineblock">
        <el-input
          v-model="conditionForm.single_min"
          :disabled="!conditionForm.is_single_min"
          class="m-chk-input"
        />
        <el-date-picker
          v-model="conditionForm.smin_stime"
          type="daterange"
          :disabled="!conditionForm.is_single_min"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="是否有存卡:" prop="is_hascard" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_hascard" />
      </el-form-item>
      <el-form-item label="" prop="QuotaNum" class="item-inlineblock">
        <el-radio-group v-model="conditionForm.hascard">
          <el-radio :label="0">无卡</el-radio>
          <el-radio :label="1">有卡</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="消费次数达到:" prop="is_consume_num" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_consume_num" />
      </el-form-item>
      <el-form-item label="" prop="consume_num" class="item-inlineblock">
        <el-input
          v-model="conditionForm.consume_num"
          :disabled="!conditionForm.is_consume_num"
          class="m-chk-input"
        />
        <el-date-picker
          v-model="conditionForm.consume_stime"
          type="daterange"
          :disabled="!conditionForm.is_consume_num"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="余额限制:" prop="is_balance_limit" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_balance_limit" />
      </el-form-item>
      <el-form-item label="" prop="balance_limit" class="item-inlineblock">
        <el-radio-group v-model="conditionForm.balance_limit">
          <el-radio :label="0">有</el-radio>
          <el-radio :label="1">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="卡内总余额:" class="item-inlineblock">
        <el-input
          v-model="conditionForm.min_balance"
          :disabled="!conditionForm.is_balance_limit"
          class="m-chk-small-input"
        />-
        <el-input
          v-model="conditionForm.max_balance"
          :disabled="!conditionForm.is_balance_limit"
          class="m-chk-small-input"
        />
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="服务评价:" prop="is_service_evaluation" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_service_evaluation" />
      </el-form-item>
      <el-form-item label="" prop="service_evaluation" class="item-inlineblock">
        <el-radio-group v-model="conditionForm.service_evaluation">
          <el-radio :label="0">有评价</el-radio>
          <el-radio :label="1">无评价</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="sereva_stime" class="item-inlineblock">
        <el-date-picker
          v-model="conditionForm.sereva_stime"
          type="daterange"
          :disabled="!conditionForm.is_service_evaluation"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="嘉宾消费金额:" prop="is_gconsume_money" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_gconsume_money" />
      </el-form-item>
      <el-form-item label="" prop="gconsume_money" class="item-inlineblock">
        <el-input
          v-model="conditionForm.gconsume_money"
          :disabled="!conditionForm.is_gconsume_money"
          class="m-chk-input"
        />
      </el-form-item>
      <el-form-item label="" prop="gcm_stime" class="item-inlineblock">
        <el-date-picker
          v-model="conditionForm.gcm_stime"
          type="daterange"
          :disabled="!conditionForm.is_gconsume_money"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="老客带新客个数:" prop="is_oldwithnew" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_oldwithnew" />
      </el-form-item>
      <el-form-item label="" prop="oldwithnew_num" class="item-inlineblock">
        <el-input
          v-model="conditionForm.oldwithnew_num"
          :disabled="!conditionForm.is_oldwithnew"
          class="m-chk-input"
        />
      </el-form-item>
      <el-form-item label="" prop="own_stime" class="item-inlineblock">
        <el-date-picker
          v-model="conditionForm.own_stime"
          type="daterange"
          :disabled="!conditionForm.is_oldwithnew"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="tit">
      <label class="lab">护理限制</label>
    </div>

    <div class="item-block">
      <el-form-item label="护理个数:" prop="is_nurse_num" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_nurse_num" />
      </el-form-item>
      <el-form-item label="" prop="nurse_num" class="item-inlineblock">
        <el-input
          v-model="conditionForm.nurse_num"
          :disabled="!conditionForm.is_nurse_num"
          class="m-chk-input"
        />
      </el-form-item>
      <el-form-item label="周期:" prop="nurse_num" class="item-inlineblock">
        <el-input
          v-model="conditionForm.nursen_daylen" 
          :disabled="!conditionForm.is_nurse_num"
          class="m-chk-input"
        >
          <el-select v-model="conditionForm.nursen_daytype" slot="append" placeholder="请选择">
            <el-option label="日" value="日">日</el-option>
            <el-option label="周" value="周">周</el-option>
            <el-option label="月" value="月">月</el-option>
            <el-option label="年" value="年">年</el-option>
          </el-select>
        </el-input>
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="护理次数:" prop="is_nurse_times" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_nurse_times" />
      </el-form-item>
      <el-form-item label="" prop="nurse_times" class="item-inlineblock">
        <el-input
          v-model="conditionForm.nurse_times"
          :disabled="!conditionForm.is_nurse_times"
          class="m-chk-input"
        />
        <el-date-picker
          v-model="conditionForm.nurset_stime"
          type="daterange"
          :disabled="!conditionForm.is_nurse_times"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="item-block">
      <el-form-item label="护理财耗:" prop="is_consumable" class="item-inlineblock">
        <el-switch v-model="conditionForm.is_consumable" />
      </el-form-item>

      <el-form-item prop="is_add_up" class="item-inlineblock">
        <el-checkbox v-model="conditionForm.is_add_up" :disabled="!conditionForm.is_consumable"></el-checkbox>
      </el-form-item>

      <el-form-item label="累计达到:" prop="add_up" class="item-inlineblock">
        <el-input
          v-model="conditionForm.add_up"
          :disabled="!conditionForm.is_add_up"
          class="m-chk-input"
        />
        <el-date-picker
          v-model="conditionForm.addup_stime"
          type="daterange"
          :disabled="!conditionForm.is_add_up"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="item-block">
      <span class="item-placeholder"></span>
      <el-form-item prop="is_singlemax" class="item-inlineblock">
        <el-checkbox v-model="conditionForm.is_singlemax" :disabled="!conditionForm.is_consumable"></el-checkbox>
      </el-form-item>

      <el-form-item label="单次最高:" prop="singlemax_num" class="item-inlineblock">
        <el-input
          v-model="conditionForm.singlemax_num"
          :disabled="!conditionForm.is_singlemax"
          class="m-chk-input"
        />
      </el-form-item>
    </div>

    <div class="item-block">
      <span class="item-placeholder"></span>
      <el-form-item prop="is_continuous" class="item-inlineblock">
        <el-checkbox v-model="conditionForm.is_continuous" :disabled="!conditionForm.is_consumable"></el-checkbox>
      </el-form-item>

      <el-form-item label="连续:" prop="continuous_day" class="item-inlineblock">
        <el-select v-model="conditionForm.continuous_day" :disabled="!conditionForm.is_continuous" placeholder="请选择">
          <el-option label="2天" value="2天"></el-option>
          <el-option label="3天" value="3天"></el-option>
          <el-option label="5天" value="5天"></el-option>
        </el-select>
        <span>达到:</span>
      </el-form-item>

      <el-form-item label="" prop="continuous_amount" class="item-inlineblock">
        <el-input
          v-model="conditionForm.continuous_amount"
          :disabled="!conditionForm.is_continuous"
          class="m-chk-input"
        />
      </el-form-item>
    </div>

    <div class="tit">
      <label class="lab">抵扣条件限制</label>
    </div>

    <div class="item-block">
      <div class="h-content">
        <div class="t-header">
          <el-row>
            <el-checkbox v-model="couponchecked" style="padding-left:10px">抵用卷</el-checkbox>
            <el-checkbox v-model="choosechecked" class="header-right">选其一</el-checkbox>
            <div class="header-btns header-right">
              <el-button @click="openDialog('couponbatchUpdate')">批量修改</el-button>
              <el-button @click="openDialog('couponAdd')">新建</el-button>
              <el-button @click="openDialog('couponUpdate')">修改</el-button>
              <el-button @click="openDialog('couponDel')">删除</el-button>
            </div>
          </el-row>
        </div>

        <div class="t-table">
          <el-table
            ref="multipleTable"
            :data="conditionForm.coupon"
            tooltip-effect="dark"
            style="width: 100%"
            border
            fit
            highlight-current-row
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              min-width="5%"
              align="center">
            </el-table-column>
            <el-table-column
              label="抵用卷名称"
              prop="coupon_id"
              min-width="70%"
              align="center">
            </el-table-column>
            <el-table-column
              prop="use_quantity"
              label="每次可抵扣张数"
              min-width="25%"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="h-content">
        <div class="t-header">
          <el-row>
            <el-checkbox v-model="projectchecked" style="padding-left:10px">指定老卡冲抵项目</el-checkbox>
            <div class="header-btns header-right">
              <el-button @click="openDialog('projectbatchUpdate')">批量修改</el-button>
              <el-button @click="openDialog('projectAdd')">新建</el-button>
              <el-button @click="openDialog('projectUpdate')">修改</el-button>
              <el-button @click="openDialog('projectDel')">删除</el-button>
            </div>
          </el-row>
        </div>

        <div class="t-table">
          <el-table
            ref="multipleTable"
            :data="conditionForm.project"
            tooltip-effect="dark"
            style="width: 100%"
            border
            fit
            highlight-current-row
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              min-width="5%"
              align="center">
            </el-table-column>
            <el-table-column
              label="项目属性"
              prop="project_class_id"
              min-width="25%"
              align="center">
            </el-table-column>
            <el-table-column
              prop="project_id"
              label="卡项目明细"
              min-width="70%"
              align="center">
            </el-table-column>
            <el-table-column
              prop="is_appreciation"
              label="是否增值"
              min-width="25%"
              align="center">
            </el-table-column>
            <el-table-column
              prop="multiple"
              label="增值倍数"
              min-width="25%"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-row type="flex" class="row-bg" justify="center">
      <el-button type="primary" @click="submitForm('conditionForm')">保存</el-button>
      <el-button @click="resetForm('conditionForm')">重置</el-button>
    </el-row>
  </el-form>

  <!-- 抵用卷新建-修改 -->
  <el-dialog
    title="提示"
    :visible.sync="coupondialogVisible"
    width="30%"
    :before-close="handleClose"
    :append-to-body='true'>
    <el-form v-if="coupondialogType === 'Add'||coupondialogType === 'Update'" :model="couponform">
      <el-form-item label="抵用卷名称" label-width="150px">
        <el-select v-model="couponform.coupon_id" placeholder="请选择抵用卷">
          <el-option label="100元抵用卷" value="100"></el-option>
          <el-option label="200元抵用卷" value="200"></el-option>
          <el-option label="500元抵用卷" value="500"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每次可抵扣张数" label-width="150px">
        <el-input v-model="couponform.use_quantity" autocomplete="off" class="m-chk-input"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-else-if="coupondialogType === 'batchUpdate'" :model="couponform">
      <el-form-item label="每次可抵扣张数" label-width="150px">
        <el-input v-model="couponform.use_quantity" autocomplete="off" class="m-chk-input"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="coupondialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="coupondialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 指定老卡冲抵项目 -->
  <el-dialog
    title="提示"
    :visible.sync="projectdialogVisible"
    width="30%"
    :before-close="handleClose"
    :append-to-body='true'>
    <el-form v-if="projectdialogType === 'Add'||projectdialogType === 'Update'" :model="projectform">
      <el-form-item label="项目属性" label-width="150px">
        <el-select v-model="projectform.project_class_id">
          <el-option label="100元抵用卷" value="100"></el-option>
          <el-option label="200元抵用卷" value="200"></el-option>
          <el-option label="500元抵用卷" value="500"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡项目明细" label-width="150px">
        <el-select v-model="projectform.project_id">
          <el-option label="100元抵用卷" value="100"></el-option>
          <el-option label="200元抵用卷" value="200"></el-option>
          <el-option label="500元抵用卷" value="500"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否增值" label-width="150px">
        <el-switch v-model="conditionForm.is_appreciation" />
      </el-form-item>
      <el-form-item label="增值倍数" label-width="150px">
        <el-input v-model="projectform.multiple" autocomplete="off" class="m-chk-input"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-else-if="projectdialogType === 'batchUpdate'" :model="projectform">
      <el-form-item label="项目属性" label-width="150px">
        <el-input v-model="projectform.project_class_id" autocomplete="off" class="m-chk-input"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="projectdialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="projectdialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name:'Condition',
  props:{

  },
  data(){
    return{
      conditionForm:{
        buy_obj:[], // 购买对象
        customer_attr:[], // 适用顾客属性
        manage_cate:[], //管理类别
        customer_grad:[], //顾客等级
        customer_star:[], //顾客星级
        inshop_channel:[], //进店渠道
        
        is_limitnum: 0, // 是否活动限购（0=不限，1=限制）
        limit_num: '', // 活动限制张数

        is_membershiptime: 0, // 是否入会时间限制
        membership_time: '', // 入会时间限制

        is_buytime: 0, // 是否购买时间段限制
        bt_daylen:'', // 购买时间段时间
        bt_daytype: '', // 购买时间段数量
        buy_num:'', // 购买时间段次数

        is_assignbuy:0,// 是否指定日期购买
        at_stime:'',// 指定日期购买开始时间
        at_etime:'',// 指定日期购买结束时间
        specific_time:'',// 指定具体时间

        is_assignshare:0, //是否指定日期分享
        as_stime:'',//指定日期分享开始时间
        as_etime:'',//指定日期分享结束时间

        sfre_daylen:0,//服务频率时间数量
        sfre_daytype:'',// 服务频率时间类型（日/周/月/年）
        service_num:'',//服务次数
        share_maximum:'',//最多分享次数

        is_paygminrate:0,//是否收现最低比例（0=不限，1=限制）
        payg_minrate:'',//收现最低比例

        is_integral_maxrate:0,//是否积分使用最高比例（0=不限，1=限制）
        integral_maxrate:'',//积分使用最高比例

        is_consum_total:0,//是否消费总额达到
        consum_total:'',//消费总额达到

        is_single_min:0,//是否单次最低消费达到
        single_min:'',//单次最低消费达到
        smin_stime:'',//单次最低消费达到开始时间
        smin_etime:'',//单次最低消费达到结束时间

        is_hascard:0,//是否开启有存卡
        hascard:0,//是否有存卡（0=无卡，1=有卡）

        is_consume_num:0,//是否消费次数达到
        consume_num:'',//消费次数达到
        consume_stime:'',//消费次数达到开始时间
        consume_etime:'',//消费次数达到结束时间

        is_balance_limit:0,//是否余额限制
        balance_limit:'',//余额限制
        min_balance:'',//最低余额限制
        max_balance:'',//最高余额限制

        is_service_evaluation:0,//是否服务评价
        service_evaluation:0,//服务评价

        sereva_stime:'',//服务评价开始时间
        sereva_etime:'',//服务评价结束时间

        is_gconsume_money:0,//是否嘉宾消费
        gconsume_money:'',//嘉宾消费金额
        gcm_stime:'',//嘉宾消费开始时间
        gcm_etime:'',//嘉宾消费结束时间

        is_oldwithnew:0,//是否老客带新客
        oldwithnew_num:'',//老客带新客数量
        own_stime:'',//老客带新客开始时间
        own_etime:'',//老客带新客结束时间

        is_nurse_num:0,//是否护理个数
        nurse_num:'',//护理个数
        nursen_daylen:'',//护理个数时间数量
        nursen_daytype:'',//护理个数时间类型

        is_nurse_times:0,//是否护理次数
        nurse_times:'',//护理次数
        nurset_stime:'',//护理开始时间
        nurset_etime:'',//护理结束时间

        is_consumable:0,//是否护理耗财
        is_add_up:0,//是否累计达到

        add_up:'',//累计达到
        addup_stime:'',//累计达到开始时间
        addup_etime:'',//累计达到结束时间

        is_singlemax:0,//是否单次最高
        singlemax_num:'',//单次最高

        is_continuous:0,//是否连续
        continuous_day:'',//连续天数
        continuous_amount:'',//连续达到金额

        coupon:[{
          coupon_id:'',
          use_quantity:'',
        }],//抵用卷

        project:[{//指定老卡冲抵项目
          project_id:'',
          project_class_id:'',
          is_appreciation:'',
          multiple:''
        }],

        rules: {
          QuotaNum:[
            { max: 5, message: '长度只能5', trigger: 'blur' }
          ]
        }
      },
      multipleSelection: [],
      couponchecked:false, //抵用卷
      projectchecked:false, //指定老卡冲抵项目
      choosechecked:false, //选其一

      coupondialogVisible:false, // 抵用卷弹窗打开
      coupondialogType:'', // 抵用卷状态
      couponform:{
        coupon_id:'',
        use_quantity:'',
      },

      projectdialogVisible:false, //指定老卡冲抵项目弹窗打开
      projectdialogType:'',//指定老卡抵扣状态
      projectform:{
        project_id:'',
        project_class_id:'',
        is_appreciation:1,
        multiple:'',
      },
    }
  },
  methods:{
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    openDialog(type, data) {
      switch(type){
        // 抵用卷删除
        case 'couponDel':
          this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {

          })
        break;
        // 抵用卷新增
        case 'couponAdd':
          this.coupondialogVisible = true
          this.coupondialogType = 'Add'
        break;
        // 抵用卷修改
        case 'couponUpdate':
          this.coupondialogVisible = true
          this.coupondialogType = 'Update'
        break;
        // 抵用卷批量修改
        case 'couponbatchUpdate':
          this.coupondialogVisible = true
          this.coupondialogType = 'batchUpdate'
        break;

        // 指定老卡冲抵
        case 'projectDel':
          this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {

          })
        break;
        // 指定老卡新增
        case 'projectAdd':
          this.projectdialogVisible = true
          this.projectdialogType = 'Add'
        break;
        // 指定老卡修改
        case 'projectUpdate':
          this.projectdialogVisible = true
          this.projectdialogType = 'Update'
        break;
        // 指定老卡批量修改
        case 'projectbatchUpdate':
          this.projectdialogVisible = true
          this.projectdialogType = 'batchUpdate'
        break;
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.editorClear()
    },
  }
}
</script>

<style lang="scss" scoped>
.con-form {
  // padding: 10px 15px;
  .tit{
    border: 1px solid rgb(187, 187, 187);
    background-color: #e4e7ed;
    height: 36px;
    line-height: 36px;
    margin-bottom: 20px;
    .lab{
      padding-left: 10px;
      font-weight:normal;
    }
  }

  .item-block {
    display: block;
  }

  .item-inlineblock{
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }

  .m-chk-input{
    width: 144px;
  }

  .m-chk-small-input{
    width: 50px;
  }

  .item-placeholder{
    display: inline-block;
    width: 200px;
    height: 32px;
  }

  .t-header{
    line-height: 60px;
  }

  .header-btns{
    display: inline-block;
    margin-right: 100px;
  }

  .h-content{
    padding: 10px 15px;
    .t-header{
      border-top: 1px solid #dfe6ec;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
    }
    .header-right{
      float: right;
      padding-right: 10px;
    }
  }

  .row-bg{
    padding: 20px 0;
  }
}
.m-chk-input{
  width: 200px;
}
</style>
<style>
.con-form .el-form-item__content{
  margin-left: 0px!important;
  display: inline-block;
  vertical-align: top;
}
</style>
