<template>
  <div class="login-main">
    <div class="login-modal">
      <h1 class="login-title">后台管理系统</h1>
      <el-form :model="formData" :rules="rules" ref="ruleForm" status-icon>
        <el-form-item prop="userEmail">
          <el-input v-model="formData.userEmail" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="formData.passWord" placeholder="请输入密码" prefix-icon="el-icon-view" type="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginHandler">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { postLogin, getPublicras } from "@/api/syetem/login";
import exportExcel from "@/utils/exportExcel.js"
import exportWordDocx from "@/utils/exportWordDocx.js"
export default {
  name: "Login",
  data() {
    return {
      formData: {
        userEmail: "",
        passWord: "",
      },
      rules: {
        userEmail: [{ required: true, message: "请输入账号", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    loginHandler() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const res = await postLogin({
            userEmail: this.formData.userEmail,
            userPwd: this.formData.passWord,
          });
          this.$store.commit("SET_USERINFO", res);
          this.$router.push({ path: this.redirect || "/" });
        } else {
          return false;
        }
      });
    },
  },
  mounted() { },
};
</script>
<style lang="less" scoped>
.login-main {
  background-color: #f8fcff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    box-shadow: 0 0 14px 7px #c7c9cb4d;

    .login-title {
      text-align: center;
      font-size: 26px;
      font-weight: 400;
      margin-bottom: 30px;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>