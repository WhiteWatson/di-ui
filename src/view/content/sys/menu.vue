<template>
  <div class="k-2kibew">
    <div class="k-2kibew-add">
      <el-cascader
        :options="navTree"
        :props="{ checkStrictly: true, label: 'name', value: 'id' }"
        clearable
      ></el-cascader>
      <el-button type="primary" class="k-2kibew-btn">新增</el-button>
    </div>
    <el-tree
      :data="navTree"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :props="{ label: 'name' }"
    >
      <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button type="danger" size="mini" @click="showData(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<style lang="less" src="../less/menu.less"></style>
<script>
import Vue from "vue";
import { Tree, Button, Cascader } from "element-ui";
Vue.use(Tree);
Vue.use(Button);
Vue.use(Cascader);
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("navMenu", ["navTree"]),
  },
  methods: {
    showData(dat) {
      console.log(dat);
    },
    queryMenu() {},
  },
  created() {},
};
</script>
