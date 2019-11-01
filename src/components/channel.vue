<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in information" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      //   value: null,
      information: []
    }
  },
  created () {
    this.getinformation()
  },
  methods: {
    // 频道方法
    async getinformation () {
      // 获取数据
      const { data: { data } } = await this.$http.get('channels')
      // 赋值
      this.information = data.channels
    },
    // 频道改变函数
    fn (channelId) {
      // 清空值是'' 改成null
      if (channelId === '') channelId = null
      // 把ID提交给父组件
      this.$emit('input', channelId)
    }
  }
}
</script>

<style>
</style>
