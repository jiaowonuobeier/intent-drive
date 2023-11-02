import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import * as echarts from "echarts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI); // 这种方式引入了ElementUI中所有的组件
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
