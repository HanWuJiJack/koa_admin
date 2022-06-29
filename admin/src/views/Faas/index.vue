<template>
  <div class="main">
    <!-- 头部查询功能区域 -->
    <div class="top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="函数类型" prop="method">
          <el-input
            v-model="selectData.method"
            placeholder="请输入函数类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="code" prop="code">
          <el-input
            v-model="selectData.code"
            placeholder="请输入code"
          ></el-input>
        </el-form-item>
        <el-form-item label="函数状态" prop="state">
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
        <el-button
          type="primary"
          @click="addHandler"
          v-permisson="'faas-create'"
          >新增</el-button
        >
        <el-button
          type="danger"
          @click="handleDelete(null, 'dels')"
          v-permisson="'faas-deletes'"
          >批量删除</el-button
        >
      </div>
      <div class="bottom-table">
        <el-table ref="Table" :data="Data" @select="selectHandler">
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
          <el-table-column label="操作" width="240" align="center">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row)"
                v-permisson="'faas-edit'"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row, 'del')"
                v-permisson="'faas-delete'"
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
      <el-dialog title="新增" v-model="dialogVisible" width="90%">
        <el-form
          :model="form.data"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="函数类型" prop="method">
            <el-select
              v-model="form.data.method"
              @change="onChangeFaasMethod"
              placeholder="请选择"
            >
              <el-option
                v-for="item in local.FAAS_Method_type"
                :label="item.dictLabel"
                :value="item.dictValue"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="函数类型" prop="method">
            <el-input
              v-model="form.data.method"
              placeholder="请输入函数类型"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="函数code" prop="code">
            <el-input
              v-model="form.data.code"
              placeholder="请输入函数code"
              @change="onChangeFaasCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="请求路径" prop="path">
            <el-input v-model="form.data.path" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="form.data.state" placeholder="请选择">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="停用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要登录" prop="isAuth">
            <el-switch
              v-model="form.data.isAuth"
              style="
                --el-switch-on-color: #ff4949;
                --el-switch-off-color:#13ce66; 
              "
              active-value="2"
              inactive-value="1"
            />
          </el-form-item>

          <Codemirror
            style="font-size: 16px"
            v-model:value="form.data.fn"
            :options="cmOptions"
            border
            placeholder="测试 placeholder"
            :height="500"
            @change="onChange"
            ref="Codemirror"
          />
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitHandler"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
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
import {
  getFaasList,
  addFaas,
  updataFaas,
  removeFaas,
} from "@/api/syetem/faas";
import { getDictTypes } from "@/api/syetem/dictType";
export default {
  name: "faas",
  components: { Codemirror },
  setup() {
    const { proxy } = getCurrentInstance();
    const selectData = reactive({
      state: 1,
    }); //查询功能表单对象
    const router = useRouter();
    // router.push('/lowcode/project/codeManagement')
    //  console.log(route.query.type); // 第二步

    // 动态表格数据对象
    var Data = ref([]);
    // const fn = ref(``);
    const Codemirror = ref(null);
    const local = reactive({
      FAAS_Method_type: [],
    });
    //动态表格字段格式
    const columList = reactive([
      {
        prop: "method",
        label: "函数类型",
      },
      {
        prop: "code",
        label: "函数code",
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
      getDictTypes("FAAS_Method_type").then((res) => {
        local.FAAS_Method_type = res;
        // console.log(res);
      });
    });
    //获取用户列表数据
    const getListRequest = async () => {
      const params = { ...selectData, ...pageData };
      try {
        const res = await getFaasList(params);
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
        var res = await removeFaas(row._id);
      } else {
        if (selectArr.value.length > 0) {
          var res = await removeFaas([...selectArr.value].join(","));
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
            await addFaas(params);
            proxy.$message.success("添加信息成功");
          } else {
            await updataFaas(params);
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
        Object.assign(form.data, row);
      });
    };
    //添加用户按钮事件
    const addHandler = () => {
      dialogVisible.value = true;
      action.value = "add";
      form.data = {};
      // 处理行数问题
      setTimeout(() => {
        Codemirror.value.refresh();
      }, 0);
    };
    const handleDetail = (row) => {
      // console.log(`/system/dictType/${row.id}`);
      // router.push(`/system/dictType/${row.id}`);
    };
    return {
      selectData,
      Data,
      columList,
      pageData,
      dialogVisible,
      form,
      rules,
      action,
      // fn,
      Codemirror,
      local,
      cmOptions: {
        mode: "text/javascript", // 语言模式
        theme: "dracula", // 主题
        lineNumbers: true, // 显示行号
        smartIndent: true, // 智能缩进
        indentUnit: 2, // 智能缩进单位为4个空格长度
        foldGutter: true, // 启用行槽中的代码折叠
        styleActiveLine: true, // 显示选中行的样式
      },
      onChange(val, cm) {
        //  console.log(7878, Codemirror);
        // console.log(val, cm);
        cm.refresh();
      },
      onChangeFaasCode(val, e) {
        if (form.data.method == "list") {
          form.data.path = "/custom/faas/list/" + val;
        } else if (form.data.method == "get") {
          form.data.path = "/custom/faas/" + val + "/:id";
        } else {
          form.data.path = "/custom/faas/" + val;
        }
      },
      onChangeFaasMethod(val, e) {
        if (!form.data.code) {
          return;
        }
        if (val == "list") {
          form.data.path = "/custom/faas/list/" + form.data.code;
        } else if (val == "get") {
          form.data.path = "/custom/faas/" + form.data.code + "/:id";
        } else {
          form.data.path = "/custom/faas/" + form.data.code;
        }
      },
      getListRequest,
      onSearchHandler,
      onResetHandler,
      selectHandler,
      handleDelete,
      dialogCancelHandler,
      dialogSubmitHandler,
      handleEdit,
      addHandler,
      handleCurrentChange,
      handleDetail,
    };
  },
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