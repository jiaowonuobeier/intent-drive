<template>
  <div>
    <div class="container">
      <div class="card topology-card">
        <h2><i class="el-icon-location"></i>&nbsp;拓扑管理</h2>
        <p class="info" style="line-height: 40px">
          管理和查看网络拓扑结构，包括设备连接状态和网络布局。
        </p>
        <p class="jieshao" @click="showSection('topology-management')">
          查看使用说明
        </p>
      </div>
      <div class="card device-card">
        <h2><i class="el-icon-mobile"></i>&nbsp;设备管理</h2>
        <p class="info" style="line-height: 40px">
          查看和管理系统日志，监控网络运行状态。
        </p>
        <p class="jieshao" @click="showSection('dev-management')">
          查看使用说明
        </p>
      </div>
      <div class="card config-card">
        <h2><i class="el-icon-thumb"></i>&nbsp;手动配置</h2>
        <p class="info" style="line-height: 40px">
          手动配置网络设备参数，适应特定场景需求。
        </p>
        <p class="jieshao" @click="showSection('manual-configuration')">
          查看使用说明
        </p>
      </div>
      <div class="card intent-card">
        <h2><i class="el-icon-position"></i>&nbsp;意图驱动</h2>
        <p class="info" style="line-height: 40px">
          通过自然语言输入和意图识别，实现自动化网络管理。
        </p>
        <p class="jieshao" @click="showSection('intent-driven')">
          查看使用说明
        </p>
      </div>
    </div>

    <div
      id="topology-management"
      class="section"
      :style="{
        display: activeSection === 'topology-management' ? 'block' : 'none',
      }"
    >
      <h2>网络拓扑</h2>
      <p>
        拓扑管理功能允许用户查看和管理整个网络的拓扑结构。以下是典型操作步骤：
      </p>
      <ol style="line-height: 30px">
        <li>登录系统后，点击导航栏“网络拓扑”进入网络拓扑界面。</li>
        <li>在拓扑图中，查看各个设备及其连接状态。</li>
        <li>
          网络拓扑显示了各个网络设备之间的逻辑连接关系，若两个设备之间存在连通关系，则设备图标之间通过黑色线条相连。
        </li>
        <li>
          点击某个设备节点，界面右上角将会从上到下显示设备名称、设备状态、ip、信号强度和经纬度等信息。
        </li>
      </ol>
    </div>

    <div
      id="manual-configuration"
      class="section"
      :style="{
        display: activeSection === 'manual-configuration' ? 'block' : 'none',
      }"
    >
      <h2>手动配置</h2>
      <p>
        手动配置功能允许用户手动设置网络设备参数。以下是典型操作步骤：
      </p>
      <ol style="line-height: 30px">
        <li>登录系统后，点击“手动配置”进入手动配置界面。</li>
        <li>
          “修改自组织节点”配置功能，目标节点名称填入“node45”，“RS485波特率”填入1000-5000的数字，音频麦克风增益和天线发射功率衰减值填入0-100的数字
        </li>
        <li>
          “网卡设置”配置功能，输入节点序号填入1，输入节点网口名称填入“enp8s0”或“enp9s0”，设置网口IP填入”192.168.XXX.XXX”
        </li>
      </ol>
    </div>

    <div
      id="intent-driven"
      class="section"
      :style="{ display: activeSection === 'intent-driven' ? 'block' : 'none' }"
    >
      <h2>意图驱动</h2>
      <p>
        意图驱动功能通过自然语言输入实现自动化网络管理。以下是典型操作步骤：
      </p>
      <ol style="line-height: 30px">
        <li>登录系统后，点击“意图驱动”进入意图驱动界面。</li>

        <li>通过语音输入或者文本输入，建立用户配置网络的意图</li>
        <li>
          通过点击解析、转译、执行意图按钮，系统将用户意图转换为具体配置并应用到相应设备上
        </li>
      </ol>
       <p>
        以下是意图示例：
      </p>
      <ol style="line-height: 30px">
        <li>建立自组织网络设备与意图驱动代理之间的连接</li>

        <li>断开自组织网络设备与意图驱动代理之间的连接</li>
        <li>
          建立集群网络设备与意图驱动代理之间的连接
        </li>
        <li>断开集群网络设备与意图驱动代理之间的连接</li>
        <li>查看意图驱动代理的网络信息</li>
        <li>启用自组织网络与集群网络之间的通话服务</li>
      </ol>
    </div>

    <div
      id="dev-management"
      class="section"
      :style="{
        display: activeSection === 'dev-management' ? 'block' : 'none',
      }"
    >
      <h2>设备管理</h2>
      <p>
        设备管理界面以表格的形式展示了异构网络设备的详细信息。以下是典型操作步骤：
      </p>
      <ol style="line-height: 30px">
        <li>登录系统后，点击“设备管理”进入日志管理界面。</li>

        <li>
          点击页面上方的四个异构网络图片，页面下方将会显示所选网络的所有设备的详细信息。
        </li>
        <li>
          设备信息表格展示了网络类型、设备名称、设备状态、信号强度、ip、经纬度等信息
        </li>

      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: "topology-management",
      dialogVisible: true,
    };
  },
  methods: {
    showSection(sectionId) {
      this.activeSection = sectionId; // 点击 card 时切换显示的 section
    },
    handleClose() {
      this.dialogVisible = false;
      //this.$router.push('/main'); // 跳转到主页面
      this.$router.push("/IndexPage/NetTopo");
    },
  },
};
</script>

<style scoped>
.container .card h2 {
  font-size: 14px;
}

.container .card .info {
  font-size: 14px;
  font-weight: 500;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}
header {
  background-color: #007bff;
  color: #fff;
  padding: 15px;
  text-align: center;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}
.card {
  background-color: #d7dce2;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  text-align: center;
  width: 300px;
  height: 220px;
  position: relative;
}
.card h2 {
  font-size: 14px;
  margin: 0;
}
.card .jieshao {
  position: absolute;
  color: #606266;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  text-decoration: underline;
  bottom: 10px;
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中的调整 */
}
.card a:hover {
  text-decoration: underline;
}
.section {
  display: none;
  padding: 20px;
}
.section h2 {
  border-bottom: 3px solid #838b85;
  padding-bottom: 10px;
}
/* .topology-card {
  background: linear-gradient(to bottom, #9bb6ee, #66a5da); 
} */

.topology-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}
.device-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}
.config-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}
.intent-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}
/* .device-card {
  background: linear-gradient(135deg, #f1d092, #ebdedc);
} */

/* .config-card {
  background: linear-gradient(
    135deg,
    #c6eeb3,
    #daecdf
  ); 
} */

/* .intent-card {
  background: linear-gradient(135deg, #7bf3f3, #f3eef3); 
} */
li {
  background: #f9f9f9;
  border-left: 4px solid #007bff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
/* 强制设置所有元素的字体大小为 14px */
* {
  font-size: 14px;
}

</style>
