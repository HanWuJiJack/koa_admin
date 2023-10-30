<template>
  <div class="main">
    <!-- 头部查询功能区域 -->
    <div class="top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="selectData.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-select v-model="selectData.company" placeholder="请选择">
            <el-option v-for="item in local.companyType" :label="item.dictLabel" :value="item.dictValue"
              :key="item._id" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目状态" prop="state">
          <el-select v-model="selectData.state" placeholder="请选择">
            <el-option v-for="item in local.project_status" :label="item.dictLabel" :value="item.dictValue"
              :key="item._id" />
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
        <el-button type="primary" @click="addHandler" v-permisson="'project-create'">新增</el-button>
        <el-button type="danger" @click="handleDelete1(null, 'dels')" v-permisson="'project-deletes'">批量删除</el-button>
      </div>
      <div class="bottom-table">
        <el-table ref="Table" :data="Data" @selection-change="selectHandler">
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- 表字段遍历 -->
          <el-table-column v-for="item in columList" :key="item.id" :prop="item.prop" :label="item.label"
            show-overflow-tooltip :formatter="item.formatter">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="450" fixed="right" align="left">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)" v-permisson="'project-edit'">编辑</el-button>
              <el-button v-show="scope.row.state === '1'" size="small" @click="handleEdit(scope.row, 'communicate')"
                v-permisson="'project-edit'">填写沟通内容</el-button>
              <el-button v-show="scope.row.state === '2'" size="small" @click="handleCreatePrice(scope.row)"
                v-permisson="'project-edit'">创建报价单</el-button>
              <el-button v-show="scope.row.state === '1'" size="small" v-permisson="'project-edit'"
                @click="handleDelete(scope.row, '2')">沟通完成</el-button>
              <el-button v-show="scope.row.state === '4'" size="small" v-permisson="'project-edit'"
                @click="handleDelete(scope.row, '5')">合同签订完成</el-button>
              <el-button v-show="scope.row.state === '5'" size="small" v-permisson="'project-edit'"
                @click="handleDelete(scope.row, '6')">已发货</el-button>
              <el-button v-show="scope.row.state === '6'" size="small" v-permisson="'project-edit'"
                @click="handleDelete(scope.row, '7')">清点商品中</el-button>
              <el-button v-show="scope.row.state === '7'" size="small" v-permisson="'project-edit'"
                @click="handleDelete(scope.row, '8')">清点商品完毕</el-button>
              <!-- <el-button
                v-show="scope.row.state === '7'"
                size="small"
                v-permisson="'project-edit'"
                @click="handleDelete(scope.row, '20')"
                >发票邮寄中</el-button
              > -->
              <el-button v-show="scope.row.state === '19'" size="small" v-permisson="'project-edit'"
                @click="handleDelete(scope.row, '20')">项目完成</el-button>
              <el-button size="small" @click="handleDetail(scope.row)" v-permisson="'project-ditail'">商品清单</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row, '21')"
                v-permisson="'project-delete'">作废</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize" :total="pageData.total"
          class="pagination" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <!-- 新增用户弹窗 -->
      <el-dialog title="新增" v-model="dialogVisible" width="50%">
        <el-generate-form v-if="dialogVisible" ref="generateFormRef" :data="widgetForm" :value="formDataInfo">
        </el-generate-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitHandler">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 新增用户弹窗 -->
      <el-dialog title="沟通内容" v-model="communicatedialogVisible" width="50%">
        <el-generate-form v-if="communicatedialogVisible" ref="generateCommunicateFormRef" :data="widgetCommunicateForm"
          :value="communicateFormDataInfo"></el-generate-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="communicateDialogSubmitHandler">确 定</el-button>
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
  toRaw,
  computed,
  markRaw,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import publicFn from "../../utils/publicFn";
import {
  getProject,
  getProjectList,
  addProject,
  updataProject,
  removeProject,
} from "@/api/syetem/project";
import { getFormCreate } from "@/api/syetem/formCreate";
import { getDictTypes } from "@/api/syetem/dictType";
import { GenerateColumList } from "@/utils/tools";

import { getGoodsAllList } from "@/api/syetem/goods";
import { forIn } from "lodash";
export default {
  name: "dict",
  setup() {
    //---------------------------------变量区域--------------------
    const { proxy } = getCurrentInstance();
    const selectData = reactive({}); //查询功能表单对象
    const router = useRouter();
    const store = useStore();

    // 字典场景code
    const state = reactive({
      generateFormRef: null,
      widgetForm: {
        list: [],
        config: {
          size: "default",
          hideRequiredAsterisk: false,
          labelWidth: 100,
          labelPosition: "right",
        },
      },
      formDataInfo: {},
      generateCommunicateFormRef: null,
      widgetCommunicateForm: {
        list: [],
        config: {
          size: "default",
          hideRequiredAsterisk: false,
          labelWidth: 100,
          labelPosition: "right",
        },
      },
      communicateFormDataInfo: {},
    });
    // 沟通内容弹框
    const communicatedialogVisible = ref(false);
    // 动态表格数据对象
    var Data = ref([]);
    //动态表格字段格式
    const columList = ref([]);
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
    const data_ = reactive({
      data: {
        form: {
          state: "1",
        },
      },
    });
    const local = reactive({
      project_status: [],
      companyType: [],
    });
    //操作类型
    const action = ref("add");
    //---------------------------------生命周期区--------------------
    onMounted(() => {
      getListRequest();
      getGenerateFormConfig();
      getDictTypes("project_status").then((res) => {
        local.project_status = res;
        console.log(res);
      });
      getDictTypes("company-type").then((res) => {
        local.companyType = res;
        console.log(res);
      });
    });
    //---------------------------------方法区--------------------
    //获取用户列表数据
    const getListRequest = async () => {
      const params = { ...selectData, ...pageData };
      try {
        const res = await getProjectList(params);
        Data.value = res.list;
        pageData.total = res.page.total;
      } catch (error) {
        console.log(error);
      }
    };

    // 获取表单配置
    const getGenerateFormConfig = async () => {
      try {
        console.log('store.state.environmentForm', store.state.environmentForm)
        toRaw(store.state.environmentForm).map((item) => {
          if (item.dictLabel === "200001") {
            // console.log("item", item);
            getFormCreate({ code: item.dictValue }).then((res) => {
              state.widgetForm = res.config;
              GenerateColumList(state, columList);
              console.log(" columList", columList);
            });
          }
          if (item.dictLabel === "200002") {
            getFormCreate({ code: item.dictValue }).then((res) => {
              state.widgetCommunicateForm = res.config;
              console.log("item", state.widgetCommunicateForm);
            });
          }
        });
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
    const handleDelete = async (row, state) => {
      await updataProject({ ...row, state });
      getListRequest();
      proxy.$message.success("操作成功");
    };
    const handleDelete1 = async (row, action) => {
      if (action === "del") {
        var res = await removeProject({ ids: row._id });
      } else {
        if (selectArr.value.length > 0) {
          var res = await removeProject({
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
      communicatedialogVisible.value = false;
    };
    //新增用户弹窗确定按钮事件
    const dialogSubmitHandler = async () => {
      state.generateFormRef.getData().then(async (res) => {
        let params = { ...state.formDataInfo, ...res };
        if (action.value == "add") {
          await addProject(params);
          proxy.$message.success("添加信息成功");
        } else {
          await updataProject(params);
          proxy.$message.success("修改信息成功");
        }
        dialogVisible.value = false;
        getListRequest();
      });
    };
    const communicateDialogSubmitHandler = async () => {
      state.generateCommunicateFormRef.getData().then(async (res) => {
        let params = { ...state.communicateFormDataInfo, ...res };
        await updataProject(params);
        proxy.$message.success("修改信息成功");
        communicatedialogVisible.value = false;
        getListRequest();
      });
    };
    //编辑事件
    const handleEdit = (row, type = "edit") => {
      if (type === "edit") {
        state.formDataInfo = row;
        dialogVisible.value = true;
        action.value = "edit";
      }
      if (type === "communicate") {
        state.communicateFormDataInfo = row;
        communicatedialogVisible.value = true;
        proxy.$nextTick(() => {
          // proxy.$forceUpdate();
          if (state.communicateFormDataInfo.communicate) {
            document.getElementsByClassName("w-e-text")[0].innerHTML =
              state.communicateFormDataInfo.communicate;
          }
        });
      }
    };

    // 创建报价单
    const handleCreatePrice = async (row) => {
      const res = await getGoodsAllList({ projectInfo: row._id });
      const errArr = [];
      for (const key in res) {
        if (Object.hasOwnProperty.call(res, key)) {
          if (!res[key].price || !res[key].goodsNumber) {
            errArr.push(res[key]);
          }
        }
      }
      if (errArr.length > 0) {
        proxy.$message.error(
          `请检查您的商品sku为${errArr
            .map((item) => item.sku)
            .join(",")}数据的单价及作品数目是否完善！(注释：最小值为0.01)`
        );
      } else {
        handleDelete(row, "3");
      }
    };
    //添加用户按钮事件
    const addHandler = () => {
      state.formDataInfo = {};
      dialogVisible.value = true;
      action.value = "add";
    };
    const handleDetail = (row) => {
      router.push(`/business/project/goods/${row._id}/${row.company}`);
    };
    return {
      selectData,
      Data,
      columList,
      pageData,
      dialogVisible,
      data_,
      action,
      local,
      communicatedialogVisible,
      ...toRefs(state),
      getListRequest,
      onSearchHandler,
      onResetHandler,
      selectHandler,
      handleDelete,
      handleDelete1,
      dialogCancelHandler,
      dialogSubmitHandler,
      handleEdit,
      addHandler,
      handleCurrentChange,
      handleDetail,
      communicateDialogSubmitHandler,
      handleCreatePrice,
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