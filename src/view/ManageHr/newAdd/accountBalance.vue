<template>
  <div class="app-container">
    
    acc
  </div>
</template>

<script>
import { newAdd } from "@/api/ManageHr/newAdd";
// import Pagination from "@/component/Pagination/index";
// import Structure from "@/component/Structure/index";

export default {
  name: "EmployeeFiles",
  components: {},
  data() {
    return {
      
    };
  },
  created() {
    // newAdd();
  },
    methods: {
      handleSelect(key, keyPath) {
        console.log( keyPath);
      }
    }
};
</script>

<style scoped lang="scss">
</style>

