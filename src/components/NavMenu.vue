<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo custom-menu"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <i class="el-icon-view" style="color: #0066CC; font-weight: bold;"></i>
          <span slot="title">
            <router-link to="/IndexPage/IntroductionPage">系统介绍</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-picture-outline-round" style="color: #0066CC; font-weight: bold;"></i>
          <span slot="title">
            <router-link to="/IndexPage/NetTopo">网络拓扑</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu" style="color: #0066CC; font-weight: bold;"></i>
          <span slot="title">
            <router-link to="/IndexPage/ManManage">设备管理</router-link>
          </span>
        </el-menu-item>

        <!-- <el-menu-item index="4">
          <i class="el-icon-user-solid"></i>
          <span slot="title">
            <router-link to="/IndexPage/IntentDrive">意图驱动</router-link>
          </span>
        </el-menu-item> -->
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location" style="color: #0066CC; font-weight: bold;"></i>
            <span style="color: #070706; font-size: 14px; font-weight: bold"
              >意图驱动</span
            >
          </template>
          <el-menu-item index="6-1">
            <i class="el-icon-s-help" style="color: #0066CC; font-weight: bold;"></i>

            <router-link style="font-size: 14px; color: #333300;" to="/IndexPage/ModelShow">模块演示</router-link>
          </el-menu-item>
          <el-menu-item index="6-2">
            <i class="el-icon-s-marketing" style="color: #0066CC; font-weight: bold;"></i>

            <router-link  style="font-size: 14px; color: #333300;" to="/IndexPage/SysShow">系统演示</router-link>
          </el-menu-item>
          <el-menu-item index="6-3">
            <i class="el-icon-s-marketing" style="color: #0066CC; font-weight: bold;"></i>
            <router-link  style="font-size: 14px; color: #333300;" to="/IndexPage/NetPlan">路由规划</router-link>
          </el-menu-item>
          <el-menu-item index="6-4">
            <i class="el-icon-s-marketing" style="color: #0066CC; font-weight: bold;"></i>
            <router-link  style="font-size: 14px; color: #333300;" to="/IndexPage/ConnMan">连接管理</router-link>
          </el-menu-item>
          <el-menu-item index="6-5">
            <i class="el-icon-s-marketing" style="color: #0066CC; font-weight: bold;"></i>
            <router-link  style="font-size: 14px; color: #333300;" to="/IndexPage/CallMan">通话管理</router-link>
          </el-menu-item>
          <el-menu-item index="6-6">
            <i class="el-icon-s-marketing" style="color: #0066CC; font-weight: bold;"></i>
            <router-link  style="font-size: 14px; color: #333300;" to="/IndexPage/IntPri">意图优先级</router-link>
          </el-menu-item>
        </el-submenu>
                <el-menu-item index="4">
          <i class="el-icon-files" style="color: #0066CC; font-weight: bold;"></i>
          <span slot="title">
            <router-link to="/IndexPage/ConfigManage">手动配置</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-menu" style="color: #0066CC; font-weight: bold;"></i>
          <span slot="title">
            <router-link to="/IndexPage/TestView">TestView</router-link>
          </span>
        </el-menu-item>
      </el-menu>

    </el-col>
  </el-row>
</template>

<script scoped>

export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-item,
.el-submenu {
  background-color: #a5a7a8;
  border-bottom: 1px solid rgba(54, 51, 51, 0.699);
}
.router-link-active {
  text-decoration: none;
  color: #0a0101;
  /* font-size: 25px; */
  font-weight: bolder;
}
a {
  text-decoration: none;
  color: #070706;
  font-size: 14px;
  font-weight: bold;
}
i{
  color: rgb(7, 122, 88);
}

</style>
