<template>
  <div class="k-and311">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
       <el-menu-item index="1-1">选项1</el-menu-item>
       <el-menu-item index="1-2">选项2</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { Menu, MenuItemGroup, MenuItem, Submenu } from "element-ui";
import Vue from "vue";
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Submenu);
export default {
    methods:{
        handleOpen(s){
            console.log(s)
        },
        handleClose(s){
            console.log(s)
        }
    }
};
</script>
<style lang="less" src='./index.less'></style>