<template>
  <div class="k-j2nnc8">
    <div @click="loginOut" class="k-j2nnc8-loginout">退出</div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { MessageBox } from "element-ui";
export default {
  methods: {
    async loginOut() {
      try {
        await MessageBox.confirm("此操作将退出系统, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        Cookies.remove("token");
        sessionStorage.clear();
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style src="./index.less" lang="less"></style>
