<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo custom-menu"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- 系统介绍 -->
        <el-menu-item index="1" class="first-level">
          <i class="el-icon-view menu-icon"></i>
          <span slot="title">
            <router-link to="/IndexPage/IntroductionPage">系统介绍</router-link>
          </span>
        </el-menu-item>

        <!-- 云接入管理 -->
        <el-submenu index="2" class="first-level">
          <template slot="title">
            <i class="el-icon-connection menu-icon"></i>
            <span>云接入管理</span>
          </template>
          <el-menu-item index="2-1" class="second-level">
            <router-link to="/IndexPage/ManManage">设备接入管理</router-link>
          </el-menu-item>
          <el-submenu index="2-2" class="second-level">
            <template slot="title">通断连接管理</template>
            <el-menu-item index="2-2-1" class="third-level">
              <router-link to="/IndexPage/ModelShow">意图驱动</router-link>
            </el-menu-item>
            <el-menu-item index="2-2-2" class="third-level">
              <router-link to="/IndexPage/ConfigManage">手动配置</router-link>
            </el-menu-item>
          </el-submenu>
        </el-submenu>

        <!-- 云通信管理 -->
        <el-submenu index="3" class="first-level">
          <template slot="title">
            <i class="el-icon-chat-line-round menu-icon"></i>
            <span>云通信管理</span>
          </template>
          <el-menu-item index="3-1" class="second-level">
            <router-link to="/IndexPage/CallMan">意图驱动的通话管理</router-link>
          </el-menu-item>
          <el-menu-item index="3-2" class="second-level">
            <router-link to="/IndexPage/NetTopo">网络拓扑</router-link>
          </el-menu-item>
          <el-menu-item index="3-2" class="second-level">
            <router-link to="/IndexPage/IntPri">带宽管理</router-link>
          </el-menu-item>
        </el-submenu>

        <!-- 云计算管理 -->
        <el-submenu index="4" class="first-level">
          <template slot="title">
            <i class="el-icon-cloudy menu-icon"></i>
            <span>云计算管理</span>
          </template>
          <el-menu-item index="4-1" class="second-level">
            <router-link to="/IndexPage/NetPlan">智能路由规划</router-link>
          </el-menu-item>
          <el-menu-item index="4-2" class="second-level">
            <router-link to="/IndexPage/SelfOrganizing">自组网覆盖</router-link>
          </el-menu-item>
          <el-menu-item index="4-3" class="second-level">
            <router-link to="/IndexPage/SatelliteCoverage">卫星覆盖</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
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
/* 基础样式 */
.el-menu-item,
.el-submenu__title {
  transition: all 0.3s;
}

/* 层级样式 */
.first-level {
  background-color: #a5a7a8 !important;
  border-bottom: 1px solid rgba(54, 51, 51, 0.699) !important;
  padding-left: 20px !important;
}

.second-level {
  background-color: #c8c9ca !important;
  padding-left: 40px !important;
  border-left: 4px solid #0066CC !important;
}

.third-level {
  background-color: #e0e1e2 !important;
  padding-left: 60px !important;
  border-left: 4px solid #4CAF50 !important;
}

/* 图标样式 */
.menu-icon {
  color: #0066CC;
  margin-right: 10px;
  font-weight: bold;
}

/* 链接样式 */
.router-link-active {
  text-decoration: none;
  color: #0a0101;
  font-weight: bolder;
}

a {
  text-decoration: none;
  color: #070706;
  font-size: 14px;
  font-weight: bold;
}

/* 悬停效果 */
.el-menu-item:hover, 
.el-submenu__title:hover {
  background-color: #e6f7ff !important;
}

/* 子菜单缩进调整 */
.el-menu--inline {
  background-color: transparent !important;
}

/* 激活菜单项样式 */
.el-menu-item.is-active {
  background-color: #e6f7ff !important;
  color: #0066CC !important;
  border-left: 4px solid #0066CC !important;
}
</style>