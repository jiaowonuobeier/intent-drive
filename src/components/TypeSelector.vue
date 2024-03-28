<template>
  <div class="block" :gutter="20">
    请选择您要配置的类型：
    <el-cascader
      v-model="selectedvalue"
      :options="options"
      @change="handleChange"
    ></el-cascader>
    <el-button type="primary" style="margin-left: 20px" @click="newconfig"
      >新建配置</el-button
    >  
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      selectedvalue: 0,
      options: [
        {
          value: "xinxichaxun",
          label: "信息查询类",
          children: [
            {
              value: 1,
              label: "网络状态查询",
            },
            {
              value: 2,
              label: "节点信息查询",
            },
            {
              value: 3,
              label: "链路信息查询",

              // children: [
              //   {
              //     value: "cexiangdaohang",
              //     label: "侧向导航",
              //   },
              //   {
              //     value: "dingbudaohang",
              //     label: "顶部导航",
              //   },
              // ],
            },
            {
              value: 4,
              label: "事务查询",
            },
          ],
        },
        {
          value: "dianjiantongxin",
          label: "点间通信类",
          children: [
            {
              value: "duofang",
              label: "多方通信",
              children: [
                {
                  value: 5,
                  label: "注重实时性",
                },
                {
                  value: 6,
                  label: "注重数据量",
                },
              ],
            },
            {
              value: "shuangfang",
              label: "双方通信",
              children: [
                {
                  value: 7,
                  label: "注重实时性",
                },
                {
                  value: 8,
                  label: "注重数据量",
                },
              ],
            },
          ],
        },
        {
          value: "wangluopeizhi",
          label: "网络配置类",
          children: [
            {
              value: 9,
              label: "修正类",

            },
            {
              value: 10,
              label: "优化类",

              // children: [
              //   {
              //     value: "cexiangdaohang",
              //     label: "侧向导航",
              //   },
              //   {
              //     value: "dingbudaohang",
              //     label: "顶部导航",
              //   },
              // ],
            },
            {
              value: 11,
              label: "创建类",

              // children: [
              //   {
              //     value: "cexiangdaohang",
              //     label: "侧向导航",
              //   },
              //   {
              //     value: "dingbudaohang",
              //     label: "顶部导航",
              //   },
              // ],
            },
          ],
        },
        {
          value: "shebeikongzhi",
          label: "设备控制类",
          children: [
            {
              value: 12,
              label: "信息管理类",

              // children: [
              //   {
              //     value: "yizhi",
              //     label: "一致",
              //   },
              //   {
              //     value: "fankui",
              //     label: "反馈",
              //   },
              //   {
              //     value: "xiaolv",
              //     label: "效率",
              //   },
              //   {
              //     value: "kekong",
              //     label: "可控",
              //   },
              // ],
            },
            {
              value: 13,
              label: "接入拆除类",

              // children: [
              //   {
              //     value: "cexiangdaohang",
              //     label: "侧向导航",
              //   },
              //   {
              //     value: "dingbudaohang",
              //     label: "顶部导航",
              //   },
              // ],
            },
            {
              value: 13,
              label: "资源管理类",
              // children: [
              //   {
              //     value: "cexiangdaohang",
              //     label: "侧向导航",
              //   },
              //   {
              //     value: "dingbudaohang",
              //     label: "顶部导航",
              //   },
              // ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      this.selectedvalue = value[value.length - 1];
      console.log(value[value.length - 1]);
    },
    newconfig() {
      // console.log(this.value[value.length - 1]);
      console.log(this.selectedvalue);
      this.$emit('transfer', this.selectedvalue)
      this.$message({
          showClose: true,
          message: `您新建了一项配置，配置编号：${this.selectedvalue}`,
          type: 'success'
        });
    },
  },
};
</script>

<style>
</style>