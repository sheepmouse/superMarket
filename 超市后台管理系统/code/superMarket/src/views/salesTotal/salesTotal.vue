<template>
  <div class="salesTotal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>销售统计</h1>
      </div>
      <!-- 内容 -->
      <div>
        <!-- 日期选择器 -->
        <span class="demonstration">时间:</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        ></el-date-picker>
        <!-- 类别 -->
        <el-select size="mini" v-model="value" placeholder="销售情况统计" style="margin-left:30px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
         <el-button style="margin:20px" size="mini" icon="el-icon-search">查询</el-button>
        <div class="pic" style="height:600px;"></div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  mounted() {
    let mycharts = this.echarts.init(document.querySelector(".pic"));
    let option = {
      xAxis: {
        type: "category",
        data: ["2010", "2012", "2014", "1016", "2018", "2020", "2022"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };

    mycharts.setOption(option);
  },

  data() {
    return {
      value1: "",
      options: [
        {
          value: "选项1",
          label: "销售情况统计"
        },
        {
          value: "选项2",
          label: "销售金额统计"
        }
      ],
      value: ""
    };
  }
};
</script>
 <style lang="less">
</style>
 