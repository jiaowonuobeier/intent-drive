<template>
  <el-row class="tac">
    <el-col :span="24">
      <!-- <h5>默认颜色</h5> -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
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
        <!-- <el-menu-item index="3">
          <i class="el-icon-s-platform"></i>
          <span slot="title"
            ><router-link to="/IndexPage/DeviceManage"
              >设备管理</router-link
            ></span
          >
        </el-menu-item> -->

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
  background-color: #d3dce6;
  border-bottom: 1px solid rgba(54, 51, 51, 0.699);
}
</style>