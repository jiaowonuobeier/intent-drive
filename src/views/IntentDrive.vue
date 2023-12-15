<template>
  <div>
    <!-- form表格是提交的意图 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="意图内容">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="四川省" value="shanghai"></el-option>
          <el-option label="全国范围内" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行时间">
        <el-col :span="5">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.startdate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</el-col
        >
        <el-col :span="5">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.enddate"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="立即发布">
        <el-switch v-model="form.now"></el-switch>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-checkbox-group v-model="form.businesstype">
          <el-checkbox label="互联网接入服务" name="type"></el-checkbox>
          <el-checkbox label="云计算服务" name="type"></el-checkbox>
          <el-checkbox label="数据中心服务" name="type"></el-checkbox>
          <el-checkbox label="电子商务服务" name="type"></el-checkbox>
          <el-checkbox label="其他" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="安全保障">
        <el-radio-group v-model="form.safety">
          <el-radio label="一级"></el-radio>
          <el-radio label="二级"></el-radio>
          <el-radio label="三级"></el-radio>
          <el-radio label="四级"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网络类型">
        <el-radio-group v-model="form.nettype">
          <el-radio label="卫星链路"></el-radio>
          <el-radio label="IP网络"></el-radio>
          <el-radio label="自组织网络"></el-radio>
          <el-radio label="集群网络"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="其他备注">
        <el-input type="textarea" v-model="form.beizhu"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交意图</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
       <el-input v-if="resmeaaage"
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入内容"
  v-model="resmeaaage">
</el-input>


    <el-select v-model="selectplan" placeholder="请选择" @change="selected">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button>查看方案</el-button>
    <el-button @click="publish">发布意图</el-button>
    <!-- 不同意图方案的详细信息 -->
    
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
import axios from 'axios';



export default {
  data() {
    return {
      resmeaaage:'',
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
        text: "意图内容",
        region: "成都",
        startdate: "2023-10-11",
        enddate: "2023-10-12",
        now: false,
        businesstype: ["卫星链路"],
        nettype: "卫星链路",
        safety:'一级',
        beizhu: "暂无",
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
      selectplan: "",
      
    };
  },
  
  methods: {
    selected() {
      console.log("选中了一个plan");
      console.log('Selected value:', this.selectplan);
    },
    async onSubmit() {
      console.log(this.form.text);
      await axios({
         method: "post",
         url: "http://192.168.20.107:4999/intents",
         data: {
           text:this.form.text
        },
        // responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response)
          this.resmeaaage=response.data.message
          // alert(response.data.message)
        },
        (error) => {
          console.log("错误", error);
          alert("意图驱动出错");
        }
      );
    },
    publish() {
      alert("您成功发布了一个意图");
    },
  },
};
</script>

<style>
/* .resmeaaage {
  font-family: sans-serif; 
} */
</style>