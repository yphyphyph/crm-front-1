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
            <huige-item v-for="(item,index) in menuList" :key="index" :item="item"/>

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

import huigeItem from "@/components/huigeItem";

export default {
  name: "index",
  components: {huigeItem},
  data() {
    return {
      time: '',
      menuList: []
    }
  },
  created() {
    this.menuList  = JSON.parse(localStorage.getItem("menuList"));



    setInterval(() =>
            this.time = moment().format('yyyy-MM-DD HH:mm:ss')
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
