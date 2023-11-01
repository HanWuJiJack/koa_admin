<template>
  <template v-for="item in props.menuList" :key="item._id">
    <el-sub-menu
      :index="item.code"
      v-if="item.children && item.children.length > 0 && item.menuType == 1"
    >
      <template #title>
        <el-icon :size="16" color="#333" v-if="item.icon">
          <component v-bind:is="item.icon"></component>
        </el-icon>
        <span>{{ item.menuName }}</span>
      </template>
      <!-- 递归组件，再次循环判断子菜单 -->
      <MenuTree :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.code" v-if="item.menuType == 2">
      <el-icon :size="16" color="#333" v-if="item.icon">
        <component v-bind:is="item.icon"></component>
      </el-icon>
      <template #title>{{ item.menuName }}</template>
    </el-menu-item>
  </template>
</template>
<script>
export default {
  name: "MenuTree",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { computed, defineProps, onMounted, onBeforeUpdate } from "vue";
const props = defineProps({
  menuList: {
    type: Array,
    default: [],
    // required: false, // 是否必传
  },
});
</script>
