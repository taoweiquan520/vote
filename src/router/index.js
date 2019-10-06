import Vue from 'vue';
import Router from 'vue-router';

import Index from '../components/Index.vue';
import List from '../components/List.vue';
import Detail from '../components/Detail.vue';
import Upload from '../components/Upload.vue';
import Activity from '../components/Activity.vue';

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
