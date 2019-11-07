<template>
  <div class="container-image">
    <el-card>
      <!-- 顶部 -->
      <div slot="header">
        <my-break>素材管理</my-break>
      </div>
      <div class="btn-box">
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small" @click="open">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-show="!reqParams.collect">
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggleStatus(item)"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-left:100px"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- action 是图片上传的接口地址 -->
      <!-- header 上传组件的请求头 -->
      <!--  name 提交文件的字段名称  需要和后台保持一致  -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :on-success="handlesuccess"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {

  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      // 上传图片成功后的地址
      imageUrl: null,
      // 请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created() {
    this.getImages()
  },
  methods: {
    open() {
      this.dialogVisible = true
      this.imageUrl = null
    },
    // 上传图片成功
    handlesuccess(res) {
      // 预览
      this.imageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
      // 设置定时器两秒关闭
      window.setTimeout(() => {
        this.dialogVisible = false
        // 在重新获取
        this.getImages()
      }, 2000)
    },
    //   渲染
    async getImages() {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页
    pager(newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    // 切换
    toggleList() {
      this.reqParams.page = 1
      this.getImages()
    },
    // 收藏
    async toggleStatus(item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取*消收藏成功')
    },
    // 删除
    deleteImage(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
        // 点击了取消

      })
    }
  }
}
</script>

<style scoped lang=less>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-left: 100px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      /* span .red{} 选择器无效
      span.red{} 选择器有效  &连接符 */
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
