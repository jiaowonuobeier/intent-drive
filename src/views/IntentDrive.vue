<template>
  <div>
    <span>请选择您的意图</span>
    <el-select v-model="value_intent" placeholder="请选择"><el-option v-for="item in IntentContents" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select><br>
    <span>请输入您的意图：</span> <el-input placeholder="请输入文本"></el-input>
    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="来自网络的反馈在这里" v-model="resmeaaage"></el-input>
    <el-button type="primary" @click="onSubmit">发布意图</el-button>
  </div>
</template>

<script>
import axios from 'axios';



export default {
  data() {
    return {
      resmeaaage:'',
      IntentContents: [{
         value: '建立自组织网络与集群网络之间的连接',
         label: '建立自组织网络与集群网络之间的连接'
       }, {
         value: '查看1号意图驱动代理的网络信息',
         label: '查看1号意图驱动代理的网络信息'
       }, {
         value: '关闭自组织网络与集群网络之间的连接',
         label: '关闭自组织网络与集群网络之间的连接'
       }, {
         value: '将自组织网节点node40的音频麦克风增益修改为50',
         label: '将自组织网节点node40的音频麦克风增益修改为50'
       }],
       value_intent: '',
    };
  },
  
  methods: {
    selected() {
      console.log("选中了一个plan");
      console.log('Selected value:', this.selectplan);
    },
    async onSubmit() {
      console.log(this.value_intent);
      await axios({
         method: "post",
         url: "http://192.168.20.107:4999/intents",
         data: {
           text:this.value_intent
        },
        // responseType: "json",
      }).then(
        (response) => {
          console.log("收到意图", response)
          this.resmeaaage = response.data.message
          alert("您成功发布了一个意图");
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
span{
  margin-right: 20px;
}
</style>