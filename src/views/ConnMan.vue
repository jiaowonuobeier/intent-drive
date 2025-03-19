<template>
  <div class="connection-manager">
    <h2>连接管理</h2>

    <!-- 网络类型选择 -->
    <div class="form-group">
      <label for="networkType">选择网络类型:</label>
      <select id="networkType" v-model="selectedNetworkType">
        <option value="">--请选择网络--</option>
        <option value="adhoc">自组织网络</option>
        <option value="cluster">集群网络</option>
        <option value="satellite">卫星网络</option>
      </select>
    </div>

    <!-- 连接/断开按钮 -->
    <div class="button-group">
      <button 
        :disabled="!selectedNetworkType" 
        @click="handleConnection('连接')"
      >
        连接
      </button>
      <button 
        :disabled="!selectedNetworkType" 
        @click="handleConnection('断开')"
      >
        断开
      </button>
    </div>

    <!-- 提示信息 -->
    <div class="info" v-if="errorMessage" style="color: red;">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'ConnMan',
  data() {
    return {
      selectedNetworkType: '', // 当前选择的网络类型
      errorMessage: '',        // 错误消息
    };
  },
  methods: {
    async handleConnection(connect) {
      await axios({
        method: "post",
        url: `http://127.0.0.1:4999/intents/execute`,
        data: {
          text: this.selectedNetworkType + connect,
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
  },
};
</script>

<style scoped>
.connection-manager {
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

select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

.info {
  text-align: center;
  font-size: 14px;
}
</style>