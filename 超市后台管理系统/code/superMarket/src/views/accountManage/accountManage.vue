<template>
  <div class="accountManage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>账号管理</h1>
      </div>
      <div>
        <el-table
          ref="tableData"
          :data="tableData"
          style="width: 100%"
          @selection-change="selectChange"
        >
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="account" label="用户名称"></el-table-column>
          <el-table-column prop="region" label="用户组"></el-table-column>
          <el-table-column prop="ctime" label="时间">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
                编辑
              </el-button>
              <el-button size="mini" type="primary" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 选中按钮 -->
      <div style="margin-top: 20px">
        <el-button @click="delselect">删除选中</el-button>
        <el-button @click="deselect">取消选择</el-button>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 修改表单模态框 -->
      <el-dialog title="修改账号" width="420px" :visible.sync="visible">
        <!-- 修改表单 -->
        <el-form ref="editForm" :model="editForm" style="width: 316px" :rules="rules">
          <!-- 账号 -->
          <el-form-item label="账号" prop="account" label-width="120px">
            <el-input v-model="editForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 用户组 -->
          <el-form-item label="用户组" label-width="120px">
            <el-select v-model="editForm.region" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 修改表单按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//转换时间格式
import moment from "moment";
import { log } from "util";
export default {
  data() {
    return {
      tableData: [],
      dellArrid: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,
      visible: false, // 修改模态框的显示和隐藏状态
      editForm: {
        // 修改表单
        account: "",
        region: ""
      },
      editId: "",
      rules: {
        // 验证规则
        account: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "change"
          },
          {
            min: 3,
            max: 6,
            message: "长度3 ~ 6位",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //表格选中状态
    selectChange(a) {
      this.dellArrid = a.map(v => v.id);
    },
    //取消选择
    deselect() {
      this.$refs.tableData.clearSelection();
    },
    //删除选中
    delselect() {
      // 如果没选中
      if (!this.dellArrid.length) {
        this.$message.error("请选择以后再操作！");
        return;
      }

      // 优化体验
      this.$confirm("确认执行批量删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认删除
          // 发送请求 把"id们"发送给后端
          this.axios
            .get("http://127.0.0.1:666/account/massdelete", {
              params: {
                id: this.dellArrid
              }
            })
            .then(response => {
              console.log(response.data);
              // 接收数据
              let { code, reason } = response.data;
              // 判断
              if (code === 0) {
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                this.AccountList();
              } else if (code === 1) {
                // 弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: "info",
            message: "已取消批量删除"
          });
        });
    },

    // 编辑
    handleEdit(id) {
      // 弹出模态框
      this.visible = true;
      // 保留id 这个id就是要修改的数据的id
      this.editId = id;

      this.axios
        .get("http://127.0.0.1:666/account/accountedit", {
          params: {
            id
          }
        })
        .then(response => {
          //   接收后端响应的数据;

          let a = response.data;

          //   let data= response.data.data

          // 回填表单
          this.editForm.account = a[0].account;
          this.editForm.region = a[0].region;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除
    handleDelete(id) {
      // 优化删除体验
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定走这里

          this.axios
            .get("http://127.0.0.1:666/account/accountdel", {
              params: {
                id
              }
            })
            .then(response => {
              // 接收后端响应的数据
              let { code, reason } = response.data;
              // 判断
              if (code === 0) {
                // 成功
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表（重新请求一次数据）
                this.AccountList();
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
    //当前页改变
    AccountList() {
      // 发送请求 获取所有账号数据
      // 收集参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      this.axios
        .get("http://127.0.0.1:666/account/accountlistbypage", {
          params
        })
        .then(response => {
          // 接收后端响应的数据
          let { total, data } = response.data;
          console.log(response.data);

          // 渲染
          this.total = total;
          this.tableData = data;

          // 边界判断
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.AccountList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveEdit() {
      // 调用表单的前端验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 隐藏模态框
          this.visible = false;

          // 收集参数
          let params = {
            account: this.editForm.account,
            region: this.editForm.region,
            id: this.editId
          };
          // 发送数据给后端
          this.axios
            .post(
              "http://127.0.0.1:666/account/saveedit",
              this.qs.stringify(params)
            )
            .then(response => {
              // 接收后端响应的数据
              let { code, reason } = response.data;
              // 判断
              if (code === 0) {
                // 成功
                this.$message({
                  type: "success",
                  message: reason
                });
                this.AccountList(); // 重新请求一次数据 刷新列表
              } else if (code === 1) {
                // 失败
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // pageSize（每页条数）改变
    handleSizeChange(pageSize) {
      this.pageSize = pageSize; // 把用户选择的每页条数获取 赋值给data中的pageSize
      this.AccountList(); // 调用分页请求
    },
    // currentPage（当前页）改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 把用户选择的当前页获取 赋值给data中的currentPage
      this.AccountList(); // 调用分页请求
    }
  },
  created() {
    this.AccountList();
  },
  filters: {
    filterCtime(ctime) {
      // 过滤时间
      return moment(ctime).format("YYYY-MM-DD hh:mm:ss");
    }
  }
  // 保存修改
};
</script>
<style lang="less">
.accountManage {
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
