<template>
  <div class="home-main clearfix">
    <div class="nav-left" :class="data.isCollapse ? 'fold-menu' : ''">
      <!-- logo -->
      <div class="nav-left-logo" v-show="!data.isCollapse">
        <span>综合管理系统</span>
      </div>
      <!-- 菜单 -->
      <!-- router -->
      <el-menu
        :default-active="data.activeIndex"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="data.isCollapse"
        :unique-opened="true"
        @select="handleSelect"
        ref="menuRef"
      >
        <MenuTree :menuList="menuList" />
      </el-menu>
    </div>

    <div class="content-right" :class="data.isCollapse ? 'fold-content' : ''">
      <div class="top-bar">
        <!-- 面包屑 -->
        <div class="bar-left">
          <i class="collapse-i" @click="toggleMenue">
            <Expand v-show="data.isCollapse" />
            <Fold v-show="!data.isCollapse" />
          </i>
          <div class="bread">
            <Breadcrumb />
          </div>
        </div>
        <!-- 用户信息 -->
        <div class="top-userinfo">
          <el-dropdown @command="dropMenuHandler">
            <span class="userinfo-name">{{ data.userInfo.userName }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="emain"
                  >邮箱：{{ data.userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="userMain" @click="router.push('/system/mine')"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 路由显示区域 -->
      <div class="router-wrapper clearfix">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { computed, onMounted, ref, reactive, watch } from "vue";
import MenuTree from "./components/MenuTree.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import publicFn from "../utils/publicFn";
import _ from "lodash";
import { getApproveCount } from "@/api/system/approve";
import { getDictTypes } from "@/api/system/dictType";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const router = useRouter();
const store = new useStore();

const menuRef = ref(null);

const data = reactive({
  activeIndex: "",
  isCollapse: false, // 菜单是否折叠
  userInfo: store.state.userInfo, // 用户信息
});
onMounted(() => {
  // menuRef._value.handleResize()
  // console.log("menuRef",menuRef._)
  getApproveCountRequest();
  getDictTypes("environment_form").then((res) => {
    store.commit("SET_ENVIRONMENT_FORM", res);
  });
  // data.activeIndex = route.meta.code;
});

watch(
  () => router.currentRoute.value,
  (val) => {
    data.activeIndex = route.meta.code;
  },
  { immediate: true, deep: true }
);

// 菜单列表数据
const menuList = computed(() => {
  return store.state.auth.menuList;
});

const handleSelect = (key, keyPath) => {
  // 处理首页逻辑
  if (key === "000") {
    router.push({ path: "/welcome" || "/" });
    return;
  }
  getRouteInfo(key, store.state.auth.routerList);
  router.push({ path: data.routeInfo.path || "/" });
};
const getRouteInfo = (code, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].code === code) {
      data.routeInfo = arr[i];
      return;
    }
    if (arr[i].children && arr[i].children.length > 0) {
      getRouteInfo(code, arr[i].children);
    }
  }
};
//收缩菜单
const toggleMenue = () => {
  data.isCollapse = !data.isCollapse;
};
//下拉菜单点击事件
const dropMenuHandler = (command) => {
  if (command === "emain") {
    return;
  } else if (command === "logout") {
    //退出登陆
    store.commit("SET_USERINFO", {});
    store.commit("auth/SET_MENULIST", []);
    store.commit("auth/SET_BTNLIST", []);
    store.commit("auth/SET_ROUTER_LIST", []);
    store.commit("auth/SET_ROUTER_REFRESH");
    router.replace("/login");
  }
};
//获取待处理审批数量
const getApproveCountRequest = async () => {
  const count = await getApproveCount();
  store.commit("SET_NOTICE_COUNT", count);
};
</script>

<style lang="less">
.home-main {
  position: relative;
  height: 100vh;

  .nav-left {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    overflow-y: auto;
    transition: all 0.5s;

    .nav-left-logo {
      transition: all 1s;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      height: 50px;

      span {
        font-size: 16px;
        color: #fff;
      }

      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }

    .el-menu-item:hover {
      background-color: #0c2b42 !important;
    }

    .el-menu-vertical-demo {
      border: none;
    }

    &.fold-menu {
      width: 65px;
    }
  }

  .content-right {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    transition: all 0.5s;
    background-color: #eef0f3;
    min-height: 100vh;

    &.fold-content {
      margin-left: 65px;
    }

    .top-bar {
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 50px;
      border-bottom: 1px solid #ddd;

      .bar-left {
        display: flex;
        align-items: center;

        .collapse-i {
          margin-right: 10px;
          font-size: 16px;
          width: 18px;
          line-height: 18px;
          cursor: pointer;
          color: #303133;
        }
      }

      .top-userinfo {
        display: flex;
        justify-content: center;
        align-items: center;

        .item {
          line-height: 30px;
          margin-top: 6px;
        }

        .bellicon {
          font-size: 20px;
          margin-right: 15px;
        }

        .userinfo-name {
          font-size: 18px;
          cursor: pointer;
          color: #409eff;
        }

        .el-badge__content.is-fixed.is-dot {
          right: 19px;
        }
      }
    }

    .router-wrapper {
      box-sizing: border-box;
      padding: 20px;
    }
  }

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
}
</style>
