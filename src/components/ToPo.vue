<template>
  <div id="map" style="width: 100%; height: 100vh"></div>
</template>

<script>
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
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


</style>
