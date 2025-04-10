<template>
  <div class="outer">
    <div class="container">
      <div class="one">
        <div class="card zizuzhi" @click="zizuzhi_change"></div>
        <p1 style="font-weight: bold; font-size: 14px; padding-left: 20px"
          >自组织网络</p1
        >
      </div>
      <div class="one">
        <div class="card jiqun" @click="jiqun_change"></div>
        <p1 style="font-weight: bold; font-size: 14px; padding-left: 20px"
          >集群网络</p1
        >
      </div>
      <div class="one">
        <div class="card ipwangluo" @click="ipwangluo_change"></div>
        <p1 style="font-weight: bold; font-size: 14px; padding-left: 20px"
          >IP网络</p1
        >
      </div>
      <div class="one">
        <div class="card weixing" @click="weixing_change"></div>
        <p1 style="font-weight: bold; font-size: 14px; padding-left: 20px"
          >卫星链路网络</p1
        >
      </div>
    </div>
    <div class="table-container" v-if="zizuzhi_is">
      <h3 @click="openNewPage">自组织网络</h3>
      <table>
        <thead>
          <tr>
            <th>网络类型</th>
            <th>设备名称</th>
            <th>设备状态</th>
            <th>信号强度</th>
            <th>经度</th>
            <th>纬度</th>
            <th>IP地址</th>
            <th>频率/hz</th>
            <th>Rs485波特率</th>
            <th>音频麦克风增益</th>
            <th>天线1发射功率</th>
            <th>天线2发射功率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in tableData1" :key="device.name">
            <td @click="openNewPage">自组织网络</td>
            <td @click="openNewPage">{{ device.name }}</td>
            <td>{{ device.state }}</td>
            <td>{{ device.rssl }}</td>
            <td>{{ device.longitude }}</td>
            <td>{{ device.latitude }}</td>
            <td>{{ device.ip }}</td>
            <td>{{ device.freqDefault }}</td>
            <td>{{ device.baudrateRs485 }}</td>
            <td>{{ device.audioMicGain }}</td>
            <td>{{ device.pwAtten1 }}</td>
            <td>{{ device.pwAtten2 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-container" v-if="jiqun_is">
      <h3>集群网络</h3><button @click="openNewPage3">点击跳转</button>
      <table>
        <thead>
          <tr>
            <th>网络类型</th>
            <th>设备名称</th>
            <th>设备状态</th>
            <th>信号强度</th>
            <th>经度</th>
            <th>纬度</th>
            <th>IP地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in tableData4" :key="device.name">
            <td>集群网络</td>
            <td>{{ device.name }}</td>
            <td>{{ device.state }}</td>
            <td>{{ device.rssl }}</td>
            <td>{{ device.longitude }}</td>
            <td>{{ device.latitude }}</td>
            <td>{{ device.ip }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-container" v-if="weixing_is">
      <h3>卫星链路网络</h3><button @click="openNewPage2">点击跳转</button>
      <table>
        <thead>
          <tr>
            <th>网络类型</th>
            <th>设备名称</th>
            <th>设备状态</th>
            <th>信号强度</th>
            <th>经度</th>
            <th>纬度</th>
            <th>IP地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in tableData2" :key="device.name">
            <td>卫星链路</td>
            <td>{{ device.name }}</td>
            <td>{{ device.state }}</td>
            <td>{{ device.rssl }}</td>
            <td>{{ device.longitude }}</td>
            <td>{{ device.latitude }}</td>
            <td>{{ device.ip }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-container" v-if="ipwangluo_is">
      <h3>IP网络</h3><button @click="openNewPage4">点击跳转</button>
      <table>
        <thead>
          <tr>
            <th>网络类型</th>
            <th>设备名称</th>
            <th>设备状态</th>
            <th>信号强度</th>
            <th>经度</th>
            <th>纬度</th>
            <th>IP地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in tableData3" :key="device.name">
            <td>IP网络</td>
            <td>{{ device.name }}</td>
            <td>{{ device.state }}</td>
            <td>{{ device.rssl }}</td>
            <td>{{ device.longitude }}</td>
            <td>{{ device.latitude }}</td>
            <td>{{ device.ip }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["all_url"],
  created() {
    this.getData();
  },
  methods: {
    openNewPage() {
      // 链接到 public/newpage/index.html
      window.open('/wh604671/index.html', '_blank');
    },
    openNewPage2() {
      window.open('/weixing/index.html', '_blank');
    },
    openNewPage3() {
      window.open('/jiqun/index.html', '_blank');
    },
    openNewPage4() {
      window.open('/ip/index.html', '_blank');
    },
    zizuzhi_change() {
      this.zizuzhi_is = true;
      this.ipwangluo_is = false;
      this.jiqun_is = false;
      this.weixing_is = false;
    },
    ipwangluo_change() {
      this.zizuzhi_is = false;
      this.ipwangluo_is = true;
      this.jiqun_is = false;
      this.weixing_is = false;
    },
    weixing_change() {
      this.zizuzhi_is = false;
      this.ipwangluo_is = false;
      this.jiqun_is = false;
      this.weixing_is = true;
    },
    jiqun_change() {
      this.zizuzhi_is = false;
      this.ipwangluo_is = false;
      this.jiqun_is = true;
      this.weixing_is = false;
    },
    async getData() {
      console.log("向后端发送数据请求");
      await axios({
        url: `http://127.0.0.1:4999/adhocequips`,
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }).then(
        (response) => {
          console.log("后端返回了res");
          console.log(response);
          this.tableData1 = response.data;
          this.num1 = response.data.length;
        },
        (error) => {
          console.log("后端返回了错误状态码");
          console.log("错误", error);
        }
      );
      await axios({
        url: `http://127.0.0.1:4999/clusterequips`,
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }).then(
        (response) => {
          console.log("后端返回了res");
          console.log(response.data);
          this.tableData4 = response.data;
          this.num4 = response.data.length;
        },
        (error) => {
          console.log("后端返回了错误状态码");
          console.log("错误", error);
        }
      );
      await axios({
        url: `http://127.0.0.1:4999/satelliteequips`,
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }).then(
        (response) => {
          console.log("后端返回了res");
          console.log(response.data);
          this.tableData2 = response.data;
          this.num2 = response.data.length;
        },
        (error) => {
          console.log("后端返回了错误状态码");
          console.log("错误", error);
        }
      );
    },
  },
  mounted() {},
  data() {
    return {
      ipwangluo_is: false,
      jiqun_is: false,
      weixing_is: false,
      zizuzhi_is: true,
      edit_id: 1,
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      tableData1: [
        // {
        //   name: "node45",
        //   ip: "192.168.10.45",
        //   state: "on",
        //   rssl: "强",
        //   freqDefault: 1430000000,
        //   baudrateRs485: 2500,
        //   audioMicGain: 25,
        //   pwAtten1: 86,
        //   pwAtten2: 86,
        // },
        // {
        //   name: "node46",
        //   ip: "192.168.10.46",
        //   state: "on",
        //   rssl: "强",
        // },
        // {
        //   name: "node47",
        //   ip: "192.168.10.47",
        //   state: "on",
        //   rssl: "中",
        // },
        // {
        //   name: "node48",
        //   ip: "192.168.10.48",
        //   state: "on",
        //   rssl: "强",
        // },
      ],
      tableData2: [],
      tableData3: [],
      tableData4: [
        {
          name: "cluster1",
          freqDefault: "192.168.166.1",
          status: "开",
          rssl: "高",
        },
      ],
    };
  },
  components: {},
};
</script>

<style scoped>
.el-table {
  font-size: 14px;
  font-weight: bold;
}
.edit .el-input {
  margin-left: 10px;
  width: 300px;
}
.el-row {
  margin-bottom: 0px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #8aaad8;
}
.bg-purple {
  background: #6691c4;
  height: 300px;
}
.bg-purple-light {
  background: #4f5f86;
}
.grid-content {
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.zizuzhi {
  background-image: url("../photo/photobutton3.jpg");
  background-size: cover; /* 图片铺满盒子 */
  background-repeat: no-repeat; /* 图片不重复 */
  background-position: center; /* 图片居中 */
  height: 350px;
}
.ipwangluo {
  background-image: url("../photo/ipwangluo.jpg");
  height: 350px;
}
.jiqun {
  background-image: url("../photo/photobutton2.jpg");
  background-size: cover; /* 图片铺满盒子 */
  background-repeat: no-repeat; /* 图片不重复 */
  background-position: center; /* 图片居中 */
  height: 350px;
}
.weixing {
  background-image: url("../photo/weixing.jpg");
  height: 350px;
}
.outer {
  background-color: #ffffff;
  background-size: cover;
  width: 100%;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
}
.card {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  text-align: center;
  width: 300px;
  height: 300px;
  position: relative;
}
.table-container {
  /* max-width: 800px; */
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
h3 {
  height: 50px;
  border-bottom: #0e7fe9 4px solid;
  /* width: 140px; */
  display: inline-block; /* 设置为行内块元素 */
  font-size: 14px;
  margin: 25px;
}
th,
td {
  padding: 12px 15px;
  text-align: center;
}

th {
  background-color: #687070;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid #0056b3; /* 添加底部边框，使表头更加分明 */
  border-right: 1px solid #949fa5;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #e9ecef;
  transform: scale(1.005);
  transition: transform 0.2s ease-in-out;
}

td {
  border-bottom: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
}

td:last-child {
  border-right: none;
}
*
{
  font-size: 14px;
}
</style>
