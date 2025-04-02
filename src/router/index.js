import Vue from "vue"; //引入Vue
import VueRouter from "vue-router"; //引入vue-router
import IndexPage from "../views/IndexPage.vue";
import LoginRegister from "../views/LoginRegister.vue";
import IntroductionPage from "../views/IntroductionPage.vue"
import ManManage from "../views/ManManage.vue";
import NetTopo from "../views/NetTopo.vue";
import ConfigManage from "../views/ConfigManage.vue";
import PerformMonitor from "../views/PerformMonitor";
import LogManage from "../views/LogManage";
import SysSet from "../views/SysSet";
import ModelShow from "../views/ModelShow.vue"
import SysShow from "../views/SysShow.vue";
import NetPlan from "../views/NetPlan.vue";
import CallMan from "../views/CallMan.vue";
import ConnMan from "../views/ConnMan.vue";
import TestView from "../views/TestView.vue";


Vue.use(VueRouter); //Vue全局使用Router

const router = new VueRouter({
  routes: [
    //配置路由，这里是个数组
    { path: "/", redirect: "/LoginRegister" },
    // {
    //   path: "/IntroductionPage",
    //   component: IntroductionPage,
    // },
    {
      //每一个链接都是一个对象
      path: "/IndexPage", //链接路径
      component: IndexPage, //对应的组件模板
      children: [
        {
          // 不需要表现为路径，他会自动补全
          path: "IntroductionPage",
          component: IntroductionPage,
        },
        {
          // 不需要表现为路径，他会自动补全
          path: "ManManage",
          component: ManManage,
        },
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
        {
          path: "ModelShow",
          component: ModelShow,
        },
        {
          path: "SysShow",
          component: SysShow,
        },
        {
          path: "NetPlan",
          component: NetPlan,
        },
        {
          path: "CallMan",
          component: CallMan,
        },
        {
          path: "ConnMan",
          component: ConnMan,
        },
        {
          path: "TestView",
          component: TestView,
        },
      ],
    },
    {
      //每一个链接都是一个对象
      path: "/LoginRegister", //链接路径
      component: LoginRegister, //对应的组件模板
    },
  ],
});
export default router;
