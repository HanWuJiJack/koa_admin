<template>
  <div class="dept-main">
    <!-- 头部查询功能区域 -->
    <div class="dept-top">
      <el-form :inline="true" :model="Data.queryForm" ref="queryFormRef">
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            v-model="Data.queryForm.deptName"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryHandler">查询</el-button>
          <el-button @click="onResetHandler">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="dept-bottom">
      <div class="dept-bottom-top">
        <el-button type="primary" @click="addHandler(1)" v-permisson="'dept-create'"
          >新增部门</el-button
        >
      </div>
      <el-table
        :data="Data.deptListData"
        style="width: 100%; margin-bottom: 20px"
        row-key="_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          :prop="item.props"
          :label="item.label"
          v-for="item in Data.tablePros"
          :key="item.props"
          :formatter="item.formatter"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="250" align="left">
          <template #default="scope">
            <el-button
              size="small"
              @click="addHandler(2, scope.row)"
              type="primary"
              v-permisson="'dept-create'"
              >添加</el-button
            >
            <el-button
              size="small"
              @click="handleEdit(scope.row)"
              v-permisson="'dept-edit'"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              v-permisson="'dept-delete'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增修改弹出 -->
    <el-dialog
      :title="Data.action === 'create' ? '添加部门' : '修改部门'"
      v-model="Data.addShow"
      width="35%"
    >
      <el-form
        :model="Data.addRuleForm"
        :rules="Data.rules"
        ref="addRuleFormRef"
        label-width="100px"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            :options="Data.deptListData"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            v-model="Data.addRuleForm.parentId"
            placeholder="请选择"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            v-model="Data.addRuleForm.deptName"
            placeholder="请输入部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="userName">
          <el-select
            v-model="Data.addRuleForm.userName"
            placeholder="请选择负责人"
            @change="selectHandler"
          >
            <el-option
              v-for="item in Data.userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="userEmail">
          <el-input v-model="Data.addRuleForm.userEmail" disabled></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancelHandler">取 消</el-button>
          <el-button type="primary" @click="onSubmitHandler">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import publicFn from "../../utils/publicFn";
import { getAllUserList } from "@/api/system/users";
import { getDeptList, postDeptC_U_D } from "@/api/system/dept";
import { onMounted, reactive, ref, getCurrentInstance, toRefs, nextTick } from "vue";
import { ElMessage } from "element-plus";

const queryFormRef = ref(null);
const addRuleFormRef = ref(null);

const Data = reactive({
  //查询数据对象
  queryForm: {
    deptName: "",
  },
  // 分页数据
  pageData: {
    total: 0,
    pageSize: 10,
    pageNum: 1,
  },
  //动态表格字段
  tablePros: [
    {
      props: "deptName",
      label: "部门名称",
    },
    {
      props: "userName",
      label: "负责人",
    },
    {
      props: "updateTime",
      label: "更新时间",
      formatter(row, col, value) {
        return publicFn.formateDate(new Date(value));
      },
    },
    {
      props: "createTime",
      label: "创建时间",
      formatter(row, col, value) {
        return publicFn.formateDate(new Date(value));
      },
    },
  ],
  deptListData: [], //部门列表数据
  addShow: false, //添加菜单弹窗控制
  //添加部门表单数据
  addRuleForm: {
    parentId: [null],
  },
  //表单验证规则
  rules: {
    deptName: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
    userName: [{ required: true, message: "请选择部门负责人", trigger: "blur" }],
  },
  action: "create",
  userList: [], // 用户列表数据
});

onMounted(() => {
  getDeptListRequest();
  getAllUserListRequest();
});

//重置表单事件
function onResetHandler() {
  queryFormRef._value.resetFields();
  getDeptListRequest();
}

//获取菜单列表
async function getDeptListRequest() {
  try {
    const res = await getDeptList({
      ...Data.queryForm,
      ...Data.pageData,
    });
    Data.deptListData = res;
  } catch (error) {
    ElMessage.error(error.stack);
  }
}
// 获取所有用户列表
async function getAllUserListRequest() {
  try {
    const res = await getAllUserList();
    Data.userList = res;
  } catch (error) {
    ElMessage.error(error.stack);
  }
}
//添加-修改-删除请求
async function postDeptC_U_DRequest() {
  try {
    await postDeptC_U_D({
      ...Data.addRuleForm,
      action: Data.action,
    });
    if (Data.action === "create") {
      ElMessage.success("创建部门成功！");
    } else if (Data.action === "edit") {
      ElMessage.success("编辑部门成功！");
    }
    addRuleFormRef._value.resetFields();
    getDeptListRequest();
    Data.addShow = false;
  } catch (error) {
    ElMessage.error(error.stack);
    return Promise.reject(error.stack);
  }
}
//查询按钮事件
function onQueryHandler() {
  getDeptListRequest();
}
//添加菜单按钮事件
function addHandler(type, row) {
  Data.addShow = true;
  Data.action = "create";
  //每行的添加按钮
  nextTick(() => {
    addRuleFormRef._value.resetFields();
    addRuleFormRef._value.clearValidate();
    if (row) {
      Data.addRuleForm.parentId = [...row.parentId, row._id].filter((item) => item);
    }
  });
}
//弹窗确定按钮事件
function onSubmitHandler() {
  addRuleFormRef._value.validate((valid) => {
    if (valid) {
      postDeptC_U_DRequest();
    } else {
      ElMessage.error("请填写完整再进行提交");
      return false;
    }
  });
}
//弹窗取消按钮事件
function onCancelHandler() {
  addRuleFormRef._value.resetFields();
  Data.action = "create";
  Data.addShow = false;
}

// 负责人下拉选中触发事件
function selectHandler(val) {
  const [userId, userName, userEmail] = val.split("/");
  Object.assign(Data.addRuleForm, { userId, userEmail, userName });
}
//编辑按钮事件
function handleEdit(row) {
  Data.action = "edit";
  Data.addShow = true;
  nextTick(() => {
    Object.assign(Data.addRuleForm, row); //利用浅拷贝方式快速赋值，缺点就是会把一些无关的属性也一起提交了
  });
}
//删除菜单按钮事件
async function handleDelete(row) {
  Data.action = "delete";
  await postDeptC_U_D({ _id: row._id, action: Data.action });
  ElMessage.success("删除成功");
  getDeptListRequest();
}
</script>
<style lang="less" scoped>
.dept-main {
  height: 100%;
  .dept-top {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .dept-bottom {
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    margin-top: 10px;
    .el-select {
      width: 100%;
    }
    :deep(.el-cascader) {
      width: 100%;
    }
    .dept-bottom-top {
      padding: 20px;
      border-bottom: 1px solid #ececec;
    }
    .dept-bottom-table {
      .pagination {
        padding: 10px;
        text-align: right;
      }
    }
  }
}
</style>
