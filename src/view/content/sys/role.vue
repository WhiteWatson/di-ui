<template>
  <div class="k-9sptcz">
    <el-form
      ref="roleForm"
      :inline="true"
      class="k-9sptcz-header"
      :model="roleForm"
    >
      <el-form-item label="角色名" prop="roleName">
        <el-input placeholder="角色名" v-model="roleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="addrole">新增角色</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset($refs['roleForm'])">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="roleData" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="remark" label="角色备注"> </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="action ? '编辑角色' : '新增角色'"
      :visible.sync="roleVisible"
    >
      <el-form ref="roleForm" :model="roleParams" label-width="80px">
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="roleParams.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="roleParams.remark"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
import {
  Table,
  Dialog,
  TableColumn,
  Form,
  FormItem,
  Input,
  Button,
  Message,
} from "element-ui";
Vue.prototype.$message = Message;
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
export default {
  data() {
    return {
      action: 0,
      roleData: [],
      roleForm: {
        roleName: "",
      },
      roleParams: {},
      roleVisible: false,
    };
  },

  methods: {
    //新增角色
    addrole() {
      this.action = 0;
      this.roleVisible = true;
    },
    async confirm() {
      const { errorCode } = await this.$http.addRoleList({
        ...this.roleParams,
        action: this.action,
      });
      if (errorCode === "0000") {
        this.$message({
          type: "success",
          message: "操作成功",
        });
        this.handleQuery();
        this.$refs["roleForm"].resetFields();
        this.roleVisible = false;
      }
    },
    cancel() {
      this.$refs["roleForm"].resetFields();
      this.roleVisible = false;
    },
    //删除角色
    async handleDel({ _id }) {
      const { errorCode } = await this.$http.delroleList({ _id });
      if (errorCode === "0000") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.handleQuery()
      }
    },
    async handleQuery() {
      const { errorCode, data } = await this.$http.roleList(this.roleForm);
      if (errorCode === "0000") {
        this.roleData = data.rolelist;
      }
    },
  },
  created() {
    this.handleQuery();
  },
};
</script>
<style lang="less" src="../less/role.less"></style>
