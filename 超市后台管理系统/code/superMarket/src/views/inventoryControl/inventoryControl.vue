<template>
  <div class="prodctManage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>库存管理</h1>
      </div>
      <!-- 查询 -->
      <div>
        <el-form :inline="true" :model="formMassage" class="demo-form-inline" size="mini">
          <el-form-item label="关键词:">
            <el-input style="width:400px" v-model="formMassage.user" placeholder></el-input>
          </el-form-item>
          <el-form-item label="选择分类：">
            <el-select v-model="formMassage.region" placeholder="选择分类">
              <el-option label="零食类" value="零食类"></el-option>
              <el-option label="饮料类" value="饮料类"></el-option>
              <el-option label="生活用品类" value="生活用品类"></el-option>
              <el-option label="厨房用品" value="厨房用品"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 商品详情 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="60"></el-table-column>

          <el-table-column prop="goodsNum" label="商品条形码"></el-table-column>

          <el-table-column prop="name" label="商品名称"></el-table-column>

          <el-table-column prop="classify" label="所属分类"></el-table-column>

          <el-table-column prop="price" label="售价(元)"></el-table-column>

          <el-table-column prop="promotion" label="促销价(元)"></el-table-column>

          <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>

          <el-table-column width="100" prop="inventory" label="库存"></el-table-column>

          <el-table-column prop="inventoryNum" label="库存总额(元)"></el-table-column>

          <el-table-column prop="saleNum" label="销售总额(元)"></el-table-column>3
          <el-table-column label="管理" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">
                <!-- <i class="el-icon-edit"></i> -->
                编辑
              </el-button>
              <el-button type="primary"  size="mini" @click="handleDelete(scope.$index, scope.row)">
                <!-- <i class="el-icon-delete"></i> -->
                删除
              </el-button>
            </template>
          </el-table-column>

         
        </el-table>
      </div>
          <!-- 全选按钮 -->
            <div style="margin-top: 20px">
              <el-button @click="setCurrent()">删除选中</el-button>
              <el-button @click="setCurrent()">全选</el-button>
            </div>
            <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5,10,20]"
            :page-size="3"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
          ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //查询数据
      formMassage: {
        user: "",
        region: ""
      },

      //分页
      currentPage:100,
      
      //表格数据
      tableData: [
      
        {
          goodsNum: "121234566445",
          name: "洗面奶",
          classify: "生活",
          price: "20",
          promotion: "促销", //促销
          marketPrice: "12.8", //市场价
          inventory: "14", //库存
          inventoryNum: "28:00", //库存总额
          saleNum: "600:00"
        },
      ]
    };
  },
  methods: {
    //查询按钮
    onSubmit() {},
    handleEdit() {},
    handleDelete() {},
    handleSizeChange(){},
    handleCurrentChange(){}
  }

  
};
</script>
 <style lang="less">
 .prodctManage{
    .el-pagination{
      margin-top: 20px;
    }
    .el-table__body .el-table__row{
         .el-table_1_column_9  .cell{
            color: red;
        }
        .el-table_1_column_8 .cell{
            color: red;
        }
        
       
    }  
  }
</style>
 