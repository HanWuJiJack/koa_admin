<template>
  <div class="main">
    <!-- 头部查询功能区域 -->
    <div class="top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="表单名称" prop="name">
          <el-input v-model="selectData.name" placeholder="请输入表单名称"></el-input>
        </el-form-item>
        <el-form-item label="code" prop="code">
          <el-input v-model="selectData.code" placeholder="请输入code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchHandler">查询</el-button>
          <el-button @click="onResetHandler('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="bottom">
      <div class="bottom-top">
        <el-button type="primary" @click="addHandler" v-permisson="'FormCreate-create'"
          >新增</el-button
        >
        <el-button
          type="danger"
          @click="handleDelete(null, 'dels')"
          v-permisson="'FormCreate-deletes'"
          >批量删除</el-button
        >
      </div>
      <div class="bottom-table">
        <el-table ref="Table" :data="Data" @selection-change="selectHandler">
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- 表字段遍历 -->
          <el-table-column
            v-for="item in columList"
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            show-overflow-tooltip
            :formatter="item.formatter"
          >
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="240" align="left">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row)"
                v-permisson="'FormCreate-edit'"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row, 'del')"
                v-permisson="'FormCreate-delete'"
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
      <!-- 新增 -->
      <el-dialog title="新增" v-model="dialogVisible" width="80%">
        <el-form
          :model="form.data.form"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="表单名称" prop="name">
            <el-input
              v-model="form.data.form.name"
              placeholder="请输入表单名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="code" prop="code">
            <el-input
              v-model="form.data.form.code"
              :disabled="action == 'edit'"
              placeholder="请输入code"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-design-form ref="elDesign" style="height: 500px" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitHandler">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import {
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
  toRefs,
  // useRouter,
} from "vue";
import { useRouter } from "vue-router";
import publicFn from "../../utils/publicFn";

import { ElDesignForm, ElGenerateForm } from "vue-form-create";

import {
  getFormCreate,
  getFormCreateList,
  addFormCreate,
  updataFormCreate,
  removeFormCreate,
} from "@/api/syetem/formCreate";
const { proxy } = getCurrentInstance();
const selectData = reactive({
  state: 1,
}); //查询功能表单对象
const router = useRouter();
const elDesign = ref();
// 动态表格数据对象
var Data = ref([]);
//动态表格字段格式
const columList = reactive([
  {
    prop: "name",
    label: "表单名称",
  },
  {
    prop: "code",
    label: "code",
  },
  {
    prop: "createTime",
    label: "创建时间",
    formatter(row, col, value) {
      return publicFn.formateDate(new Date(value));
    },
  },
]);
// 分页数据对象
var pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
//当前选中的用户数组
const selectArr = ref([]);
//新增用户弹窗显示开关
const dialogVisible = ref(false);
//新增用户表单对象
const form = reactive({
  data: {
    form: {
      state: 1,
    },
  },
});
//表单验证规则
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入名称",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "请输入code",
      trigger: "blur",
    },
  ],
});

//操作类型
const action = ref("add");
onMounted(() => {
  getListRequest();
  // getFormCreate({ id: "62bc040c32a9460c40f773e7" }).then((res) => {
  //   console.log("test", res);
  // });
});
//获取用户列表数据
const getListRequest = async () => {
  const params = { ...selectData, ...pageData };
  try {
    const res = await getFormCreateList(params);
    Data.value = res.list;
    pageData.total = res.page.total;
  } catch (error) {
    console.log(error);
  }
};
//查询事件
const onSearchHandler = () => {
  getListRequest();
};
//重置事件
const onResetHandler = (name) => {
  proxy.$refs[name].resetFields();
};
//表格选中事件
const selectHandler = (selection, row) => {
  var arr = [];
  selection.map((item) => {
    arr.push(item._id);
  });
  selectArr.value = arr;
};
//删除用户事件
const handleDelete = async (row, action) => {
  if (action === "del") {
    var res = await removeFormCreate({ ids: row._id });
  } else {
    if (selectArr.value.length > 0) {
      var res = await removeFormCreate({
        ids: [...selectArr.value].join(","),
      });
    } else {
      proxy.$message.error("您还没选中需要删除的数据");
      return;
    }
  }
  if (res.deletedCount >= 1) {
    proxy.$message.success("删除成功");
    getListRequest();
  } else {
    proxy.$message.error("删除失败");
  }
};

// 分页触发事件
const handleCurrentChange = (current) => {
  pageData.pageNum = current;
  getListRequest();
};
//新增用户弹窗取消按钮事件
const dialogCancelHandler = () => {
  dialogVisible.value = false;
  onResetHandler("ruleForm");
};
//新增用户弹窗确定按钮事件
const dialogSubmitHandler = () => {
  proxy.$refs["ruleForm"].validate(async (valid) => {
    if (valid) {
      form.data.form.config = elDesign.value.getJson();
      let params = { ...form.data.form };
      params.action = action.value;
      if (params.action === "add") {
        await addFormCreate(params);
        proxy.$message.success("添加信息成功");
      } else {
        await updataFormCreate(params);
        proxy.$message.success("修改信息成功");
      }
      dialogVisible.value = false;
      getListRequest();
    } else {
      proxy.$message.error("您填写的信息不符合规则，请重新输入");
      return false;
    }
  });
};
//编辑事件
const handleEdit = (row) => {
  dialogVisible.value = true;
  action.value = "edit";
  proxy.$nextTick(() => {
    Object.assign(form.data.form, row);
    if (row.config) {
      elDesign.value.setJson(row.config);
    }
  });
};
//添加用户按钮事件
const addHandler = () => {
  dialogVisible.value = true;
  action.value = "add";
  form.data.form = { state: 1 };
  if (elDesign.value) {
    // console.log("elDesign.value", elDesign.value);
    elDesign.value.clear();
  }
};
const handleDetail = (row) => {
  // console.log(`/system/dictType/${row.id}`);
  router.push(`/system/dictType/${row.id}`);
};
</script>
<style lang="less" scoped>
.main {
  // background-color: #fff;
  height: 100%;
  .top {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .bottom {
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    margin-top: 10px;
    .el-select {
      width: 100%;
    }
    :deep(.el-cascader) {
      width: 100%;
    }
    .bottom-top {
      padding: 20px;
      border-bottom: 1px solid #ececec;
    }
    .bottom-table {
      .pagination {
        padding: 10px;
        text-align: right;
      }
    }
  }
}
</style>
