<template>
  <div class="container">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginform">
        <!-- el-form-item 表单容器  label="活动名称" 指定说明文字 -->
        <el-form-item>
          <!-- 表单元素 -->
          <el-input
            v-model="loginform.mobile"
            placeholder="请输入手机号"
            style="display:block;margin-bottom:20px"
          ></el-input>
          <el-input
            v-model="loginform.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang='less'>
.container {
  width: 100%;
  height: 100%;
  background-color: orangered;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
