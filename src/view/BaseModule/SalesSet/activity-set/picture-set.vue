<template>
    <div class="picture-set">
      <el-form :model="imgForm" ref="imgForm" label-width="100px" class="img-form">
          <el-form-item label="主图" prop="main">
              <el-upload
              action="#"
              list-type="picture-card"
              :file-list="imgForm.main"
              :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                  <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                      <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                      >
                      <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                      >
                      <i class="el-icon-download"></i>
                      </span>
                      <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                      >
                      <i class="el-icon-delete"></i>
                      </span>
                  </span>
                  </div>
              </el-upload>
          </el-form-item>
          
          <el-form-item label="轮播图" prop="Rotationchart">
              <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                  <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                      <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                      >
                      <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                      >
                      <i class="el-icon-download"></i>
                      </span>
                      <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                      >
                      <i class="el-icon-delete"></i>
                      </span>
                  </span>
                  </div>
              </el-upload>
          </el-form-item>

          <el-form-item label="详情图" prop="Detailmap">
              <editor
                v-model="imgForm.Detailmap" :is-clear="editorIsClear" @change="editorBlur"
              />
          </el-form-item>

          <el-row type="flex" class="row-bg" justify="center">
            <el-button type="primary" @click="submitForm('imgForm')">保存</el-button>
            <el-button @click="resetForm('imgForm')">重置</el-button>
          </el-row>

      </el-form>
      <el-dialog :visible.sync="dialogVisible" width="30%" :modal='false'>
          <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
import Editor from '@/component/wangEditor/index'

export default {
    name:'PictureSet',
    props:{

    },
    components: {
      Editor
    },
    data(){
      return{
        imgForm: {
          // main: [], //-主图
          // Rotationchart: [], //-轮播图
          // Detailmap: [], //-详情图
        },
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,

        // - 触发清空文本域
        editorIsClear: false,

        rules: {
          Detailmap: [{
            max: 2000,
            message: '最多可以输入 2000 个字符',
            trigger: 'blur'
          }]
        }
      }
    },
    methods:{
      handleRemove(file) {
        this.$confirm('是否确认删除该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        this.$confirm('是否确认下载该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '正在下载中'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          });          
        });
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
      // - editor
      editorClear() {
        this.isClear = true
        setTimeout(() => {
          this.isClear = false
        }, 100)
      },
      editorBlur(val) {
        this.imgForm.Detailmap = val
      },
    }
}
</script>

<style lang="scss" scoped>
.img-form {
  padding: 20px 20px 20px 50px;
}
</style>
