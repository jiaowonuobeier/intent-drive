<template>
  <el-container>
    <el-header>意图驱动网络管理系统</el-header>
    <el-container>
      <el-aside width="240px">
        <!-- Asider -->
        <NavMenu></NavMenu>
      </el-aside>
      <el-main> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from "./NavMenu.vue";

export default {
  components: {
    NavMenu,
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  border-bottom: 1px solid rgb(63, 58, 58);
  background-color: rgb(255, 255, 255);
  color: #333;
  /* text-align: center; */
  text-align: left;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>