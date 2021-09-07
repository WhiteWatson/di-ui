<template>
  <div>
    <div class="k-j2nnc8">
      <div class="k-j2nnc8-cos" @click="setCollapse(!collapse)">
        <i :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
      </div>
      <div class="k-j2nnc8-loginout" @click="loginOut">退出</div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { MessageBox } from "element-ui";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("navMenu", ["collapse"]),
  },
  methods: {
    ...mapMutations("navMenu", ["setCollapse"]),

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
