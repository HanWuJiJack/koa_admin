<template>
  <div class="home-main clearfix">
    <div class="nav-left" :class="isCollapse ? 'fold-menu' : ''">
      <!-- logo -->
      <div class="nav-left-logo" v-show="!isCollapse">
        <span>综合管理系统</span>
      </div>
      <!-- 菜单 -->
      <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#001529" text-color="#fff"
        active-text-color="#409eff" router :collapse="isCollapse">
        <MenuTree :menuList="menuList" />
      </el-menu>
    </div>

    <div class="content-right" :class="isCollapse ? 'fold-content' : ''">
      <div class="top-bar">
        <!-- 面包屑 -->
        <div class="bar-left">
          <i class="collapse-i" @click="toggleMenue">
            <Expand v-show="isCollapse" />
            <Fold v-show="!isCollapse" />
          </i>
          <div class="bread">
            <Breadcrumb />
          </div>
        </div>
        <!-- 用户信息 -->
        <div class="top-userinfo">
          <!-- <el-badge
            :is-dot="noticeCount > 0 ? true : false"
            class="item"
            @click="$router.push('/audit/approve')"
            style="cursor: pointer"
            ><i class="el-icon-bell bellicon"></i
          ></el-badge> -->
          <el-dropdown @command="dropMenuHandler">
            <span class="userinfo-name">{{ userInfo.userName }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="emain">邮箱：{{ userInfo.userEmail }}</el-dropdown-item>
                <el-dropdown-item command="userMain" @click="$router.push('/system/my')">个人中心</el-dropdown-item>
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
import MenuTree from "./components/MenuTree.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import publicFn from "../utils/publicFn";
import _ from "lodash";
import { getApproveCount } from "@/api/syetem/approve";
import { getDictTypes } from "@/api/syetem/dictType";

export default {
  name: "Home",
  components: {
    MenuTree,
    Breadcrumb,
  },
  data() {
    return {
      isCollapse: false, // 菜单是否折叠
      userInfo: this.$store.state.userInfo, // 用户信息
      menuList: [], // 菜单列表数据
    };
  },
  mounted() {
    this.getApproveCountRequest();
    this.getMenuListRequest();
    getDictTypes("environment_form").then((res) => {
      this.$store.commit("SET_ENVIRONMENT_FORM", res);
    });
  },
  computed: {
    noticeCount() {
      return this.$store.state.noticeCount;
    },
  },
  methods: {
    //收缩菜单
    toggleMenue() {
      this.isCollapse = !this.isCollapse;
    },
    //下拉菜单点击事件
    dropMenuHandler(command) {
      if (command === "emain") {
        return;
      } else if (command === "logout") {
        //退出登陆
        this.$store.commit("SET_USERINFO", {});
        this.$store.commit("SET_MENULIST", []);
        this.$store.commit("SET_BTNLIST", []);
        this.$router.replace("/login");
      }
    },
    //获取待处理审批数量
    async getApproveCountRequest() {
      const count = await getApproveCount();
      this.$store.commit("SET_NOTICE_COUNT", count);
    },
    //获取菜单列表数据
    async getMenuListRequest() {
      this.menuList = publicFn.genneratePath(_.cloneDeep(this.$store.state.menuList));
    },
  },
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