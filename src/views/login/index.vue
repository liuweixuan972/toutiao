<template>
  <div class="container">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginform" :rules="loginrulers" status-icon ref="loginForm">
        <!-- el-form-item 表单容器  label="活动名称" 指定说明文字 -->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <el-input
            v-model="loginform.mobile"
            placeholder="请输入手机号"
            style="display:block;margin-bottom:5px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
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
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验
    // 校验手机号
    // 下载return前面 进行判断 如果正确就返回callback 如果不正确就返回else
    var checkMobile = (rule, value, callback) => {
      // 去判断value是否符合手机号格式
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginform: {
        mobile: '',
        code: ''
      },
      // 进行匹配 在标签中写loginrulers
      loginrulers: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { len: 6, message: '验证码是6位', trigger: 'blur' },
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  // 定义方法
  methods: {
    login () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // console.log('ok')
          this.$http
            .post('authorizations', this.loginform)
            .then(res => {
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
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
