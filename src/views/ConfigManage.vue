<template>
  <div class="outer">
    <div class="card-container">
      <div class="card" >
        <h3 style="border-bottom:  3px solid;">修改自组织节点</h3>
        <div>
          <table class="custom-table">
            <tr>
              <td class="first">发起人：</td>
              <td><input type="text" class="input-field"  v-model="formInline9.user"/></td>
              <td class="first" >修改目标节点名称：</td>
              <td><input type="text" class="input-field" v-model="formInline9.name"/></td>
            </tr>
            <tr>
              <td class="first" >RS485波特率：</td>
              <td><input type="text" class="input-field"  v-model="formInline9.baudrateRs485"/></td>
              <td class="first" >音频麦克风增益</td>
              <td><input type="text" class="input-field"  v-model="formInline9.audioMicGain"/></td>
            </tr>
            <tr>
              <td class="first" >天线1发射功率衰减值：</td>
              <td><input type="text" class="input-field" v-model="formInline9.pwAtten1"/></td>
              <td class="first" >天线2发射功率衰减值：</td>
              <td><input type="text" class="input-field" v-model="formInline9.pwAtten2"/></td>
            </tr>
            <tr>
              <td class="first" >UART0波特率：</td>
              <td><input type="text" class="input-field" v-model="formInline9.uartBaudrate0"/></td>
              <td class="first" >UART1波特率：</td>
              <td><input type="text" class="input-field" v-model="formInline9.uartBaudrate1"/></td>
            </tr>
            <tr>
              <td class="first" >UART2波特率：</td>
              <td><input type="text" class="input-field" v-model="formInline9.uartBaudrate2"/></td>
              <td class="first" ></td>
              <!-- <td><input type="text" class="input-field" /></td> -->
            </tr>
          </table>
          <button class="sure" @click="onSubmit9">确认修改</button>
        </div>
      </div>
      <div class="readme">
        <h1>修改自组织节点使用示例</h1>
        <ol style="line-height: 30px;">
          <li>本功能旨在修改自组织节点的参数信息</li>
          <li>首先确保节点连接在网络上，与意图驱动代理相连</li>
          <li>填入发起人：kc304</li>
          <li>填入修改的节点名称：node45</li>
          <li>将RS485波特率修改为：2500</li>
          <li>同理也可以填入其他参数，比如音频麦克风增益：25</li>
          <li>填写完您想要改变的参数之后，点击确认修改，即可收到修改成功的提示。您已将RS485波特率修改为2500波特，麦克风增益修改为25dB</li>
          <li>修改之后的结果可以在拓扑或者设备管理页面查看</li>
        </ol>
      </div>
    </div>
    <div class="card-container">	
      <div class="card">
        <h3 style="border-bottom: 3px solid;">网卡设置</h3>
        <div>
          <table class="custom-table">
            <tr>
              <td class="first" >输入节点序号：</td>
              <td><input type="text" class="input-field" v-model="num1"/></td>
              <td class="first" >输入节点网口名称：</td>
              <td><input type="text" class="input-field" v-model="net_card"/></td>
            </tr>
            <tr>
              <td class="first" >设置网口IP：</td>
              <td><input type="text" class="input-field" v-model="net_ip"/></td>
            </tr>
          </table>
          <button class="sure" @click="onSubmit10">确认修改</button>
          <!-- <el-button type="primary" @click="onSubmit10">确认修改</el-button> -->
        </div>
      </div>
      <div class="readme">
        <h1>网卡设置使用介绍</h1>
        <ol style="line-height: 30px;">
          <li>本功能旨在修改意图驱动代理的网卡信息</li>
          <li>输入节点序号：1，表示1号意图驱动代理</li>
          <li>填入修改的网口名称：enp9s0</li>
          <li>填入修改的网口ip值：192.168.166.1</li>
          <li>确认填写完毕后，点击确认修改，即可将enp9s0的ip修改为192.168.166.1</li>
          <li>修改之后的值可以在拓扑或者设备管理页面查看</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Loss: "",
      Delay: "",
      Rate: "",
      num1: "",
      net_card: "",
      net_ip: "",
      formInline9: {
        user: "",
        name: "",
        pwAtten1: "",
        pwAtten2: "",
        audioMicGain: "",
        baudrateRs485: "",
        uartBaudrate0: "",
        uartBaudrate1: "",
        uartBaudrate2: "",
      },
    };
  },
  components: {
  },
  methods: {
    async onSubmit9() {
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/manual/adhocconfig`,
        data: {
          name: this.formInline9.name,
          baudrateRs485: Number(this.formInline9.baudrateRs485),
          pwAtten1: Number(this.formInline9.pwAtten1),
          pwAtten2: Number(this.formInline9.pwAtten2),
          audioMicGain: Number(this.formInline9.audioMicGain),
          uartBaudrate0: Number(this.formInline9.uartBaudrate0),
          uartBaudrate1: Number(this.formInline9.uartBaudrate1),
          uartBaudrate2: Number(this.formInline9.uartBaudrate2),
        },
        responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response);
          this.$message.success("Successfully modified data on the node.");
        },
        (error) => {
          console.log("错误", error);
        }
      );
    },
    async onSubmit10() {
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/manual/changeagentip`,
        data: {
          device_id: Number(this.num1),
          net_card: this.net_card,
          ip: this.net_ip + "/24",
        },
        responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response);
          this.$message({
            message: "修改成功",
            type: "success",
          });
        },
        (error) => {
          console.log("错误", error);
          this.$message.error("用户名或密码错误");
        }
      );
    },
  },
};
</script>

<style scoped>
*
{
  font-size: 14px;
  color: #606266;
}
table {
  border-collapse: collapse;
  border: 1px solid black;
}
td {
  border: 1px solid black; /* 设置单元格内边框 */
  padding: 5px; /* 设置单元格内边距 */
}
table tr .first {
  background-color: rgb(3, 35, 70, 0.8);
  color: aliceblue;
}
.outer {
  background-color: #ffffff;
  background-size: cover;
  width: 100%;
}
.card-container{
  display: flex;
  gap: 50px;
  width: 100%;
  margin-top: 50px;
  margin-left: 50px;
}
.card {
  padding: 20px;
  background-color: #dcdfded7;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 50%;
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.readme{
  background-color: #c9cdce;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 30%;
  color: #00796b;
  font-weight: bold;
}

.card h3 {
  font-size: 14px;
  color: #606266;
  text-align: center;
  margin-bottom: 20px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.custom-table td {
  padding: 5px;
  border: 1px solid #ddd;
  vertical-align: middle;
}

.custom-table .first {
  font-weight:bold;
  background-color: #f5f5f5;
  color: #606266;
  width: 200px;
  /* font-size: 20px; */
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.sure {
  display: block;
  margin: 0 auto;
  width: 130px;
  height: 30px;
  border-radius: 4px;
}
</style>
