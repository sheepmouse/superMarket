import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('./views/login/login.vue')
      
    },
    {
      //重定向"/ ""为登录页面
      path:'/',
      redirect:'/login'
    },
    //后台主界面
    {
      path: '/home',
      redirect:'/home/SystemMassage',
      
      component: () => import('./views/home/home.vue'),
      
      children: [
        {
          //账号管理
          path: '/home/accountManage',
          component: () => import('./views/accountManage/accountManage.vue'),
        },
        {
          //账号添加
          path: '/home/addAccount',
          component: () => import('./views/addAccount/addAccount.vue'),
        },
        {
          //密码修改
          path: '/home/passwordChange',
          component: () => import('./views/passwordChange/passwordChange.vue'),
        },
        {
          //商品添加
          path: '/home/addProduct',
          component: () => import('./views/addProduct/addProduct.vue'),
        },
        {
          //商品管理
          path: '/home/productManage',
          component: () => import('./views/productManage/productManage.vue'),
        },
        {
          //进货统计
          path: '/home/stockTotal',
          component: () => import('./views/stockTotal/stockTotal.vue'),
        },
        {
          //销售统计
          path: '/home/salesTotal',
          component: () => import('./views/salesTotal/salesTotal.vue'),
        },
        {
          //系统管理
          path: '/home/SystemMassage',
          component: () => import('./views/SystemMassage/SystemMassage.vue'),
        },
        {
          //个人中心
          path: '/home/Mycenter',
          component: () => import('./views/Mycenter/Mycenter.vue'),
        },
        {
          //库存管理
          path: '/home/inventoryControl',
          component: () => import('./views/inventoryControl/inventoryControl.vue'),
        },
        {
          //添加库存
          path: '/home/Addinventory',
          component: () => import('./views/Addinventory/Addinventory.vue'),
        },
        {
          //销售列表
          path: '/home/saleList',
          component: () => import('./views/saleList/saleList.vue'),
        },
        {
          //商品退货
          path: '/home/Goodsreturn',
          component: () => import('./views/Goodsreturn/Goodsreturn.vue'),
        },
        {
          //商品出库
          path: '/home/Outboundgoods',
          component: () => import('./views/Outboundgoods/Outboundgoods.vue'),
        },
       
      ]
    }

  ]
})
