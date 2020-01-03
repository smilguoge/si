<template>
  <!-- 赠送明细 -->
  <el-dialog
    title="赠送明细"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    class="give-dialog"
    width="1000px"
  >
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="give-table">
          <el-collapse accordion>
            <el-collapse-item v-for="item in giveData" :key="item.name" :title="item.name">
              <el-table
                :data="item.table"
                height="420px"
                class="item-table"
                fit
              >
                <el-table-column
                  align="center"
                  label="类别"
                >
                  <template slot-scope="{row}">
                    {{ row.class }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="名称"
                >
                  <template slot-scope="{row}">
                    {{ row.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="是否赠送"
                >
                  <template slot-scope="{row}">
                    <el-switch
                      v-model="row.is_give"
                      active-value="1"
                      inactive-value="0"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="次数"
                >
                  <template slot-scope="{row}">
                    <el-input v-model="row.num" />
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="有效期"
                >
                  <template slot-scope="{row}">
                    {{ row.time | parseTime('{y}-{m}-{d}') }}
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCancel"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: '',
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      // -
      giveData: [
        {
          name: '（2019-09-01~2019-12-31）老带新1人，加价68元可购',
          table: [
            { class: '产品1', name: 'testName1', is_give: '1', num: '10', time: 1607986541486 }
          ]
        },
        {
          name: '（2019-09-01~2019-12-31）老带新10人，加价688元可购',
          table: [
            { class: '产品2', name: 'testName2', is_give: '1', num: '10', time: 1607986541486 }
          ]
        }
      ],
      dialogVisible: false,
      flagTime: 0
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    }
  },
  created() {
    // -
  },
  methods: {
    handleSubmit(formName) {
      const curr = new Date()
      if (curr - this.flagTime > 1000) {
        this.handleCancel()
        this.flagTime = curr
      }
    },
    handleCancel() {
      this.$parent.giveVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.give-dialog{
  .give-table {
    .item-table {
      margin-bottom: -25px;
      border: 2px solid #e6ebf5;
      border-bottom: 0;
    }
  }
}
</style>
