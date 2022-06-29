<template>
  <template v-for="item in menuList" :key="item._id">
    <el-sub-menu
      :index="item.path"
      v-if="
        item.children &&
        item.children.length > 0 &&
        item.children[0].menuType == 1
      "
    >
      <template #title>
        <el-icon :size="16" color="#333">
          <component v-bind:is="item.icon"></component>
        </el-icon>
        <i :class="item.icon"></i>
        <span>{{ item.menuName }}</span>
      </template>
      <!-- 递归组件，再次循环判断子菜单 -->
      <MenuTree :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <el-icon :size="16" color="#333">
        <component v-bind:is="item.icon"></component>
      </el-icon>
      <template #title>{{ item.menuName }}</template>
    </el-menu-item>
  </template>
</template>
<script>
export default {
  name: "MenuTree",
  props: {
    menuList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>