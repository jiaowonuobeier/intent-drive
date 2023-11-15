<template>
  <div>
    <!-- <button @click="test">test</button> -->
    <el-divider><i class="el-icon-s-order"></i></el-divider>
    <el-table :data="tableData1" stripe style="width: 100%">
      <el-table-column label="网络类型" width="200"
        >自组织网络
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="200">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="IP" label="IP地址" width="200"> </el-table-column>
      <el-table-column prop="frequency" label="频率/Hz" width="200">
      </el-table-column>
      <el-table-column prop="Longitude_Latitude" label="经纬度" width="200">
      </el-table-column>
      <el-table-column prop="baudrateRs485" label="波特率" width="200">
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
    <el-table :data="tableData2" stripe style="width: 100%">
      <el-table-column label="网络类型" width="200">卫星链路 </el-table-column>
      <el-table-column prop="name" label="设备名称" width="200">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="IP" label="IP地址" width="200"> </el-table-column>
      <el-table-column prop="frequency" label="频率/Hz" width="200">
      </el-table-column>
      <el-table-column prop="Longitude_Latitude" label="经纬度" width="200">
      </el-table-column>
      <el-table-column prop="baudrateRs485" label="波特率" width="200">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <button>查看</button></el-table-column
      >
    </el-table>
    <el-divider><i class="el-icon-s-order"></i></el-divider>
    <el-table :data="tableData3" stripe style="width: 100%">
      <el-table-column label="网络类型" width="200">IP网络 </el-table-column>
      <el-table-column prop="name" label="设备名称" width="200">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="IP" label="IP地址" width="200"> </el-table-column>
      <el-table-column prop="frequency" label="频率/Hz" width="200">
      </el-table-column>
      <el-table-column prop="Longitude_Latitude" label="经纬度" width="200">
      </el-table-column>
      <el-table-column prop="baudrateRs485" label="波特率" width="200">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <button>查看</button></el-table-column
      >
    </el-table>
    <el-divider><i class="el-icon-s-order"></i></el-divider>
    <el-table :data="tableData4" stripe style="width: 100%">
      <el-table-column label="网络类型" width="200">集群网络 </el-table-column>
      <el-table-column prop="name" label="设备名称" width="200">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="IP" label="IP地址" width="200"> </el-table-column>
      <el-table-column prop="frequency" label="频率/Hz" width="200">
      </el-table-column>
      <el-table-column prop="Longitude_Latitude" label="经纬度" width="200">
      </el-table-column>
      <el-table-column prop="baudrateRs485" label="波特率" width="200">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <button>查看</button></el-table-column
      >
    </el-table>
    <el-divider><i class="el-icon-edit"></i></el-divider>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <span>{{ drawer_content }}!</span>
    </el-drawer>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  methods: {
    // test() {
    //   this.tableData1[1].name = "test";
    // },
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
          id: 1,
          IP: "192.168.168.41",
          name: "node40",
          address: "四川省成都市郫都区银杏大道",
          frequency: 1420000000,
          Longitude_Latitude: "30.752464,103.930135",
          baudrateRs485: 2400,
        },
        {
          // type: "自组织网络",
          id: 2,
          IP: "192.168.168.41",
          name: "offienet1",
          address: "四川省成都市郫都区水杉路",
          frequency: 1420000000,
          Longitude_Latitude: "30.751422,103.924817",
          baudrateRs485: 2400,
        },
        {
          // type: "自组织网络",id:1,
          id: 3,
          IP: "192.168.168.41",
          name: "Fiberswitch1",
          address: "四川省成都市郫都区西源大道1277-18号",
          frequency: 1420000000,
          Longitude_Latitude: "30.743519,103.924579",
          baudrateRs485: 2400,
        },
      ],
      tableData2: [
        {
          // type: "卫星链路",
          IP: "192.168.168.41",
          name: "star1",
          address: "天上",
          frequency: 1420000000,
          Longitude_Latitude: "天上",
          baudrateRs485: 2400,
        },
        {
          // type: "卫星链路",
          IP: "192.168.168.41",
          name: "gserver",
          address: "四川省成都市郫都区丹桂路",
          frequency: 1420000000,
          Longitude_Latitude: "30.752976,103.930287",
          baudrateRs485: 2400,
        },
        {
          // type: "卫星链路",
          IP: "192.168.168.41",
          name: "DModulator1",
          address: "四川省成都市郫都区天润路796号",
          frequency: 1420000000,
          Longitude_Latitude: "30.755069,103.934092",
          baudrateRs485: 2400,
        },
        {
          // type: "卫星链路",
          IP: "192.168.168.41",
          name: "WatchPC",
          address: "四川省成都市郫都区天润路796号",
          frequency: 1420000000,
          Longitude_Latitude: "30.755069,103.934092",
          baudrateRs485: 2400,
        },
      ],
      tableData3: [
        {
          // type: "IP网络",
          IP: "192.168.168.41",
          name: "PC1",
          address: "四川省成都市郫都区银杏大道",
          frequency: 1420000000,
          Longitude_Latitude: "30.751868,103.933793",
          baudrateRs485: 2400,
        },
        {
          // type: "IP网络",
          IP: "192.168.168.41",
          name: "Websever1",
          address: "四川省成都市郫都区天润路796号",
          frequency: 1420000000,
          Longitude_Latitude: "30.755069,103.934092",
          baudrateRs485: 2400,
        },
        {
          // type: "IP网络",
          IP: "192.168.168.41",
          name: "PC2",
          address: "四川省成都市郫都区丹桂路",
          frequency: 1420000000,
          Longitude_Latitude: "30.752976,103.930287",
          baudrateRs485: 2400,
        },
      ],
      tableData4: [
        {
          // type: "集群网络",
          IP: "192.168.168.41",
          name: "camera1",
          address: "四川省成都市成华区秀苑路",
          frequency: 1420000000,
          Longitude_Latitude: "30.675669,104.100217",
          baudrateRs485: 2400,
        },
        {
          // type: "集群网络",
          IP: "192.168.168.41",
          name: "PC3",
          address: "四川省成都市成华区建设北路二段",
          frequency: 1420000000,
          Longitude_Latitude: "30.67416,104.101139",
          baudrateRs485: 2400,
        },
        {
          // type: "集群网络",
          IP: "192.168.168.41",
          name: "Wlan",
          address: "四川省成都市成华区一环路东159号电子信息产业大厦",
          frequency: 1420000000,
          Longitude_Latitude: "30.673584,104.098326",
          baudrateRs485: 2400,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* .el-empty {
  position: relative;
}
.el-empty .edit {
  position: absolute;
  left: 10px;
} */
.edit .el-input {
  /* position: absolute; */
  margin-left: 10px;
  width: 300px;
}
</style>