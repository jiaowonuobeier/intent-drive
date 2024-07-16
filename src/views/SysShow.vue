<template>
  <div>
    <div class="outer">
      <div class="card">
        <h>输入您的意图</h>
        <div class="cardinfo" style="line-height: 27px;">在下方输入框中输入您的意图，示例：建立自组织网络和意图驱动代理之间的连接，然后点击"发送意图"</div>
        <input type="text" v-model="value_intent"/><br />
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    // Topo,
  },
  props: ["all_url"],
  data() {
    return {
      remessage: "",
      remessage2: "",
      remessage3: "",
      value_intent: "",
    };
  },
  methods: {
    async yituzhuanyi() {
      console.log(this.value_intent);
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/translate`,
        data: {
          text: this.value_intent,
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
      console.log(this.value_intent);
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/execute`,
        data: {
          text: this.value_intent,
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
      this.value_intent = `${this.text1}${this.text2}${this.text3}${this.text4}${this.text5}${this.speak_text}`;
      console.log(this.value_intent);
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/analyze`,
        data: {
          text: this.value_intent,
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
  background: linear-gradient(to right, #e0f7fa, #80deea);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
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
  font-size: 20px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

.card input {
  width: 400px;
  padding: 10px;
  font-size: 16px;
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
  font-size: 16px;
  color: #333;
  text-align: left;
  min-height: 200px;
}

.cardinfo {
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}

.arrow {
  font-size: 24px;
  color: #333;
  margin: 0 20px;
}
</style>
