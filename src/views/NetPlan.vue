<template>
  <div class="container">
    <h1>网络规划</h1>
    
    <!-- 网络设备输入表单 -->
    <div class="card">
      <form @submit.prevent="addDevice" class="form">
        <label>
          设备名称:
          <input v-model="newDevice.name" required />
        </label>
        <label>
          IP地址:
          <input v-model="newDevice.ip" required />
        </label>
        <button type="submit">添加设备</button>
      </form>
    </div>
    
    <!-- 设备列表 -->
    <h2>设备列表</h2>
    <div class="device-list">
      <div v-for="(device, index) in devices" :key="index" class="card device">
        <p><strong>{{ device.name }}</strong></p>
        <p>{{ device.ip }}</p>
        <button @click="removeDevice(index)" class="delete">删除</button>
      </div>
    </div>

        <!-- 点数输入 -->
    <div class="form-group">
      <label for="pointCount">点数:</label>
      <input
        type="number"
        id="pointCount"
        v-model.number="pointCount"
        placeholder="请输入点数"
        min="1"
      />
    </div>

    <!-- 区域输入 -->
    <div class="form-group">
      <label for="area">区域:</label>
      <input
        type="text"
        id="area"
        v-model="area"
        placeholder="请输入区域（例如：116.397128,39.916527,116.397228,39.916627）"
      />
    </div>
        <!-- 提交按钮 -->
    <button class="submit-btn" @click="submitData">
      提交
    </button>

    <!-- 显示响应消息 -->
    <div v-if="responseMessage" class="response-message">
      {{ responseMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      newDevice: { name: '', ip: '' },
      devices: [],
      pointCount: null, // 点数
      area: '',         // 区域
      responseMessage: '', // 后端响应消息
    };
  },
  methods: {
    addDevice() {
      this.devices.push({ ...this.newDevice });
      this.newDevice.name = '';
      this.newDevice.ip = '';
    },
    removeDevice(index) {
      this.devices.splice(index, 1);
    },
    async submitData() {
      await axios({
        method: "post",
        url: `http://127.0.0.1:4999/intents/execute`,
        data: {
          text: this.pointCount + this.area + "网络规划",
        },
        // responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response);
          alert("意图执行成功");
          // alert(response.data.message)
        },
        (error) => {
          console.log("错误", error);
          alert("意图执行出错");
        }
      );
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  text-align: center;
}
.card {
  background: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
.device-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.device {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete {
  background: #dc3545;
}
.delete:hover {
  background: #a71d2a;
}
.call-management {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.response-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #3c763d;
  border-radius: 4px;
}
</style>
