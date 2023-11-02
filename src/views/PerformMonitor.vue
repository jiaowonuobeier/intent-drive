<template>
  <div>
    <el-table :data="tableData" height="500" border style="width: 100%">
      <el-table-column prop="date" label="设备" width="180"> </el-table-column>
      <el-table-column prop="name" label="网络" width="180"> </el-table-column>
      <el-table-column label="操作"><button>查看状态</button> </el-table-column>
    </el-table>
    <GraphTable></GraphTable>
  </div>
</template>

<script>
import GraphTable from "../components/GraphTable.vue";

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          //   name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          //   name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          //   name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          //   name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          //   name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          //   name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          //   name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  components: {
    GraphTable,
  },
};
</script>

<style>
</style>