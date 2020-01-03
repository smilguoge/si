<template>
  <transition>
    <div>
      <el-input
        placeholder="请输入搜索内容"
        clearable
        style="width:auto"
        prefix-icon="el-icon-search"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {

  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    handleScroll() {

    },
    backToTop() {

    }

  }
}
</script>

<style scoped>
</style>
