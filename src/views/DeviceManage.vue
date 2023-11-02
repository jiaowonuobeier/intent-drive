<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" label="所在网络" width="300">
    </el-table-column>
    <el-table-column prop="name" label="设备名称" width="300">
    </el-table-column>
    <el-table-column prop="address" label="IP地址" width="300">
    </el-table-column>
    <el-table-column prop="" label="操作">
      <button>查看</button></el-table-column
    >
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "192.168.0.1",
          name: "SL1",
          address: "192.168.0.100",
        },
        {
          date: "203.0.113.1",
          name: "IP2",
          address: "203.0.113.10",
        },
        {
          date: "192.168.0.1",
          name: "SL2",
          address: "192.168.0.101",
        },
        {
          date: "203.0.113.1",
          name: "IP1",
          address: "203.0.113.11",
        },
      ],
    };
  },
};
</script>

<style>
</style>