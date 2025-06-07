<template>
<div class="map-container">
  <div id="map" style="width: 100%; height: 100vh;z-index:9;"></div>
  <div class="selectors">
    <form>
      <!-- 省选择器 -->
      <div>
        <label for="province">省:</label>
        <select id="province" v-model="selectedProvince" @change="loadCities">
          <option value="">请选择省</option>
          <option v-for="(province, index) in provinces" :key="index" :value="province">
            {{ province.name }}
          </option>
        </select>
      </div>

      <!-- 市选择器 -->
      <div>
        <label for="city">市:</label>
        <select id="city" v-model="selectedCity" @change="loadCounties">
          <option value="">请选择市</option>
          <option
            v-for="(city, index) in selectedProvince?.cities"
            :key="index"
            :value="city"
          >
            {{ city.name }}
          </option>
        </select>
      </div>

      <!-- 县选择器 -->
      <div>
        <label for="county">县:</label>
        <select id="county" v-model="selectedCounty" @change="updateCoordinates">
          <option value="">请选择县</option>
          <option
            v-for="(county, index) in selectedCity?.counties"
            :key="index"
            :value="county"
          >
            {{ county.name }}
          </option>
        </select>
      </div>

      <!-- 显示选中的经纬度 -->
      <div>
        选中的县: {{ selectedCounty?.name || "未选择" }} <br>
        纬度: {{ selectedLat || "未选择" }}<br>
        经度: {{ selectedLong || "未选择" }}<br>
      </div>
      <button @click="centerOnSelectedRegion">确定</button>
    </form>
  </div>


</div>
  
  
</template>

<script>
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {

  props: ["all_url"],
  data() {
    return {
      map: null,
      selectedlong: 103.928993,
      selectedlat:30.749958, 
      iconMap: {
        cluster: require("../assets/cluster.png"),
        router: require("../assets/router.png"),
        ad_hoc: require("../assets/ad_hoc.png"),
        satellite: require("../assets/satellite.png"),
      },
      locations: [
        {
          type: "cluster",
          state: "on",
          ip: "192.167.20.1",
          rssl: "高",
          latitude: 39.9089,
          longitude: 116.3975,
          name: "天安门",
          iconUrl: require("../assets/computer.png"), //可选：computer，router，phone，server
        },
        {
          type: "ad_hoc",
          state: "on",
          ip: "192.167.20.1",
          rssl: "高",
          latitude: 39.9163,
          longitude: 116.3972,
          name: "故宫",
          iconUrl: require("../assets/server.png"),
        },
        {
          type: "router",
          state: "on",
          ip: "192.167.20.1",
          rssl: "高",
          latitude: 39.8832,
          longitude: 116.409,
          name: "天坛",
          iconUrl: require("../assets/router.png"),
        },
      ],
      links: [
        { from: "天安门", to: "故宫" },
        { from: "故宫", to: "天坛" },
      ],
      polyline: null,
      provinces: [
        {
          name: "广东省",
          cities: [
            {
              name: "深圳市",
              counties: [
                { name: "南山区", latitude: 22.5384, longitude: 113.9312 },
                { name: "福田区", latitude: 22.5415, longitude: 114.0579 },
              ],
            },
            {
              name: "广州市",
              counties: [
                { name: "天河区", latitude: 23.1291, longitude: 113.3245 },
                { name: "越秀区", latitude: 23.1252, longitude: 113.2841 },
              ],
            },
          ],
        },
        {
          name: "湖南省",
          cities: [
            {
              name: "长沙市",
              counties: [
                { name: "岳麓区", latitude: 28.2364, longitude: 112.9458 },
                { name: "芙蓉区", latitude: 28.1741, longitude: 113.0012 },
              ],
            },
            {
              name: "株洲市",
              counties: [
                { name: "天元区", latitude: 28.1741, longitude: 113.0012 },
                { name: "荷塘区", latitude: 27.8541, longitude: 113.1212 },
              ],
            },
          ],
        },
        {
          "name": "北京市",
          "cities": [
            {
              "name": "北京市",
              "counties": [
                { "name": "东城区", "latitude": 39.9289, "longitude": 116.4164 },
                { "name": "西城区", "latitude": 39.9126, "longitude": 116.3684 },
                { "name": "朝阳区", "latitude": 39.9215, "longitude": 116.4431 },
                { "name": "海淀区", "latitude": 39.9588, "longitude": 116.2983 },
                { "name": "丰台区", "latitude": 39.8537, "longitude": 116.2832 }
              ]
            }
          ]
        },
        {
          "name": "四川省",
          "cities": [
            {
              "name": "成都市",
              "counties": [
                { "name": "锦江区", "latitude": 30.6529, "longitude": 104.0815 },
                { "name": "青羊区", "latitude": 30.6792, "longitude": 104.0533 },
                { "name": "金牛区", "latitude": 30.6918, "longitude": 104.0509 },
                { "name": "武侯区", "latitude": 30.6427, "longitude": 104.0489 },
                { "name": "成华区", "latitude": 30.6504, "longitude": 104.1027 }
              ]
            },
            {
              "name": "绵阳市",
              "counties": [
                { "name": "涪城区", "latitude": 31.4618, "longitude": 104.7449 },
                { "name": "游仙区", "latitude": 31.4903, "longitude": 104.7668 },
                { "name": "安州区", "latitude": 31.5337, "longitude": 104.5719 }
              ]
            },
            {
              "name": "乐山市",
              "counties": [
                { "name": "市中区", "latitude": 29.5592, "longitude": 103.7608 },
                { "name": "沙湾区", "latitude": 29.4127, "longitude": 103.5486 },
                { "name": "五通桥区", "latitude": 29.4056, "longitude": 103.8245 }
              ]
            }
          ]
        }
      ],
      selectedProvince: "",
      selectedCity: "",
      selectedCounty: "",
      selectedLat: "",
      selectedLong: "",
    };
  },

  created() {
    this.getData();
  },

  // mounted() {
  //   this.initMap(); // 初始化地图
  // },

  methods: {
    // 加载市
    loadCities() {
      if (this.selectedProvince) {
        this.selectedCity = ""; // 清空市
        this.selectedCounty = ""; // 清空县
        this.selectedLat = ""; // 清空纬度
        this.selectedLong = ""; // 清空经度
      }
    },

    // 加载县
    loadCounties() {
      if (this.selectedCity) {
        this.selectedCounty = ""; // 清空县
        this.selectedLat = ""; // 清空纬度
        this.selectedLong = ""; // 清空经度
      }
    },

    // 更新经纬度
    updateCoordinates() {
      if (this.selectedCounty) {
        this.selectedLat = this.selectedCounty.latitude; // 更新纬度
        this.selectedLong = this.selectedCounty.longitude; // 更新经度
      } else {
        this.selectedLat = ""; // 清空纬度
        this.selectedLong = ""; // 清空经度
      }
    },
    // 确定按钮逻辑
    centerOnSelectedRegion() {
      if (this.selectedLat && this.selectedLong) {
        this.initMap([this.selectedLat, this.selectedLong], 19); // 使用选中的经纬度初始化地图
      } else {
        alert("请先选择省市县！");
      }
    },
    initMap(center = [30.749958, 103.928993], zoom = 19) {
      console.log(123);
      console.log("locations:", this.locations, "links:", this.links);
      if (this.map) {
        this.map.remove();
      }
      this.map = L.map("map",{zoomControl: false,attributionControl:false}).setView(center, zoom); // 设置中心坐标和缩放级别

      // 瓦片图层
      //矢量
      const vectorLayer = L.tileLayer(
        "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          zoomControl: false,
          attributionControl:false,

        }
      ).addTo(this.map);

//影像层
      const imageLayer = L.tileLayer(
        "https://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          // maxZoom: 18,
          // attribution: "Tiles &copy; Tian Di Tu",
          zoomControl: false,
          attributionControl:false,
        }
      ).addTo(this.map);
//文字标记层
      const textLayer = L.tileLayer(
        "http://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          // maxZoom: 18,
          // attribution: "Tiles &copy; Tian Di Tu",
          zoomControl: false,
          attributionControl:false,
        }
      ).addTo(this.map);
      // 添加图层控制
      const baseMaps = {
        矢量图: vectorLayer,
        文字标记层: textLayer,
        影像层: imageLayer,
      };
      

       L.control.layers(baseMaps).addTo(this.map);
      const layersElement = document.querySelector('.leaflet-control-layers');

  // 修改图层选择器的样式
  if (layersElement) {
    const selectors = layersElement.querySelectorAll('.leaflet-control-layers-selector');
    selectors.forEach(selector => {
      selector.style.width = '10px'; // 修改宽度
      selector.style.height = '10px'; // 修改高度
      selector.style.borderRadius = '50%'; // 确保保持圆形
      selector.style.border = '1px solid #000'; // 添加边框
      selector.style.background = 'white'; // 背景颜色
    });
  }
      this.locations.forEach((location) => {
        console.log(location);
        // 添加填充蓝色的圆圈
        // L.circle([location.latitude, location.longitude], {
        //   color: "blue",
        //   fillColor: "blue",
        //   fillOpacity: 0.5,
        //   radius: 10,
        // }).addTo(map);

        // 创建一个可缩放的图标
        const customIcon = L.divIcon({
          className: "custom-icon",
          html: `<img src="${
            this.iconMap[location.type]
          }" style="width: 50px; height: 50px;" />`,
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50],
        });

        // 添加标记并绑定弹出窗口
        L.marker([location.latitude, location.longitude], {
          icon: customIcon,
        }).addTo(this.map).bindPopup(`
    <div class="popup-content" style="font-size: 30px; max-width: 250px;" >  
      <strong>节点名称： ${location.name}</strong><br>
      IP地址:  ${location.ip}<br>
      设备状态:  ${location.state}<br>
      信号强度:  ${location.rssl}<br>
      纬度:  ${location.latitude}<br>
      经度:  ${location.longitude}<br>
    </div>
  `);

        //绘制连接线
        this.links.forEach((link) => {
          const fromLocation = this.locations.find(
            (loc) => loc.name === link.from
          );
          const toLocation = this.locations.find((loc) => loc.name === link.to);

          if (fromLocation && toLocation) {
            const latLngs = [
              [fromLocation.latitude, fromLocation.longitude],
              [toLocation.latitude, toLocation.longitude],
            ];
            L.polyline(latLngs, { color: "red", weight: 2 }).addTo(this.map);
          }
        });
      });
    },
    async getData() {
      console.log("开始获取数据");
      await axios({
        url: "http://192.168.60.1:4999/topology",
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }).then(
        (response) => {
          console.log("后端返回了res");
          console.log(response);
          this.locations = response.data.chartData.locations;
          console.log("locations获取数据成功");
          this.links = response.data.chartData.links;
          console.log("links获取数据成功");
          console.log("获取数据成功");
          console.log("开始绘制地图");
          this.initMap();
        },
        (error) => {
          console.log("后端返回了错误状态码");
          console.log("错误", error);
          this.initMap();
        }
      );
    },
  },
};
</script>

<style scoped>
.map-container{
  position:relative;
}
.map{
  position:absolute;
  z-index:9;
}
.selectors {
  position: absolute;
  top: 2%;
  left: 2%;
  z-index: 10;
  padding: 13px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaeaea;
  max-width: 200px; /* 限制宽度，避免过宽 */
  width: 100%; /* 自适应宽度 */
}

/* 表单布局 */
form {
  display: flex;
  flex-direction: column;
  gap: 0px; /* 增加间距 */
}

</style>
