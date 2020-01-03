<template>
  <div>
    <el-table
      class="auth-option-table"
      :data="optionData"
      :row-class-name="rowStyle"
      :tree-props="treeOption"
      default-expand-all
      :size="miniSize"
      row-key="id"
      fit
    >
      <el-table-column
        v-for="(item, index) in optionLabel"
        :key="index"
        :fixed="index == 0? 'left':false "
        :width="index == 0? '180':'' "
        :prop="item.prop"
        :label="item.name"
        :align="index == 0? '':'center' "
      >
        <template slot-scope="{row}">
          <div v-if="index == 0">{{ row.name }}</div>
          <el-checkbox
            v-if="index !== 0"
            v-model="row[item.prop]"
            :disabled="row[item.prop]==undefined? true:false"
            :true-label="1"
            :false-label="0"
          />
        </template>
      </el-table-column>

      <!-- 是否启用 -->
      <!-- <el-table-column label="是否启用">
        <template slot-scope="{row}" align="center">
          <el-checkbox @change="checkRow(row)" />
        </template>
      </el-table-column>-->

      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            :size="miniSize"
            :disabled="row.is_edit!=1?true:false"
            @click="optionDialog(row.id)"
          >配 置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详细配置 -->
    <el-dialog
      title="详细配置"
      :visible.sync="detailVisible"
      :before-close="handleDetailClose"
      :width="dialogWidth"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-table :data="detailData" :size="miniSize" fit>
        <el-table-column
          v-for="(item, index) in detailLabel"
          :key="index"
          :fixed="index == 0? 'left':false "
          :prop="item.code"
          :label="item.name"
          align="center"
        >
          <template slot-scope="{row}">
            <span v-if="index == 0">{{ row.field_class_name=='view'? '查看':'编辑' }}</span>
            <el-checkbox
              v-if="index!==0"
              v-model="row[item.code]"
              :true-label="1"
              :false-label="0"
            />
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer" :span="23">
        <el-col :span="23">
          <el-button @click="handleDetailClose">取 消</el-button>
          <el-button type="primary" @click="submitDetail">确 认</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { authGroupDetail } from '@/api/BaseModule/PermissionSet'
const authDetailApi = new authGroupDetail()
export default {
  name: 'AuthConfig',
  props: {
    optionData: {
      required: true,
      type: Array,
      default: []
    },
    optionLabel: {
      required: true,
      type: Array,
      default: []
    },
    getGid: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      detailLabel: [],
      detailLabel1: [
        { name: '权限', prop: 'name' },
        { name: '门店名称', prop: 'shop_name' },
        { name: '电话', prop: 'phone' },
        { name: '所属部门', prop: 'position' },
        { name: '院代码', prop: 'code' },
        { name: '开店日期', prop: 'start_time' },
        { name: '地区', prop: 'area' },
        { name: '详细地址', prop: 'detail_area' },
        { name: '门店状态', prop: 'state' }
      ],
      detailData: [],
      detailData1: [
        {
          field_class_name: 'edit',
          shop_name: 1,
          phone: 1,
          position: 1,
          code: 1,
          start_time: 1,
          area: 0,
          detail_area: 0,
          state: 0
        },
        {
          field_class_name: 'view',
          shop_name: 1,
          phone: 1,
          position: 1,
          code: 1,
          start_time: 1,
          area: 1,
          detail_area: 1,
          state: 1
        }
      ],

      fieldQuery: {},
      fieldBarId: null,
      fieldArr: [],

      dialogWidth: '1000px',
      detailVisible: false,
      treeOption: { children: 'child' },
      miniSize: 'mini'
    }
  },
  watch: {},
  methods: {
    // - 是否启用
    // checkRow(row) {
    //   console.log(row);
    // },

    // - 展开子级背景色
    rowStyle(row) {
      //   if (!row.row.hasOwnProperty("child")) {
      //     return "child-row";
      //   }
      //   return "";
    },

    // - 字段配置弹框
    optionDialog(id) {
      this.fieldQuery.menu_id = id
      this.fieldQuery.group_id = this.getGid
      // console.log(this.fieldQuery);
      // - request
      authDetailApi.findData(this.fieldQuery).then(res => {
        console.log(res)
        const items = res.data
        this.detailLabel = items.fieldlist
        this.detailData = items.info
        this.detailVisible = true
        this.fieldBarId = id
      })
    },

    // - 字段配置确定
    submitDetail() {
      this.fieldArr[this.fieldBarId] = JSON.parse(
        JSON.stringify(this.detailData)
      )
      console.log(this.fieldArr)
      this.handleDetailClose()
    },

    // - 字段配置关闭
    handleDetailClose() {
      this.detailVisible = false
      this.detailLabel = []
      this.detailData = []
      this.fieldBarId = 0
    },

    // - 清除字段数组
    clearData() {
      this.fieldArr = []
      this.detailLabel = []
      this.detailData = []
      this.fieldBarId = 0
    }
  }
}
</script>

<style lang="scss" scoped>
/* 成员配置 */
.structure-body {
  width: 300px;
  min-height: 500px;
  height: 100%;
  padding: 8px 8px 0;
  border: 1px solid #dfe6ec;
  box-sizing: border-box;

  .el-tree {
    margin-top: 10px;
  }
}
</style>
<style lang="scss">
.auth-option-table {
  .cell {
    & > div {
      display: inline-block;
    }
  }
  .child-row {
    background-color: #ccc !important;
  }
}
</style>
