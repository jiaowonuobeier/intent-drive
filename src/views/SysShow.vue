<template>
  <div>
    <div class="outer">
      <!-- <div class="card">
        <h>输入您的意图</h>
        <div class="cardinfo" style="line-height: 27px;">在下方输入框中输入您的意图，示例：建立自组织网络和意图驱动代理之间的连接，然后点击"发送意图"</div>
        <input type="text" v-model="value_intent"/><br />

        <button @click="yituzhuanyi">发送意图</button>
      </div> -->
      <div class="card">
        <h>输入您的意图</h>
        <div class="cardinfo" style="line-height: 27px;">在下方输入框或从下拉框中选择意图，然后点击"发送意图"</div>
        
        <!-- 下拉框 -->
        <select v-model="selectedIntent" style="width: 100%; padding: 8px; margin-bottom: 10px;">
          <option value="" disabled selected>请选择预设意图</option>
          <option value="建立自组织网络与集群网络之间的连接">建立自组织网络与集群网络之间的连接</option>
          <option value="查看1号意图驱动代理的网络信息">查看1号意图驱动代理的网络信息</option>
          <option value="断开自组织网络与集群网络之间的连接">关闭自组织网络与集群网络之间的连接</option>
          <option value="我要和手机用户1001通话">我要和手机用户1001通话</option>
          <option value="我需要在接下来1小时内保证网络资源的充足">我需要在接下来1小时内保证网络资源的充足</option>
          <option value="现在手机用户1和手机用户2的距离边远,通话质量下降,请保证通话质量">现在手机用户1和手机用户2的距离边远,通话质量下降,请保证通话质量</option>
        </select>
        
        <!-- 输入框 -->
        <input type="text" v-model="value_intent" placeholder="或在此输入自定义意图"/><br />
        
        <button @click="yituzhuanyi">发送意图</button>
      </div>
      <div class="arrow">➔</div>
      <div class="card">
        <h>将对此意图进行如下的网络配置</h>
        <div class="cardinfo">在这里确认进行如下的网络配置，确认后，点击"确认配置"</div>
        <div class="content">
          {{ remessage2 }}
        </div>
        <button @click="yituzhixing">确定配置</button>
      </div>
      <div class="arrow">➔</div>
      <div class="card">
        <h>意图执行结果如下</h>
        <div class="cardinfo">在这里查看意图的执行情况</div>
        <div class="content">
          {{ remessage3 }}
        </div>
      </div>
    </div>
    <div class="divider" ></div> <!-- 方法一中使用的分界线 -->
<div><ToPo></ToPo></div>
  </div>
</template>

<script>
import axios from "axios";
import ToPo from "../components/ToPo.vue";
export default {
  components: {
    ToPo,
  },
  props: ["all_url"],
  data() {
    return {
      remessage: "",
      remessage2: "",
      remessage3: "",
      value_intent: "",
      selectedIntent:""
    };
  },
  methods: {
    async yituzhuanyi() {
      console.log(this.value_intent,this.selectedIntent);
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/translate`,
        data: {
          text: this.value_intent + this.selectedIntent,
        },
        // responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response);
          this.remessage2 = response.data.message;
          alert("意图转译成功");
          // alert(response.data.message)
        },
        (error) => {
          console.log("错误", error);
          alert("意图转移出错");
        }
      );
    },
    async yituzhixing() {
      console.log(this.value_intent,this.selectedIntent);
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/execute`,
        data: {
          text: this.value_intent + this.selectedIntent,
        },
        // responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response);
          this.remessage3 = response.data.message;
          alert("意图执行成功");
          // alert(response.data.message)
        },
        (error) => {
          console.log("错误", error);
          alert("意图执行出错");
        }
      );
    },

    async yitujiexi() {
      console.log(this.value_intent,this.selectedIntent);
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/analyze`,
        data: {
          text: this.value_intent+this.selectedIntent,
        },
        // responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response);
          this.remessage = response.data.message;
          alert("意图解析成功");
          // alert(response.data.message)
        },
        (error) => {
          console.log("错误", error);
          alert("意图解析出错");
        }
      );
    },
    publish() {
      alert("您成功发布了一个意图");
    },
  },
};
</script>

<style scoped>
.outer {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: gray;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}
.divider {
  height: 5px; /* 分界线的高度 */
  background: linear-gradient(to right, #b778e0, #a5eb7d); /* 渐变色，从左到右 */
  margin: 20px 10px; /* 上下边距 */
  border-radius: 20px;
}
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-width: 200px;
  text-align: center;
  position: relative;
  margin: 0 10px;
  flex: 1;
}

.card h {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

.card input {
  width: 400px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.card input:hover {
  border-color: #66bb6a;
}

.card input:focus {
  border-color: #2196f3;
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
}

.content {
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: left;
  min-height: 200px;
}

.cardinfo {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.arrow {
  font-size: 14px;
  color: #333;
  margin: 0 20px;
}
</style>
