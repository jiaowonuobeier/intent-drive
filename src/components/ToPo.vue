<template>
  <div>
    <button @click="getData">刷新拓扑</button>
     <div id="main" style="width: 2000px; height: 800px" ></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
       data: [
        { name: "MEC_1", x: 500, y: 300 },
        { name: "SL_2", x: 600, y: 300 },
        { name: "SL_1", x: 350, y: 300 },
        { name: "IP_4", x: 400, y: 200 },
        { name: "Node_6", x: 400, y: 400 },
      ],
      links: [
        { source: "SL_1", target: "MEC_1" },
        { source: "IP_4", target: "SL_1" },
        { source: "SL_2", target: "MEC_1" },
        { source: "Node_6", target: "SL_1" },
        { source: "IP_4", target: "MEC_1" },
      ],
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
      console.log("像后端发送数据请求");
    await axios({
      url: "http://192.168.20.107:4999/topology",
    }).then(
      (response) => {
        console.log("后端返回了res");
        console.log(response.data.links);
        console.log(response.data.data);
        this.links = response.data.links;
        this.data = response.data.data;
        console.log(this.links);
        console.log(this.data);
        this.echartsInit();
      },
      (error) => {
         console.log("后端返回了错误状态码");
        console.log("错误", error);
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
            symbolSize: 50,
            roam: true,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: this.data,
            links: this.links
             
      ,    
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);     
    },
    
  },
};
</script>

<style scoped>

</style>
