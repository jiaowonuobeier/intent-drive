<template>
  <div class="outer">
    <div class="row first" >
      <div class="card">
        <h>语音输入模块</h>
        <div class="modelinfo"><strong style="color: #336666;">依次点击按钮</strong>录入声音，十几秒后您的意图出现在下方，确认了您的意图之后点击 <strong style="color: #336699;">"意图解析模块"</strong> 的 <strong style="color: #336699;">"开始解析意图"</strong>。语音输入模块与文本输入模块二选一即可</div>
        <div class="button-container">
          <button @click="recOpen">打开录音，获得权限</button>
          <button @click="recStart">开始录音</button>
          <button @click="recStop">结束录音</button>
          <button @click="recPlay">本地试听</button>
        </div>
        <div style="height: 100px; width: 100%" ref="recwave"></div>
        <div>
        <h>您的语音内容：</h>
          <div>{{ speak_text }}</div>
        </div>
      </div>
      <div class="card">
        <h>文本输入模块</h>
        <div class="modelinfo">在<strong style="color: #336666;">下方输入框</strong>中输入您的意图，也可以点击<strong style="color: #336666;">下方气泡</strong>选择意图,确认了您的意图之后点击<strong style="color: #336699;">"意图解析模块"</strong>的<strong style="color: #336699;">"开始解析意图"</strong></div>
        <div class="button-container">
          请输入您的意图：<input v-model="text1" type="text" />
        </div>
        <div class="tips-container">
          <h>提示词/示例意图:</h>
          <div class="tip" v-for="(tip, index) in tips" :key="index" @click="addTipToText(tip)">{{ tip }}</div>
        </div>
      </div>
      <div class="card first" style="width: 900px;">
        这里显示网络拓扑
        <Topo></Topo>
      </div>
    </div>
    <div class="row second">
      <div class="card" >
        <h>意图解析模块</h>      <button @click="yitujiexi" >开始解析意图</button>
        <div class="modelinfo">本模块将解析出您的意图的<strong style="font-weight: bold;">对象、动作、时间、周期性</strong>等。解析完毕后点击<strong style="font-weight: bold;">"意图转译模块"</strong>的<strong style="font-weight: bold;">"开始转译意图"</strong>。</div>
        <div class="content" style="width: 97%">
            {{ remessage }}
        </div>
      </div>
      <div class="card" >
        <h>意图转译模块</h> <button @click="yituzhuanyi">开始转译意图</button>
        <div class="modelinfo">本模块将对意图进行转译，转译成<strong style="font-weight: bold;">网络命令</strong>。转译完成后点击<strong style="font-weight: bold;"></strong>的<strong style="font-weight: bold;">"开始执行意图"</strong>即可执行。</div>
        <div class="content" style="width: 97%">
            {{ remessage2 }}
        </div>
      </div>
      <div class="card">
        <h>意图执行模块</h> <button @click="yituzhixing">开始执行意图</button>
        <div class="modelinfo">在本模块可以看到意图执行完成情况。整个意图的分模块流程演示结束。在"系统演示"页面可以演示整体系统流程。</div>
        <div class="content" style="width: 97%">
            {{ remessage3 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Recorder from "recorder-core";
import "recorder-core/src/engine/mp3";
import "recorder-core/src/engine/mp3-engine";
import "recorder-core/src/engine/wav";
import "recorder-core/src/extensions/waveview";
import Topo from "../components/ToPo.vue";
//import VueAudioRecorder from 'vue-audio-recorder';
//import { ref } from 'vue';
export default {
  components: {
    Topo,
  },
  props: ["all_url"],
  data() {
    return {
      tips: [
            "建立自组织网络设备与意图驱动代理之间的连接",
            "断开自组织网络设备与意图驱动代理之间的连接",
            "建立集群网络设备与意图驱动代理之间的连接",
        "断开集群网络设备与意图驱动代理之间的连接",
        "和用户1001进行sip通话",
            "查看意图驱动代理的网络信息",
        "启用自组织网络与集群网络之间的通话服务",
        "集群网络",
        "查看信息",
        "意图驱动代理",
        "建立连接",
        "断开连接",
        "sip通话",
      ],
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      rec: null,
      recBlob: null,
      wave: null,
      isRecording: false,
      recordedBlob: null,
      transcript: "",
      remessage: "",
      remessage2: "",
      remessage3: "",
      IntentContents: [
        {
          value: "建立自组织网络与集群网络之间的连接",
          label: "建立自组织网络与集群网络之间的连接",
        },
        {
          value: "查看1号意图驱动代理的网络信息",
          label: "查看1号意图驱动代理的网络信息",
        },
        {
          value: "关闭自组织网络与集群网络之间的连接",
          label: "关闭自组织网络与集群网络之间的连接",
        },
        {
          value: "我要和手机用户1001通话",
          label: "我要和手机用户1001通话",
        },
        {
          value: "我需要在接下来1小时内保证网络资源的充足",
          label: "我需要在接下来1小时内保证网络资源的充足",
        },
        {
          value:
            "现在手机用户1和手机用户2的距离边远,通话质量下降,请保证通话质量",
          label:
            "现在手机用户1和手机用户2的距离边远,通话质量下降，请保证通话质量",
        },
      ],
      value_intent: "",
      speak_text: "",
    };
  },
  mounted() {
    this.recwave = this.$refs.recwave;
  },
  methods: {
    addTipToText(tip) {
      if (this.text1.length > 0) {
        this.text1 += ", ";
      }
      this.text1 += tip;
    },

    recOpen() {
      // 创建录音对象
      this.rec = Recorder({
        type: "wav", // 录音格式
        sampleRate: 16000, // 采样率
        bitRate: 16, // 比特率
        onProcess: (buffers, powerLevel, bufferDuration, bufferSampleRate) => {
          // 录音实时回调，用于绘制波形等操作
          if (this.wave) {
            this.wave.input(
              buffers[buffers.length - 1],
              powerLevel,
              bufferSampleRate
            );
          }
        },
      });

      if (!this.rec) {
        alert("当前浏览器不支持录音功能！");
        return;
      }

      // 打开录音，获得权限
      this.rec.open(
        () => {
          console.log("录音已打开");
          // 创建音频可视化图形绘制对象
          if (this.recwave) {
            this.wave = Recorder.WaveView({ elem: this.recwave });
          }
        },
        (msg, isUserNotAllow) => {
          console.log(
            (isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg
          );
        }
      );
    },
    recStart() {
      if (!this.rec) {
        console.error("未打开录音");
        return;
      }
      this.rec.start();
      this.isRecording = true; // 设置录音状态为开始
      console.log("已开始录音");
    },
    recStop() {
      if (!this.rec) {
        console.error("未打开录音");
        return;
      }
      this.rec.stop(
        (blob, duration) => {
          // 录音结束回调
          this.recBlob = blob; // 保存录音文件 Blob
          const localUrl = (window.URL || window.webkitURL).createObjectURL(
            blob
          );
          console.log("录音成功", blob, localUrl, "时长:" + duration + "ms");
          this.upload(blob); // 上传录音文件到服务器
          this.rec.close(); // 关闭录音
          this.rec = null; // 清空录音对象
          this.isRecording = false; // 设置录音状态为停止
        },
        (err) => {
          console.error("结束录音出错：" + err);
          this.rec.close();
          this.rec = null;
          this.isRecording = false;
        }
      );
    },
    upload(blob) {
      // 上传录音文件到服务器的逻辑
      // 这里可以使用 FormData 或其他方式上传
      console.log("上传录音文件:", blob);
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append("file", blob, "recording.wav"); // 'audio' 是后端接收文件的字段名，'recording.wav' 是文件名

      // 发送 POST 请求，上传录音文件
      axios
        .post(
          "http://192.168.60.1:4999/speak",
          formData
        )
        .then((response) => {
          console.log("上传录音文件成功:", response.data);
          // 处理上传成功的逻辑，如显示上传成功提示或者清理录音文件数据
          this.speak_text = response.data;
        })
        .catch((error) => {
          console.error("上传录音文件失败:", error);
          // 处理上传失败的逻辑，如显示上传失败提示或者重新尝试上传
        });
    },
    recPlay() {
      if (!this.recBlob) {
        console.error("录音文件不存在");
        return;
      }
      const localUrl = URL.createObjectURL(this.recBlob);
      const audio = new Audio();
      audio.controls = true;
      audio.src = localUrl;
      audio.play(); // 播放录音
      // 播放结束后释放对象 URL
      audio.onended = () => {
        URL.revokeObjectURL(localUrl);
      };
    },
    // async fasongyitu() {
    //   console.log(this.value_intent);
    //   await axios({
    //     method: "post",
    //     url: `http://192.168.60.1:4999/intents/execute`,
    //     data: {
    //       text: this.value_intent,
    //     },
    //     // responseType: "json",
    //   }).then(
    //     (response) => {
    //       console.log("收到意图", response);
    //       this.remessage = response.data.message;
    //       alert("网络配置成功");
    //       // alert(response.data.message)
    //     },
    //     (error) => {
    //       console.log("错误", error);
    //       alert("网络配置出错");
    //     }
    //   );
    // },
    async yituzhuanyi() {
      console.log(this.value_intent);
      await axios({
        method: "post",
        url: `http://192.168.60.1:4999/intents/translate`,
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
          alert("意图转译出错");
        }
      );
    },
    async yituzhixing() {
      console.log(this.value_intent);
      await axios({
        method: "post",
        url: `http://192.168.60.1:4999/intents/execute`,

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
        url: `http://192.168.60.1:4999/intents/analyze`,
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
    // publish() {
    //   alert("您成功发布了一个意图");
    // },
  },
};
</script>

<style scoped>
*{
  font-size: 14px;
}
body {
  font-family: "Arial", sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 0;
}
.outer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: left;
}
.row {
  display: flex;
  gap: 20px;
}
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #c9cdce;
  border-radius: 10px;
  padding: 20px;
  margin-left: 30px;
  /* margin-right:30px; */
  margin-top: 30px;
  width: 700px;
  box-sizing: border-box;
      position: relative;
}
.modelinfo{
      margin-top: 10px;
  font-size: 14px;
  color: #666;
  line-height: 30px;
}

.second .modelinfo {
  color: #606266;
}
/* .outer .second h {
  color:#606266;
} */
.card h {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 2px solid #28292b;
  padding-bottom: 5px;

}
.modelinfo {
  font-size: 14px;
  color: #666666;
  /* margin-bottom: 15px; */
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}
.button-container button,
.button-container input[type="text"] {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #6d6e6e;
  border-radius: 5px;
  background-color: #747575;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}
.button-container button:hover,
.button-container input[type="text"]:hover {
  background-color: #0056b3;
}
.button-container input[type="text"] {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
}
.button-container input[type="text"]:hover {
  border: 1px solid #007bff;
}
.button-container input[type="text"]:focus {
  outline: none;
  border: 1px solid #0056b3;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.card div[ref="recwave"],
.card div[style] {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
}
.card div:last-child {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}
.tips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.tip {
  padding: 5px 15px; /* 调整填充，使气泡更扁 */
  background-color: #a8aaaa;
  border: 1px solid #a8aaaa;
  border-radius: 15px; /* 调整圆角，使气泡更扁 */
  font-size: 14px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}
.tip:hover {
  background-color: #8b8b8b;
  transform: scale(1.05);
}
.second .card button{
    position: absolute;
  top: 30px;
  right: 20px;
  padding: 10px 20px;
  background-color: #615f5e;
  color: rgb(245, 242, 242);
  border: none;
  border-radius: 4px;
  cursor: pointer;
    
}
.second .card .content {
  min-height: 100px;
  font-size: 14px;
}
</style>
