import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import services from './utils/request.js';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);
Vue.config.productionTip = false;
// 添加左右切换效果
router.beforeEach((to, from, next) => {
  // store.commit('showLoading');
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
