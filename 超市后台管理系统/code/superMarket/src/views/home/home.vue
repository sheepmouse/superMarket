<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="250px">
        <leftNav></leftNav>
      </el-aside>
      <el-container>


        <!-- 头部 -->
        <el-header>
          <RightHeader></RightHeader>
        </el-header>


        <!-- 右侧 -->
        <el-main>
          <router-view></router-view>
        </el-main>


        <!-- 右尾 -->
        <el-footer>
          <Rightfooter></Rightfooter>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//引入组件
import leftNav from '@/components/leftNav/leftNav.vue'
import RightHeader from '@/components/RightHeader/RightHeader.vue'
import Rightfooter from '@/components/Rightfooter/Rightfooter.vue'
export default {
    components:{
        leftNav,
        RightHeader,
        Rightfooter
    },


};
</script>
 <style lang="less">
@import "./home.less";
</style>
 