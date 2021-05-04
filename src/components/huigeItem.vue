<template>
  <div class="box">
    <el-menu-item :index="item.menuPath" v-if="item.menuType==1">
      <e-icon :icon-name="item.menuIcon"/>
      <span slot="title">{{ item.menuTitle }}</span>
    </el-menu-item>
    <el-submenu :index="item.menuPath" v-if="item.menuType==0">
      <template slot="title">
        <e-icon :icon-name="item.menuIcon"/>
        <span slot="title">{{ item.menuTitle }}</span>
      </template>
      <huige-item v-for="(item,index) in item.children" :key="index" :item="item"/>
    </el-submenu>
  </div>


</template>

<script>
export default {
  name: "huigeItem",
  props: ['item']
}
</script>

<style scoped>

</style>
