<template>
  <div class="menu-main">
    <!-- 头部查询功能区域 -->
    <div class="menu-top">
      <el-form :inline="true" :model="Data.selectData" ref="selectFormRef">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="Data.selectData.menuName"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="Data.selectData.menuState" placeholder="请选择">
            <el-option label="正常" :value="1"></el-option>
            <el-option label="停用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryHandler">查询</el-button>
          <el-button @click="onResetHandler">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="menu-bottom">
      <div class="menu-bottom-top">
        <el-button type="primary" @click="addMenuHandler(1)" v-permisson="'menu-create'"
          >新增菜单</el-button
        >
      </div>
      <el-table
        :data="Data.menuListData"
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
              @click="addMenuHandler(2, scope.row)"
              type="primary"
              v-permisson="'menu-create'"
              >添加</el-button
            >
            <el-button
              size="small"
              @click="handleEdit(scope.row)"
              v-permisson="'menu-edit'"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              v-permisson="'menu-delete'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加菜单"
      v-model="Data.dialogVisible"
      width="35%"
      :close-on-click-modal="false"
      @close="closeHandler"
    >
      <el-form
        :model="Data.menuForm"
        :rules="Data.rules"
        ref="menuRuleFormRef"
        label-width="100px"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            :options="Data.menuListData"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
            v-model="Data.menuForm.parentId"
            placeholder="请选择"
          >
          </el-cascader>
          <span style="color: #999; margin-left: 10px">如果不选创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="Data.menuForm.menuType" @input="menuTypeChange">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
            <el-radio :label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="menuName">
          <el-input v-model="Data.menuForm.menuName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="menuCode" v-if="Data.menuForm.menuType == 3">
          <el-input
            v-model="Data.menuForm.menuCode"
            placeholder="请输入唯一标识"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" prop="path" v-if="Data.menuForm.menuType != 3">
          <el-input v-model="Data.menuForm.path" placeholder="请输入菜单路由"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-if="Data.menuForm.menuType != 3">
          <el-input
            v-model="Data.menuForm.icon"
            placeholder="请输入图标(element-ui的图标库)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-if="Data.menuForm.menuType != 3"
        >
          <el-input
            v-model="Data.menuForm.component"
            placeholder="请输入组件路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="code" prop="code" v-if="Data.menuForm.menuType != 3">
          <el-input v-model="Data.menuForm.code" placeholder="请输入code"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="menuState" v-if="Data.menuForm.menuType != 3">
          <el-radio-group v-model="Data.menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示" prop="isShow" v-if="Data.menuForm.menuType != 3">
          <el-radio-group v-model="Data.menuForm.isShow">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="2">隐藏</el-radio>
          </el-radio-group>
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
import { postMenuList, postMenuC_U_D } from "@/api/system/menu";
import { getPermissonMenuList } from "@/api/system/menu";
import { getPermissonMenuList_ } from "@/router/index";
import { ElMessage } from "element-plus";
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
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const selectFormRef = ref(null);
const menuRuleFormRef = ref(null);

const Data = reactive({
  //查询数据对象
  selectData: {
    menuState: 1,
  },
  //动态表格字段
  tablePros: [
    {
      props: "menuName",
      label: "菜单名称",
    },
    {
      props: "icon",
      label: "图标",
    },
    {
      props: "menuType",
      label: "菜单类型",
      formatter(row, col, value) {
        return {
          1: "目录",
          2: "菜单",
          3: "按钮",
        }[value];
      },
    },
    {
      props: "menuCode",
      label: "权限标识",
    },
    {
      props: "path",
      label: "路由地址",
    },
    {
      props: "component",
      label: "组件路径",
    },
    {
      props: "menuState",
      label: "菜单状态",
      formatter(row, col, value) {
        return {
          1: "正常",
          2: "暂停",
        }[value];
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
  menuListData: [], //菜单列表数据
  dialogVisible: false, //添加菜单弹窗控制
  //添加菜单表单数据
  menuForm: {
    menuType: 1,
    menuState: 1,
    isShow: 1,
    parentId: [null],
  },
  //表单验证规则
  rules: {
    menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
    code: [{ required: true, message: "请输入code", trigger: "blur" }],
    component: [{ required: true, message: "请输入组件路径", trigger: "blur" }],
    path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
    menuCode: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
  },
  action: "create",
});
onMounted(() => {
  getMenuListRequest();
});
//重置表单事件
function onResetHandler() {
  selectFormRef._value.resetFields();
  getMenuListRequest();
}
const menuTypeChange = () => {
  Data.menuForm = {
    ...Data.menuForm,
    menuName: "", //菜单名称
    menuCode: "", //权限标识
    path: "", //路由地址
    icon: "", //图标
    component: "", //组件地址
    code: "", //code
    menuState: 1,
    isShow: 1,
  };
};
//获取菜单列表
async function getMenuListRequest() {
  try {
    const res = await postMenuList({ ...Data.selectData });
    Data.menuListData = res;
  } catch (error) {
    ElMessage.error(error.stack);
  }
}
//添加-修改-删除请求
async function postMenuC_U_DRequest() {
  try {
    if (Data.menuForm.parentId === null) {
      Data.menuForm.parentId = [null];
    }
    await postMenuC_U_D({
      ...Data.menuForm,
      action: Data.action,
    });
    if (Data.action === "create") {
      ElMessage.success("创建菜单成功！");
      menuRuleFormRef._value.resetFields();
    } else if (Data.action === "edit") {
      ElMessage.success("编辑菜单成功！");
      menuRuleFormRef._value.resetFields();
    } else if (Data.action === "delete") {
      ElMessage.success("删除菜单成功！");
    }
    getMenuListRequest();
    await getPermissonMenuList_();
    Data.dialogVisible = false;
  } catch (error) {
    ElMessage.error(error.stack);
    return Promise.reject(error.stack);
  }
}
//查询按钮事件
function onQueryHandler() {
  getMenuListRequest();
}
//添加菜单按钮事件
function addMenuHandler(type, row) {
  Data.dialogVisible = true;
  Data.menuForm = {
    menuType: 1,
    menuState: 1,
    isShow: 1,
    parentId: [null],
  };
  if (type === 1) {
    Data.action = "create";
  } else {
    //每行的添加按钮
    nextTick(() => {
      Data.menuForm.parentId = [...row.parentId, row._id].filter((item) => item);
      Data.menuForm.menuType = 1;
    });
  }
}
//弹窗确定按钮事件
function onSubmitHandler() {
  menuRuleFormRef._value.validate((valid) => {
    if (valid) {
      postMenuC_U_DRequest();
    } else {
      ElMessage.error("请填写完整再进行提交");
      return false;
    }
  });
}
//弹窗取消按钮事件
function onCancelHandler() {
  menuRuleFormRef._value.resetFields();
  Data.action = "create";
  Data.dialogVisible = false;
}
//弹窗X按钮事件
function closeHandler() {
  onCancelHandler();
  Data.action = "create";
}
//编辑按钮事件
function handleEdit(row) {
  Data.action = "edit";
  Data.dialogVisible = true;
  nextTick(() => {
    Object.assign(Data.menuForm, row); //利用浅拷贝方式快速赋值，缺点就是会把一些无关的属性也一起提交了
  });
}
//删除菜单按钮事件
async function handleDelete(row) {
  Data.action = "delete";
  await postMenuC_U_D({ _id: row._id, action: Data.action });
  ElMessage.success("删除成功");
  getMenuListRequest();
}
</script>
<style lang="less" scoped>
.menu-main {
  height: 100%;
  .menu-top {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .menu-bottom {
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    margin-top: 10px;
    .el-select {
      width: 100%;
    }
    :deep(.el-cascader) {
      width: 100%;
    }
    .menu-bottom-top {
      padding: 20px;
      border-bottom: 1px solid #ececec;
    }
    .menu-bottom-table {
      .pagination {
        padding: 10px;
        text-align: right;
      }
    }
  }
}
</style>
