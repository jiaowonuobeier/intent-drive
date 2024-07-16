<template>
  <div>
    <button @click="getData" class="refresh-button">刷新拓扑</button>
    <div id="main" style="width: 2000px; height: 100vh"></div>
    <div v-if="selectedNode" class="node-info">
      <p>节点名称：{{ selectedNode.name }}</p>
      <h3>设备状态：{{ selectedNode.info.state }}</h3>
      <h3>IP地址：{{ selectedNode.info.ip }}</h3>
      <h3>信号强度：{{ selectedNode.info.rssl }}</h3>
      <h3>经度：{{ selectedNode.info.longitude }}</h3>
      <h3>纬度：{{ selectedNode.info.latitude }}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["all_url"],
  data() {
    return {
      selectedNode: null,
      chartData: {
         nodes: [
          { name: 'Node 1', symbolType: "circle", x: 100, y: 100, info:'自组织网络' },
          { name: 'Node 2', symbolType: "circle", x: 200, y: 200, info:'jiqun网络' },
          { name: 'Node 3', symbolType: "circle", x: 300, y: 100, info:'自组织网络'  },
          { name: 'Node 4', symbolType: "circle", x: 400, y: 200, info:'自组织网络'  },
          { name: 'Node 5', symbolType: "diamond", x: 500, y: 100, info:'自组织网络' }
        ],
        links: [
          { source: 'Node 1', target: 'Node 2' },
          { source: 'Node 2', target: 'Node 3' },
          { source: 'Node 3', target: 'Node 4' },
          { source: 'Node 4', target: 'Node 5' },
          { source: 'Node 5', target: 'Node 1' }
        ]
      }
    };
  },

  created() {
    this.getData();
  },
  mounted() {
    console.log("开始渲染图表");
  },

  methods: {
    async getData() {
      await axios({
        url: "https://blatantly-relaxing-cougar.ngrok-free.app/topology",
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }).then(
        (response) => {
          console.log("后端返回了res");
          console.log(response);
          this.chartData = response.data.chartData;
          console.log(this.chartData);
          this.echartsInit();
        },
        (error) => {
          console.log("后端返回了错误状态码");
          console.log("错误", error);
          this.echartsInit();
        }
      );
    },

    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "拓扑图",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 70,
            roam: true,
            label: {
              show: true,
              fontSize: 16,
              color: "#000000",
              fontWeight: "bold",
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 90,
            },
            itemStyle: {
              color: "#34a1eb", // 节点圆点颜色
            },
            data: this.chartData.nodes.map((node) => ({
              name: node.name,
              symbol: node.symbolType,
              x: node.x,
              y: node.y,
              info:node.info
            })),
            links: this.chartData.links,
            lineStyle: {
              opacity: 0.9,
              width: 5,
              curveness: 0,
              color: "#000000",
            },
          },
        ],
      };
      myChart.on('click', params => {
        if (params.dataType === 'node') {
          this.selectedNode = params.data;
          console.log("chufa");
        } else {
          this.selectedNode = null;
        }
      });
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>

.node-info {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 20px;
  background: linear-gradient(to right, #d2ffe3 0%, #8ad4f1 100%);
  border: 2px solid #4CAF50;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: left;
  overflow-y: auto;
  max-height: 80vh;
  transition: all 0.3s ease;
}

.node-info p {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.node-info h3 {
  font-size: 16px;
  color: #666666;
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5px 10px;
  border-radius: 5px;
}

.node-info h3:first-of-type {
  margin-top: 0;
}

.node-info h3:last-of-type {
  margin-bottom: 0;
}

.node-info h3:nth-of-type(odd) {
  background-color: rgba(255, 255, 255, 0.8);
}

.node-info:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
