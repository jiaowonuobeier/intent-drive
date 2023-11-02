<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="意图内容">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行时间">
        <el-col :span="5">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</el-col
        >
        <el-col :span="5">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="互联网接入服务" name="type"></el-checkbox>
          <el-checkbox label="云计算服务" name="type"></el-checkbox>
          <el-checkbox label="数据中心服务" name="type"></el-checkbox>
          <el-checkbox label="电子商务服务" name="type"></el-checkbox>
          <el-checkbox label="其他" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="安全保障">
        <el-radio-group v-model="form.resource">
          <el-radio label="一级"></el-radio>
          <el-radio label="二级"></el-radio>
          <el-radio label="三级"></el-radio>
          <el-radio label="四级"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网络类型">
        <el-radio-group v-model="form.resource">
          <el-radio label="卫星链路"></el-radio>
          <el-radio label="IP网络"></el-radio>
          <el-radio label="自组织网络"></el-radio>
          <el-radio label="集群网络"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="其他备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button>查看意图</el-button>
    <el-button @click="publish">发布意图</el-button>
    <!-- 不同意图方案的详细信息 -->
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
    <!-- 展示具体意图进行流程   -->
    <div class="block">
      <div class="radio">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>

      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
      form: {
        name: "意图内容",
        region: "成都",
        date1: "2023-10-11",
        date2: "2023-10-12",
        delivery: false,
        type: ["卫星链路"],
        resource: "卫星链路",
        desc: "暂无",
      },
      options: [
        {
          value: "选项1",
          label: "方案一",
        },
        {
          value: "选项2",
          label: "方案二",
        },
        {
          value: "选项3",
          label: "方案三",
        },
        {
          value: "选项4",
          label: "方案四",
        },
        {
          value: "选项5",
          label: "方案五",
        },
      ],
      value: "",
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
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    publish() {
      alert("您成功发布了一个意图");
    },
  },
};
</script>

<style>
</style>