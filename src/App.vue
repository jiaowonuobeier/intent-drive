<template>
  <div id="app">
    <h1 style="border-bottom : 2px solid #000 ;padding-bottom:5px; font-size:18px ">意图驱动的应急通信指挥管理系统</h1>

    <router-view @login-success="handleLoginSuccess"></router-view>
  </div>
</template>

<script>
// import LoginRegister from "./views/LoginRegister.vue";

export default {
  data() {
    return {
      all_url:'127.0.0.1:4999'
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
