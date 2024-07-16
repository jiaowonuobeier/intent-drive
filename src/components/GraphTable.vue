<template>
  <div>
    <div class="graph" id="main2" style="width: 600px; height: 400px"></div>
    <button @click="update">更新图</button>
  </div>
</template>

<script>
export default {
  props: {
    num1: Number,
    num2: Number,
    num3: Number,
    num4: Number,
  },
  mounted() {
    this.echartsInit();
  },
  watch: {
    num1: {
      immediate: true, // 立即执行一次，即初始时也执行一次
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          // 数据变化时执行初始化图表的方法
          this.echartsInit();
        }
      }
    },
    num2: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.echartsInit();
        }
      }
    },
    num3: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.echartsInit();
        }
      }
    },
    num4: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.echartsInit();
        }
      }
    }
  },
  data() {
    return {
      // sa_num: 0,
      // ip_num: 0,
      // se_num: 1,
      // co_num: 1,
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
          data: ["自组织网络", "IP网络", "卫星链路", "集群网络"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [this.num1, this.num2, this.num3, this.num4],
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
