<template>
<div class="map-container">
  <div id="map" style="width: 100%; height: 100vh;z-index:9;"></div>
  <div class="selectors">
    <form>
      <div>
        <label for="province">省:</label>
        <select id="province" v-model="selectedProvince" @change="updateCities">
          <option value="">请选择省</option>
          <option v-for="(province, index) in provinces" :key="index" :value="province">
            {{ province }}
          </option>
        </select>
      </div>

      <div>
        <label for="city">市:</label>
        <select id="city" v-model="selectedCity" @change="updateCounties">
          <option value="">请选择市</option>
          <option v-for="(city, index) in cities" :key="index" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div>
        <label for="county">县:</label>
        <select id="county" v-model="selectedCounty">
          <option value="">请选择县</option>
          <option v-for="(county, index) in counties" :key="index" :value="county">
            {{ county }}
          </option>
        </select>
      </div>
    </form>
  </div>


</div>
  
  
</template>

<script>
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, computed } from 'vue';

export default {
  setup() {
    // 模拟省市县数据
    const data = {
      "北京": {
        "北京市": ["东城区", "西城区", "朝阳区", "海淀区"]
      },
      "上海": {
        "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区"]
      },
      "广东": {
        "广州市": ["越秀区", "荔湾区", "海珠区", "天河区"],
        "深圳市": ["福田区", "罗湖区", "南山区", "宝安区"]
      }
      // 可以根据需要添加更多省份、城市和县区
    };

    // 响应式数据
    const selectedProvince = ref('');
    const selectedCity = ref('');
    const selectedCounty = ref('');

    // 计算属性，根据选中的省份动态计算城市列表
    const provinces = computed(() => Object.keys(data));

    const cities = computed(() => {
      if (selectedProvince.value && data[selectedProvince.value]) {
        return Object.keys(data[selectedProvince.value]);
      }
      return [];
    });

    const counties = computed(() => {
      if (selectedProvince.value && selectedCity.value && data[selectedProvince.value][selectedCity.value]) {
        return data[selectedProvince.value][selectedCity.value];
      }
      return [];
    });

    // 方法：当选择城市时更新县区（可选，因为使用了计算属性）
    const updateCities = () => {
      selectedCity.value = '';
      selectedCounty.value = '';
    };

    const updateCounties = () => {
      selectedCounty.value = '';
    };

    return {
      selectedProvince,
      selectedCity,
      selectedCounty,
      provinces,
      cities,
      counties,
      updateCities,
      updateCounties
    };
  },
  props: ["all_url"],
  data() {
    return {
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
    };
  },

  created() {
    this.getData();
  },

  mounted() {},

  methods: {
    initMap() {
      console.log("locations:", this.locations, "links:", this.links);
      const map = L.map("map",{zoomControl: false,attributionControl:false}).setView([30.749958, 103.928993], 19); // 设置中心坐标和缩放级别

      // 瓦片图层
      //矢量
      const vectorLayer = L.tileLayer(
        "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          zoomControl: false,
          attributionControl:false,

        }
      ).addTo(map);

//影像层
      const imageLayer = L.tileLayer(
        "https://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          // maxZoom: 18,
          // attribution: "Tiles &copy; Tian Di Tu",
          zoomControl: false,
          attributionControl:false,
        }
      ).addTo(map);
//文字标记层
      const textLayer = L.tileLayer(
        "http://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          // maxZoom: 18,
          // attribution: "Tiles &copy; Tian Di Tu",
          zoomControl: false,
          attributionControl:false,
        }
      ).addTo(map);
      // 添加图层控制
      const baseMaps = {
        矢量图: vectorLayer,
        文字标记层: textLayer,
        影像层: imageLayer,
      };
      

       L.control.layers(baseMaps).addTo(map);
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
        }).addTo(map).bindPopup(`
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
            L.polyline(latLngs, { color: "red", weight: 2 }).addTo(map);
          }
        });
      });
    },
    async getData() {
      console.log("开始获取数据");
      await axios({
        url: "http://127.0.0.1:4999/topology",
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
        }
      );
    },
  },
};
</script>

<style scoped>
/* .leaflet-control-layers-list div label span .leaflet-control-layers-selector{
  width: 0% !important;
  height: 3px !important;
} */
/* .leaflet-control-layers-selector{
    width: 10% !important;
  height: 10px !important;
} */
/* .leaflet-control-layers-list label span .leaflet-control-layers{
  width: 3px;
  height: 3px;
  border: 1px,solid,#000;
} */

.map-container{
  position:relative;
}
.map{
  position:absolute;
  z-index:9;
}
.selectors{
  position:absolute;
  top:5%;
  left:5%;
  z-index:10;
  /* width:200px;
  height:300px;
  border:2px solid #000; */
  padding:10px;
  margin:20px;
  borderRadius:5px;
}

</style>
