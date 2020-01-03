<template>
  <el-button
    :loading="downloadLoading"
    type="primary"
    icon="el-icon-download"
    @click="handleDownload()"
  >导出</el-button>
</template>
<script>

export default {
  name: 'ExportExcel',
  components: {
  },
  props: {
    exportData: {
      type: Array,
      default: []
    },
    title: {
      type: Array,
      default: []
    },
    datakey: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      list: null,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      downloadLoading: false
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    // 导出
    handleDownload() {
      if (this.exportData.length == 0) {
        this.$Message.error('不允许导出空表格')
        return false
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const list = this.exportData // this.list
        const data = this.formatJson(this.datakey, list)
        excel.export_json_to_excel({
          header: this.title,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },

    formatJson(datakey, jsonData) {
      return jsonData.map(v => datakey.map(j => v[j]))
    }

  }
}
</script>
