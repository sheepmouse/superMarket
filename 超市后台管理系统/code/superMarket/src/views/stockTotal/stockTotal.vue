<template>
  <div class="stockTotalTotal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>进货统计</h1>
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
        <el-select size="mini" v-model="value" placeholder="进货情况统计" style="margin-left:30px;">
      
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
            <el-button style="margin:20px" size="mini" icon="el-icon-search">查询</el-button>
        <div class="pic" style="height:600px;"></div>

        <!-- 查询按钮 -->
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  mounted() {
    let mycharts = this.echarts.init(document.querySelector(".pic"));
    let option = {
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ["product", "零食类", "日用品", "水果类", "蔬菜类"],
        source: [
          { product: "2016", 零食类: 43, 日用品: 85, 水果类: 93, 蔬菜类: 23 },
          { product: "2017", 零食类: 83, 日用品: 73, 水果类: 55, 蔬菜类: 25 },
          { product: "2018", 零食类: 86, 日用品: 65, 水果类: 82, 蔬菜类: 43 },
          { product: "2019", 零食类: 86, 日用品: 65, 水果类: 82, 蔬菜类: 73 },
          { product: "2020", 零食类: 86, 日用品: 15, 水果类: 22, 蔬菜类: 23 }
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: "bar" },
        { type: "bar" },
        { type: "bar" },
        { type: "bar" }
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
 