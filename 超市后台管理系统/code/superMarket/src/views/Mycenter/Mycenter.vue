<template>
  <div class="Mycenter">
    <el-card class="box-card" style="width:800px">
      <div slot="header" class="clearfix">
        <h1>个人中心</h1>
      </div>

      <!-- 内容 -->
      <div class="content">
        <el-row>
          <el-col :span="12">
           <!-- 头像 -->
            <div id="headerpic">
                <img src="@/assets/images/he.jpg" alt="">
            </div>
          </el-col>
      
        </el-row>
    <!-- 头像上传 -->
        <el-row>
          <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small">点击上传新头像</el-button>
</el-upload>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">用户名:胡歌</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>年龄:18
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">真实姓名:王铁柱</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>性别:男
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">地址:中国上海市宝山区吴淞八棉新村23号103室</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>联系电话:17127278900
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {};
</script>
 <style lang="less">
.Mycenter {
  .content {
      #headerpic{
          width: 150px;
          height: 150px;
          img{
              width: 100%;
              height: 100%;
              
          }
      }
      
     .el-row {
      margin-top: 40px;
     
         

      
    }
  }
}
</style>
 