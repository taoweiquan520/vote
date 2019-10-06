import Vue from 'vue';
import App from './App.vue';
import router from './router';

// reset style
// common style
import './assets/css/reset.less';
import './assets/css/common.less';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
