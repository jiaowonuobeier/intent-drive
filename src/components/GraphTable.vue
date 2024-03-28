<template>
  <div>
    <div class="graph" id="main2" style="width: 600px; height: 400px"></div>
    <button @click="update">更新图</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.echartsInit();
  },
  data() {
    return {
      sa_num: 1,
      ip_num: 0,
      se_num: 3,
      co_num: 2,
    };
  },
  methods: {
      update()
      {
        this.sa_num = 5;
        console.log(this.sa_num);
        this.echartsInit();
      },
    echartsInit() {
      //第一个图表
      let myChart2 = this.$echarts.init(document.getElementById("main2"));
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
            data: [this.sa_num, this.ip_num, this.se_num, this.co_num],
            type: "bar",
          },
        ],
      };
      myChart2.setOption(option2);
    },
  },
};
</script>

<style scoped>
.graph {
  display: inline-block;
}
</style>
