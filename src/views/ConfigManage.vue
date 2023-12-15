<template>
  <div>
    <!-- 这里选择配置类型 -->
    <TypeSelector @transfer="getValue"></TypeSelector>
     用户选择了此类配置，配置编号为：{{ getvalue }}
     <div v-if="getvalue===9">
      <el-form :inline="true" :model="formInline9" class="demo-form-inline">
         <el-form-item label="发起人">
           <el-input v-model="formInline9.user" placeholder="发起人"></el-input>
         </el-form-item>
         <el-form-item label="修改目标节点名称">
           <el-input v-model="formInline9.name" placeholder="修改目标节点名称"></el-input>
         </el-form-item>
          <br>
         <el-form-item label="RS485波特率">
           <el-input v-model="formInline9.baudrateRs485" placeholder="RS485波特率"></el-input>
         </el-form-item>
         <el-form-item label="音频麦克风增益">
           <el-input v-model="formInline9.audioMicGain" placeholder="音频麦克风增益"></el-input>
         </el-form-item>
         <el-form-item label="天线1发射功率衰减值">
           <el-input v-model="formInline9.pwAtten1" placeholder="天线1发射功率衰减值"></el-input>
         </el-form-item>
          <br>
         <el-form-item label="天线2发射功率衰减值">
           <el-input v-model="formInline9.pwAtten2" placeholder="天线2发射功率衰减值"></el-input>
         </el-form-item>
          <el-form-item label="UART0波特率">
             <el-select v-model="formInline9.uartBaudrate0" placeholder="UART0波特率">
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
             </el-select>
          </el-form-item>
         <el-form-item label="UART1波特率">
             <el-select v-model="formInline9.uartBaudrate1" placeholder="UART0波特率">
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
             </el-select>
          </el-form-item>
         <el-form-item label="UART2波特率">
             <el-select v-model="formInline9.uartBaudrate2" placeholder="UART2波特率">
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
             </el-select>
          </el-form-item>
         <br>
         <el-form-item>
           <el-button type="primary" @click="onSubmit9">确认修改</el-button>
         </el-form-item>
      </el-form>
      
     </div>
     <button @click="onSubmit9">test</button>
  </div>
</template>

<script>
import TypeSelector from "../components/TypeSelector.vue";
import axios from "axios";
export default {
  data () {
    return {
      formInline9: {
        user: 'tzh',
        name:'node40',
        pwAtten1: 86,
        pwAtten2:86,
        audioMicGain:30,
        baudrateRs485:2500,
        uartBaudrate0: 57600,
        uartBaudrate1: 600,
        uartBaudrate2:2400,
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
        // http://192.168.168.41/config
        // http://192.168.20.107:4999/adhocequip/${this.formInline9.name}
        const response = await axios.post(`http://192.168.20.107:4999/adhocequip/${this.formInline9.name}`, {
          baudrateRs485: Number(this.formInline9.baudrateRs485),
          pwAtten1: Number(this.formInline9.pwAtten1),
          pwAtten2: Number(this.formInline9.pwAtten2),
          audioMicGain: Number(this.formInline9.audioMicGain),
          uartBaudrate0: Number(this.formInline9.uartBaudrate0),
          uartBaudrate1: Number(this.formInline9.uartBaudrate1),
          uartBaudrate2: Number(this.formInline9.uartBaudrate2),
        });
        console.log(this.formInline9);
        // Handle the response from the node
        console.log(response.data);
        this.$message.success('Successfully modified data on the node.');
      } catch (error) {
        // Handle errors
        console.error('Error modifying data on the node:', error);
        this.$message.error('Failed to modify data on the node.');
      }
     },
    // async onSubmit9() {
    //   try {
    //     const response = await axios.post(`http://192.168.168.41/config`, {
    //       baudrateRs485: 2600,
    //       pwAtten1: 86,
    //       pwAtten2: 86,
    //       audioMicGain: 25,
    //       uartBaudrate0: 57600
    //       // uartBaudrate1: 600,
    //       // uartBaudrate2: 1200,
    //     });
    //     console.log(this.formInline9);
    //     // Handle the response from the node
    //     console.log(response.data);
    //     this.$message.success('Successfully modified data on the node.');
    //   } catch (error) {
    //     // Handle errors
    //     console.error('Error modifying data on the node:', error);
    //     this.$message.error('Failed to modify data on the node.');
    //   }
    // },
  },

}

</script>

<style>
</style>