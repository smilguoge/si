<template>
  <!-- <div class="app-container"> -->
  <div class="m-container">
    <!-- Filter -->
    <div class="filter-container">
      <div class="btn">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          @click="handleCreate"
        >新增</el-button>
        <el-button class="filter-item" style="margin-left: 10px" type="primary">删除</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="30px">
        <div class="box">
          <div class="time">
            <span>日期：</span>
            <el-date-picker v-model="form.star" type="date" placeholder="选择日期"></el-date-picker>
            <b>-</b>
            <el-date-picker v-model="form.end" type="date" placeholder="选择日期"></el-date-picker>
          </div>
          <el-form-item label="入库类型" label-width="80px">
            <el-select v-model="form.categary" placeholder="调拨入库">
              <el-option label="调拨出库" value="1" />
              <el-option label="打样出库" value="2" />
              <el-option label="报损出库" value="3" />
              <el-option label="公关出库" value="4" />
              <el-option label="返库出库" value="5" />
              <el-option label="盘亏出库" value="6" />
              <el-option label="销售出库" value="7" />
              <el-option label="报损出库" value="8" />
              <el-option label="其他入库" value="9" />
            </el-select>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search">查询</el-button>

          <el-form-item label>
            <el-radio-group v-model="form.complete">
              <el-radio label="0">未完成</el-radio>
              <el-radio label="1">已完成</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
    </div>
    

    <product-drawer
      v-model="drawerVisible"
      :get-data="changeData"
      @save="handleSave($event)"
      @clear="drawerClear"
      @mark="changeMark($event)"
    />
    <div v-show="drawerVisible" class="mark" />
  </div>
</template>

<script>
import productDrawer from "./projectDrawer";
import { productData } from "@/api/BaseModule/ProjectProduct";
const dataApi = new productData();

export default {
  name: "EditTable",
  components: { productDrawer },
  props: {},
  data() {
    return {
      list: [],
      changeData: {},
      defaultData: {
        status: 1
      },
      form: {
        star: "",
        end: "",
        categary: "",
        complete: ""
      },

      radio: -1,
      total: null,
      listQuery: {
        page: 1,
        page_size: 20,
        name: "",
        code: ""
      },

      dialogType: "",
      drawerVisible: false,
      listLoading: false,
      editId: null
    };
  },
  created() {
    this.getList(this.listQuery);
  },
  methods: {
    getList(params) {
      this.listLoading = true;
      dataApi
        .index(params)
        .then(res => {
          const items = res.data;
          if (items.products.length != 0) {
            this.list = items.products;
            this.total = parseInt(items.total_count);
          } else {
            this.list = [];
            this.$message.warning("没有更多数据");
          }
          this.listLoading = false;
        })
        .catch(res => {
          this.$message.warning("数据请求失败");
          this.listLoading = false;
        });
    },
    handleUpdate(id) {
      // - 修改
      // - request
      this.listLoading = true;
      // - 请求选项数据
      dataApi.view(id).then(res => {
        const items = res.data;
        this.changeData = JSON.parse(JSON.stringify(items));
        this.changeData.effect_time =
          (items.effect_time + "").length > 10
            ? items.effect_time
            : items.effect_time * 1000;
        this.changeData.points = parseInt(items.points) || "";
        this.listLoading = false;
        this.editId = id;
        this.dialogType = "edit";
        this.drawerVisible = true;
      });
    },
    handleCreate() {
      // - 新建
      // - 请求选项数据
      this.drawerVisible = true;
      this.dialogType = "create";
      this.changeData = JSON.parse(JSON.stringify(this.defaultData));
    },
    handleSave(obj) {
      // 时间戳处理
      if ((this.changeData.effect_time + "").length > 10) {
        this.changeData.effect_time = Math.floor(
          this.changeData.effect_time / 1000
        );
      }
      if (!parseInt(this.changeData.points)) {
        this.changeData.points = 0;
      }
      console.log(obj);
      if (this.dialogType === "create") {
        dataApi.create(obj).then(res => {
          this.getList(this.listQuery);
          this.drawerClear();
          return;
        });
      } else {
        dataApi.update(obj, this.editId).then(res => {
          this.getList(this.listQuery);
          this.drawerClear();
          return;
        });
      }
    },
    deleteData(id) {
      // - request
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          dataApi.delete(id).then(res => {
            this.getList(this.listQuery);
          });
        })
        .catch(res => {});
    },
    changeMark(val) {
      // - 切换遮罩状态
      this.drawerVisible = val;
    },
    drawerClear() {
      this.drawerVisible = false;
      this.dialogType = "";
      this.changeData = {};
    },
    handleSizeChange(val) {
      this.listQuery.page_size = val;
      this.getList(this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList(this.listQuery);
    },
    handleFilter() {
      this.getList(this.listQuery);
    },
    handleRadioChange(val) {
      console.log(val);
      this.listQuery.status = val;
      this.getList(this.listQuery);
    }
  }
};
</script>

<style lang="scss" scope>
.m-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.mark {
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  opacity: 0.6;
  transition: 0.5s;
}
.table-wrap-ly {
  width: 100%;
  height: calc(100vh - 260px);
  flex: 1;
  transition: 0.2s;
  -webkit-transition: 0.2s;
}
.table-body-ly {
  max-height: calc(100% - 70px);
}
.box {
  display: flex;
  padding: 10px;
  align-items: center;
  .el-form-item {
    margin: 0;
  }
  .el-form-item__content {
    margin-left: 30px;
  }
  button {
    margin-left: 20px;
  }
}
</style>
