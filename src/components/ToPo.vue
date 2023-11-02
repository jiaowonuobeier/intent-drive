<template>
  <div id="main" style="width: 1200px; height: 600px"></div>
</template>

<script>
export default {
  mounted() {
    // 在通过mounted调用即可
    this.echartsInit();
  },
  methods: {
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
            data: [
              {
                name: "MEC_1",
                x: 500,
                y: 300,
              },
              {
                name: "MEC_2",
                x: 300,
                y: 300,
              },
              {
                name: "SL_1",
                x: 800,
                y: 300,
              },
              {
                name: "SL_2",
                x: 550,
                y: 100,
              },
              {
                name: "SL_6",
                x: 550,
                y: 500,
              },
              {
                name: "node40",
                x: 350,
                y: 600,
              },
            ],
            // links: [],
            links: [
              // {
              //   source: 0,
              //   target: 1,
              //   symbolSize: [5, 20],
              //   label: {
              //     show: true,
              //   },
              //   lineStyle: {
              //     width: 5,
              //     curveness: 0.2,
              //   },
              // },
              // {
              //   source: "Node 2",
              //   target: "MEC_1",
              //   label: {
              //     show: true,
              //   },
              //   lineStyle: {
              //     curveness: 0.2,
              //   },
              // },
              {
                source: "SL_1",
                target: "MEC_1",
              },
              {
                source: "SL_1",
                target: "MEC_2",
              },
              {
                source: "SL_2",
                target: "MEC_1",
              },
              {
                source: "SL_6",
                target: "MEC_1",
              },
              {
                source: "node40",
                target: "MEC_1",
              },
            ],
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
