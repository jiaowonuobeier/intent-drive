<template>
  <div>
    <div class="graph" id="main1" style="width: 600px; height: 400px"></div>
    <div class="graph" id="main2" style="width: 600px; height: 400px"></div>
  </div>
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
      let myChart1 = this.$echarts.init(document.getElementById("main1"));
      // 指定图表的配置项和数据
      let option1 = {
        title: {
          left: "center",
          text: "MEC(多接入网关)功率消耗",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
      // 第二个图标
      let myChart2 = this.$echarts.init(document.getElementById("main2"));
      // 指定图表的配置项和数据
      let option2 = {
        title: {
          left: "center",
          text: "各网络接入设备数量",
        },
        xAxis: {
          type: "category",
          data: ["卫星链路", "IP网络", "自组织网络", "集群网络"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80],
            type: "bar",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  display: inline-block;
}
</style>
