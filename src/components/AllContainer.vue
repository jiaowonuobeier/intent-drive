<template>
  <el-container>
    <el-header> 
        <img src="../photo/logo.jpg" alt="" class="logo">
        <span>意图驱动网络管理系统</span>
    </el-header>
  <el-container>
  <el-aside width="240px">
        <!-- Asider -->
        <NavMenu></NavMenu>
        <img src="../photo/logo2.jpg" alt="" class="logo">
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
.el-header
{
  background-color: #021d3a;
  font-weight: bold;
  display: flex;
  font-size: large;
  align-items:center;
}

.el-header span
{
  color: whitesmoke;
}

.el-header .logo
{
  padding-left: 0%;
  margin-left: 0px;
  width: 60px;
  height: 60px;
}
.el-aside .logo{
  width: 238px;
  height: 60px;
  position: fixed;
  bottom: 1px;
  left: 9px;
  margin-top: 500px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #032346;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  border-bottom: 1px solid rgb(63, 58, 58);
  background-color: rgb(255, 255, 255);
  color: #333;
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