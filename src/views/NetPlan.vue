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
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDevice: { name: '', ip: '' },
      devices: []
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
    }
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
</style>
