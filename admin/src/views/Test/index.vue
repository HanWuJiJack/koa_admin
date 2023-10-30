<script setup>
import exportExcel from "@/utils/exportExcel.js"
import exportWordDocx from "@/utils/exportWordDocx.js"
function exportExcel_() {
  exportExcel({
    datas: [
      {
        dict: [
          {
            key: "第一列",
            val: "name"
          }
          ,
          {
            key: "第二列",
            val: "sex"
          }
        ],
        source: [{ name: '小明', sex: '0' }, { name: '小明2', sex: '1' }]
      }
    ],
    XFileName: Date.now(),
    ZFileName: Date.now() + '.zip',
    // isZip: true
  })
}
function exportWordDocx_() {
  exportWordDocx('test.docx', { str: 1 }, 'test5555.docx')
}
</script>
<template>
  <div class="login-main">
    <el-button type="primary" @click="exportExcel_">导出excel</el-button>
    <el-button type="primary" @click="exportWordDocx_">导出word</el-button>

  </div>
</template>
<style lang="less" scoped>
.login-main {
  background-color: #f8fcff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>