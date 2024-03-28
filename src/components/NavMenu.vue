<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <i class="el-icon-view"></i>
          <span slot="title"
            ><router-link to="/IndexPage/NetTopo">网络拓扑</router-link></span
          >
        </el-menu-item>

        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title"
            ><router-link to="/IndexPage/ManManage">设备管理</router-link></span
          >
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-files"></i>
          <span slot="title"
            ><router-link to="/IndexPage/ConfigManage"
              >手动配置</router-link
            ></span
          >
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-user-solid"></i>
          <span slot="title">
            <router-link to="/IndexPage/IntentDrive">意图驱动</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-data-line"></i>
          <span slot="title"
            ><router-link to="/IndexPage/PerformMonitor"
              >性能监控</router-link
            ></span
          >
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-s-order"></i>
          <span slot="title"
            ><router-link to="/IndexPage/LogManage">日志管理</router-link></span
          >
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title"
            ><router-link to="/IndexPage/SysSet">系统设置</router-link></span
          >
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
.el-menu-item {
  background-color: #032346;
  border-bottom: 1px solid rgba(54, 51, 51, 0.699);
}
.router-link-active
{
  text-decoration: none;
  color: rgb(143, 170, 23);
  font-size: larger;
  font-weight: bolder;
}
a{
  text-decoration: none;
  color: rgb(91, 109, 9);
  font-weight:bold;
}
</style>