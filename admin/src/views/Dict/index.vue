<template>
  <div class="main">
    <!-- 头部查询功能区域 -->
    <div class="top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="selectData.name" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="字典类型" prop="nameCode">
          <el-input v-model="selectData.nameCode" placeholder="请输入字典类型"></el-input>
        </el-form-item>
        <el-form-item label="字典状态" prop="state">
          <el-select v-model="selectData.state" placeholder="请选择">
            <el-option label="正常" :value="1"></el-option>
            <el-option label="停用" :value="2"></el-option>
          </el-select>
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
        <el-button type="primary" @click="addHandler" v-permisson="'system:dict:post'"
          >新增</el-button
        >
      </div>
      <div class="bottom-table">
        <el-table ref="Table" :data="Data" @selection-change="selectHandler">
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
                v-permisson="'system:dict:put'"
                >编辑</el-button
              >
              <el-button
                size="small"
                @click="handleDetail(scope.row)"
                v-permisson="'system:dict:get'"
                >详情</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row, 'del')"
                v-permisson="'system:dict:remove'"
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
      <el-dialog title="新增" v-model="dialogVisible" width="30%">
        <el-form
          :model="form.data.form"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="字典名称" prop="name">
            <el-input
              v-model="form.data.form.name"
              placeholder="请输入字典名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典类型" prop="nameCode">
            <el-input
              v-model="form.data.form.nameCode"
              placeholder="请输入字典类型"
            ></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="state">
            <el-select v-model="form.data.form.state" placeholder="请选择">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="停用" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
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
import { onMounted, reactive, ref, getCurrentInstance, toRefs } from "vue";
import { useRouter } from "vue-router";
import publicFn from "../../utils/publicFn";
import { getDict, getDictList, addDict, updataDict, removeDict } from "@/api/system/dict";
const { proxy } = getCurrentInstance();
const selectData = reactive({
  state: 1,
}); //查询功能表单对象
const router = useRouter();
// router.push('/lowcode/project/codeManagement')
//  console.log(route.query.type); // 第二步

// 动态表格数据对象
var Data = ref([]);
//动态表格字段格式
const columList = reactive([
  {
    prop: "id",
    label: "字典id",
  },
  {
    prop: "name",
    label: "字典名称",
  },
  {
    prop: "nameCode",
    label: "字典类型",
  },

  {
    prop: "state",
    label: "状态",
    formatter(row, col, value) {
      return {
        1: "正常",
        2: "停用",
      }[value];
    },
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
  nameCode: [
    {
      required: true,
      message: "请选择字典类型",
      trigger: "blur",
    },
  ],
});

//操作类型
const action = ref("add");
onMounted(() => {
  getListRequest();
});
//获取用户列表数据
const getListRequest = async () => {
  const params = { ...selectData, ...pageData };
  try {
    const res = await getDictList(params);
    Data.value = res.list;
    pageData.total = res.page.total;
  } catch (error) {
    console.error(error);
  }
};
//查询事件
const onSearchHandler = () => {
  getListRequest();
};
//重置事件
const onResetHandler = (name) => {
  proxy.$refs[name].resetFields();
  getListRequest();
};
//表格选中事件
const selectHandler = (selection, row) => {
  var arr = [];
  selection.map((item) => {
    arr.push(item.id);
  });
  selectArr.value = arr;
};
//删除用户事件
const handleDelete = async (row, action) => {
  if (action === "del") {
    var res = await removeDict(row.id);
  } else {
    if (selectArr.value.length > 0) {
      var res = await removeDict([...selectArr.value].join(","));
    } else {
      proxy.$message.error("您还没选中需要删除的数据");
      return;
    }
  }
  if (res.nModified >= 1) {
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
//取消
const dialogCancelHandler = () => {
  dialogVisible.value = false;
  // form.data.form = { state: 1 };
  onResetHandler("ruleForm");
};
//新增用户弹窗确定按钮事件
const dialogSubmitHandler = () => {
  proxy.$refs["ruleForm"].validate(async (valid) => {
    if (valid) {
      let params = { ...form.data.form };
      params.action = action.value;
      if (params.action === "add") {
        await addDict(params);
        proxy.$message.success("添加信息成功");
      } else {
        await updataDict(params);
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
  });
};
//添加用户按钮事件
const addHandler = () => {
  dialogVisible.value = true;
  action.value = "add";
  form.data.form = {
    state: 1,
  };
};
const handleDetail = (row) => {
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
