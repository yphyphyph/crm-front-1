<template>
  <div class="main-wrapper">
    <el-container>
      <el-aside width="200px">
        <!--      Logo部分-->
        <div class="aside-logo-wrapper">
          <img src="@/assets/avatar.jpg" alt="">
          <span>尚马的后台系统</span>
        </div>
        <!--    菜单部分 -->
        <el-scrollbar>
          <el-menu
              active-text-color="#F56C6C"
              text-color="#606266"
              router
          >
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品相关</span>
              </template>
              <el-menu-item index="/brand">
                <i class="el-icon-menu"></i>
                <span slot="title">品牌管理</span>
              </el-menu-item>
              <el-menu-item index="/category">
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
              </el-menu-item>

              <el-menu-item index="/good">
                <i class="el-icon-menu"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>员工相关</span>
              </template>
              <el-menu-item index="/dept">
                <i class="el-icon-menu"></i>
                <span slot="title">部门管理</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                <span slot="title">员工管理</span>
              </el-menu-item>
            </el-submenu>


            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                <span slot="title">角色管理</span>
              </el-menu-item>
              <el-menu-item index="4-2">
                <i class="el-icon-menu"></i>
                <span slot="title">权限管理</span>
              </el-menu-item>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>日志相关</span>
                </template>
                <el-menu-item index="5-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">登录日志</span>
                </el-menu-item>
                <el-menu-item index="5-2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">操作日志</span>
                </el-menu-item>
              </el-submenu>

            </el-submenu>


            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>测试滚动条</span>
              </template>
              <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>
                <span slot="title">测试滚动条</span>
              </el-menu-item>
              <el-menu-item index="5-2">
                <i class="el-icon-menu"></i>
                <span slot="title">测试滚动条</span>
              </el-menu-item>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>测试滚动条</span>
                </template>
                <el-menu-item index="6-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">测试滚动条</span>
                </el-menu-item>
                <el-menu-item index="6-2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">测试滚动条</span>
                </el-menu-item>
              </el-submenu>

            </el-submenu>
          </el-menu>
        </el-scrollbar>


      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <i class="el-icon-s-fold"></i>
            <span style="margin-left: 20px">{{ time }}</span>
          </div>
          <div class="hearder-right">

          </div>

        </el-header>
        <el-main>
          <div class="main-box">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import moment from 'moment'
export default {
  name: "index",
  data() {
    return {
      time: ''
    }
  },
  created() {
    setInterval(() =>
        this.time= moment().format('yyyy-MM-DD HH:mm:ss')
        , 1000);
  }
}
</script>

<style scoped lang="scss">
.main-wrapper {
  height: 100%;
}

.el-header {
  background-color: #F56C6C;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  overflow: hidden;

  .aside-logo-wrapper {
    text-align: center;
    background-color: #F56C6C;
    height: 60px;
    line-height: 60px;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 8px;
    }

    span {
      font-weight: 700;
      color: #fff;
      font-family: "华文行楷";
    }


  }


}

.el-scrollbar {
  height: calc(100% - 60px);
}

.el-main {
  background-color: #E9EEF3;
  color: #606266;
  padding: 6px 0 0 6px;

  .main-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 0px 0px 15px;
    box-sizing: border-box;
    overflow: hidden;
  }


}

.el-container {
  height: 100%;
}


</style>
