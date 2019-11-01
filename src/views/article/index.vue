<template>
  <div class="container-article">
    <el-card>
      <div slot="header" class="clearfix">
        <my-break>内容管理</my-break>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParmas.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="reqParmas.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{totol}} 条结果</span>
      </div>
      <el-table :data="article" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" alt style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toedit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              @click="delarticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totol"
        :page-size="reqParmas.per_page"
        :current-page="reqParmas.page"
        @current-change="pager"
        style="margin-top:20px;"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParmas: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 当前页码
        pager: 1,
        per_page: 20
      },
      information: [],
      dateArr: [],
      article: [],
      totol: 0
    }
  },
  created () {
    this.getinformation()
    this.getArticle()
  },
  methods: {
    // 频道方法
    async getinformation () {
      // 获取数据
      const { data: { data } } = await this.$http.get('channels')
      // 赋值
      this.information = data.channels
    },
    // 列表方法
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParmas })
      this.article = data.results
      this.totol = data.total_count
    },
    // 分页函数
    pager (newpage) {
      this.reqParmas.page = newpage
      this.getArticle()
    },
    // 筛选
    search () {
      // 筛选
      if (this.reqParmas.channel_id === '') this.reqParmas.channel_id = null
      // 把页码换成1
      this.reqParmas.page = 1
      this.getArticle()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParmas.begin_pubdate = dateArr[0]
        this.reqParmas.end_pubdate = dateArr[1]
      } else {
        this.reqParmas.begin_pubdate = null
        this.reqParmas.end_pubdate = null
      }
    },
    // 编辑
    toedit (id) {
      console.log(id)
      this.$router.push(`/publish?id=${id}`)
      this.$router.push({ path: '/publish', query: { id } })
    },
    async delarticle (id) {
      // 请求
      await this.$http.delete(`articles/${id}`)
      this.message.success('删除成功')
      this.getArticle()
    }
  }
}
</script>

<style scoped lang='less'>
</style>
