<template>
  <div>
    <button @click="test">test</button>
    <el-divider><i class="el-icon-s-order"></i></el-divider>
    <el-table :data="tableData1" stripe style="width: 100%">
      <el-table-column label="网络类型" width="200"
        >自组织网络
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="200">
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" width="200"> </el-table-column>
      <el-table-column prop="freqDefault" label="频率/Hz" width="200">
      </el-table-column>
      <el-table-column prop="baudrateRs485" label="Rs485波特率" width="200">
      </el-table-column>
      <el-table-column prop="audioMicGain" label="音频麦克风增益" width="200">
      </el-table-column>
      <el-table-column prop="pwAtten1" label="天线1发射功率衰减" width="200">
      </el-table-column>
      <el-table-column prop="pwAtten2" label="天线2发射功率衰减" width="200">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
{{ DeviceData.length > 0 ? DeviceData[0].ip : '' }}
 
    <div v-if="todoedit1" class="edit">
      <el-empty :image-size="200"></el-empty>
      修改名称<el-input placeholder="请输入内容" v-model="input1"> </el-input>
      修改地址<el-input placeholder="请输入内容" v-model="input2"> </el-input>
      修改IP<el-input placeholder="请输入内容" v-model="input3"> </el-input>
      <el-button @click="editok" type="text" size="small">完成编辑</el-button>
      <el-button @click="cancelEdit" type="text" size="small"
        >取消编辑</el-button
      >
    </div>

    <el-divider><i class="el-icon-s-order"></i></el-divider>
   
    <el-divider><i class="el-icon-edit"></i></el-divider>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <span>{{ drawer_content }}!</span>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
export default {
   created() {
      setInterval(() => {
        this.getData()
        this.updateData(this.DeviceData)
    }, 2000); 
      
  },
  methods: {
    test() {
      console.log("test");
    },
    updateData(newdata) {
      this.tableData1=newdata
    },
    async getData() {
      console.log("向后端发送数据请求");
    await axios({
      url: "http://192.168.20.107:4999/adhocequips",
    }).then(
      (response) => {
        console.log("后端返回了res");
        this.DeviceData = response.data;
        console.log(this.DeviceData);
      },
      (error) => {
         console.log("后端返回了错误状态码");
         console.log("错误", error);
      }
    );
    },
    cancelEdit() {
      this.todoedit1 = false;
    },
    handleClick(row) {
      console.log(row);
      this.drawer = true;
      this.drawer_content = row;
    },
    handleEdit(row) {
      console.log(row.id);
      this.edit_id = row.id;
      this.todoedit1 = true;
    },
    editok() {
      console.log(this.input1, this.input2, this.input3);
      this.tableData1[this.edit_id - 1].name = this.input1;
      this.tableData1[this.edit_id - 1].address = this.input2;
      this.tableData1[this.edit_id - 1].IP = this.input3;
      this.todoedit1 = false;
    },
  },
  mounted() {
    console.log("像后端发送数据请求");
    // axios({
    //   // method: "post",
    //   url: "http://192.168.20.107:4999/adhocequips",
    //   // params: {
    //   //   id: 1,
    //   // },

    //   // responseType: "json",
    // }).then(
    //   (response) => {
    //     console.log(response.data);
    //     this.tableData1 = response.data;
    //   },
    //   (error) => {
    //     console.log("错误", error);
    //   }
    // );
  },
  data() {
    return {
      DeviceData:[],
      edit_id: 1,
      input1: "",
      input2: "",
      input3: "",

      todoedit1: false,
      drawer: false,
      drawer_content: "暂无",
      tableData1: [
        {
          // type: "自组织网络",
          name: 'enode0',
          freqDefault: 1430000000,
          baudrateRs485: 2500,
          audioMicGain: 25,
          pwAtten1: 86,
          pwAtten2:86
        },
        
      ],
     
    };
  },
};
</script>

<style scoped>
.edit .el-input {
  /* position: absolute; */
  margin-left: 10px;
  width: 300px;
}
</style>