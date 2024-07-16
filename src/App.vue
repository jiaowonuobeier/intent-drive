<template>
  <div id="app">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
