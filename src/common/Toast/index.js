/**
 * @param text : 内容，默认空
 * @param duration : 持续时间，默认2s
 * @param align : 文字位置，默认居中
 * @param mask : 遮罩层，默认出现
 * @param width : 宽度，默认auto
 */
import ToastComponent from './Toast.vue';

const toast = {};
const queue = []; // 执行队列

// 注册Toast
toast.install = (Vue) => {
  // 生成一个Vue的实例
  const ToastConstructor = Vue.extend(ToastComponent);
  const instance = new ToastConstructor();

  // 将这个实例挂载在创建的div上
  // 并将此div加入全局挂载点
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  // 通过Vue的原型注册一个方法
  // 其中的duration是持续时间
  Vue.prototype.$toast = (option = {}) => {
    if (queue.length) {
      return;
    }
    instance.text = option.text || '';
    instance.duration = option.duration || 2000;
    instance.align = option.align || 'center';
    instance.width = option.width || 'auto';
    instance.mask = option.hasOwnProperty('mask') ? option.mask : true;
    instance.showToast = true;
    queue.push(instance);

    setTimeout(() => {
      instance.showToast = false;
      queue.pop();
    }, instance.duration);
  };
};

export default toast;
