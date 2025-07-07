<template>
  <div class="container">
    <div class="plan">
      <h1 style="border-bottom: 1px solid black; font-size: 18px;">意图控制(接入管理)</h1>
      <!-- 按钮区域 -->
      <div class="form-group">
        <button class="submit-btn" @click="yitushuru">意图输入</button>
      </div>
      <div class="form-group">
        <button class="submit-btn" @click="yitujiexi">解析意图</button>
      </div>
      <div class="form-group">
        <button class="submit-btn" @click="yituzhuanyi">转译意图</button>
      </div>
      <div class="form-group">
        <button class="submit-btn" @click="yituzhixing">执行意图</button>
      </div>
    </div>
    
    <div class="region">
      <h1 style="border-bottom: 1px solid black; font-size: 18px;">结果显示</h1>
      <div class="form-group" v-if="input_button">
        <div class="card-container">
          <div class="card">
            <h>意图选择模块</h><br>
            <select class="custom-select" v-model="selectedIntent">
              <option value="" disabled selected>请选择意图</option>
              <option v-for="t in tips" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="card">
            <h>语音输入模块</h>
            <!-- <div class="modelinfo">
              <strong style="color: #336666;">依次点击按钮</strong>录入声音，十几秒后您的意图出现在下方，确认了您的意图之后点击 
              <strong style="color: #336699;">"意图解析模块"</strong> 的 
              <strong style="color: #336699;">"开始解析意图"</strong>。语音输入模块与文本输入模块二选一即可
            </div> -->
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
        </div>
      </div>

      <div class="form-group">
        <div class="card-container">
          <div class="card" style="width: 500px;">
            <span>意图解析显示</span>
            <div class="display-area">
              {{ parsedResult  }}
            </div>
          </div>
          <div class="card" style="width: 500px;">
            <span>意图解析显示</span>
            <div class="display-area">
              {{ translatedResult }}
            </div>
          </div>
          <div class="card" style="width: 500px;">
            <span>意图解析显示</span>
            <div class="display-area">
              {{ executedResult  }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Recorder from "recorder-core";
import "recorder-core/src/engine/mp3";
import "recorder-core/src/engine/mp3-engine";
import "recorder-core/src/engine/wav";
import "recorder-core/src/extensions/waveview";
export default {
  name: "ConnMan",
  data() {
    return {
      tips: [
        "建立自组织网络设备与意图驱动代理之间的连接",
        "断开自组织网络设备与意图驱动代理之间的连接",
        "建立集群网络设备与意图驱动代理之间的连接",
        "断开集群网络设备与意图驱动代理之间的连接",
      ],
      selectedIntent: "",
      parsedResult: "",
      translatedResult: "",
      executedResult: "",
      remessage1:"",
      remessage2: "",
      remessage3: "",
      input_button: true,
      speak_text:"",
    };
  },
  mounted() {
    this.recwave = this.$refs.recwave;
  },
  methods: {
    yitushuru()
    {
      this.input_button=true
    },
    async yituzhuanyi() {
      await axios({
        method: "post",
        url: `http://192.168.60.1:4999/intents/translate`,
        data: {
          text: this.selectedIntent + this.speak_text,
        },
      }).then(
        (response) => {
          this.translatedResult = response.data.message;
          alert("意图转译成功");
          },
        (error) => {
          console.log("错误", error)
        }
      );
    },
    async yituzhixing() {
      await axios({
        method: "post",
        url: `http://192.168.60.1:4999/intents/execute`,
        data: {
          text: this.selectedIntent + this.speak_text,
        },
      }).then(
        (response) => {
          this.executedResult = response.data.message;
        },
        (error) => {
          console.log("错误", error)
        }
      );
    },
    async yitujiexi() {
      await axios({
        method: "post",
        url: `http://192.168.60.1:4999/intents/analyze`,
        data: {
          text: this.selectedIntent + this.speak_text,
        },
      }).then(
        (response) => {
          this.parsedResult = response.data.message;
        },
          (error) => {
            console.log(error);
        }
      );
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
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
  display: flex;
  gap: 20px; /* 增加容器之间的间距 */
  padding: 20px;
}

.plan, .region {
  flex: 1; /* 初始均分 */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  gap: 15px; /* 子元素之间的间距 */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* 添加阴影效果 */
}

/* 调整 .plan 和 .region 的宽度比例 */
.plan {
  flex: 1; /* 左边容器占1份 */
}

.region {
  flex: 3; /* 右边容器占3份 */
}
.card-container {
  display: flex;
  gap: 20px; /* 卡片之间的间距 */
  justify-content: center; /* 水平居中 */
  margin-top: 20px;
}

/* 卡片通用样式 */
.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 500px;
  /* max-width: 48%; */
  min-height: 400px; /* 根据需要调整 */
}

.form-group {
  display: flex;
  flex-direction: column; /* 垂直排列内部元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  gap: 5px; /* 标签与内容之间的间距 */
  min-height: 100px;
}


.card-container {
  display: flex;
  gap: 20px; /* 可选：设置卡片之间的间距 */
}

.card {
  flex: 1; /* 使卡片均匀分配可用空间 */
  min-width: 0; /* 防止内容溢出 */
}

.display-area {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  min-height: 40px; /* 设置最小高度 */
  box-sizing: border-box; /* 包括内边距和边框在内 */
  transition: background-color 0.3s ease; /* 平滑过渡效果 */
}

.display-area:empty {
  background-color: #fafafa; /* 空时的背景色 */
}

.display-area:empty::before {
  content: "暂无数据";
  color: #999;
  display: block;
  text-align: center;
  font-style: italic;
}

.custom-select {
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 250px;
}

.submit-btn {
  padding: 10px 15px;
  background-color: #555855;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  max-width: 250px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0b140b;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .plan, .region {
    width: 100%; /* 在小屏上堆叠显示 */
    flex: 1 1 100%;
  }

  .form-group {
    align-items: center; /* 居中对齐 */
  }

  .custom-select, .submit-btn {
    width: 90%; /* 减小按钮和下拉框的宽度 */
    max-width: none;
  }
}
.card div[ref="recwave"],
.card div[style] {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
}
</style>