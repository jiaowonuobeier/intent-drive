<template>
     <div>
      <!-- <GraphTable></GraphTable> -->
      <div v-for="item in nets" :key="item.id">
        <el-descriptions :title=item direction="vertical" :column="6" border>
           <el-descriptions-item label="Rate" :span="1" ><el-input v-model="Rate" clearable></el-input></el-descriptions-item>
           <el-descriptions-item label="Rateunit" :span="1" ><el-select v-model="Unit" placeholder="请选择"><el-option v-for="item in units" :key=item :value=item></el-option></el-select></el-descriptions-item>
           <el-descriptions-item label="Delay" :span="1"><el-input v-model="Delay" clearable placeholder="ms"></el-input></el-descriptions-item>
           <el-descriptions-item label="DelayVariance" :span="1"><el-input v-model="DelayVariance" clearable placeholder="+-ms"></el-input></el-descriptions-item>
           <el-descriptions-item label="Loss" :span="1" class="lable"><el-input v-model="Loss" clearable placeholder="%"></el-input></el-descriptions-item>
           <el-descriptions-item label="LossCorrelation" :span="1"><el-input v-model="LossCorrelation" clearable placeholder="%"></el-input></el-descriptions-item>
           <el-descriptions-item label="Duplicate" :span="1"><el-input v-model="Duplicate" clearable placeholder="%"></el-input></el-descriptions-item>
           <el-descriptions-item label="Reorder" :span="1"><el-input v-model="Reorder" clearable placeholder="%"></el-input></el-descriptions-item>
           <el-descriptions-item label="ReorderCorrelation" :span="1"><el-input v-model="ReorderCorrelation" clearable placeholder="%"></el-input></el-descriptions-item>
           <el-descriptions-item label="Corrupt" :span="1"><el-input v-model="Corrupt" clearable placeholder="%"></el-input></el-descriptions-item>
           <el-descriptions-item label="Limit" :span="1"><el-input v-model="Limit" clearable placeholder="%"></el-input></el-descriptions-item>
           <!-- <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item> -->
           <el-descriptions-item label="备注" :span="1">
             <el-tag size="small">学校</el-tag>
           </el-descriptions-item >
           <el-descriptions-item :span="1" label="联系地址">四川省成都市电子科技大学</el-descriptions-item>
        </el-descriptions>
        <el-button @click="RemoveRules(item)">清空设置</el-button>
        <el-button @click="ApplyRules(item)" type="primary">应用设置</el-button>
      </div>
     </div>
</template>

<script>
import axios from "axios";
//import GraphTable from "../components/GraphTable.vue";

export default {
    props:['all_url'],
  data() {
    return {
      dataArray: [],
      units: ['Kbps', 'Mbps', 'Gbps'],
      Unit: '',
      nets: ['lo', 'enps10', 'enps90'],
      Rate: '',
      Delay: '',
      DelayVariance: '',
      Loss: '',
      LossCorrelation: '',
      Duplicate: '',
      Reorder: '',
      ReorderCorrelation: '',
      Corrupt: '',
      Limit: '',
    };
  },
  components: {
    //GraphTable,
  },
  mounted() {
    // this.fetchData();
  },
  methods: {
    updateArray()
    {
      this.dataArray = [];
      if (this.Rate != '' && this.Unit != '')
      {
        this.dataArray.push('rate');
        this.dataArray.push(this.Rate+this.Unit);
      }
      if (this.Delay != '')
      {
        this.dataArray.push('delay');
        this.dataArray.push(this.Delay + 'ms');
      }
      if (this.DelayVariance != '')
      {
        // this.dataArray.push('delayVariance');
        this.dataArray.push(this.DelayVariance + 'ms');
      }
      if (this.Loss != '')
      {
        this.dataArray.push('loss');
        this.dataArray.push(this.Loss + '%');
      }
      if (this.LossCorrelation != '')
      {
        // this.dataArray.push('loss_correlation');
        this.dataArray.push(this.LossCorrelation + '%');
      }
      if (this.Duplicate != '')
      {
        this.dataArray.push('duplicate');
        this.dataArray.push(this.Duplicate + '%');
      }
      if (this.Reorder != '')
      {
        this.dataArray.push('reorder');
        this.dataArray.push(this.Reorder + '%');
      }
      if (this.ReorderCorrelation != '')
      {
        // this.dataArray.push('reorder_correlation');
        this.dataArray.push(this.ReorderCorrelation + '%');
      }
      if (this.Corrupt != '')
      {
        this.dataArray.push('corrupt');
        this.dataArray.push(this.Corrupt + '%');
      }
      if (this.Limit != '')
      {
        this.dataArray.push('limit');
        this.dataArray.push(this.Limit);
      }
      console.log(this.dataArray);
    },
    // async fetchData() {
    //   await axios.get('http://your-backend-api-url')
    //     .then(response => {
    //       // 获取到数据后更新Vue实例中的数据
    //       this.nets = response.data;
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //     });
    // },
    async ApplyRules(item) {
      this.updateArray();
      await axios({
        method: "post",
        url: "http://192.168.60.1:4999/tcweb",
        data: {
          device_ipv4: "192.168.20.199",
          dev: item,
          param:this.dataArray
        },
      }).then(
        (response) => {
          console.log("交互成功");
          console.log(response);
          this.$message({
          message: '网络配置成功',
          type: 'success'
        });
        },
        (error) => {
          console.log("发送失败");
          console.log("错误", error);
          this.$message.error('网络配置失败，可能是网络的原因');
        }
      );
    },
    async RemoveRules(item) {
      await axios(
        {
          mothod: 'post',
          url: "http://192.168.60.1:4999/tcweb",
          data: {
          device_ipv4: "192.168.20.199",
          dev: item,
          },
        }
      ).then(
        (response) => {
          console.log("发送成功");
          console.log(response);
        },
        (error) => {
          console.log("发送失败");
          console.log("错误", error);
        }
      );
    }
  }
}
</script>

<style>

</style>