<template>
  <div class="main">
    <!-- 头部查询功能区域 -->
    <div class="top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="数据库模型名称" prop="name">
          <el-input v-model="selectData.name" placeholder="请输入数据库模型名称"></el-input>
        </el-form-item>
        <el-form-item label="接口状态" prop="state">
          <el-select v-model="selectData.state" placeholder="请选择接口状态">
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
        <el-button type="primary" @click="addHandler" v-permisson="'model-create'"
          >新增</el-button
        >
        <el-button
          type="danger"
          @click="handleDelete(null, 'dels')"
          v-permisson="'model-deletes'"
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
                v-permisson="'model-edit'"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row, 'del')"
                v-permisson="'model-delete'"
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
      <el-dialog title="新增" v-model="dialogVisible" fullscreen>
        <el-form :model="form.data" :rules="rules" ref="ruleForm" label-width="200px">
          <el-form-item label="数据库模型名称" prop="name">
            <el-input
              v-model="form.data.name"
              placeholder="请输入数据库模型名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="form.data.state" placeholder="请选择">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="停用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <Codemirror
            style="font-size: 16px"
            v-model:value="form.data.func"
            :options="cmOptions"
            border
            placeholder="测试 placeholder"
            :height="500"
            @change="onChange"
            ref="CodemirrorRef"
          />
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
import Codemirror from "codemirror-editor-vue3";
// language
import "codemirror/mode/javascript/javascript.js";
// theme
import "codemirror/theme/dracula.css";
import { getModelList, addModel, updataModel, removeModel } from "@/api/faas/model.js";
import { getDictTypes } from "@/api/system/dictType";
const { proxy } = getCurrentInstance();
const selectData = reactive({
  state: 1,
}); //查询功能表单对象
const router = useRouter();

const cmOptions = {
  mode: "text/javascript", // 语言模式
  theme: "dracula", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
  foldGutter: true, // 启用行槽中的代码折叠
  styleActiveLine: true, // 显示选中行的样式
};
// 动态表格数据对象
var Data = ref([]);

const CodemirrorRef = ref(null);

//动态表格字段格式
const columList = reactive([
  {
    prop: "name",
    label: "模型名称",
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
let form = reactive({ data: { state: 1 } });
//表单验证规则
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入模型名称",
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
    const res = await getModelList(params);
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
    arr.push(item.id);
  });
  selectArr.value = arr;
};
//删除用户事件
const handleDelete = async (row, action) => {
  if (action === "del") {
    var res = await removeModel({ids:row.id});
  } else {
    if (selectArr.value.length > 0) {
      var res = await removeModel({ids:[...selectArr.value].join(",")});
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
      let params = { ...form.data };
      params.action = action.value;
      if (params.action === "add") {
        await addModel(params);
        proxy.$message.success("添加信息成功");
      } else {
        await updataModel(params);
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
  form.data = {};
  proxy.$nextTick(() => {
    Object.assign(form.data, row);
  });
};
//添加用户按钮事件
const addHandler = () => {
  dialogVisible.value = true;
  action.value = "add";
  form.data = { state: 1 };
  // 处理行数问题
  setTimeout(() => {
    CodemirrorRef.value.refresh();
  }, 0);
};
const onChange = (val, cm) => {
  cm.refresh();
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
