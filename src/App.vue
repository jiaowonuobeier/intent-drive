<template>
  <div id="app">
    <!-- 当前分支是本地版本的代码，远程版本在main分支上 -->
    <!-- 开始修改 -->
    <router-view @login-success="handleLoginSuccess"></router-view>
  </div>
</template>

<script>
// import LoginRegister from "./views/LoginRegister.vue";

export default {
  data() {
    return {
      all_url:'https://blatantly-relaxing-cougar.ngrok-free.app'
    };
  },
  name: "App",
  components: {
    // LoginRegister,
  },
  methods: {
    handleLoginSuccess() {
      this.$router.push('IntroductionPage');
    },
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
/* 强制设置所有元素的字体大小为 14px */
* {
  font-size: 14px;
}

</style>
