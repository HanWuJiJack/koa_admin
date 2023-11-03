<template>
  <div class="users-main">
    <el-card class="box-card">
      <el-form :model="userForm" :rules="rules" ref="userRuleForm" label-width="200px">
        <!-- <el-form-item label="品牌" prop="brand">
          <el-input v-model="userForm.brand" placeholder="请输入品牌"></el-input>
        </el-form-item> -->
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userForm.userEmail"
            placeholder="请输入用户邮箱"
            :disabled="action == 'edit'"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="公司" prop="company">
          <el-select
            v-model="userForm.company"
            :disabled="action == 'edit'"
            placeholder="请选择"
          >
            <el-option
              v-for="item in local.companyType"
              :label="item.dictLabel"
              :value="item.dictValue"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input
            v-model="userForm.companyAddress"
            placeholder="请输入公司地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票抬头" prop="InvoiceTitle">
          <el-input
            v-model="userForm.InvoiceTitle"
            placeholder="请输入发票抬头"
          ></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="dutyParagraph">
          <el-input v-model="userForm.dutyParagraph" placeholder="请输入税号"></el-input>
        </el-form-item>
        <el-form-item label="快递地址" prop="expressAddress">
          <el-input
            v-model="userForm.expressAddress"
            placeholder="请输入快递地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="快递联系人" prop="expressName">
          <el-input
            v-model="userForm.expressName"
            placeholder="请输入快递联系人"
          ></el-input>
        </el-form-item>
        <el-form-item label="快递联系人手机号" prop="expressPhone">
          <el-input
            v-model="userForm.expressPhone"
            placeholder="请输入快递联系人手机号"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="用户手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入用户手机号码"></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input
            v-model="userForm.job"
            :disabled="action == 'edit'"
            placeholder="请输入岗位"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogSubmitHandler">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, getCurrentInstance, toRefs } from "vue";
import publicFn from "../../utils/publicFn";

import { getRolesNameList } from "@/api/system/roles";
import { getDeptList } from "@/api/system/dept";
import { getUserList, postDelUser, postUserC_U, getUserInfo } from "@/api/system/users";
import { getDictTypes } from "@/api/system/dictType";
const { proxy } = getCurrentInstance();

const local = reactive({
  companyType: [],
});

//新增用户弹窗显示开关
const userDialogVisible = ref(false);
//新增用户表单对象
let userForm = reactive({
  state: 1,
});
//表单验证规则
const rules = reactive({
  userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  userEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  deptId: [{ required: true, message: "请选择", trigger: "blur" }],
  // company: [{ required: true, message: "请输入公司", trigger: "blur" }],
});
//角色名称列表
const rolesNameList = ref([]);
//部门列表
const deptList = ref([]);
//操作类型
const action = ref("edit");
onMounted(() => {
  getUserListRequest();
  getRolesRequest();
  getDeptListRequest();
  // getDictTypes("company-type").then((res) => {
  //   local.companyType = res;
  //   // console.log(res);
  // });
});
//获取用户列表数据
const getUserListRequest = async () => {
  getUserInfo().then((res) => {
    // console.log("user", res);
    userForm = Object.assign(userForm, res);
  });
};

//获取角色名称列表
const getRolesRequest = async () => {
  const res = await getRolesNameList();
  rolesNameList.value = res;
};
//获取部门列表
const getDeptListRequest = async () => {
  const res = await getDeptList();
  deptList.value = res;
};

//新增用户弹窗确定按钮事件
const dialogSubmitHandler = () => {
  proxy.$refs["userRuleForm"].validate(async (valid) => {
    if (valid) {
      let params = { ...userForm };
      params.action = action.value;
      await postUserC_U(params);
      if (params.action === "add") {
        proxy.$message.success("添加用户信息成功");
      } else {
        proxy.$message.success("修改用户信息成功");
      }
      userDialogVisible.value = false;
      getUserListRequest();
    } else {
      proxy.$message.error("您填写的信息不符合规则，请重新输入");
      return false;
    }
  });
};
</script>
<style lang="less" scoped>
.users-main {
  // background-color: #fff;
}
</style>
