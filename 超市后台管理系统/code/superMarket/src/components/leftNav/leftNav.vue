<template>
  <div class="leftNav">
    <div class="leftNav-logo">HuaLian</div>

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(66, 79, 99)"
      text-color="#fff"
      active-text-color="#65CEA7"
      unique-opened
      router
    >
      <!-- 账号管理 -->
      <el-submenu
       :index="i+1+''"
       v-for='(subnav,i) in leftAll'
       :key ="i"
       >
        <template slot="title">
          <i :class="leftAll.navClass"></i>
          <span>{{ subnav.navtitle }} </span>
        </template>
        <el-menu-item-group v-for="(a,i) in subnav.children" :key='i'>
          <el-menu-item :index="a.path">
            {{a.smalltitle}}
          </el-menu-item>
    
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
export default {
  data(){
    return {
      leftAll:[
        //导航栏一
        { navClass:"el-icon-user",navtitle:"账号管理",
          children:[
            {path:'/home/accountManage',smalltitle:'账号管理'},
            {path:'/home/addAccount',smalltitle:'添加账号'},
            {path:'/home/passwordChange',smalltitle:'密码修改'},
          ]},
          //导航栏2
        { navClass:"el-icon-sell",navtitle:"进货管理",
          children:[
            {path:'/home/inventoryControl',smalltitle:'库存管理'},
            {path:'/home/Addinventory',smalltitle:'添加库存'},
          ]},
           //导航栏3
           { navClass:"el-icon-truck",navtitle:"出货管理",
          children:[
            {path:'/home/saleList',smalltitle:'销售列表'},
            {path:'/home/Goodsreturn',smalltitle:'商品退货'},
            {path:'/home/Outboundgoods',smalltitle:'商品出库'},
          ]},
           //导航栏4
           { navClass:"el-icon-shopping-cart-2",navtitle:"商品管理",
          children:[
            {path:'/home/productManage',smalltitle:'商品管理'},
            {path:'/home/addProduct',smalltitle:'添加商品'},
          ]},
           //导航栏5
           { navClass:"el-icon-pie-chart",navtitle:"统计管理",
          children:[
            {path:'/home/salesTotal',smalltitle:'销售统计'},
            {path:'/home/stockTotal',smalltitle:'进货统计'},
          ]},
           //导航栏6
           { navClass:"el-icon-setting",navtitle:"系统管理",
          children:[
            {path:'/home/SystemMassage',smalltitle:'系统信息'},
          ]},

         
           
          


        
      ]
    }
  }
};
</script>

<style lang="less">
@import "./leftNav.less";
</style>
