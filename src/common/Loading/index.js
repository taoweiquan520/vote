/**
 * @param text : 内容，默认空
 * @param duration : 持续时间，默认2s
 * @param align : 文字位置，默认居中
 * @param mask : 遮罩层，默认出现
 * @param width : 宽度，默认auto
 */
import LoadingComponent from './Loading.vue';

const loading = {};
const queue = []; // 执行队列

// 注册Toast
loading.install = (Vue) => {
  // 生成一个Vue的实例
  const LoadingConstructor = Vue.extend(LoadingComponent);
  const instance = new LoadingConstructor();

  // 将这个实例挂载在创建的div上
  // 并将此div加入全局挂载点
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  // 通过Vue的原型注册一个方法
  // 其中的duration是持续时间
  Vue.prototype.$loading = (option = {}) => {
    if (queue.length) {
      return;
    }
    instance.text = option.text || '正在加载...';
    // instance.align = option.align || 'center';
    // instance.width = option.width || '100px';
    // instance.height = option.height || '100px';
    // instance.mask = option.hasOwnProperty('mask') ? option.mask : true;
    instance.showLoading = true;
    queue.push(instance);
  };
  Vue.prototype.$loading.hide = () => {
    instance.showLoading = false;
    queue.pop();
  };
};

export default loading;
