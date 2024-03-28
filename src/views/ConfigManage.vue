<template>
  <div>
    <!-- 这里选择配置类型 -->
    <TypeSelector @transfer="getValue"></TypeSelector>
     用户选择了此类配置，配置编号为：{{ getvalue }}
     <h3>修改自组织节点</h3>
     <div>
      <table>
        <tr>
          <td class="first">发起人：</td><td><el-input v-model="formInline9.user"></el-input></td><td class="first">修改目标节点名称：</td><td><el-input v-model="formInline9.name"></el-input></td>
        </tr>
        <tr>
          <td class="first">RS485波特率：</td><td><el-input v-model="formInline9.baudrateRs485"></el-input></td><td class="first">音频麦克风增益：</td><td><el-input v-model="formInline9.audioMicGain"></el-input></td>
        </tr>
        <tr>
          <td class="first">天线1发射功率衰减值：</td><td><el-input v-model="formInline9.pwAtten1"></el-input></td><td class="first">天线2发射功率衰减值：</td><td><el-input v-model="formInline9.pwAtten2"></el-input></td>
        </tr>
        <tr>
          <td class="first">UART0波特率：</td><td><el-select v-model="formInline9.uartBaudrate0">
               <el-option label="300" value=300></el-option>
               <el-option label="600" value=600></el-option>
               <el-option label="1200" value=1200></el-option>
               <el-option label="2400" value=2400></el-option>
               <el-option label="4800" value=4800></el-option>
               <el-option label="9600" value=9600></el-option>
               <el-option label="19200" value=19200></el-option>
               <el-option label="38400" value=38400></el-option>
               <el-option label="57600" value=57600></el-option>
               <el-option label="115200" value=115200></el-option>
               <el-option label="230400" value=230400></el-option>
             </el-select></td> <td class="first">UART1波特率：</td><td><el-select v-model="formInline9.uartBaudrate1">
               <el-option label="300" value=300></el-option>
               <el-option label="600" value=600></el-option>
               <el-option label="1200" value=1200></el-option>
               <el-option label="2400" value=2400></el-option>
               <el-option label="4800" value=4800></el-option>
               <el-option label="9600" value=9600></el-option>
               <el-option label="19200" value=19200></el-option>
               <el-option label="38400" value=38400></el-option>
               <el-option label="57600" value=57600></el-option>
               <el-option label="115200" value=115200></el-option>
               <el-option label="230400" value=230400></el-option>
             </el-select></td>
        </tr>
        <tr>
          <td class="first">UART2波特率：</td><td><el-select v-model="formInline9.uartBaudrate2" >
               <el-option label="300" value=300></el-option>
               <el-option label="600" value=600></el-option>
               <el-option label="1200" value=1200></el-option>
               <el-option label="2400" value=2400></el-option>
               <el-option label="4800" value=4800></el-option>
               <el-option label="9600" value=9600></el-option>
               <el-option label="19200" value=19200></el-option>
               <el-option label="38400" value=38400></el-option>
               <el-option label="57600" value=57600></el-option>
               <el-option label="115200" value=115200></el-option>
               <el-option label="230400" value=230400></el-option>
             </el-select></td>
        </tr>
      </table>
      <el-button type="primary" @click="onSubmit9">确认修改</el-button>
     </div>


     <h3>修改IP</h3>
     <div class="connect">
        <span>选择代理序号：</span><span><el-input v-model="num1"></el-input></span>
        <span>选择代理网口：</span><span><el-input v-model="net_card"></el-input></span>
        <span>设置网口IP：</span><span><el-input v-model="net_ip"></el-input></span>
     </div>
     <el-button type="primary" @click="onSubmit10">确认修改</el-button>
     <h3>查询网络信息</h3>
     <div class="connect">
        <span>选择代理序号：</span><span><el-input></el-input></span>
     </div>
     <el-button type="primary" @click="onSubmit11">确认查询</el-button>
  </div>
</template>

<script>
import TypeSelector from "../components/TypeSelector.vue";
import axios from "axios";
export default {
  data () {
    return {
      num1: '',
      net_card: '',
      net_ip: '',
      num2:'',
      formInline9: {
        user: '',
        name:'',
        pwAtten1: '',
        pwAtten2:'',
        audioMicGain:'',
        baudrateRs485:'',
        uartBaudrate0: '',
        uartBaudrate1: '',
        uartBaudrate2:'',
        },
       getvalue:0
     }
   },
  components: {
    TypeSelector,
  },
   methods:{
     getValue(getvalue){
       this.getvalue= getvalue
     },
    async onSubmit9() {
      try {
        const response = await axios.post(`http://192.168.20.199:4999/adhocequip/${this.formInline9.name}`, {
          baudrateRs485: Number(this.formInline9.baudrateRs485),
          pwAtten1: Number(this.formInline9.pwAtten1),
          pwAtten2: Number(this.formInline9.pwAtten2),
          audioMicGain: Number(this.formInline9.audioMicGain),
          uartBaudrate0: Number(this.formInline9.uartBaudrate0),
          uartBaudrate1: Number(this.formInline9.uartBaudrate1),
          uartBaudrate2: Number(this.formInline9.uartBaudrate2),
        });
        console.log(this.formInline9);
        console.log(response.data);
        this.$message.success('Successfully modified data on the node.');
      } catch (error) {
        console.error('Error modifying data on the node:', error);
        this.$message.error('Failed to modify data on the node.');
      }
     },
     async onSubmit10() {
      await axios({
        method: "post",
        url: "http://192.168.20.199:4999/login",
        data: {
          device_id: Number(this.num1),
          net_card: this.net_card,
          ip:this.net_ip
        },
        responseType: "json",
      }).then(
        (response) => {
          console.log("正确", response);
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        },
        (error) => {
          console.log("错误", error);
           this.$message.error('用户名或密码错误');
        }
      );
    },
     async onSubmit11() {
      await axios({
        method: "post",
        url: "http://192.168.20.199:4999/login",
        data: {
          device_id: Number(this.num2),
        },
        responseType: "json",
      }).then(
        (response) => {
          console.log("正确", response);
          this.$message({
          message: '登陆成功',
          type: 'success'
        });
        },
        (error) => {
          console.log("错误", error);
           this.$message.error('用户名或密码错误');
        }
      );
    },
  },

}

</script>

<style>
.connect
{
  display: flex;
}
table
{
  border-collapse: collapse;
  border: 1px solid black;
}
td 
{
  border: 1px solid black; /* 设置单元格内边框 */
  padding: 5px; /* 设置单元格内边距 */
}
table tr .first
{
  background-color:rgb(3,35,70,0.8);
  color: aliceblue;
}
</style>