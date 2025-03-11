<template>
  <div>
    <h1>网络规划</h1>
    
    <!-- 网络设备输入表单 -->
    <form @submit.prevent="addDevice">
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
    
    <!-- 设备列表 -->
    <h2>设备列表</h2>
    <ul>
      <li v-for="(device, index) in devices" :key="index">
        {{ device.name }} - {{ device.ip }}
        <button @click="removeDevice(index)">删除</button>
      </li>
    </ul>
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
h1, h2 {
  color: #333;
}
form {
  margin-bottom: 20px;
}
input {
  margin: 5px;
}
button {
  margin-left: 10px;
}
</style>
