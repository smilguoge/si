<template>
  <!-- 临时赠送 -->
  <el-dialog
    title="新增赠送"
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    width="1000px"
  >
    <el-form
      :model="changeData"
      label-width="100px"
    >
      <el-col :span="7">
        <el-form-item label="会员名称:">
          <el-input v-model="changeData.name" style="width:100%" placeholder="请输入会员名称" />
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item label="会员编号:">
          <el-input v-model="changeData.name" style="width:100%" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item label="所属门店:">
          <el-input v-model="changeData.name" style="width:100%" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="赠送人:">
          <el-input v-model="changeData.name" style="width:100%" placeholder="请输入赠送人" />
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item label="赠送类型:">
          <el-select v-model="changeData.name1" style="width:100%" placeholder="请选择赠送类型">
            <el-option label="临时赠送" :value="1" />
            <el-option label="公关赠送" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item label="赠送日期:">
          <el-date-picker
            v-model="changeData.name"
            type="date"
            style="width:100%"
            placeholder="请选择日期"
            value-format="timestamp"
          />
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="赠送日期:">
          <div class="temporary-table">
            <div class="temporary-head">
              <el-button
                type="primary"
                size="mini"
                @click="openDialog('create')"
              >新 增</el-button>
            </div>
            <el-table
              :data="changeData.table1"
              height="240px"
              fit
            >
              <el-table-column
                align="center"
                label="类别"
              >
                <template slot-scope="{row}">
                  {{ row.name1 }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="名称"
              >
                <template slot-scope="{row}">
                  {{ row.name1 }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="数量"
              >
                <template slot-scope="{row}">
                  {{ row.name1 }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="150px"
                label="操作"
              >
                <template slot-scope="{row}">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="openDialog('edit')"
                  >修 改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                  >删 除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="备注:">
          <el-input v-model="changeData.mask" type="textarea" style="width:100%" />
        </el-form-item>
      </el-col>
    </el-form>

    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-col :span="23">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit()"
        >确 定</el-button>
      </el-col>
      <div style="clear:both" />
    </div>
    <el-dialog
      title="赠送内容"
      :visible.sync="dialogChildVisible"
      :before-close="handleChildCancel"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="360px"
    >
      <el-form ref="childData" :model="childData" label-width="60px">
        <el-col :span="23">
          <el-form-item label="类别">
            <el-select v-model="childData.class" class="w100" placeholder="请选择类别">
              <el-option label="套餐" :value="1" />
              <el-option label="产品" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="名称">
            <el-input v-model="childData.name" class="w100" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="数量">
            <el-input v-model="childData.num" class="w100" placeholder="请输入数量" />
          </el-form-item>
        </el-col>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-col :span="23">
          <el-button @click="handleChildCancel">取 消</el-button>
          <el-button
            type="primary"
            @click="handleChildCancel"
          >确 定</el-button>
        </el-col>
        <div style="clear:both" />
      </div>
    </el-dialog>
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
      changeData: {
        name1: '',
        table1: []
      },
      childData: {},
      dialogType: '',
      dialogVisible: false,
      dialogChildVisible: false,
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
    openDialog(type, data) {
      if (type === 'create') {
        // -
        this.childData = {}
        this.dialogChildVisible = true
      } else {
        // -
        this.childData = JSON.parse(JSON.stringify(data))
        this.dialogChildVisible = true
      }
    },
    handleChildCancel() {
      this.childData = {}
      this.dialogChildVisible = false
    },
    handleCancel() {
      this.$parent.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.temporary-table {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  overflow: hidden;
  .temporary-head {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>
