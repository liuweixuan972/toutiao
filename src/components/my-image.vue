<template>
  <div class="image_box">
    <div class="btn_image" @click="open">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部和收藏 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片 -->
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in images"
              :key="item.id"
              @click="selectImage(item.url)"
              :class="{selected:selectImageUrl===item.url}"
            >
              <img :src="item.url" />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-size="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handlesuccess"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import defaultImage from '../assets/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0,
      uploadImageUrl: null,
      selectImageUrl: null,
      defaultImage,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    // 确认图片
    confirmImage() {
      if (this.activeName === 'image') {
        // 素材判断
        if (!this.selectImageUrl) {
          return this.$message.warning('请选中素材')
        }
        // 让当前的等于上传的
        // this.defaultImage = this.selectImageUrl
        this.$emit('input', this.selectImageUrl)
        this.dialogVisible = false
      } else {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请添加图片')
        }
        // this.defaultImage = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
        this.dialogVisible = false
      }
    },
    handlesuccess(res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    open() {
      this.dialogVisible = true
      this.getImages()
    },
    toggleList() {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages() {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    pager(newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    // 选中图片
    selectImage(url) {
      this.selectImageUrl = url
    }
  }
}
</script>

<style scope lang='less'>
.image_box {
  display: inline-block;
  margin-right: 20px;
}
.btn_image {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.img_list {
  margin-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 20px;
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
