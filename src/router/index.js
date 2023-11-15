import Vue from "vue"; //引入Vue
import VueRouter from "vue-router"; //引入vue-router
import IndexPage from "../views/IndexPage.vue";
import LoginRegister from "../views/LoginRegister.vue";
import IntentDrive from "../views/IntentDrive.vue";
import ManManage from "../views/ManManage.vue";
// import DeviceManage from "../views/DeviceManage.vue";
import NetTopo from "../views/NetTopo.vue";
import ConfigManage from "../views/ConfigManage.vue";
import PerformMonitor from "../views/PerformMonitor";
import LogManage from "../views/LogManage";
import SysSet from "../views/SysSet";

Vue.use(VueRouter); //Vue全局使用Router

const router = new VueRouter({
  routes: [
    //配置路由，这里是个数组
    { path: "/", redirect: "/LoginRegister" },
    {
      //每一个链接都是一个对象
      path: "/IndexPage", //链接路径
      component: IndexPage, //对应的组件模板
      children: [
        {
          // 不需要表现为路径，他会自动补全
          path: "IntentDrive",
          component: IntentDrive,
        },
        {
          // 不需要表现为路径，他会自动补全
          path: "ManManage",
          component: ManManage,
        },
        // {
        //   // 不需要表现为路径，他会自动补全
        //   path: "DeviceManage",
        //   component: DeviceManage,
        // },
        {
          // 不需要表现为路径，他会自动补全
          path: "NetTopo",
          component: NetTopo,
        },
        {
          path: "ConfigManage",
          component: ConfigManage,
        },
        {
          path: "PerformMonitor",
          component: PerformMonitor,
        },
        {
          path: "LogManage",
          component: LogManage,
        },
        {
          path: "SysSet",
          component: SysSet,
        },
      ],
    },
    {
      //每一个链接都是一个对象
      path: "/LoginRegister", //链接路径
      component: LoginRegister, //对应的组件模板
    },
    // {
    //   //每一个链接都是一个对象
    //   path: "/ConfigManage", //链接路径
    //   component: ConfigManage, //对应的组件模板
    // },
    // {
    //   //每一个链接都是一个对象
    //   path: "/DeviceManage", //链接路径
    //   component: DeviceManage, //对应的组件模板
    // },
    // {
    //   //每一个链接都是一个对象
    //   path: "/IntentDrive", //链接路径
    //   component: IntentDrive, //对应的组件模板
    // },
    // {
    //   //每一个链接都是一个对象
    //   path: "/LogManage", //链接路径
    //   component: LogManage, //对应的组件模板
    // },
    // {
    //   //每一个链接都是一个对象
    //   path: "/ManConfig", //链接路径
    //   component: ManConfig, //对应的组件模板
    // },
    // {
    //   //每一个链接都是一个对象
    //   path: "/NetTopo", //链接路径
    //   component: NetTopo, //对应的组件模板
    // },
    // {
    //   //每一个链接都是一个对象
    //   path: "/PerformMonitor", //链接路径
    //   component: PerformMonitor, //对应的组件模板
    // },
    // {
    //   //每一个链接都是一个对象
    //   path: "/SysSet", //链接路径
    //   component: SysSet, //对应的组件模板
    // },
  ],
});
export default router;
