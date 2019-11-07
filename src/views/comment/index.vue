<template>
  <div class="comment">
    <el-card>
      <div slot="header">
        <my-break>评论管理</my-break>
      </div>
      <el-table :data="articles">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.comment_status"
              type="danger"
              size="small"
              @click="toggleStatus(scope.row)"
            >关闭评论</el-button>
            <el-button v-else type="success" size="small" @click="toggleStatus(scope.row)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top:20px"
        :page-size="reqParams.per_page"
        :current-size="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 10
      },
      total: 0
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    //  列表渲染
    async getArticle() {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager(newpager) {
      this.reqParams.page = newpager
      this.getArticle()
    },
    toggleStatus(row) {
      const text = row.comment_status ? '您确认关闭该文章的评论功能吗？如果关闭用户将不能对该文章进行评论' : '您确认打开评论功能吗？'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
    }
  }
}
</script>

<style>
</style>
