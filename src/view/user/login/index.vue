<template>
  <div class="k-pk44lv">
    <div class="k-dt8vs8">
      <el-form ref="form" :model="loginForm" label-width="80px">
        <el-form-item label-width="0">
          <el-input
            v-model="loginForm.account"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="k-dt8vs8-login" label-width="0">
          <el-button style="width:45%;" @click.native.prevent="reset"
            >重 置</el-button
          >
          <el-button
            type="primary"
            style="width:45%;"
            @click.native.prevent="login"
            >登 录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Form, Input, FormItem } from "element-ui";
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
    };
  },
  methods:{
    async login(){
      const {errorCode,data} =await this.$http.login.login({...this.loginForm, isShowToast:true})
      if(errorCode === '0000'){
        Cookie.set('token',data.token)
        this.$router.push('/')
      }

    },
    reset(){

    }
  },
  created() {

  },
};
</script>
<style src="./index.less" lang="less"></style>
