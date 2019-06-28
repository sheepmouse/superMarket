<template>
  <div class="SystemMassage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>系统信息</h1>
      </div>
      <!--警告框 -->
      <div>
        <el-alert title="商品总数:5。已经销售金额:890。库存商品总价1230.89。" type="success" show-icon></el-alert>
        <el-alert title="导入数据" type="info" show-icon></el-alert>
      </div>

      <!-- 销量内容 -->
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>销售排行</span>
            </div>
            <div>
              <el-table :data="saleData" style="width: 100%">
                <el-table-column prop="name" label="销售排行" width="200"></el-table-column>
                <el-table-column prop="salenum" label="销量" width="200"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>

        <!-- 右边缺货产品 -->
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>缺货的商品</span>
            </div>
            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="商品名称" width="180">
                  <template slot-scope="scope">
               
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="库存" width="180">
                  <template slot-scope="scope">
               
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template>
                    <el-button size="mini">入库</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saleData: [
        {
          name: "可比克薯片",
          salenum: "8"
        },
        {
          name: "海飞丝",
          salenum: "19"
        },
        {
          name: "方便面",
          salenum: "21"
        },
        {
          name: "六味地黄丸",
          salenum: "8"
        }
      ],
        tableData: [{
          date: '可口可乐',
          name: '23',
        }
    ]
    };
  }
};
</script>

<style lang="less">
.SystemMassage {
  .el-alert {
    margin-bottom: 20px;
  }
}
</style>