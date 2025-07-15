<template>
  <div class="container">
    <div class="plan">
      <h1 style="border-bottom: 1px solid black; font-size: 18px;">意图控制</h1>
      
      <!-- 意图选择区域 -->
      <div class="form-group">
        <span>意图选择区域</span>
        <select class="custom-select" v-model="selectedIntent">
          <option value="" disabled selected>请选择意图</option>
          <option v-for="t in tips" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
      
      <!-- 按钮区域 -->
      <div class="form-group">
        <button class="submit-btn" @click="planRegion('解析意图')">解析意图</button>
      </div>
      <div class="form-group">
        <button class="submit-btn" @click="planRegion('转译意图')">转译意图</button>
      </div>
      <div class="form-group">
        <button class="submit-btn" @click="planRegion('执行意图')">执行意图</button>
      </div>
    </div>
    
    <div class="region">
      <h1 style="border-bottom: 1px solid black; font-size: 18px;">效果展示</h1>
      <div class="form-group">
        <span>意图解析显示</span>
        <div class="display-area">
          {{ parsedResult || "暂无解析结果" }}
        </div>
      </div>
      <div class="form-group">
        <span>意图转译显示</span>
        <div class="display-area">
          {{ translatedResult || "暂无转译结果" }}
        </div>
      </div>
      <div class="form-group">
        <span>意图执行显示</span>
        <div class="display-area">
          {{ executedResult || "暂无执行结果" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
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
      ],
      selectedIntent: "",
      parsedResult: "",
      translatedResult: "",
      executedResult: "",
      remessage1:"",
      remessage2: "",
      remessage3:""
    };
  },
  methods: {
    async yituzhuanyi() {
      console.log(this.value_intent);
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/translate`,
        data: {
          text: this.selectedIntent,
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
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/execute`,
        data: {
          text: this.selectedIntent,
        },
      }).then(
        (response) => {
          this.executedResult = response.data.message;
          alert("意图执行成功");
        },
        (error) => {
          console.log("错误", error)
        }
      );
    },
    async yitujiexi() {
      await axios({
        method: "post",
        url: `https://blatantly-relaxing-cougar.ngrok-free.app/intents/analyze`,
        data: {
          text: this.selectedIntent,
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

.form-group {
  display: flex;
  flex-direction: column; /* 垂直排列内部元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  gap: 5px; /* 标签与内容之间的间距 */
  min-height: 100px;
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
  background-color: #4CAF50;
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
  background-color: #45a049;
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
</style>