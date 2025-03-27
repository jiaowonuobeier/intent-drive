<template>
  <div class="container">
    <div class="Plan">
      <h1 style="border-bottom: 1px solid black; font-size: 18px;">规划区域</h1>
      <!-- 区域输入 -->
      <div class="form-group">
        <!-- 输入示例：先锋村区域:30.487194,30.537194,102.706823,102.756823 -->
        
        <!-- 区域左上角纬度 -->
        区域左上角纬度:
        <select v-model="region.topLeftLat" id="topLeftLat">
          <option value="" disabled selected>请选择纬度</option><br>
          <option v-for="lat in latitudes" :key="lat" :value="lat">{{ lat }}</option><br>
        </select><br>
        <!-- 区域左上角经度 -->
        区域左上角经度:
        <select v-model="region.topLeftLon" id="topLeftLon">
          <option value="" disabled selected>请选择经度</option><br>
          <option v-for="lon in longitudes" :key="lon" :value="lon">{{ lon }}</option><br>
        </select><br>

        <!-- 区域右下角纬度 -->
        区域右下角纬度:
        <select v-model="region.bottomRightLat" id="bottomRightLat">
          <option value="" disabled selected>请选择纬度</option><br>
          <option v-for="lat in latitudes" :key="lat" :value="lat">{{ lat }}</option><br>
        </select><br>
        
        <!-- 区域右下角经度 -->
        区域右下角经度:
        <select v-model="region.bottomRightLon" id="bottomRightLon">
          <option value="" disabled selected>请选择经度</option><br>
          <option v-for="lon in longitudes" :key="lon" :value="lon">{{ lon }}</option><br>
        </select><br>
        <button class="submit-btn" @click="planRegion">规划区域</button>
      </div>
      <!-- 点数输入 -->
      <div class="form-group">
        点数：
        <input type="number" id="pointCount" v-model.number="pointCount" placeholder="请输入点数" min="1"/><br>
        <button class="submit-btn" @click="setnode">
          开始布点
        </button>
      </div>
      <div class="form-group">
        起点标号:<input type="text" v-model="route.start_node"><br>
        终点标号:<input type="text" v-model="route.end_node"><br>
        注重时延:<input type="text" v-model="route.time_weight"><br>
        注重丢包:<input type="text" v-model="route.delay_weight"><br>
        <button class="submit-btn" @click="routeplan"> 
          路由规划
        </button>
      </div>
    </div>

    <div class="imagesregion">
      <img id="myImage1" :src="image1Src" alt="Plan Region" width="800" height="auto" />
      <img id="myImage2" :src="image2Src" alt="Set Node" width="800" height="auto" />
      <img id="myImage3" :src="image3Src" alt="After Plan" width="800" height="auto" />
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
      area: '',         // 区域
      responseMessage: '', // 后端响应消息
      region: {
        topLeftLon: "",
        topLeftLat: "",
        bottomRightLon: "",
        bottomRightLat: "",
      },
      // 预定义的经度和纬度选项
      longitudes: [
        30.487194,
        30.537194,
      ], // 示例经度
      latitudes: [
        102.706823,
        102.756823,
      ], // 示例纬度
      // 点数
      pointCount: 1,
      // 路由规划输入
      route: {
        start_node: 1,
        end_node: 10,
        time_weight: 0.5,
        delay_weight: 0.5
      },
      // 图片地址
      image1Src: "", // 初始为空
      image2Src: "", // 初始为空
      image3Src: "", // 初始为空
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
    async planRegion() {
      await axios({
        method: "post",
        url: `http://127.0.0.1:4999/netplan/region`,
        data: {
          "latitude": [this.region.topLeftLat, this.region.bottomRightLat],
          "longitude": [this.region.topLeftLon, this.region.bottomRightLon]
        },
        // responseType: "json",
      }).then(
        (response) => {
          this.image1Src = "http://127.0.0.1:4999/netplan/region"; // 假设后端返回了图片 URL
          console.log(response);
          this.$message({
            message: '注册成功',
            type: 'success'
          });
        },
        (error) => {
          console.log("错误", error);
        }
      );
    },
    async setnode() {
      await axios({
        method: "post",
        url: `http://127.0.0.1:4999/netplan/setnode`,
        data: {
          "node_num": this.pointCount
        },
        responseType: "json",
      }).then(
        (response) => {
          this.image2Src = "http://127.0.0.1:4999/netplan/setnode"; // 假设后端返回了图片 URL
          console.log(response);
          this.$message({
            message: '注册成功',
            type: 'success'
          });
        },
        (error) => {
          console.log("错误", error);
        }
      );
    },

    async routeplan() {
      await axios({
        method: "post",
        url: `http://127.0.0.1:4999/netplan/route`,
        data: {
          "start_node": Number(this.route.start_node) || 1,
          "end_node": Number(this.route.end_node) || 10,
          "time_weight": Number(this.route.time_weight) || 0.5,
          "delay_weight": Number(this.route.delay_weight) || 0.5

        },
      }).then(
        (response) => {
          this.image3Src = "http://127.0.0.1:4999/netplan/route"; // 假设后端返回了图片 URL
          console.log(response);
          this.$message({
            message: '注册成功',
            type: 'success'
          });
        },
        (error) => {
          console.log("错误", error);
        }
      );
    },
  },
}
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
  display: flex;
  gap: 20px;
}
.form-group {
  margin-bottom: 15px;
}

label {
  margin-right: 10px;
  font-weight: bold;
}

select {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
  height: 50px;
}
.Plan {
  flex: 0 0 20%; /* 占据剩余空间的一半 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.imagesregion {
  flex: 1; /* 占据剩余空间的一半 */
  display: flex;
  flex-direction: column; /* 图片垂直排列 */
  gap: 10px; /* 图片之间的间距 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
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
  width: 250px;
}
button {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
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
  padding: 8px;
  box-sizing: border-box;
}

.submit-btn {
  /* width: 100%; */
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
