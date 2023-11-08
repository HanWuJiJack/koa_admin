<template>
  <div class="roles-main">
    <!-- 头部查询功能区域 -->
    <div class="roles-top">
      <el-form :inline="true" :model="Data.formData" ref="formDataRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="Data.formData.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchHandler">查询</el-button>
          <el-button @click="onResetHandler">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="roles-bottom">
      <div class="roles-bottom-top">
        <el-button type="primary" @click="createHandler" v-permisson="'system:role:post'"
          >创建角色</el-button
        >
        <!-- <el-button type="primary" @click="createHandler">创建角色</el-button> -->
      </div>
      <div class="roles-bottom-table">
        <el-table ref="rolesTableRef" :data="Data.rolesData">
          <!-- 表字段遍历 -->
          <el-table-column
            v-for="item in Data.columList"
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            show-overflow-tooltip
            :formatter="item.formatter"
          >
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="260" align="left">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row)"
                v-permisson="'system:role:put'"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="primary"
                @click="handlerSetPermission(scope.row)"
                v-permisson="'system:role:put'"
                >设置权限</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row, 'delete')"
                v-permisson="'system:role:remove'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="Data.pageData.pageSize"
          :total="Data.pageData.total"
          class="pagination"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- 新增弹窗 -->
      <el-dialog title="新增角色" v-model="Data.addShow" width="35%">
        <el-form
          :model="Data.addForm"
          :rules="Data.rules"
          ref="addFormRef"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="Data.addForm.roleName"
              placeholder="请输入用户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              :row="2"
              v-model="Data.addForm.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitHandler">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 设置权限弹窗 -->
      <el-dialog title="设置权限" v-model="Data.permissionShow" width="35%">
        <el-form :model="Data.permissionForm" ref="permissionFormRef" label-width="100px">
          <el-form-item label="角色名称">
            {{ Data.permissionForm.currentRoleName }}
          </el-form-item>
          <el-form-item label="选择权限">
            <el-tree
              :data="Data.menuList"
              show-checkbox
              node-key="id"
              ref="menuTreeRef"
              accordion
              :props="{ label: 'menuName' }"
            >
            </el-tree>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="Data.permissionShow = false">取 消</el-button>
            <el-button type="primary" @click="perssionSubmitHandler">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import publicFn from "../../utils/publicFn";
import { postMenuList } from "@/api/system/menu";
import {
  getRolesList,
  postRoles,
  putRoles,
  deleteRoles,
  postUpdatePermission,
} from "@/api/system/roles";
import { onMounted, reactive, ref, getCurrentInstance, toRefs, nextTick } from "vue";
import { ElMessage } from "element-plus";
const formDataRef = ref(null);
const menuTreeRef = ref(null);
const permissionFormRef = ref(null);
const addFormRef = ref(null);
const rolesTableRef = ref(null);

const Data = reactive({
  // 查询表单数据
  formData: {
    roleName: "",
  },
  // 分页数据
  pageData: {
    total: 0,
    pageSize: 10,
    pageNum: 1,
  },
  // 表格数据
  rolesData: [],
  // 表格列项
  columList: [
    {
      prop: "roleName",
      label: "角色名称",
    },
    {
      prop: "remark",
      label: "备注",
    },
    {
      prop: "permissionList",
      label: "权限列表",
      formatter: (row, col, value) => {
        const resultArr = [];
        value.halfCheckedKeys.forEach((item) => {
          if (Data.menuNameMapping[item]) {
            resultArr.push(Data.menuNameMapping[item]);
          }
        });
        return resultArr.join(",");
      },
    },
    {
      prop: "createTime",
      label: "创建时间",
      formatter(row, col, value) {
        return publicFn.formateDate(new Date(value));
      },
    },
  ],
  addShow: false, // 创建角色弹出显示开关
  // 添加角色表单数据
  addForm: {},
  // 验证规则
  rules: {
    roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  },
  // 行为
  action: "",
  permissionShow: false, // 权限设置弹窗显示开关
  // 设置权限表单
  permissionForm: {
    currentRoleName: "",
    currentRoleId: "",
  },
  // 菜单列表数据
  menuList: [],
  // 菜单名称名映射表
  menuNameMapping: {},
});

onMounted(() => {
  getRolesList_();
  getMenuList();
});
//重置表单事件
function onResetHandler() {
  formDataRef._value.resetFields();
  getRolesList_();
}
// 获取角色列表数据
const getRolesList_ = async () => {
  const params = {
    ...Data.formData,
    ...Data.pageData,
  };
  const res = await getRolesList(params);
  Data.rolesData = res.list;
  Data.pageData.total = res.page.total;
};

// 获取菜单列表数据
const getMenuList = async () => {
  const res = await postMenuList();
  Data.menuList = res;
  Data.menuNameMapping = permissionMapping(res);
};
// 查询按钮事件
const onSearchHandler = () => {
  getRolesList_();
};
// 分页触发事件
const handleCurrentChange = (current) => {
  Data.pageData.pageNum = current;
  getRolesList_();
};
// 创建角色按钮事件
const createHandler = () => {
  Data.addShow = true;
  Data.action = "create";
  Data.addForm = {};
};
// 重置表单
const resetForm = () => {
  Data.addForm = {};
};
// 弹出取消按钮事件
const dialogCancelHandler = () => {
  resetForm();
  Data.addShow = false;
};
// 弹出确定按钮事件
const dialogSubmitHandler = () => {
  // console.log("addFormRef", addFormRef);
  addFormRef._value.validate(async (vaild) => {
    if (vaild) {
      let params = {
        ...Data.addForm,
        action: Data.action,
      };
      let res
      if (Data.action === "create") {
        res = await postRoles(params);
      } else if (Data.action === "edit") {
        res = await putRoles(params);
      }
      if (Data.action === "create") {
        ElMessage.success("新增角色成功");
      } else if (Data.action === "edit") {
        ElMessage.success("编辑角色成功");
      }
      Data.addShow = false;
      resetForm();
      getRolesList_();
    } else {
      ElMessage.error("请填写完成信息再进行提交");
      return false;
    }
  });
};
// 表格每行编辑按钮事件
const handleEdit = (row) => {
  Data.addForm = {};
  Data.action = "edit";
  Object.assign(Data.addForm, row);
  Data.addShow = true;
};
// 表格每行删除按钮事件
const handleDelete = async (row, action) => {
  const res = await deleteRoles({ id: row.id, action });
  if (res.nModified > 0) {
    ElMessage.success("删除角色成功");
  }
  getRolesList_();
};
// 表格每行设置权限按钮事件
const handlerSetPermission = (row) => {
  Data.permissionShow = true;
  Data.action = "edit";
  Data.permissionForm.currentRoleName = row.roleName;
  Data.permissionForm.currentRoleId = row.id;
  nextTick(() => {
    menuTreeRef._value.setCheckedKeys(row.permissionList.checkedKeys);
  });
};
// 设置权限弹窗确定按钮事件
const perssionSubmitHandler = async () => {
  const checkedNode = menuTreeRef._value.getCheckedNodes(); // 获取选中节点的node集合
  const halfCheckedKeys = menuTreeRef._value.getHalfCheckedKeys(); // 获取真正半选中状态的节点key
  const checkedKeys = []; // 选中的子菜单-也就是最后一个层级的节点，
  // 半选中状态节点-这里的半选中状态其实是虚拟的，人为把他当做半选中，因为elementUI的树控件只要最后一个层级节点都被选中了
  // 那么父节点自动就全选状态了
  const parentCheckedKeys = [];
  checkedNode.forEach((item) => {
    if (!item.children) {
      checkedKeys.push(item.id);
    } else {
      parentCheckedKeys.push(item.id);
    }
  });
  const params = {
    id: Data.permissionForm.currentRoleId,
    permissionList: {
      checkedKeys,
      // 这里concat是因为上面把有子节点的节点当做为半选状态了，用于后面假如有新子节点添加可以直接认为他就是半选状态
      // 所以要把那些被当做是半选状态实际上已经是全选状态的节点跟获取出来的半选状态节点合到一起
      halfCheckedKeys: parentCheckedKeys.concat(halfCheckedKeys),
    },
  };
  const res = await postUpdatePermission(params);
  // console.log(res);
  if (res.nModified > 0) {
    ElMessage.success("设置权限成功");
  }
  Data.permissionShow = false;
  getRolesList_();
  getMenuList();
};
// 权限列表id映射对应菜单名称处理
const permissionMapping = (list) => {
  var result = {};
  for (var i = 0; i < list.length; i++) {
    if (list[i].children && list[i].btnList) {
      // 如果btnList存在 那就证明他是最后一个层级的父节点了
      result[list[i].id] = list[i].menuName;
    } else if (list[i].children && !list[i].btnList) {
      result = { ...result, ...permissionMapping(list[i].children) };
    }
  }
  return result;
};
</script>

<style lang="less" scoped>
.roles-main {
  // background-color: #fff;
  height: 100%;
  .roles-top {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .roles-bottom {
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    margin-top: 10px;
    .el-select {
      width: 100%;
    }
    :deep(.el-cascader) {
      width: 100%;
    }
    .roles-bottom-top {
      padding: 20px;
      border-bottom: 1px solid #ececec;
    }
    .roles-bottom-table {
      .pagination {
        padding: 10px;
        text-align: right;
      }
    }
  }
}
</style>
