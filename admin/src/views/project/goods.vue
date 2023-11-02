<template>
  <div class="main">
    <!-- 头部查询功能区域 -->
    <div class="top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="名称" prop="sly">
          <el-input v-model="selectData.sly" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="商品编码（sku）" prop="sku">
          <el-input
            v-model="selectData.sku"
            placeholder="请输入商品编码（sku）"
          ></el-input>
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
        <el-button type="primary" @click="addHandler" v-permisson="'goods-create'"
          >新增</el-button
        >
        <el-button type="primary" @click="addHandler('goods')" v-permisson="'goods-edit'"
          >上传商品清单</el-button
        >
        <el-button
          type="primary"
          @click="addHandler('express')"
          v-permisson="'goods-edit'"
          >批量更新快递单号</el-button
        >
        <el-button
          type="danger"
          @click="handleDelete(null, 'dels')"
          v-permisson="'goods-deletes'"
          >批量删除</el-button
        >
        <el-button @click="handleEdit(null, 'zip')" v-permisson="'goods-edit'"
          >复制项目压缩包链接</el-button
        >
      </div>
      <div class="bottom-table">
        <el-table ref="Table" :data="Data" @selection-change="selectHandler">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" :index="indexMethod" />
          <!-- 表字段遍历 -->
          <el-table-column
            v-for="item in columList"
            width="180"
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            show-overflow-tooltip
            :formatter="item.formatter"
          >
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="600" fixed="right" align="center">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row)"
                v-permisson="'goods-edit'"
                >编辑</el-button
              >
              <el-button
                size="small"
                @click="handleEdit(scope.row, 'fileMultip')"
                v-permisson="'goods-edit'"
                >文件上传</el-button
              >
              <el-button
                size="small"
                @click="handleEdit(scope.row, 'file')"
                v-permisson="'goods-edit'"
                >文件预览</el-button
              >
              <el-button
                size="small"
                @click="handleEdit(scope.row, 'zip-spu')"
                v-permisson="'goods-edit'"
                >复制spu压缩包链接</el-button
              >
              <el-button
                size="small"
                @click="handleEdit(scope.row, 'zip-sku')"
                v-permisson="'goods-edit'"
                >复制sku压缩包链接</el-button
              >
              <!-- <el-button
                size="small"
                @click="handleDetail(scope.row)"
                v-permisson="'goods-ditail'"
                >详情</el-button
              > -->
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row, 'del')"
                v-permisson="'goods-delete'"
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
      <el-dialog title="新增" v-model="dialogVisible" width="50%">
        <el-generate-form
          v-if="dialogVisible"
          ref="generateFormRef"
          :data="widgetForm"
          :value="formDataInfo"
        ></el-generate-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitHandler">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 上传excle -->
      <el-dialog title="上传商品清单" v-model="xlsxForm.dialogVisible" width="400px">
        <el-upload
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          drag
          :data="initData"
          :before-upload="beforeAvatarUpload"
          :action="xlsxForm.url"
          :limit="1"
          :on-success="afterAvatarUpload"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽到这里或 <em>点击</em></div>
          <template #tip>
            <div class="el-upload__tip">请上传小于2MB的xlsx文件</div>
          </template>
        </el-upload>
      </el-dialog>
      <!-- 单文件上传文件 -->
      <el-dialog title="上传作品" v-model="goodsFileForm.dialogVisible" width="80%">
        <el-upload
          accept="image/*"
          :action="goodsFileForm.url"
          :data="{ _id: formDataInfo._id }"
          v-model:file-list="goodsFileForm.fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleGoodsRemove"
          :on-success="afterAvatarGoodsUpload"
          :before-upload="beforeAvatarUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-dialog>
      <!--  多文件上传文件-->
      <el-dialog
        title="上传作品"
        v-model="goodsFileForm.dialogMultipleVisible"
        width="400px"
      >
        <el-upload
          accept="image/*"
          drag
          :action="goodsFileForm.url"
          :data="{ _id: formDataInfo._id }"
          v-model:file-list="goodsFileForm.fileList"
          multiple
          :before-upload="beforeAvatarUpload"
          :on-change="afterAvatarGoodsUpload_"
          :on-remove="handleGoodsRemove"
          class="upload-multip"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽到此处 <em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">文件size小于3MB</div>
          </template>
        </el-upload>
      </el-dialog>
      <!-- 预览 -->
      <el-dialog v-model="goodsFileForm.dialogPreviewVisible" fullscreen>
        <img
          style="display: block"
          w-full
          :src="goodsFileForm.dialogImageUrl"
          alt="Preview Image"
        />
      </el-dialog>
      <!-- 更新快递单号 -->
      <el-dialog title="批量更新单号" v-model="expressForm.dialogVisible" width="400px">
        <el-form
          :model="expressForm.data"
          :rules="expressForm.rules"
          ref="expressFormRef"
          label-width="100px"
        >
          <el-form-item label="快递单号" prop="express">
            <el-input
              v-model="expressForm.data.express"
              placeholder="请输入快递单号"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handleupdatas">确 定</el-button>
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
  toRaw,
  computed,
  markRaw,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import publicFn from "../../utils/publicFn";

import {
  getGoods,
  getGoodsList,
  addGoods,
  updataGoods,
  removeGoods,
  updataGoodsexpress,
} from "@/api/system/goods";
import { removeFiles, getZip } from "@/api/system/files";
import { getFormCreate } from "@/api/system/formCreate";
import { getDictTypes } from "@/api/system/dictType";
import { GenerateColumList, handCopyText } from "@/utils/tools";
import config from "../../config/index";
import { forIn } from "lodash";
//---------------------------------变量区域--------------------
const { proxy } = getCurrentInstance();
const goodsFileForm = reactive({
  dialogVisible: false,
  dialogMultipleVisible: false,
  url: `${config.baseUrl}api/goods/file`,
  fileList: [],
  dialogPreviewVisible: false,
  dialogImageUrl: "",
}); //

const xlsxForm = reactive({
  dialogVisible: false,
  url: `${config.baseUrl}api/excel/file`,
  // url: `/api/excel/file`,
}); //
const expressForm = reactive({
  dialogVisible: false,
  data: {},
  rules: {},
}); //
const expressFormRef = ref();
const selectData = reactive({
  state: "1",
}); //查询功能表单对象
const initData = reactive({
  company: "",
  projectInfo: "",
}); //查询功能表单对象
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
});
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
});
//操作类型
const action = ref("add");
//---------------------------------生命周期区--------------------
onMounted(() => {
  initData.projectInfo = router.currentRoute._value.params.projectId;
  initData.company = router.currentRoute._value.params.company;
  selectData.projectInfo = initData.projectInfo;
  getListRequest();
  getGenerateFormConfig();
  getDictTypes("project_status").then((res) => {
    local.project_status = res;
    // console.log(res);
  });
});
//---------------------------------方法区--------------------
const indexMethod = (index) => {
  return index + (pageData.pageNum - 1) * pageData.pageSize + 1;
};
//获取用户列表数据
const getListRequest = async () => {
  const params = { ...selectData, ...pageData };
  try {
    const res = await getGoodsList(params);
    Data.value = res.list;
    pageData.total = res.page.total;
  } catch (error) {
    console.log(error);
  }
};
const getGenerateFormConfig = async () => {
  try {
    toRaw(store.state.environmentForm).map((item) => {
      if (item.dictLabel === "200003") {
        getFormCreate({ code: item.dictValue })
          .then((res) => {
            state.widgetForm = res.config;
            return GenerateColumList(state, columList);
          })
          .then((res) => {
            // console.log(state.widgetForm.list[4].options.remoteOptions);
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
  console.log("selection", selection);
  var arr = [];
  selection.map((item) => {
    arr.push(item._id);
  });
  selectArr.value = arr;
};
//删除用户事件
const handleDelete = async (row, action) => {
  if (action === "del") {
    var res = await removeGoods({ ids: row._id });
  } else {
    if (selectArr.value.length > 0) {
      var res = await removeGoods({
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

//更新快递单号
const handleupdatas = async () => {
  if (selectArr.value.length > 0) {
    var res = await updataGoodsexpress({
      ids: [...selectArr.value].join(","),
      ...expressForm.data,
    });
  } else {
    proxy.$message.error("您还没选中需要更新的数据");
    return;
  }
  if (res.nModified >= 1) {
    proxy.$message.success("更新成功" + res.nModified + "条数据");
    getListRequest();
  } else {
    proxy.$message.error("更新失败");
  }
  expressForm.dialogVisible = false;
  expressForm.data = {};
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
//新增弹窗确定按钮事件
const dialogSubmitHandler = async () => {
  state.generateFormRef.getData().then(async (res) => {
    let params = { ...state.formDataInfo, ...res };
    if (action.value == "add") {
      await addGoods({ ...initData, ...params });
      proxy.$message.success("添加信息成功");
    } else {
      await updataGoods(params);
      proxy.$message.success("修改信息成功");
    }
    dialogVisible.value = false;
    getListRequest();
  });
};
//编辑事件
const handleEdit = async (row, type) => {
  action.value = "edit";
  state.formDataInfo = row;
  if (type === "file") {
    goodsFileForm.fileList = [...row.fileList] || [];
    goodsFileForm.dialogVisible = true;
  } else if (type === "fileMultip") {
    goodsFileForm.dialogMultipleVisible = true;
    goodsFileForm.fileList = [...row.fileList] || [];
  } else if (type === "zip") {
    const zipInfo = await getZip({
      projectInfo: initData.projectInfo,
      zipType: "zip",
    });
    await handCopyText(zipInfo.url);
    proxy.$message.success("复制成功");
  } else if (type === "zip-spu") {
    const zipInfo = await getZip({ ...row, zipType: "zip-spu" });
    await handCopyText(zipInfo.url);
    proxy.$message.success("复制成功");
    console.log("zipInfo", zipInfo);
  } else if (type === "zip-sku") {
    const zipInfo = await getZip({ ...row, zipType: "zip-sku" });
    await handCopyText(zipInfo.url);
    proxy.$message.success("复制成功");
    console.log("zipInfo", zipInfo);
  } else {
    dialogVisible.value = true;
  }
};
//添加用户按钮事件
const addHandler = (type) => {
  if (type === "goods") {
    xlsxForm.dialogVisible = true;
  } else if (type === "express") {
    expressForm.dialogVisible = true;
  } else {
    state.formDataInfo = {};
    dialogVisible.value = true;
    action.value = "add";
  }
};
const handleDetail = (row) => {
  router.push(`/system/dictType/${row.id}`);
};
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 3) {
    proxy.$message.error("文件大于3MB!");
    return false;
  }
  return true;
};
const afterAvatarUpload = () => {
  getListRequest();
  xlsxForm.dialogVisible = false;
};
//
const handlePictureCardPreview = async (uploadFile) => {
  goodsFileForm.dialogImageUrl = uploadFile.url;
  goodsFileForm.dialogPreviewVisible = true;
};
const handleGoodsRemove = async (uploadFile, uploadFiles) => {
  let params = {
    ...state.formDataInfo,
  };
  params.fileList = [...uploadFiles];
  const info = await updataGoods(params);
  state.formDataInfo.fileList = [...info.fileList];
  goodsFileForm.fileList = [...info.fileList];
  await removeFiles({ url: uploadFile.url });
};
const afterAvatarGoodsUpload_ = async (uploadFile, uploadFiles) => {
  const uploadFile_ = JSON.parse(JSON.stringify(uploadFile));
  const uploadFiles_ = JSON.parse(JSON.stringify(uploadFiles)).filter((item) => {
    return item.size;
  });
  if (uploadFiles_.every((item) => item.response)) {
    let errArr = [];
    let sucArr = [];
    // console.log("uploadFiles777_=>", uploadFile_, uploadFiles_);
    uploadFiles_.forEach((el) => {
      if (el.response) {
        if (el.response.code == 200) {
          sucArr.push(el.response.data);
        } else {
          errArr.push({ name: el.name });
        }
      }
    });
    const goodInfo = await getGoods({ id: state.formDataInfo._id });
    if (!goodInfo.fileList) {
      goodInfo.fileList = [];
    }

    let params = {
      ...state.formDataInfo,
    };
    params.fileList = [...goodInfo.fileList, ...sucArr];
    const info = await updataGoods(params);
    state.formDataInfo.fileList = [...info.fileList];
    goodsFileForm.fileList = [...info.fileList];
    proxy.$message.info(`上传成功：${sucArr.length}\n上传失败：${errArr.length}`);
  }
};

const afterAvatarGoodsUpload = async (res) => {
  if (res.code !== 200) {
    return;
  }
  const goodInfo = await getGoods({ id: state.formDataInfo._id });
  // console.log("goodInfo", goodInfo);
  if (!goodInfo.fileList) {
    goodInfo.fileList = [];
  }

  let params = {
    ...state.formDataInfo,
  };
  params.fileList = goodInfo.fileList;
  params.fileList.push(res.data);
  // console.log("params=>", params);
  const info = await updataGoods(params);
  state.formDataInfo.fileList = [...info.fileList];
  goodsFileForm.fileList = [...info.fileList];
};
</script>
<style></style>
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
