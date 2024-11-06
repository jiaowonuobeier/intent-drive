<template>
  <el-container>
    <!-- <el-header style="height: 2px;"> 
    </el-header> -->
  <el-container>
  <el-aside width="240px">
        <!-- Asider -->
         <div style=" height: 60px;" class="logo-container"><img src="../photo/logo2.jpg" alt="" class="logo"></div>
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
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.el-header
{
  background-color: #a6c8ee;
  font-weight: bold;
  display: flex;
  font-size: 30px;
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
  width: 100px;
  height: 100px;
}
.el-aside .logo{
  width: 241px;
  height: 66px;
  position: fixed;
  top: 0px;
  left: 7px;
  margin-top: 0px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
 background-color: #7fb4ec;
  color: #333;
  top: 200px;
  text-align: center;
  line-height: 200px;
}
.el-main {
  border-bottom: 1px solid rgb(63, 58, 58);
  background-color: white;
  color: #333;
  text-align: left;
  line-height: 60px;
  padding: 0px;
  height: 100vh;
}

body > .el-container {
  margin-bottom: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>