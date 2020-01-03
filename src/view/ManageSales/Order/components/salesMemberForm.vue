<template>
  <!-- 会员信息 -->
  <div class="m-form-body">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        style="width: 210px;"
        placeholder="请输入会员编号"
        prefix-icon="el-icon-search"
      />
      <el-button
        type="primary"
        style="margin-left: 10px"
        icon="el-icon-search"
        @click="handleFilter"
      >查 询</el-button>
    </div>
    <div class="m-form-ly">
      <el-form
        :model="memberData"
        label-position="right"
      >
        <el-col :span="10" class="h50">
          <el-form-item
            label="会员姓名 :"
            label-width="100px"
          >
            <span class="info-color">{{ memberData.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="h50">
          <el-form-item label="属性 :">
            <span class="info-color">{{ memberData.attr }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="h50">
          <el-form-item label="积分 :">
            <span class="info-color">{{ memberData.integral }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="h50">
          <el-form-item
            label="手机号码 :"
            label-width="100px"
          >
            <span class="info-color">{{ memberData.phone }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="h50">
          <el-form-item label="订金 :">
            <span class="info-color">{{ memberData.deposit }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="h50">
          <el-form-item label="欠货 :">
            <el-button type="text" @click="openDialog('oweGoods')">
              {{ memberData.owe }}
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="h50">
          <el-form-item
            label="出生日期 :"
            label-width="100px"
          >
            <span class="info-color">{{ memberData.sdate | parseTime('{y}-{m}-{d}') }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="h50">
          <el-form-item label="等级 :">
            <span class="info-color">{{ memberData.grade }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="h50">
          <el-form-item label="星级 :">
            <span class="info-color">{{ memberData.star }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="h50">
          <el-form-item
            label="有效业绩 :"
            label-width="100px"
          >
            <span class="info-color">{{ memberData.result }}</span>
            <el-button
              style="margin-left:18px"
              size="mini"
              type="primary"
              plain
              @click.native="openDialog('distribution',memberData.id)"
            >业绩分摊</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="clear:both" />
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/article'

export default {
  name: 'InlineEditTable',
  components: {},
  data() {
    return {
      listQuery: {
        name: ''
      },
      memberData: {
        name: '张三',
        attr: '售后',
        grade: '3',
        phone: '13099998888',
        sdate: 1586547894987,
        integral: '8000',
        deposit: '600',
        owe: '不晓得写啥',
        star: '北斗七星',
        is_condition: '1',
        result: '5000'
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    handleFilter() {
      // this.getList(this.listQuery);
    },
    // 打开业绩分摊
    openDialog(type, data) {
      this.$emit('open', type)
    }
  }
}
</script>

<style scoped>
.m-form-body{
  /* padding: 10px 0 0 10px */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.filter-container{
  padding-top: 16px;
  box-sizing: border-box;
}
.m-form-ly{
  height: 220px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-top: 10px;
}
.h50{
  height: 50px;
}
</style>
