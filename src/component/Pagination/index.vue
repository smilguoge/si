<template>
  <div
    :style="{ 'white-space': 'nowrap','padding': '4px 16px','color': '#303133','font-weight': '700','text-align': 'left' }"
    class="block"
  >
    <el-pagination
      :total="pager.total"
      :current-page.sync="currentPage"
      :page-size="pager.rows"
      :page-sizes="[10, 15, 20, 25, 30, 35, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="onChangeSize"
      @current-change="onChangePage"
    />
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["pager"],
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    total() {
      return this.pager.total;
    },
    // 检测是否获取到无数据
    initBack() {
      return this.pager.total / this.pager.rows < this.pager.page;
    }
  },
  watch: {
    total() {
      // 存在记录但未获取到数据时, 重新请求
      if (this.initBack) {
        this.pager.page -= 1;
        this.$emit("change");
      }
    }
  },
  mounted() {},
  methods: {
    // 每页条数
    onChangeSize(rows) {
      this.pager.rows = rows;
      this.$emit("change");
    },
    // 翻页
    onChangePage(page) {
      this.pager.page = page;
      this.$emit("change");
    }
  }
};
</script>
