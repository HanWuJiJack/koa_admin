<template>
  <div class="login-main">
    <div class="login-modal">
      <h1 class="login-title">后台管理系统</h1>
      <el-form :model="Data.formData" :rules="Data.rules" ref="ruleFormRef">
        <el-form-item prop="userEmail">
          <el-input
            v-model="Data.formData.userEmail"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="Data.formData.passWord"
            placeholder="请输入密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginHandler"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { postLogin, getPublicras } from "@/api/system/login";
import exportExcel from "@/utils/exportExcel.js";
import exportWordDocx from "@/utils/exportWordDocx.js";
import {
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
  toRefs,
  toRaw,
  computed,
  markRaw,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const ruleFormRef = ref(null);
const Data = reactive({
  formData: {
    userEmail: "",
    passWord: "",
  },
  rules: {
    userEmail: [{ required: true, message: "请输入账号", trigger: "blur" }],
    passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
  },
  redirect: undefined,
});
function loginHandler() {
  ruleFormRef._value.validate(async (valid) => {
    if (valid) {
      const res = await postLogin({
        userEmail: Data.formData.userEmail,
        userPwd: Data.formData.passWord,
      });
      store.commit("SET_USERINFO", res);
      router.push({ path: Data.redirect || "/" });
    } else {
      return false;
    }
  });
}
watch(
  () => router.currentRoute.value,
  (val) => {
    Data.redirect = val.query && val.query.redirect;
  },
  { immediate: true, deep: true }
);
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
