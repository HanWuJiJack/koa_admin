<template>
  <div class="users-main">
    <!-- 头部查询功能区域 -->
    <div class="users-top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="用户ID" prop="userId">
          <el-input
            v-model="selectData.userId"
            type="Number"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="selectData.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="selectData.state" placeholder="请选择">
            <el-option label="所有" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchHandler">查询</el-button>
          <el-button @click="onResetHandler('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="users-bottom">
      <div class="users-bottom-top">
        <el-button type="primary" @click="addUserHandler" v-permisson="'system:user:post'"
          >新增用户</el-button
        >
        <el-button
          type="danger"
          @click="handleDelete(null, 'dels')"
          v-permisson="'system:user:remove'"
          >批量删除</el-button
        >
      </div>
      <div class="users-bottom-table">
        <el-table ref="userTable" :data="userData" @selection-change="selectHandler">
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- 表字段遍历 -->
          <el-table-column
            v-for="item in columList"
            :key="item.userId"
            :prop="item.prop"
            :label="item.label"
            show-overflow-tooltip
            :formatter="item.formatter"
          >
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="300" align="left">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row, 'edit')"
                v-permisson="'system:user:put'"
                >编辑</el-button
              >
              <el-button
                size="small"
                @click="handleEdit(scope.row, 'psw')"
                v-permisson="'system:user:put'"
                >修改密码</el-button
              >
              <el-button
                v-if="scope.row.state === 1"
                size="small"
                type="danger"
                @click="handleDelete(scope.row, 'del')"
                v-permisson="'system:user:remove'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageData.pageSize"
          :total="pageData.total"
          class="pagination"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- 新增用户弹窗 -->
      <el-dialog title="新增用户" v-model="userDialogVisible" width="80%">
        <el-form
          :model="userForm.data.form"
          :rules="rules"
          ref="userRuleForm"
          label-width="150px"
        >
          <!-- <el-form-item label="品牌" prop="brand">
            <el-input
              v-model="userForm.data.form.brand"
              placeholder="请输入品牌"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model="userForm.data.form.userName"
              placeholder="请输入用户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input
              v-model="userForm.data.form.userEmail"
              placeholder="请输入用户邮箱"
              :disabled="action == 'edit'"
            >
              <!-- <template #append>@qq.com</template> -->
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="公司" prop="company">
            <el-select v-model="userForm.data.form.company" placeholder="请选择">
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
              v-model="userForm.data.form.companyAddress"
              placeholder="请输入公司地址"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="发票抬头" prop="InvoiceTitle">
            <el-input
              v-model="userForm.data.form.InvoiceTitle"
              placeholder="请输入发票抬头"
            ></el-input>
          </el-form-item>
          <el-form-item label="税号" prop="dutyParagraph">
            <el-input
              v-model="userForm.data.form.dutyParagraph"
              placeholder="请输入税号"
            ></el-input>
          </el-form-item>
          <el-form-item label="快递地址" prop="expressAddress">
            <el-input
              v-model="userForm.data.form.expressAddress"
              placeholder="请输入快递地址"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="快递联系人" prop="expressName">
            <el-input
              v-model="userForm.data.form.expressName"
              placeholder="请输入快递联系人"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="快递联系人手机号" prop="expressPhone">
            <el-input
              v-model="userForm.data.form.expressPhone"
              placeholder="请输入快递联系人手机号"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="用户手机号" prop="mobile">
            <el-input
              v-model="userForm.data.form.mobile"
              placeholder="请输入用户手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="job">
            <el-input
              v-model="userForm.data.form.job"
              placeholder="请输入岗位"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="userForm.data.form.state" placeholder="请选择">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统角色" prop="roleList">
            <el-select
              v-model="userForm.data.form.roleList"
              placeholder="请选择"
              multiple
            >
              <el-option
                v-for="item in rolesNameList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptId">
            <el-cascader
              :options="deptList"
              :props="{
                checkStrictly: true,
                value: 'id',
                label: 'deptName',
                children: 'children',
              }"
              clearable
              v-model="userForm.data.form.deptId"
              placeholder="请选择"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitHandler">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 修改密码 -->
      <el-dialog title="修改密码" v-model="pswForm.show" width="50%">
        <el-form
          :model="pswForm.data"
          :rules="pswForm.rules"
          ref="pswFormRef"
          label-width="100px"
        >
          <el-form-item label="密码" prop="userPwd">
            <el-input v-model="pswForm.data.userPwd" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler('psw')">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitChangePWS">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, getCurrentInstance, toRefs } from "vue";
import publicFn from "../../utils/publicFn";
import { getRolesNameList } from "@/api/system/roles";
import { getDeptList } from "@/api/system/dept";
import {
  getUserList,
  postDelUser,
  postUserC_U,
  changePWS,
  removeUser,
  putUserInfo,
} from "@/api/system/users";
import { getDictTypes } from "@/api/system/dictType";

const { proxy } = getCurrentInstance();
const selectData = reactive({
  state: 1,
}); //查询功能表单对象
// 动态表格数据对象
var userData = ref([]);
const local = reactive({
  companyType: [],
});
const pswFormRef = ref();
const pswForm = reactive({
  rules: {},
  show: false,
  data: { userPwd: "" },
});
//动态表格字段格式
const columList = reactive([
  {
    prop: "id",
    label: "用户ID",
  },
  {
    prop: "userName",
    label: "用户名",
  },
  {
    prop: "userEmail",
    label: "用户邮箱",
  },
  {
    prop: "role",
    label: "用户角色",
    formatter(row, col, value) {
      return {
        0: "管理员",
        1: "普通用户",
      }[value];
    },
  },
  {
    prop: "state",
    label: "用户状态",
    formatter(row, col, value) {
      return {
        1: "启用",
        2: "禁用",
      }[value];
    },
  },
  {
    prop: "createTime",
    label: "注册时间",
    formatter(row, col, value) {
      return publicFn.formateDate(new Date(value));
    },
  },
  // {
  //   prop: "lastLoginTime",
  //   label: "最后登录时间",
  //   formatter(row, col, value) {
  //     return publicFn.formateDate(new Date(value));
  //   },
  // },
]);
// 分页数据对象
var pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
//当前选中的用户数组
const selectUserArr = ref([]);
//新增用户弹窗显示开关
const userDialogVisible = ref(false);
//新增用户表单对象
const userForm = reactive({
  data: {
    form: {
      state: 1,
    },
  },
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
const action = ref("add");
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
  const params = { ...selectData, ...pageData };
  try {
    const res = await getUserList(params);
    userData.value = res.list;
    pageData.total = res.page.total;
  } catch (error) {
    console.error(error);
  }
};
//查询事件
const onSearchHandler = () => {
  getUserListRequest();
};
//重置事件
const onResetHandler = (name) => {
  proxy.$refs[name].resetFields();
  getUserListRequest();
};
//表格选中事件
const selectHandler = (selection, row) => {
  var arr = [];
  selection.map((item) => {
    arr.push(item.id);
  });
  selectUserArr.value = arr;
};
//删除用户事件
const handleDelete = async (row, action) => {
  let res = undefined;
  if (action === "del") {
    res = await removeUser({
      userIds: [row.id],
    });
  } else {
    if (selectUserArr.value.length > 0) {
      res = await removeUser({
        userIds: [...selectUserArr.value],
      });
    } else {
      proxy.$message.error("您还没选中需要删除的用户");
      return;
    }
  }
  if (res.n >= 1) {
    proxy.$message.success("删除成功");
    getUserListRequest();
  } else {
    proxy.$message.error("删除失败");
  }
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
// 分页触发事件
const handleCurrentChange = (current) => {
  pageData.pageNum = current;
  getUserListRequest();
};
//新增用户弹窗取消按钮事件
const dialogCancelHandler = () => {
  userDialogVisible.value = false;
  onResetHandler("userRuleForm");
};

const dialogSubmitChangePWS = async () => {
  if (pswForm.data.userPwd) {
    await changePWS({
      userPwd: pswForm.data.userPwd,
      id: pswForm.data.id,
    });
    proxy.$message.success("您的新密码为：" + pswForm.data.userPwd);
    pswForm.show = false;
    getUserListRequest();
  } else {
    proxy.$message.error("您填写的信息不符合规则，请重新输入");
    return false;
  }
};
//新增用户弹窗确定按钮事件
const dialogSubmitHandler = () => {
  proxy.$refs["userRuleForm"].validate(async (valid) => {
    if (valid) {
      let params = { ...userForm.data.form };
      params.action = action.value;
      if (params.action === "add") {
        await postUserC_U(params);
        proxy.$message.success("添加用户信息成功");
      } else {
        await putUserInfo(params);
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
//编辑事件
const handleEdit = (row, type) => {
  if (type === "edit") {
    userDialogVisible.value = true;
    action.value = "edit";
    proxy.$nextTick(() => {
      Object.assign(userForm.data.form, row);
    });
  }
  if (type === "psw") {
    pswForm.data = {};
    pswForm.show = true;
    proxy.$nextTick(() => {
      Object.assign(pswForm.data, row, { userPwd: "" });
    });
  }
};
//添加用户按钮事件
const addUserHandler = () => {
  userDialogVisible.value = true;
  action.value = "add";
  userForm.data.form = { state: 1 };
};
</script>
<style lang="less" scoped>
.users-main {
  // background-color: #fff;
  height: 100%;
  .users-top {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .users-bottom {
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    margin-top: 10px;
    .el-select {
      width: 100%;
    }
    :deep(.el-cascader) {
      width: 100%;
    }
    .users-bottom-top {
      padding: 20px;
      border-bottom: 1px solid #ececec;
    }
    .users-bottom-table {
      .pagination {
        padding: 10px;
        text-align: right;
      }
    }
  }
}
</style>
