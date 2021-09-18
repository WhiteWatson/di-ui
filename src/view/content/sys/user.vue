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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="realname" label="真实姓名"> </el-table-column>
      <el-table-column prop="userEmail" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
       <el-table-column label="角色">
        <template slot-scope="scope">
          {{ scope.row.roleNames }}
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{ converSex(scope.row.sex) }}
        </template>
      </el-table-column>
      <el-table-column label="操作"  fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="k-9sptci-footer">
      <el-button type="danger">批量删除</el-button>
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
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
} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userTable: [
        {
          username: "lisi",
          realname: "李四",
          userEmail: "lisi@com",
          mobile: "18255476585",
          sex: 0,
        },
        {
          username: "lisi",
          realname: "李四",
          userEmail: "lisi@com",
          mobile: "18255476585",
          sex: 0,
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["userForm"]),
  },
  methods: {
    ...mapActions("user", ["handleQuery", "handleReset","addUser"]),
    handleEdit(row) {
      console.log(row);
    },
    handleSelect() {},
    converSex(index) {
      return {
        0: "男",
        1: "女",
      }[index];
    },
  },
  async created() {
    const { data, errorCode } = await this.$http.userList();
    if (errorCode != "0000") return;
    this.userTable = data.userList;
  },
};
</script>
<style lang="less" src="../less/user.less"></style>
