<template>
  <div class="prodctManage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>商品管理</h1>
      </div>
      <!-- 查询 -->
      <div>
        <el-form :inline="true" :model="formMassage" class="demo-form-inline" size="mini">
          <el-form-item label="关键词:">
            <el-input style="width:400px" v-model="formMassage.user" placeholder></el-input>
          </el-form-item>
          <el-form-item label="选择分类：">
            <el-select v-model="formMassage.region" placeholder="选择分类">
              <el-option label="全部分类" value="全部分类"></el-option>
              <el-option label="零食类" value="零食类"></el-option>
              <el-option label="饮料类" value="饮料类"></el-option>
              <el-option label="日用品类" value="日用品类"></el-option>
              <el-option label="家居用品" value="家居用品"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="蔬菜" value="蔬菜"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- dialog框 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
          <el-form :model="redactData" :rules="rules">

            <el-form-item label="活动名称"  prop="category">
              <el-input v-model="redactData.category" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="活动区域"  prop="name">
              <el-select v-model="redactData.name" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible=false">确 定</el-button>
          </div>
        </el-dialog>



        <!-- 商品详情 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection"></el-table-column>

          <el-table-column prop="num" label="商品条形码"></el-table-column>

          <el-table-column prop="name" label="商品名称"></el-table-column>

          <el-table-column prop="classify" label="所属分类"></el-table-column>

          <el-table-column prop="price" label="售价(元)" width="100"></el-table-column>

          <el-table-column prop="radio1" label="是否促销"></el-table-column>

          <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>

          <el-table-column width="300" prop="ctime" label="时间"></el-table-column>

          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit( scope.row.id)">
                <!-- <i class="el-icon-edit"></i> -->
                编辑
              </el-button>
              <el-button type="primary" size="mini" @click="handleDelete( scope.row.id)">
                <!-- <i class="el-icon-delete"></i> -->
                删除
              </el-button>
            </template>
          </el-table-column>
          <!-- 分页 -->
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5,7]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import { goodsList , delgoods } from "@/api/goods";
export default {
  data() {
    return {
      //查询数据
      formMassage: {
        user: "",
        region: ""
      },
      //每页显示条目数
      pagesize: 3,
      //分页
      currentPage: 1,
      total: 0,

      //表格数据
      tableData: [],
        //编辑数据
      redactData:{

      },
  
      rules:[],

      dialogFormVisible:false

      
    };
  },
  methods: {
    //查询按钮
    search() {},
    handleEdit() {},
    //删除,
    handleDelete(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定走这里
            delgoods({id})
            .then(res => {
              // 接收后端响应的数据
              let { code, reason } = res;
              // 判断
              if (code === 0) {
                // 成功
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表（重新请求一次数据）
                this.productList();
              } else if (code === 1) {
                // 失败
                // 弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // 取消走这里
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(pagesize) {
      console.log(pagesize);
      this.pagesize = pagesize;
      this.productList();
    },
    //页面改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.productList();
    },
    //请求数据函数
    productList() {
      let parmas = {
        pagesize: this.pagesize,
        currentPage: this.currentPage,
      };
      goodsList(parmas)
        .then(res => {
          let { data, total } = res;
          this.total = total;
          // console.log(data);
          this.tableData = data;
        })
        .catch(err => {
          console.log(err);
        });
    },

  created() {
    this.productList();
  }
  }
};
</script>
 <style lang="less">
.prodctManage {
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
 