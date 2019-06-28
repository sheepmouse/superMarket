import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//base.css
import './assets/css/base.css';
Vue.use(ElementUI);
//e-charts
import echarts from 'echarts'
Vue.prototype.echarts = echarts;

//axios
import axios from 'axios'
Vue.prototype.axios = axios;

// qs
import qs from "qs";
Vue.prototype.qs = qs;




// 路由守卫 拦截所有路由

router.beforeEach((to, from, next) => {
  // 获取token
  const token = window.localStorage.getItem('keynum')
  // 判断
  if (token) {   // 如果有token 直接放行
    next()
  } else {
    // a. 如果去的是登录 直接放行
    if (to.path === '/login') {
      next() 
    } else {
      next({path: '/login'}) //  b. 如果去的是其他页面，直接跳转到登录页面。
    }
  }
})




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
