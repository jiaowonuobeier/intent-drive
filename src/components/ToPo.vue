<template>
  <div class="container">
    <div class="map-container">
      <div id="map"></div>
    </div>
    <div class="selectors">
      <form>
        <div>
          <label for="province">省:</label>
          <select id="province" v-model="selectedProvince" @change="updateMapView">
            <option value="">请选择省</option>
            <option v-for="(province, index) in provinces" :key="index" :value="province">
              {{ province }}
            </option>
          </select>
        </div>

        <div>
          <label for="city">市:</label>
          <select id="city" v-model="selectedCity" @change="updateMapView">
            <option value="">请选择市</option>
            <option v-for="(city, index) in cities" :key="index" :value="city">
              {{ city }}
            </option>
          </select>
        </div>

        <div>
          <label for="county">县:</label>
          <select id="county" v-model="selectedCounty" @change="updateMapView">
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
import { ref, computed, onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 模拟地理坐标数据
const geoData = {
  "北京": {
    "北京市": [
      { name: "东城区", latitude: 39.93923, longitude: 116.397428 },
      { name: "西城区", latitude: 39.933, longitude: 116.36583 },
      { name: "朝阳区", latitude: 39.92, longitude: 116.43 },
      { name: "丰台区", latitude: 39.857, longitude: 116.275 },
      { name: "石景山区", latitude: 39.93, longitude: 116.19 },
      { name: "海淀区", latitude: 39.983, longitude: 116.316 },
      { name: "门头沟区", latitude: 39.99, longitude: 116.1 },
      { name: "房山区", latitude: 39.75, longitude: 116.13 },
      { name: "通州区", latitude: 39.92, longitude: 116.65 },
      { name: "顺义区", latitude: 40.13, longitude: 116.65 },
      { name: "昌平区", latitude: 40.22, longitude: 116.23 },
      { name: "大兴区", latitude: 39.73, longitude: 116.34 },
      { name: "怀柔区", latitude: 40.32, longitude: 116.63 },
      { name: "平谷区", latitude: 40.14, longitude: 117.12 },
      { name: "密云区", latitude: 40.37, longitude: 116.84 },
      { name: "延庆区", latitude: 40.46, longitude: 115.98 }
    ]
  },
  "上海": {
    "上海市": [
      { name: "黄浦区", latitude: 31.2304, longitude: 121.4737 },
      { name: "徐汇区", latitude: 31.1987, longitude: 121.438 },
      { name: "长宁区", latitude: 31.219, longitude: 121.431 },
      { name: "静安区", latitude: 31.229, longitude: 121.448 },
      { name: "普陀区", latitude: 31.263, longitude: 121.401 },
      { name: "虹口区", latitude: 31.275, longitude: 121.496 },
      { name: "杨浦区", latitude: 31.296, longitude: 121.523 },
      { name: "闵行区", latitude: 31.113, longitude: 121.384 },
      { name: "宝山区", latitude: 31.405, longitude: 121.483 },
      { name: "嘉定区", latitude: 31.383, longitude: 121.244 },
      { name: "浦东新区", latitude: 31.233, longitude: 121.505 },
      { name: "金山区", latitude: 30.741, longitude: 121.343 },
      { name: "松江区", latitude: 31.031, longitude: 121.224 },
      { name: "青浦区", latitude: 31.123, longitude: 121.121 },
      { name: "奉贤区", latitude: 30.922, longitude: 121.473 },
      { name: "崇明区", latitude: 31.624, longitude: 121.398 }
    ]
  },
  // 你可以根据需要添加更多省份、城市和县区的坐标
};

export default {
  name: 'App',
  setup() {
    // 响应式数据
    const selectedProvince = ref('');
    const selectedCity = ref('');
    const selectedCounty = ref('');

    // 计算属性，根据选中的省份动态计算城市列表
    const provinces = computed(() => Object.keys(geoData));

    const cities = computed(() => {
      if (selectedProvince.value && geoData[selectedProvince.value]) {
        return Object.keys(geoData[selectedProvince.value]);
      }
      return [];
    });

    const counties = computed(() => {
      if (selectedProvince.value && selectedCity.value && geoData[selectedProvince.value][selectedCity.value]) {
        // 假设县区列表与城市相同，你可以根据实际数据调整
        return Object.keys(geoData[selectedProvince.value][selectedCity.value]);
      }
      // 如果没有县区数据，返回空数组或根据需要处理
      return [];
    });

    // Leaflet 地图实例
    const map = ref(null);

    // 初始化地图
    onMounted(() => {
      map.value = L.map('map', { zoomControl: false, attributionControl: false }).setView([23.1291, 113.2644], 5); // 默认中心坐标和缩放级别

      // 瓦片图层（天地图矢量）
      const vectorLayer = L.tileLayer(
        "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          zoomControl: false,
          attributionControl: false,
        }
      ).addTo(map.value);

      // 影像层（天地图影像）
      const imageLayer = L.tileLayer(
        "https://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          zoomControl: false,
          attributionControl: false,
        }
      );

      // 文字标记层（天地图标注）
      const textLayer = L.tileLayer(
        "http://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=d49d49c6107ff70ca82626293ecb64e0",
        {
          zoomControl: false,
          attributionControl: false,
        }
      );

      // 添加图层控制
      const baseMaps = {
        矢量图: vectorLayer,
        影像层: imageLayer,
        文字标记层: textLayer,
      };

      L.control.layers(baseMaps, null, { collapsed: false }).addTo(map.value);

      // 修改图层选择器的样式
      const layersElement = document.querySelector('.leaflet-control-layers');
      if (layersElement) {
        const selectors = layersElement.querySelectorAll('.leaflet-control-layers-selector');
        selectors.forEach(selector => {
          selector.style.width = '12px';
          selector.style.height = '12px';
          selector.style.borderRadius = '50%';
          selector.style.border = '1px solid #000';
          selector.style.background = 'white';
        });
      }
    });

    // 方法：更新地图视图到选中的地点中心
    const updateMapView = () => {
      if (!map.value) return;

      let latitude = 0;
      let longitude = 0;
      let zoomLevel = 5; // 默认缩放级别

      if (selectedCounty.value) {
        const countyData = geoData[selectedProvince.value]?.[selectedCity.value]?.[selectedCounty.value];
        if (countyData) {
          latitude = countyData.latitude;
          longitude = countyData.longitude;
          zoomLevel = 10; // 县区级别缩放
        }
      } else if (selectedCity.value) {
        const cityData = geoData[selectedProvince.value]?.[selectedCity.value];
        if (cityData) {
          latitude = cityData.latitude;
          longitude = cityData.longitude;
          zoomLevel = 8; // 城市级别缩放
        }
      } else if (selectedProvince.value) {
        // 如果只有省份，取该省份下第一个城市的坐标
        const firstCity = Object.keys(geoData[selectedProvince.value])[0];
        const provinceData = geoData[selectedProvince.value][firstCity];
        if (provinceData) {
          latitude = provinceData.latitude;
          longitude = provinceData.longitude;
          zoomLevel = 6; // 省份级别缩放
        }
      }

      if (latitude && longitude) {
        map.value.setView([latitude, longitude], zoomLevel);
        
        // 移除之前的标记（如果存在）
        if (window.marker) {
          map.value.removeLayer(window.marker);
        }

        // 添加新的标记
        window.marker = L.marker([latitude, longitude]).addTo(map.value)
          .bindPopup(`<strong>地点：</strong>${selectedCounty.value || selectedCity.value || selectedProvince.value}`)
          .openPopup();
      }
    };

    // 监听选择变化，自动更新地图视图
    watch([selectedProvince, selectedCity, selectedCounty], updateMapView);

    return {
      selectedProvince,
      selectedCity,
      selectedCounty,
      provinces,
      cities,
      counties,
      updateMapView,
    };
  },
};
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh; /* 设置容器高度为视口高度 */
}

.map-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 70%; /* 地图占据70%宽度 */
  height: 100%;
  z-index: 9;
}

.selectors {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 250px; /* 设置选择器的宽度 */
}

.selectors form div {
  margin-bottom: 10px;
}

label {
  margin-right: 5px;
  font-weight: bold;
}

select {
  padding: 5px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

/* Leaflet 控件样式调整 */
.leaflet-control-layers-list label span .leaflet-control-layers-selector {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #000;
  background: white;
  margin-right: 5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .map-container {
    width: 100%;
    height: 80vh;
  }

  .selectors {
    width: 100%;
    top: auto;
    bottom: 0;
    border-radius: 0;
  }
}
</style>