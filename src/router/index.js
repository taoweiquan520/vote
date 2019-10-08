import Vue from 'vue';
import Router from 'vue-router';

import Index from '../components/Index.vue'; // 首页
import List from '../components/List.vue'; // 列表页
import Detail from '../components/Detail.vue'; // 详情页
import Upload from '../components/Upload.vue'; // 录入信息页
import Activity from '../components/Activity.vue'; // 活动页

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/list',
      name: 'list',
      component: List,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity,
    },
  ],
});
