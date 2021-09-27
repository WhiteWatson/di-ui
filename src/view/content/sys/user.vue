<template>
  <div class="k-9sptci">
    <el-form
      ref="userForm"
      :inline="true"
      class="k-9sptci-header"
      :model="userForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="用户名" v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input placeholder="手机号" v-model="userForm.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="addUser">新增用户</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset($refs['userForm'])">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="userTable"
      style="margin-top:20px"
      @selection-change="handleSelect"
    >
      <el-table-column
        v-for="item in userList"
        :key="item._id"
        :prop="item.prop"
        :type="item.type"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="k-9sptci-footer">
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
      <el-pagination
        @current-change="handleQuery"
        :current-page.sync="pager.pageNum"
        layout="prev, pager, next"
        :total="pager.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Form,
  FormItem,
  Input,
  Button,
  Table,
  TableColumn,
  Pagination,
  MessageBox,
  Message,
} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      ids: [],
      userList: [
        {
          type: "selection",
          width:55
        },
        {
          prop: "username",
          label: "用户名",
        },
        {
          prop: "realname",
          label: "真实姓名",
        },
        {
          prop: "mobile",
          label: "手机号",
        },
        {
          prop: "邮箱",
          label: "userEmail",
        },
        {
          prop: "性别",
          label: "sex",
          formatter: (...rest) => {
            return {
              0: "男",
              1: "女",
            }[rest[2]]
          },
        },{
          prop: "角色",
          label: "roleNames",
        }
      ],
    };
  },
  computed: {
    ...mapState("user", ["userForm", "userTable", "pager"]),
  },
  methods: {
    ...mapActions("user", ["handleQuery", "handleReset", "addUser"]),
    handleEdit(row) {
      console.log(row);
    },
    //选中
    handleSelect(id) {
      let arr = [];
      id.forEach((item) => {
        arr.push(item._id);
      });
      this.ids = arr;
      console.log(this.ids);
    },
    //删除
    async handleDel(row, state) {
      const _id = state ? this.ids : [row._id];
      try {
        await MessageBox.confirm("此操作将删除用户信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const { errorCode } = await this.$http.dellist({ _id });
        if (errorCode == "0000") {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.handleQuery();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async batchDelete() {
      this.handleDel(this.ids, 1);
    },
    converSex(index) {
      return {
        0: "男",
        1: "女",
      }[index];
    },
  },
  async created() {
    this.handleQuery();
  },
};
</script>
<style lang="less" src="../less/user.less"></style>
