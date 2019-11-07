<template>
  <el-container class="home-container">
    <el-aside :width="isOpen?'200px':'64px'">
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <!-- el-submenu  拥有子级菜单使用submenu -->
        <!-- el-menu-item  不拥有子级菜单使用menu-item -->
        <!-- index="2" 当前菜单项的唯一标识 -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="dropdown" @command="handClick">
          <img class="headIcon" :src="photo" alt />
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '../../utils/local'
import eventBus from '../../eventBus'
export default {
  data() {
    return {
      isOpen: true,
      photo: '',
      name: ''
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    setting() {
      this.$router.push('/setting')
    },
    loginout() {
      local.delUser()
      this.$router.push('/login')
    },
    handClick(command) {
      this[command]()
    }
  },
  created() {
    const user = local.getUser() || {}
    this.photo = user.photo
    this.name = user.name
    eventBus.$on('uploadName', (name) => {
      this.name = name
    })
    eventBus.$on('uploadPhoto', (photo) => {
      this.photo = photo
    })
  }
}
</script>

<style lang="less">
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
  }
  .el-icon-s-fold {
    font-size: 30px;
    vertical-align: middle;
  }
  .text {
    margin-left: 10px;
    vertical-align: middle;
  }
  .dropdown {
    float: right;
    .headIcon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
