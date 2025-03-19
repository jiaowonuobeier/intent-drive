<template>
  <div class="call-management">
    <h2>通话管理</h2>

    <!-- 选择通话对象 -->
    <div class="form-group">
      <label for="userSelect">选择通话对象:</label>
      <select id="userSelect" v-model="selectedUser" @change="resetMessage">
        <option value="">--请选择用户--</option>
        <option value="1001">用户 1001</option>
        <option value="1002">用户 1002</option>
        <option value="1003">用户 1003</option>
      </select>
    </div>

    <!-- 获取新号码按钮 -->
    <button class="get-number-btn" @click="fetchNewNumber" :disabled="!selectedUser">
      获取新号码
    </button>

    <!-- 显示返回的新号码或消息 -->
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CallMan',
  data() {
    return {
      selectedUser: '', // 用户选择的通话对象
      message: '',      // 显示的消息或新号码
    };
  },
  methods: {
    /**
     * 发送请求到后端获取新的注册号码
     */
    async fetchNewNumber() {
      await axios({
        method: "post",
        url: `http://127.0.0.1:4999/intents/execute`,
        data: {
          text: this.selectedUser + "通话",
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
    /**
     * 重置消息，当选择不同的用户时清空之前的消息
     */
    resetMessage() {
      this.message = '';
    },
  },
};
</script>

<style scoped>
.call-management {
  max-width: 400px;
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

select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.get-number-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.get-number-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.get-number-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.message {
  margin-top: 20px;
  padding: 10px;
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #3c763d;
  border-radius: 4px;
}
</style>