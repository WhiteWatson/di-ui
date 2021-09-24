<template>
  <div class="k-2kibew">
    <div class="k-2kibew-add">
      <el-cascader
        v-model="parentId"
        :options="navTree"
        :props="{ checkStrictly: true, label: 'name', value: '_id' }"
        clearable
      ></el-cascader>
      <el-button type="primary" class="k-2kibew-btn" @click="addMenu"
        >新增</el-button
      >
    </div>
    <el-tree
      :data="navTree"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :props="{ label: 'name' }"
    >
      <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button size="mini" @click="editMenu(data)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="delMenu(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <!-- 菜单编辑新增dialog -->
    <el-dialog title="菜单" :visible.sync="menuVisible">
      <el-form ref="menuForm" :model="menuForm" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" prop="url">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序" prop="orderNum">
          <el-input v-model="menuForm.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio v-model="menuForm.menuType" label="1">菜单</el-radio>
          <el-radio v-model="menuForm.menuType" label="2">按钮</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less" src="../less/menu.less"></style>
<script>
import Vue from "vue";
import addRoutes from "@/router/addRouter"
import router from "@/router"
import {
  Tree,
  Button,
  Cascader,
  MessageBox,
  Message,
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Radio,
} from "element-ui";
Vue.use(Tree);
Vue.use(Button);
Vue.use(Cascader);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Input);
Vue.prototype.$message = Message;
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      formLabelWidth: "200",
      parentId: null,
      menuForm: {
        name:'',
        url:'',
        icon:'',
        orderNum:'',
        menuType:''
      },
      menuVisible: false,
    };
  },
  computed: {
    ...mapState("navMenu", ["navTree"]),
  },
  methods: {
    ...mapActions("navMenu", ["addMenuList"]),
    //删除菜单
    async delMenu(dat) {
      console.log(dat);
      try {
        await MessageBox.confirm("此操作将退出系统, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const { errorCode } = await this.$http.delMenuList({ _id: dat._id });
        if (errorCode === "0000") {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          //查询菜单
          this.addMenuList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    queryMenu() {},
    addMenu() {
      this.menuVisible = true;
    },
    async confirm() {
      console.log(this.parentId)
      const { errorCode } = await this.$http.addMenuList({
        parentId: this.parentId
          ? this.parentId[this.parentId.length - 1]
          : null,
        ...this.menuForm,
      });
      if (errorCode === "0000") {
        this.$message({
          showClose: true,
          message: "新增成功",
          type: "success",
        });
        //重置表单查询菜单
        this.menuVisible = false;
        this.$refs["menuForm"].resetFields();
        const menuList =await this.addMenuList();
        //添加路由
        let routes = await addRoutes(menuList);
        for (let childRoutes of routes) {
          //为名为‘首页’的路由添加子路由(如果不添加 菜单点击找不到路由 必须刷新页面才能正常)
          router.addRoute("首页", childRoutes);
        }
      }
    },
    cancel() {
      this.menuVisible = false;
      this.$refs["menuForm"].resetFields();
      //等页面渲染完成再重置表单
      // this.$nextTick(()=>{
      //     this.$refs['menuForm'].resetFields();
      // })
    },
  },
  created() {},
};
</script>
