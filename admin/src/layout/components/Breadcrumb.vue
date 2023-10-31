<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in breadData" :key="item.path">
      <router-link :to="item.path" v-if="index == 0">{{ item.meta.name }}</router-link>
      <span v-else>{{ item.meta.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "Breadcrumb",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { useRoute, } from "vue-router";
import { computed } from 'vue'

const route = useRoute();
let breadData = computed(() => {
  if (route.matched[1].path === "/welcome") {
    return [route.matched[0]];
  }
  return route.matched;
});
</script>
