import Vue from 'vue';
import App from './App.vue';
import router from './router';
import toast from './common/Toast/index';
import loading from './common/Loading/index';
import ajax from './ajax';

// 全局样式
import './assets/css/reset.less';
import './assets/css/common.less';

/* plugin */
Vue.use(toast);
Vue.use(loading);
Vue.use(ajax);
/* plugin */

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
